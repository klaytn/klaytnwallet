import { mainURL, normalPrivateKey1 } from '../../fixtures/constants'
import { login, testPassword } from '../components/common'


/* new account logout condition */
describe('신규 wallet 생성 step01 ( 로그아웃 )', () => {
  it('create 진입', function() {
    cy.visit('/')
    .get('.create').click()
  })
  /* password check */
  testPassword('123456789', 2)
  testPassword('!', 3)
  testPassword('1', 4)
  
  it('next step 활성화 확인', function() {
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

/* new account 로그인 상태 테스트 */
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