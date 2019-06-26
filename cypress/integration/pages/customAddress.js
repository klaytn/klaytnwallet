import { mainURL, existingHRAAddress, normalPrivateKey1, normaladdress1, normalPrivateKey2, normaladdress2 } from '../../fixtures/constants'
import { login, logout, testAddress } from '../components/common'

const customAddress = () => {
  it('HRA create move', function() {
    cy.visit('/')
      .get('.menu-create > .TabItem')
      .click()
      .get('.menu-create > .SidebarNav__dropDownMenu > :nth-child(2) > .SidebarNav__dropDownLink')
      .click()
  })
}
/* new account logout test */
describe('HRA address cerate page', () => {
  customAddress()
})
describe('HRA address create step01', () => {
  it('error popup test - not login', function() {
    cy.get('.info_link > .Button')
      .should('have.text','View Account Info')
      .get('.info_link > .Button')
      .click()
      .url().should('eq', `${mainURL}/access`)
  })
  login(normalPrivateKey2)
  customAddress()
  it("error popup test - login and There is not more than 101 klay", function() {
    cy.get('.info_link > .Button')
      .should('have.text','Go Back')
      .get('.info_link > .Button')
      .click()
      .url().should('eq', `${mainURL}/access/${normaladdress2}`)
  })
  /* PrivateKey change and login again */
  login(normalPrivateKey1)
  customAddress()


  it('check button', function() {
    cy.get('.InputCheck__Button')
      .should('be.disabled')
  })
  testAddress('qwert', 2)
  testAddress('q1', 3)
  testAddress('q', 4)

  it('HRA made address check', function() {
    cy.get('.InputCheck__input')
      .type(existingHRAAddress)
      .get('.InputCheck__Button')
      .click()
      .get('.Input__error')
      .should('be.visible')
      .get('.InputCheck__input')
      .clear()
  })
  it('not made HRA address check', function() {
    cy.get('.InputCheck__input')
      .type(`a${Math.ceil(Math.random()*100000000000)}`)
      .get('.InputCheck__Button')
      .click()
      .get('.Input__error')
      .should('not.be.visible')
      .get('.WalletCreationStepPlate__nextButtons > .Button')
      .should('not.be.disabled')
      .get('.WalletCreationStepPlate__nextButtons > .Button')
      .click()
  })
})

describe('HRA address create step02', () => {
  it('do not press a copy button, the popup is called', function() {
    cy.wait(4000).get('.WalletCreationStepPlate__nextButtons > .Button')
      .click()
      .get('.WalletCreationStepPlate > .createMainPopup')
      .should('be.visible')
      .get('.WalletCreationStepPlate > .createMainPopup .popup__bottom__box > .Button')
      .click()
      .get('.InputCopy__copyButton')
      .click()
      .get('.WalletCreationStepPlate__nextButtons > .Button')
      .should('not.be.disabled')
      .click()
  })
})
describe('HRA address create step03', () => {
  
  it('Download & Next Step enabled check', function() {
    cy.get('#password')
      .type('qwer1234!')
      .get('.WalletCreationStepPlate__nextButtons > .Button')
      .should('not.be.disabled')
      .get('.WalletCreationStepPlate__nextButtons > .Button')
      .click()  
  })
})
describe('HRA address create step04', () => {
  it('signed in check the button name', function() {
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