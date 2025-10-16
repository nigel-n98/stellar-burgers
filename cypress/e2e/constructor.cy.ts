describe('Сборка бургера и создание заказа', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');

    cy.intercept('GET', '**/auth/user', {
      statusCode: 200,
      body: {
        success: true,
        user: { email: 'test@example.com', name: 'Test User' }
      }
    }).as('getUser');

    cy.intercept('POST', '**/orders', {
      statusCode: 200,
      body: {
        success: true,
        order: { number: 9999 }
      }
    }).as('postOrder');

    cy.setCookie('accessToken', 'Bearer mock-token');
    cy.setCookie('refreshToken', 'mock-refresh-token');

    cy.window().then((win) => {
      win.localStorage.setItem('refreshToken', 'mock-refresh-token');
    });

    cy.visit('/');
    cy.wait('@getIngredients');
    cy.wait('@getUser');
  });

  afterEach(() => {
    cy.clearCookie('accessToken');
    cy.clearCookie('refreshToken');

    cy.window().then((win) => {
      win.localStorage.removeItem('refreshToken');
      win.localStorage.removeItem('accessToken');
    });
  });

it('загружает ингредиенты и отображает категории', () => {
  cy.get('[data-testid="burger-ingredients-section"]').within(() => {
    cy.get('[data-testid="ingredients-category-булки"]').should('exist');
    cy.get('[data-testid="ingredients-category-начинки"]').should('exist');
    cy.get('[data-testid="ingredients-category-соусы"]').should('exist');
  });
});

it('открывает и закрывает модальное окно ингредиента', () => {
  cy.get('[data-testid="burger-ingredients-section"]').contains('Булка N-200i').click();

  cy.get('[data-testid="modal"]').within(() => {
    cy.get('[data-testid="ingredient-details"]').within(() => {
      cy.get('[data-testid="ingredient-name"]').should('contain.text', 'Булка N-200i');
      cy.get('[data-testid="ingredient-calories"]').should('have.text', '420');
      cy.get('[data-testid="ingredient-proteins"]').should('have.text', '80');
      cy.get('[data-testid="ingredient-fat"]').should('have.text', '24');
      cy.get('[data-testid="ingredient-carbohydrates"]').should('have.text', '53');
    });
  });

  cy.get('[data-testid="modal-close"]').click();

  cy.get('[data-testid="modal"]').should('not.exist');
});

it('можно добавить ингредиенты в конструктор', () => {
  cy.get('[data-testid="burger-ingredients-section"]')
    .contains('Булка N-200i')
    .parent()
    .contains('Добавить')
    .click();
  cy.get('[data-testid="burger-ingredients-section"]')
    .contains('Мясо бессмертных моллюсков Protostomia')
    .parent()
    .contains('Добавить')
    .click();
  cy.get('[data-testid="burger-constructor-section"]').within(() => {
    cy.contains('Булка N-200i').should('exist');
    cy.contains('Мясо бессмертных моллюсков Protostomia').should('exist');
  });
});


it('оформление заказа при авторизации', () => {
  cy.get('[data-testid="burger-ingredients-section"]')
    .contains('Булка N-200i')
    .parent()
    .contains('Добавить')
    .click();

  cy.get('[data-testid="burger-ingredients-section"]')
    .contains('Мясо бессмертных моллюсков Protostomia')
    .parent()
    .contains('Добавить')
    .click();

  cy.get('[data-testid="burger-constructor-section"]')
    .find('[data-testid="order-button"]')
    .should('not.be.disabled')
    .click();

  cy.wait('@postOrder');

  cy.get('[data-testid="modal-content"]', { timeout: 10000 })
    .find('[data-testid="order-identifier-text"]')
    .should('contain.text', 'идентификатор заказа');

  cy.get('[data-testid="modal-content"]')
    .find('[data-testid="order-number"]')
    .should('contain.text', '9999');

  cy.get('body').type('{esc}');
  cy.get('[data-testid="modal"]').should('not.exist');
});
});
