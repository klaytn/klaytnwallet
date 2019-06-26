import { mainURL, normalPrivateKey1, normaladdress1 } from '../../fixtures/constants'
import { login, logout } from './common'

describe('common menu test', () => {
   /* create */ 
  it('common-1 nav hover activate button', function() {
    cy.visit('/')
      .get('.menu-create > .TabItem')
      .trigger('mouseover')
      .should('have.class', 'TabItem--active')
      .click()
      .url().should('eq', `${mainURL}/create`)
  })
  it('common-2 nav click move create page', function() {
    cy.get('.menu-create > .TabItem')
      .click()
      .url().should('eq', `${mainURL}/create`)
  })
  it('common-3 create page activate menu', function() {
    cy.get('.menu-create > .TabItem')
      .should('have.class', 'TabItem--active')
  })
  it('common-6 create page activate menu check', function() {
    cy.get('.menu-create > .SidebarNav__dropDownMenu > :nth-child(1) > .SidebarNav__dropDownLink')
      .should('have.class', 'SidebarNav__dropDownLink--active')
  })
  it('common-7 HRA create click url change check', function() {
    cy.get('.menu-create > .SidebarNav__dropDownMenu > :nth-child(2) > .SidebarNav__dropDownLink')
      .click()
      .url().should('eq', `${mainURL}/create2`)
  })
  it('common-10 create click url change check', function() {
    cy.get('.menu-create > .SidebarNav__dropDownMenu > :nth-child(1) > .SidebarNav__dropDownLink')
      .click()
      .url().should('eq', `${mainURL}/create`)
  })

  /* info, Send KLAY & Tokens, Faucet need login */
  login(normalPrivateKey1)
    /* info */ 
  it('common-13 info hover activate button', function() {
    cy.get('.TabList div:nth-child(2) .TabItem')
      .trigger('mouseover')
      .should('have.class', 'TabItem--active')
  })
  it('common-14 info click url change check', function() {
    cy.get('.TabList div:nth-child(2) .TabItem')
      .click()
      .url().should('eq', `${mainURL}/access/${normaladdress1}`)
  })
  it('common-15 info page activate menu check', function() {
    cy.get('.TabList div:nth-child(2) .TabItem')
      .should('have.class', 'TabItem--active')
  })

    /* Send KLAY & Tokens */ 
  it('common-16 Send KLAY & Tokens hover activate button', function() {
    cy.get('.TabList div:nth-child(3) .TabItem')
      .trigger('mouseover')
      .should('have.class', 'TabItem--active')
  })
  it('common-17 Send KLAY & Tokens url change check', function() {
    cy.get('.TabList div:nth-child(3) .TabItem')
      .click()
      .url().should('eq', `${mainURL}/transfer`)
  })
  it('common-18 Send KLAY & Tokens page activate menu check', function() {
    cy.get('.TabList div:nth-child(3) .TabItem')
      .should('have.class', 'TabItem--active')
  })

    /* Faucet */ 
  it('common-19 KLAY Faucet hover activate button', function() {
    cy.get('.TabList div:nth-child(4) .TabItem')
      .trigger('mouseover')
      .should('have.class', 'TabItem--active')
  })
  it('common-20 KLAY Faucet url change check', function() {
    cy.get('.TabList div:nth-child(4) .TabItem')
      .click()
      .url().should('eq', `${mainURL}/faucet`)
  })
  it('common-21 KLAY Faucet page activate menu check', function() {
    cy.get('.TabList div:nth-child(4) .TabItem')
      .should('have.class', 'TabItem--active')
  })
})
