import { mainURL, testPrivateKey, testAddress, newWallet, newHRAWallet, existingHRAAddress } from '../../fixtures/constants'
import { login, logout } from '../components/common'
let newObj= newWallet
let newHRAObj= newHRAWallet
let newHRAAddress = `a${Math.ceil(Math.random()*100000000000)}`
describe('common test', () => {
  it('HRA create 진입', function() {
    cy.visit('/')
  })
  login(testPrivateKey)
})

describe('new wallet', () => {
  it('new wallet visit', function() {
    cy.get('.menu-create > .TabItem')
      .click()
    
  })
  /* new wallet made and send */
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
  /* new wallet made and send */
  //login(value)
  it('time wait', function() {
    cy.get('#input-privatekey')
      .type(newObj.privateKey)
      .get('.AccessReminder__checkbox')
      .click()
      .get('.AccessByPrivatekey > .Button')
      .click()
  })

  it('address get', function() {   
    cy.get(':nth-child(1) > .InputCopy__inputWrapper > .InputCopy__input').should((val)=>{
      newObj.address = val.val()
    })
  })
})

describe('send klay test', () => {
  /* new wallet made and send */
  login(testPrivateKey)
  it('Send KLAY & Token menu click', function() {
    cy.get(':nth-child(3) > .TabItem')
      .click()
  })
  it('test of input value send', function() {
    cy.get('#input-to')
      .type(newObj.address)
      .blur() 
      .get('#input-value')
      .type(1)
      .get('.TransferForm__valueInput > .Input__error')
      .should('be.visible')
      .get('.Inner__Box > .Button')
      .click()
  })
  it('test of total step view', function() {
    cy.get('.From')
      .should('have.text', testAddress)
      .get('.To')
      .should('have.text', newObj.address)
      .get('.Amount')
      .should('have.text', '1')
      .get('.TransferTotalItem__noButton')
      .click()
      .get('.Inner__Box > .Button')
      .click()
      .get('.TransferTotalItem__yesButton')
      .click()
      .get('.TransferComplete__button.Button--gray')
      .click()
  })
  if(window.sessionStorage.getItem('was')){
    logout()
  }
  it('login and klay value check', () => {
    cy.get(':nth-child(2) > .TabItem')
      .click()
      .get('.AccessReminder__checkbox')
      .click()
      .get('#input-privatekey')
      .type(newObj.privateKey)
      .get('.AccessByPrivatekey > .Button')
      .click()
      .get('.TokenItem__balanceInteger')
      .should('have.text', '1')
  })
})

/* HRA address create and send  */
describe('HRA address create', () => {
  login(testPrivateKey)
  
  it('HRA address create', function() {
    cy.visit('/')
      .get('.menu-create > .TabItem')
      .click()
      .get('.menu-create > .SidebarNav__dropDownMenu > :nth-child(2) > .SidebarNav__dropDownLink')
      .click()
      .get('.InputCheck__input')
      .type(existingHRAAddress)
      .get('.InputCheck__Button')
      .click()
      .get('.Input__error')
      .should('be.visible')
      .get('.InputCheck__input')
      .clear()
  })
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
      .type(newHRAAddress)
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
    cy.get('.textarea__Copy').should((val)=>{
      newHRAObj.privateKey = val.val()
    })
  })
  it('time wait', function() {   
    cy.wait(2000)
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
describe('HRA address send klay', () => {
  login(testPrivateKey)
  it('Send KLAY & Token menu click', function() {
    cy.get(':nth-child(3) > .TabItem')
      .click()
  })
  it('test of input value send', function() {
    cy.get('#input-to')
      .type(`${newHRAAddress}.klaytn`)
      .blur() 
      .get('#input-value')
      .type(1)
      .get('.TransferForm__valueInput > .Input__error')
      .should('be.visible')
      .get('.Inner__Box > .Button')
      .click()
  })
  it('test of total step view', function() {
    cy.get('.From')
      .should('have.text', testAddress)
      .get('.To')
      .should('have.text', `${newHRAAddress}.klaytn`)
      .get('.Amount')
      .should('have.text', '1')
      .get('.TransferTotalItem__noButton')
      .click()
      .get('.Inner__Box > .Button')
      .click()
      .get('.TransferTotalItem__yesButton')
      .click()
      .get('.TransferComplete__button.Button--gray')
      .click()
  })
  if(window.sessionStorage.getItem('was')){
    logout()
  }
  it('login and klay value check', () => {
    cy.get(':nth-child(2) > .TabItem')
      .click()
      .get('.AccessReminder__checkbox')
      .click()
      .get('#input-privatekey')
      .type(newHRAObj.privateKey)
      .get('.AccessByPrivatekey > .Button')
      .click()
      .get('.TokenItem__balanceInteger')
      .should('have.text', '1')
  })
})
