import { 
  mainURL,
  errorPrivateKey1,
  errorPrivateKey2,
  errorPrivateKey3,
  errorPrivateKey4,
  errorPrivateKey5,
  errorPrivateKey6,
  errorPrivateKey7,
  errorWalletKey1,
  errorWalletKey2,
  errorWalletKey3,
  errorWalletKey4,
  errorWalletKey5,
  errorWalletKey6,
  errorWalletKey7,

} from '../../fixtures/constants'

const inputValidation = (key,bool) => {
  it('Private Key or HRA Private Key input 확인', function() {
    cy.get('#input-privatekey')
      .type(key)
  })
  if(bool){
    it('Private Key input after check button true', function() {
      cy.get('.AccessByPrivatekey__button')
        .should('not.be.disabled')
    })
  }else{
    it('Private Key input after check button false', function() {
      cy.get('.AccessByPrivatekey__button')
        .should('be.disabled')
    })
  }
  it('clear', function() {
    cy.get('#input-privatekey')
      .clear()
  })
}

export const logout = () => {
  if(!window.sessionStorage.getItem('was')){
    return
  }
  it('logout', () => {
    cy.get('.remove__sessionStorage')
      .click()
      .get('.createMainPopup')
      .should('be.visible')
      .get('.createMainPopup .Button--gray')
      .click()
      .get('.createMainPopup')
      .should('be.hidden')
      .get('.remove__sessionStorage')
      .click() 
      .get('.popup__bottom__box > :nth-child(2)')
      .click()
      .url()
      .should('eq', `${mainURL}/`)
      .clearLocalStorage().then((ls) => {
        expect(ls.getItem('was')).to.be.null
        expect(ls.getItem('address')).to.be.null
      })
      cy.wait(1000)  
  })
}

export const login = (key) => {
  it('login wait', () => {
    cy.wait(1000)
  })
  if(window.sessionStorage.getItem('was')){
    logout()
  }
  it('login', () => {
    cy.get(':nth-child(2) > .TabItem')
      .click()
      .get('.AccessReminder__checkbox')
      .click()
      .get('#input-privatekey')
      .type(key)
      .get('.AccessByPrivatekey > .Button')
      .click()
      .visit('/')
  })
}
export const loginTest = (key) => {
  it('login page check', () => {
    cy.get(':nth-child(2) > .TabItem')
      .click()
  })
  it('input data check', () => {
    cy.get('.AccessReminder__checkbox')
      .click()
  })
  inputValidation(errorPrivateKey1, false)//
  inputValidation(errorPrivateKey2, false)//
  inputValidation(errorPrivateKey3, false)//
  inputValidation(errorPrivateKey4, false)//
  inputValidation(errorPrivateKey5, false)//
  inputValidation(errorPrivateKey6, false)//
  inputValidation(errorPrivateKey7, false)//

  inputValidation(errorWalletKey1, false)//
  inputValidation(errorWalletKey2, false)//
  inputValidation(errorWalletKey3, false)//
  inputValidation(errorWalletKey4, false)//
  inputValidation(errorWalletKey5, false)//
  inputValidation(errorWalletKey6, false)//
  inputValidation(errorWalletKey7, false)//
  login(key)
}


export const testPassword = (password, num) => {
  it(`password test [ ${password} ] value check ( Normal operation )`, function() {
    cy.visit('/')
      .get('.create').click()
      .get('#password')
      .type(password)
      .get(`.PasswordTooltip .PasswordTooltip__item:nth-child(${num})`)
      .should('have.class', 'PasswordTooltip__item--active')
      .get('#password')
      .clear()
  })
}
export const testAddress = (address, num) => {
  it(`address test [ ${address} ] value check ( Normal operation )`, function() {
    cy.get('.InputCheck__input')
      .type(address)
      .get(`.PasswordTooltip .PasswordTooltip__item:nth-child(${num})`)
      .should('have.class', 'PasswordTooltip__item--active')
      .get('.InputCheck__input')
      .clear()
  })
}


