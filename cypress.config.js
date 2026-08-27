const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://127.0.0.1:3000',
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: 'cypress/support/e2e.js',

    setupNodeEvents(on, config) {
      return config
    }
  },

  viewportWidth: 1280,
  viewportHeight: 800,
  defaultCommandTimeout: 5000,

  retries: {
    runMode: 1,
    openMode: 0,
  },

  screenshotOnRunFailure: true,
  video: true,
})