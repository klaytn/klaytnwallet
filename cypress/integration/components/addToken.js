import { 
  mainURL, 
  testPrivateKey, 
  testAddress, 
  normalPrivateKey5, 
  normaladdress5,
  existingHRAAddressFull,
  nonExistingHRAAddressFull,
  errorTokenName1,
  errorTokenName2,
  errorAddress5,
  errorAddress6,
  errorAddress7,
  errorAddress8,
  errorAddress9,
} from '../../fixtures/constants'
import { login, logout } from '../components/common'

const groundToken = {
  address: '0x5A08c3F7ED32B12635F4b2541D039D55a0D6B7CB',
  name: 'gx',
  decimals: 18 
}
const nameErrorCheck = (name) => {
  it(`to address test [ ${name} ] value check`, function() {
    cy.get('#input-name')
      .type(name)
      .get(':nth-child(2) > .Input__error')
      .should('be.visible')
      .get('#input-name').clear()
  })
}
const addressErrorCheck = (address) => {
  it(`to address test [ ${address} ] value check`, function() {
    cy.get('#input-address')
      .type(address)
      .get('.AddToken__downBlock > :nth-child(2) > .Input__error')
      .should('be.visible')
      .get('#input-address').clear()
  })
}
export const addToken = () => {
  describe('wallet add token test', () => {
    it('move main page', function() {
      cy.visit('/')
    })
    login(testPrivateKey)
    it('transfer click url change', function() {
      cy.get('.TabList div:nth-child(3) .TabItem')
        .click()
        .url().should('eq', `${mainURL}/transfer`)
    })
    it('add token normal test', function() {
      cy.get('.PlusButton')
        .click()
        .get('#input-name')
        .type('ground')
        .get('#input-address')
        .type('ground')
        .get('#input-decimal')
        .type('18')
        .get('.XButton')
        .click()
        .get('.PlusButton')
        .click()
        .get('#input-address')
        .should('value', '')
        .get('#input-decimal')
        .should('value', '')
        .get('.XButton')
        .should('value', '')
    })
    nameErrorCheck(errorTokenName1)
    nameErrorCheck(errorTokenName2)
    addressErrorCheck(errorAddress5)
    addressErrorCheck(errorAddress6)
    addressErrorCheck(errorAddress7)
    addressErrorCheck(errorAddress8)
    addressErrorCheck(errorAddress9)
    it('groundToken add token test', function() {
      cy.get('#input-name')
        .clear()
        .type(groundToken.name)
        .get('#input-address')
        .clear()
        .type(groundToken.address)
        .get('#input-decimal')
        .clear()
        .type(groundToken.decimals)
        .get('.AddToken__downBlock > .Button')
        .click()
        .get('.MyToken__list > :nth-child(2) .TokenItem__title')
        .should('have.text', groundToken.name)
    })
  })
}