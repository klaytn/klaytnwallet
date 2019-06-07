import { mainURL, testPrivateKey, testAddress, newWallet, newHRAWallet, existingHRAAddress } from '../../fixtures/constants'
import { login, logout } from '../components/common'
let newObj= newWallet
let newHRAObj= newHRAWallet
let newHRAAddress = `a${Math.ceil(Math.random()*100000000000)}`
describe('common test', () => {
  it('HRA create move', function() {
    cy.visit('/')
  })
  login(testPrivateKey)
})

describe('new wallet', () => {
  it('new wallet visit', function() {
    cy.get('.menu-create > .TabItem')
      .click()
    
  })
  /* new wallet made and faucet */
  it('next step click', function() {
    cy.get('#password')
      .type('qwer1234!')
      .get('.WalletCreationStepPlate__nextButtons > .Button')
      .click()  
  })
  it('file down', function() {
    cy.get('.WalletCreationStepPlate__nextButtons > .Button')
      .click()
  })
  it('logout and new login', function() {   
    cy.get('.InputCopy__input').should((val)=>{
      newObj.privateKey = val.val()
    })
    it('time wait', function() {   
      cy.wait(2000)
    })
    cy.get('.WalletCreationStepPlate__nextButtons > .Button--gray')
      .click()
  })
})

describe('new wallet adress check', () => {
  /* new wallet login */
  it('time wait', function() {
    cy.get('#input-privatekey')
      .type(newObj.privateKey)
      .get('.AccessReminder__checkbox')
      .click()
      .get('.AccessByPrivatekey > .Button')
      .click()
  })
})

describe('faucet test', () => {
  /* new wallet faucet */
  it('move faucet', function() {
    cy.get(':nth-child(4) > .TabItem')
      .click()
  })

  it('faucet page data check', function() {   
    cy.get('.KlayFaucet__balance > .Input__inner > #input-undefined')
      .should('have.value', '0')
      .get('.Input__error')
      .should('not.have.class', 'text__error')
      .should('have.text', 'Faucet is ready to run.')
      .get('.KlayFaucet__content > .Button')
      .should('not.be.disabled')
  })

  it('start faucet', function() {   
    cy.get('.KlayFaucet__content > .Button')
      .click()
      .wait(4000)
  })
  it('Confirm data after end faucet', function() {   
    cy.get('.KlayFaucet__balance > .Input__inner > #input-undefined')
      .should('have.value', '5')
      .get('.Input__error')
      .should('have.class', 'text__error')
      .get('.KlayFaucet__content > .Button')
      .should('be.disabled')
  })
})