import { 
  mainURL, 
  testPrivateKey, 
  testAddress,
  normalPrivateKey5, 
  normaladdress5,
  existingHRAAddressFull,
  nonExistingHRAAddressFull,
  errorAddress1,
  errorAddress2,
  errorAddress3,
  errorAddress4,
  errorAddress5,
  errorAddress6,
  errorAddress7,
  errorAddress8,
  errorAddress9,
  errorAddress10,
  errorAddress11,
  errorAddress12,
  errorAddress13,
  errorAddress14,

} from '../../fixtures/constants'
import { login, logout } from '../components/common'
import { addToken } from '../components/addToken'

const toAddressErrorCheck = (address, check) => {
  it(`to address test [ ${address} ] value check`, function() {
    cy.get('#input-to')
      .type(address)
    if(check){
      cy.get(':nth-child(2) > .Input__error')
        .should('not.be.visible')
    }else{
      cy.get(':nth-child(2) > .Input__error')
        .should('be.visible')
    }
    cy.get('#input-to').clear()
  })
}
/* wallet info page test */
describe('wallet transfer page test', () => {
  it('메인페이지 들어감', function() {
    cy.visit('/')
  })
  login(testPrivateKey)
  it('transfer 클릭시에 url 변경 확인', function() {
    cy.get('.TabList div:nth-child(3) .TabItem')
      .click()
      .url().should('eq', `${mainURL}/transfer`)
  })
  it('send klay data test', function() {    
    cy.get('#input-from')
      .should('have.value', testAddress)
      .get('#totalGasFeeShow')
      .should('have.value', '0.000625')
  })
  /* address data check */
  toAddressErrorCheck(errorAddress1, false)
  toAddressErrorCheck(errorAddress2, false)
  toAddressErrorCheck(errorAddress3, false)
  toAddressErrorCheck(errorAddress4, false)
  toAddressErrorCheck(errorAddress5, false)
  toAddressErrorCheck(errorAddress6, false)
  toAddressErrorCheck(errorAddress7, false)
  toAddressErrorCheck(errorAddress8, false)
  toAddressErrorCheck(errorAddress9, false)
  toAddressErrorCheck(errorAddress10, false)
  toAddressErrorCheck(errorAddress11, false)
  toAddressErrorCheck(errorAddress12, false)
  toAddressErrorCheck(errorAddress13, false)
  toAddressErrorCheck(errorAddress14, false)

  /* HRA Address check */
  it('HRA address check test', function() {
    cy.get('#input-to')
      .type(existingHRAAddressFull)
      .blur() 
      .get('.Inner__Box .TransferForm__input:nth-child(2)')
      .should('have.class', 'Input__inner--success')
      .get('#input-to')
      .clear()
      .type(nonExistingHRAAddressFull)
      .blur() 
      .get('.TransferForm__input .success')
      .should('be.visible')
      .get('#input-to')
      .clear()

  })
})
/* Tokens are basically klay consuming */
addToken()
/* token send test */
describe('wallet transfer page send test', () => {
  it('main page enter', function() {
    cy.visit('/')
  })
  login(testPrivateKey)
  it('transfer click url and check', function() {
    cy.get('.TabList div:nth-child(3) .TabItem')
      .click()
      .url().should('eq', `${mainURL}/transfer`)
  })
  it('test of input value send', function() {
    cy.get('.MyToken__list > :nth-child(2)')
      .click()
      .get('#input-to')
      .type(normaladdress5)
      .blur() 
      .get('#input-value')
      .type(100)
      .get('.TransferForm__valueInput > .Input__error')
      .should('be.visible')
      .get('.Inner__Box > .Button')
      .click()
  })
  it('test of total step view', function() {
    cy.get('.From')
      .should('have.text', testAddress)
      .get('.To')
      .should('have.text', normaladdress5)
      .get('.Amount')
      .should('have.text', '100')
      .get('.TransferTotalItem__noButton')
      .click()
      .get('.Inner__Box > .Button')
      .click()
      .get('.TransferTotalItem__yesButton')
      .click()
      .get('.TransferComplete__button.Button--gray')
      .click()
  })
  login(normalPrivateKey5)
  it('send value check test', function() {
    cy.get(':nth-child(3) > .TabItem')
      .click()
      .get('.MyToken__list > :nth-child(2) .TokenItem__balanceInteger')
      .click()
      .get('.MyToken__list > :nth-child(2) .TokenItem__balanceInteger')
      .should('have.text', '100')
      .get('#input-to')
      .type(testAddress)
      .get('#input-value')
      .type(100)
      .get('.Inner__Box > .Button')
      .click()
      .get('.TransferTotalItem__yesButton')
      .click()
  })
})