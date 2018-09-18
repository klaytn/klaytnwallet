import store from '../store'

export const nameCommittee = (address) => {
  const knownCommittee = store.getState().block.validators[address]

  return knownCommittee
    ? `Node ${knownCommittee}`
    : 'unknown'
}

export const nameTxCategory = (isShortForm) => ({
  0: isShortForm ? 'transfer' : 'Value Transfer',
  1: isShortForm ? 'execution' : 'Smart Contract Execution',
  2: isShortForm ? 'deployment' : 'Smart Contract Deployment',
})
