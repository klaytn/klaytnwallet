export const identity = a => a;

function noop() { }

const call = (f, arg) => f(arg);

const call2 = (arg, f) => f(arg);

export const clear = console.clear;

export const log = console.log;

export const curry = f => (a, ..._) => _[0] === undefined ? (..._) => f(a, ..._) : f(a, ..._);

function* valuesIter(obj) {
  for (const k in obj) yield obj[k];
}

function* entriesIter(obj) {
  for (const k in obj) yield [k, obj[k]];
}

function* reverseIter(arr) {
  var l = arr.length;
  while (l--) yield arr[l];
}

const hasIter = coll => !!coll[Symbol.iterator];

const alterIter = alter => coll =>
  hasIter(coll) ? coll[Symbol.iterator]() : alter(coll);

const collIter = alterIter(valuesIter);

export const reduce = curry(function (f, coll, acc) {
  const iter = collIter(coll);
  acc = arguments.length == 2 ? iter.next().value : acc;
  for (const a of iter)
    acc = acc instanceof Promise ? acc.then(acc => f(acc, a)) : f(acc, a);
  return acc;
});

class Break {
  constructor(value) { this.value = value; }
  static of(value) { return new Break(value); }
}

export const reduceB = curry(function (f, coll, acc) {
  const iter = collIter(coll);
  return go(
    arguments.length == 2 ? iter.next().value : acc,
    function recur(acc) {
      var cur;
      while (!(cur = iter.next()).done && !(acc instanceof Break))
        if ((acc = f(acc, cur.value, Break.of)) instanceof Promise)
          return acc.then(recur);
      return acc instanceof Break ? acc.value : acc;
    });
});

const each = curry((f, coll) => go(reduce((_, a) => f(a), coll, null), _ => coll));

const push = curry((v, arr) => (arr.push(v), arr));

const push2 = curry((arr, v) => (arr.push(v), v));

const set = curry(([k, v], obj) => (obj[k] = v, obj));

const set2 = curry((obj, kv) => (set(kv, obj), kv));

const baseMFIter = (f1, f2) => curry((f, iter, acc = (hasIter(iter) ? [] : {})) =>
  Array.isArray(acc) ?
    reduce((res, a) => go(a, f, b => f1(res, a, b)), iter, acc) :
    reduce((res, [k, a]) => go(a, f, b => f2(res, k, a, b)), iter, acc));

const mapIter = baseMFIter(
  (res, a, b) => push(b, res),
  (res, k, a, b) => set([k, b], res));

const filterIter = baseMFIter(
  (res, a, b) => b ? push(a, res) : res,
  (res, k, a, b) => b ? set([k, a], res) : res);

export const map = curry((f, coll) =>
  hasIter(coll) ? mapIter(f, coll, []) : mapIter(f, entriesIter(coll), {}));

export const filter = curry((f, coll) =>
  hasIter(coll) ? filterIter(f, coll, []) : filterIter(f, entriesIter(coll), {}));

const countBy = curry((f, coll) => reduce((counts, a) => incSel(counts, f(a)), coll, {}));

const groupBy = curry((f, coll) => reduce((group, a) => pushSel(group, f(a), a), coll, {}));

const indexBy = curry((f, coll) => reduce((index, a) => set([f(a), a], index), coll, {}));

function incSel(parent, k) {
  parent[k] ? parent[k]++ : parent[k] = 1;
  return parent;
}

function pushSel(parent, k, v) {
  (parent[k] || (parent[k] = [])).push(v);
  return parent;
}

function catSel(parent, k, v) {
  parent[k] = (parent[k] || (parent[k] = [])).concat(...v);
  return parent;
}

function addSel(parent, k, v) {
  if (!parent.hasOwnProperty(k)) parent[k] = v;
  else parent[k] += v;
  return parent;
}

const values = coll =>
  map(identity, coll instanceof Map ? coll.values() : collIter(coll));

export const go = (...coll) => reduce(call2, coll);

export const pipe = (f, ...fs) => (..._) => reduce(call2, fs, f(..._));

export const tap = (f, ...fs) => (arg, ...args) => go(f(arg, ...args), ...fs, _ => arg);

