import { mainURL, normalPrivateKey3, normaladdress3, normalWalletKey1, normalWalletaddress1 } from '../../fixtures/constants'
import { login } from '../components/common'


const customAddress = () => {
  it('HRA create move', function() {
    cy.visit('/')
    .get('.menu-create > .TabItem')
    .click()
    .get('.menu-create > .SidebarNav__dropDownMenu > :nth-child(2) > .SidebarNav__dropDownLink')
    .click()
  })
}

/* wallet info 페이지 테스트 */
describe('wallet info page normal test', () => {
  it('main move', function() {
    cy.visit('/')
  })
  login(normalPrivateKey3)
  it('info click url check', function() {
    cy.visit('/')
      .get('.TabList div:nth-child(2) .TabItem')
      .click()
      .url().should('eq', `${mainURL}/access/${normaladdress3}`)
  })
  it('info page data check', function() {
    cy.get(':nth-child(1) > .InputCopy__inputWrapper > .InputCopy__input')
      .should('have.value', normaladdress3)
      .get(':nth-child(2) > .InputCopy__inputWrapper > .InputCopy__input')
      .should('have.value', normalPrivateKey3)
      .get('.scope__transaction')
      .should('have.attr', 'href').and('match', /0xa5806fdce846c6753b1a59f4906c9b717bd98676/)
      .get('.TokenItem__balanceInteger')
      .should('have.text', '1')
  })
})