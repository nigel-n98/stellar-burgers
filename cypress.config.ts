import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
        baseUrl: 'http://localhost:4000',
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
    env: {
      BURGER_API_URL: 'https://norma.nomoreparties.space/api'
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