function tryCatch(tryF, args, catchF) {
  try {
    var res = tryF(...args);
    return res instanceof Promise ? res.catch(catchF) : res;
  } catch (e) {
    return catchF(e);
  }
}

export function pipeT(f, ...fs) {
  var catchF = tap(console.error), finallyF = identity, interceptors = [];

  const hook = (f, args) => go(
    find(itc => itc.predi(...args), interceptors),
    itc => itc ?
      Break.of(itc.body(...args)) :
      tryCatch(f, args, e => Break.of(catchF(e))));

  fs.push(identity);
  return Object.assign((...args) => go(
    reduceB((arg, f) => hook(f, [arg]), fs, hook(f, args)),
    finallyF
  ), {
      catch(...fs) {
        catchF = pipe(...fs);
        return this;
      },
      finally(...fs) {
        finallyF = pipe(...fs);
        return this;
      },
      addInterceptor(...fs) {
        var itc = { predi: pipe(...fs) };
        return (...fs) => {
          itc.body = pipe(...fs);
          interceptors.push(itc);
          return this;
        }
      }
    })
}

const not = a => !a;
const negate = f => pipe(f, not);

const reject = curry((f, coll) => filter(negate(f), coll));

const compact = filter(identity);

const contains = curry((list, target) => list.includes(target));

const pick = curry((ks, obj) => reduce((acc, k) => {
  if (has(k, obj)) acc[k] = obj[k];
  return acc;
}, ks, {}));

const omit = curry((ks, obj) => reduce((acc, [k, v]) => {
  if (!contains(ks, k)) acc[k] = v;
  return acc;
}, entriesIter(obj), {}));

export const findVal = curry((f, coll) => {
  const iter = collIter(coll);
  return function recur(res) {
    var cur;
    while ((cur = iter.next()) && !cur.done) {
      if ((res = f(cur.value)) !== undefined)
        return go(res, res => res !== undefined ? res : recur());
    }
  }();
});

export const find = curry((f, coll) =>
  findVal(a => go(a, f, bool => bool ? a : undefined), coll));

export const isUndefined = a => a === undefined;

const none = curry(pipe(find, isUndefined));

const some = curry(pipe(none, not));

const every = curry((f, coll) => {
  var t = false;
  return go(find(pipe(f, not, b => (t = true, b)), coll), isUndefined, r => r && t);
});

const alterEntriesIter = alterIter(entriesIter);

const mapC = curry((f, coll, limit = Infinity) => {
  const iter = stepIter(alterEntriesIter(coll), limit),
    isArr = hasIter(coll),
    res = isArr ? [] : {};
  const recur = pipe(
    _ => mapIter(a => [f(a)], iter, isArr ? [] : {}),
    coll => mapIter(([b]) => b, alterEntriesIter(coll), res),
    res => iter.remain ? recur() : res);
  return recur();
});

const stepIter = (iter, limit) => {
  var i = 0;
  return {
    next: function () {
      if (i++ == limit) {
        i = 0;
        return { done: true };
      }
      const cur = iter.next();
      this.remain = !cur.done;
      return cur;
    },
    [Symbol.iterator]() { return this; },
    remain: true
  }
};

export const findValC = curry((f, coll, limit = Infinity) => {
  const iter = stepIter(collIter(coll), limit);
  return new Promise(function recur(resolve) {
    var i = 0, j = 0;
    var cur;
    while ((cur = iter.next()) && !cur.done) {
      ++i;
      go(cur.value,
        f,
        b => b === undefined ? undefined : resolve(b),
        _ => i == ++j ? iter.remain ? recur(resolve) : resolve() : undefined);
    }
  });
});

export const findC = curry((f, coll, limit) =>
  findValC(a => go(a, f, bool => bool ? a : undefined), coll, limit));

export const noneC = curry(pipe(findC, isUndefined));

export const someC = curry(pipe(noneC, not));

export const everyC = curry((f, coll, limit) => {
  var t = false;
  return go(findC(pipe(f, not, b => (t = true, b)), coll, limit), isUndefined, r => r && t);
});

export const series = map(call);

export const concurrency = mapC(call);

export const isArray = Array.isArray;

export const isString = a => typeof a == 'string';

