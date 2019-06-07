import { mainURL, normalPrivateKey1 } from '../../fixtures/constants'
import { login, testPassword } from '../components/common'


/* new account logout condition */
describe('new wallet create step01 ( logout )', () => {
  it('create move', function() {
    cy.visit('/')
    .get('.create').click()
  })
  /* password check */
  testPassword('123456789', 2)
  testPassword('!', 3)
  testPassword('1', 4)
  
  it('next step enabled test', function() {
    cy.get('#password')
    .type('qwer1234!')
    .get('.WalletCreationStepPlate__nextButtons > .Button')
    .should('not.be.disabled')
    .get('.WalletCreationStepPlate__nextButtons > .Button')
    .click()  
  })
})

describe('new wallet create step02 ( logout )', () => {
  it('file download', function() {
    cy.get('.WalletCreationStepPlate__nextButtons > .Button')
    .click()
  })
})

describe('new wallet create step03 ( logout )', () => {
  it('logout condition button name check', function() {
    cy.get('.WalletCreationStepPlate__nextButtons > .Button--gray')
    .should('have.text','View Account Info')
    .get('.WalletCreationStepPlate__nextButtons > :nth-child(2)')
    .should('have.text','Send KLAY & Tokens')
  })
})

/* new account login condition test */
describe('new wallet create step01 ( login )', () => {
  login(normalPrivateKey1)
  it('create click', function() {
    cy.visit('/')
    .get('.create')
    .click()
  })

  it('next step check', function() {
    cy.get('#password')
    .type('qwer1234!')
    .get('.WalletCreationStepPlate__nextButtons > .Button')
    .should('not.be.disabled')
    .get('.WalletCreationStepPlate__nextButtons > .Button')
    .click()  
  })
})

describe('new wallet create step02 ( login )', () => {
  it('file download', function() {
    cy.get('.WalletCreationStepPlate__nextButtons > .Button')
    .click()
  })
})

describe('new wallet create step03 ( login )', () => {
  it('login condition check and logout', function() {
    cy.get('.WalletCreationStepPlate__nextButtons > .Button--gray')
    .should('have.text','Sign in with New Account')
    .get('.WalletCreationStepPlate__nextButtons > :nth-child(2)')
    .should('have.text','View My Current Account')
    .get('.WalletCreationStepPlate__nextButtons > .Button--gray')
    .click()
    .get('.remove__sessionStorage')
    .should('not.be.visible')
  })
})