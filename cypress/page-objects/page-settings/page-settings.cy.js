/// <reference types="cypress" />

class SettingsPage {

  elements = {
    sectElApp: 'app',
    ttlElApp: 'title',
    cboxElLangSel: 'select-language',
    btnElThm: 'btn-theme',
    attrElDtThem: "data-theme"
  }

  languages = {
    english: 'en',
    persian: 'fa',
  }

  themes = {
    light: 'light',
    dark: 'dark',
  }

  visit(appUrl = '/index.html') {
    return cy.visit(appUrl)
  }

  visitWithCleanLocalStorage(appUrl = '/index.html') {
    return cy.visit(appUrl, {
      onBeforeLoad(win) {
        win.localStorage.clear()
      }
    })
  }

  verifyApplicationIsDisplayed() {
    cy.getByTestId(this.elements.sectElApp).should('be.visible')
    cy.getByTestId(this.elements.ttlElApp).should('be.visible')
  }

  normalizeLanguage(langVal) {
    const normdLang = String(langVal).trim().toLowerCase()
    const langMp = {
      en: 'en',
      english: 'en',
      fa: 'fa',
      persian: 'fa',
    }
    const langValNormd = langMp[normdLang]
    if (!langValNormd) {
      throw new Error(
        `Unsupported language: "${langVal}". ` +
        'Use "en", "fa", "English", or "Persian".'
      )
    }
    return langValNormd
  }

  setLanguage(trgtLang) {
    const langVal = this.normalizeLanguage(trgtLang)
    return cy
      .getByTestId(this.elements.cboxElLangSel)
      .should('be.visible')
      .then(($langSel) => {
        const currLang = $langSel.val()
    
        if (currLang !== langVal) {
          return cy.wrap($langSel).select(langVal)
        }
        return undefined
      }).then(() => {
        this.verifyLanguage(langVal)
      })
  }

  verifyLanguage(expdLang) {
    const langVal = this.normalizeLanguage(expdLang)
    const expdDir =
      langVal === this.languages.persian
        ? 'rtl'
        : 'ltr'
    cy.getByTestId(this.elements.cboxElLangSel).should('be.visible').and('have.value', langVal)
    return cy.get('html').should('have.attr', 'lang', langVal).and('have.attr', 'dir', expdDir)
  }

  verifyEnglishLanguageIsApplied() {
    return this.verifyLanguage(this.languages.english)
  }

  verifyPersianLanguageIsApplied() {
    return this.verifyLanguage(this.languages.persian)
  }

  normalizeTheme(themVal) {
    const normdThem = String(themVal).trim().toLowerCase()
    const sprtdThem = [this.themes.light, this.themes.dark]
    if (!sprtdThem.includes(normdThem)) {
      throw new Error(
        `Unsupported theme: "${themVal}". ` +
        'Use "light" or "dark".'
      )
    }
    return normdThem
  }

  setTheme(trgtThem) {
    const themVal =this.normalizeTheme(trgtThem)
    return cy.get('html').then(($html) => {
        const currentTheme = $html.attr(this.elements.attrElDtThem)
        if (currentTheme !== themVal) {
          return cy.getByTestId(this.elements.btnElThm).should('be.visible')
            .and('not.be.disabled').click()
        }
        return undefined
    }).then(() => {
      this.verifyTheme(themVal)
    })
  }

  verifyTheme(expdThem) {
    const themVal = this.normalizeTheme(expdThem)
    cy.getByTestId(this.elements.btnElThm).should('be.visible').and('not.be.disabled')
    return cy.get('html').should('have.attr', this.elements.attrElDtThem, themVal)
  }

  verifyLightThemeIsApplied() {
    return this.verifyTheme(this.themes.light)
  }

  verifyDarkThemeIsApplied() {
    return this.verifyTheme(this.themes.dark)
  }

  verifyDefaultSettings() {
    this.verifyEnglishLanguageIsApplied()
    this.verifyLightThemeIsApplied()
  }
}
export default SettingsPage