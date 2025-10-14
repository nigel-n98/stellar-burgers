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

  it('загружает ингредиенты и отображает категории', () => {
    cy.contains('Булки').should('exist');
    cy.contains('Соусы').should('exist');
    cy.contains('Начинки').should('exist');
  });

  it('открывает и закрывает модальное окно ингредиента', () => {
    cy.contains('Булка N-200i').click();
    cy.contains(/пищевая ценность/i).should('exist');
    cy.get('button[aria-label="Закрыть"]').click();
    cy.contains(/пищевая ценность/i).should('not.exist');
  });

  it('можно добавить ингредиенты в конструктор', () => {
    cy.contains('Булка N-200i').click();
    cy.get('body').type('{esc}');
    cy.contains('Мясо бессмертных моллюсков Protostomia').click();
    cy.get('body').type('{esc}');
    cy.contains('Оформить заказ').should('exist');
  });

  it('оформление заказа при авторизации', () => {
    cy.contains('Булка N-200i')
      .parent()
      .contains('Добавить')
      .click();

    cy.contains('Мясо бессмертных моллюсков Protostomia')
      .parent()
      .contains('Добавить')
      .click();

    cy.contains('Оформить заказ').should('not.be.disabled');

    cy.contains('Оформить заказ').click();

    cy.wait('@postOrder');

    cy.contains(/идентификатор заказа/i).should('exist');
    cy.contains('9999').should('exist');

    cy.get('body').type('{esc}');
    
    cy.contains('9999').should('not.exist');
  });
});
