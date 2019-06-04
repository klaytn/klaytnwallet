import { mainURL, normalPrivateKey1 } from '../../fixtures/constants'
import { login } from '../components/common'


describe('main page', () => {
  it('wallet move of main page', function() {
    cy.visit('/')    
  })
  /* main page button click test */ 
  it('main page Create Account button click', () => {
    cy.get('.create')
    .click()
    .url().should('eq', `${mainURL}/create`)
    .visit('/')    
  })
  it('main page View Account Info button click', () => {
    cy.get('.info')
    .click()
    .url().should('eq', `${mainURL}/access`)
    .visit('/')    
  })
  it('main page Send KLAY & Tokens button click', () => {
    cy.get('.send')
    .click()
    .url().should('eq', `${mainURL}/access?next=transfer`)
    .visit('/')
  })

  /* 메인 스캠 주의 팝업 테스트 */
  it('Fraud Alert popup test', () => {
    cy.get('.klay__alertPopup__button')
    .click()
    .get('.klay__alertPopup')
    .should('have.class', 'open')
    .get('.languageChange__button_list > :nth-child(2)')
    .click()
    .should('have.class', 'on')
    .get('.languageChange__button_list > :nth-child(1)')
    .click()
    .should('have.class', 'on')
    .get('.close__button')
    .click()
    .get('.klay__alertPopup')
    .should('not.class', 'open')
  })
})
