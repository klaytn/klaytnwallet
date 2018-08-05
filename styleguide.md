# component style guide

1. We don't use semicolon.
2. We use .scss for stylesheet.
3. We use BEM convention for styling. (`.Block__Element--Modifier`) (https://en.bem.info/methodology/quick-start/)

## Stateful component
The component which has 'state'.
```
// import React library
import React, { Component } from 'react'

// (optional) Describe prop types.
type Props = {
  username: string,
  isLoggedIn: bool,
}

// Define render function with JSX.
// If necessary, define lifecycle method on component, ex:) componentDidMount ..
class Component extends Component<Props> {
  render() {
    return (
      
    )
  }
}

export default Component
```

## Stateless component
The component which hasn't 'state'.
```
// import React library, in this case we don't need to use { Component } 
// for stateless component.
import React from 'react'

// Define prop types.
type Props = {
  
}

// Define (type 1).
const Component = (props): Props => (
  <div className="Component">
    <h1>{props.userName}</h1>
  </div>
)

// Define (type 2 : destructure 'props').
const Component = ({ userName }: Props) => (
  <div className="Component">
    <h1>{userName}</h1>
  </div>
)

export default Component
```

## BEM style guide
BEM style looks like this: Block__element--modifier

```
.OrderBook__Order--buy {
  
}

.OrderBook__Order--sell {
  
}

// if modifier doesn't necessary, skip it.
.OrderBook__lastPrice {
  
}

.OrderBook__time {
  
}
```

## misc
make a space between library installed from 'npm', and custom component.

Good case
```
import React, { Component } from 'react'

import BuyOrder from './BuyOrder'
import SellOrder from './SellOrder'
import PlaceOrder from './PlaceOrder'

```

Bad case
```
import React, { Component } from 'react'
import BuyOrder from './BuyOrder'
import SellOrder from './SellOrder'
import PlaceOrder from './PlaceOrder'
```

## classnames
Use `classnames` library for dynamic classname.
```
<div className={classNames('WalletStatus__statusCircle', {
      'WalletStatus__statusCircle--injected': address,
    })}
/>
```
>The classname `WalletStatus__statusCircle--injected` will be poulated to the div element only when `address` is truthy.