export const isMatch = curry((a, b) =>
  typeof a == 'function' ? !!a(b)
    :
    isArray(a) && isArray(b) ? every(v => b.includes(v), a)
      :
      typeof b == 'object' ? every(([k, v]) => b[k] == v, entriesIter(a))
        :
        a instanceof RegExp ? b.match(a)
          :
          a == b
);

const findWhere = curry((w, coll) => find(isMatch(w), coll));

function baseMatch(targets) {
  var cbs = [];

  function evl() {
    return go(
      targets,
      values,
      targets =>
        go(cbs,
          find(pb => { return pb._case(...targets); }),
          pb => pb._body(...targets)));
  }

  function _case(f) {
    cbs.push({ _case: typeof f == 'function' ? pipe(...arguments) : isMatch(f) });
    return _body;
  }
  _case.case = _case;

  function _body() {
    cbs[cbs.length - 1]._body = pipe(...arguments);
    return _case;
  }

  _case.else = function () {
    _case(_ => true)(...arguments);
    return targets ? evl() : (...targets2) => ((targets = targets2), evl());
  };

  return _case;
}

export const match = (..._) => baseMatch(_);
match.case = (..._) => baseMatch(null).case(..._);

const or = (...fs) => {
  const last = fs.pop();
  return (...args) =>
    go(fs,
      findVal(pipe(
        f => f(...args),
        a => a ? a : undefined)),
      a => a ? a : last(...args))
};

const and = (...fs) => {
  const last = fs.pop();
  return (...args) =>
    go(fs,
      findVal(pipe(
        f => f(...args),
        a => a ? undefined : a)),
      a => a === undefined ? last(...args) : a)
};

const flip = f => (..._) => f(..._.reverse());

const baseSel = sep => curry((selector, acc) =>
  !selector ?
    acc
    :
    isArray(selector) ?
      reduce(flip(baseSel(sep)), selector, acc)
      :
      typeof selector == 'object' || typeof selector == 'function' ?
        findWhere(selector, acc)
        :
        reduce(
          (acc, key, s = key[0]) =>
            !acc ? acc :
              s == '#' ? findWhere({ id: key.substr(1) }, acc) :
                s == '[' || s == '{' ? findWhere(JSON.parse(key), acc) :
                  acc[key],
          selector.split(sep),
          acc)
);

const sel = baseSel(/\s*>\s*/);

const first = arr => arr[0];

const nodeF = f => (..._) =>
  new Promise((resolve, reject) =>
    f(..._, (err, val) => err ? reject(err) : resolve(val)
    ));

const join = curry((sep = '', coll) =>
  reduce((a, b) => `${a}${sep}${b}`, coll));

const mix = (strs, vals) => {
  var i = 0;
  return reduce((res, str) => `${res}${vals[i++]}${str}`, strs);
};

const merge = coll => reduce((acc, obj) =>
  reduce(
    (acc, [k, v]) => isArray(v) ? catSel(acc, k, v) : addSel(acc, k, v),
    entriesIter(obj),
    acc),
  coll,
  {});

const baseExtend = set => (obj, ...objs) =>
  reduce(flip(reduce(set)), map(entriesIter, objs), obj);

const has = curry((k, obj) => obj.hasOwnProperty(k));

const extend = baseExtend(tap(set2));
const defaults = baseExtend(tap((obj, kv) => has(kv[0], obj) || set2(obj, kv)));

const Functional = {
  identity, noop, not, negate,
  isUndefined, hasIter, isArray, isString,
  isMatch, has, contains,
  call, call2,
  clear, log,
  curry, flip,
  valuesIter, entriesIter, reverseIter,
  collIter,
  reduce, countBy, groupBy, indexBy, join,
  reduceB, Break,
  go, pipe, tap, pipeT, tryCatch,
  each,
  push, push2,
  set, set2,
  mapIter, filterIter,
  map, values,
  mapC,
  filter, reject, compact, pick, omit,
  findVal, find, none, some, every, findWhere,
  findValC, findC, noneC, someC, everyC,
  series, concurrency,
  match, or, and,
  baseSel, sel,
  first,
  nodeF,
  mix, merge, extend, defaults,
}

export default Functional
