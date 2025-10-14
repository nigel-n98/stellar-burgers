// describe('Сборка бургера и создание заказа', () => {
//   beforeEach(() => {
//     cy.intercept('GET', '**/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
//     cy.visit('/');
//     cy.wait('@getIngredients');
//   });

//   it('загружает ингредиенты и отображает категории', () => {
//     cy.contains('Булки').should('exist');
//     cy.contains('Соусы').should('exist');
//     cy.contains('Начинки').should('exist');
//   });

//   it('открывает и закрывает модальное окно ингредиента', () => {
//     cy.contains('Булка N-200i').click();
//     cy.contains(/пищевая ценность/i).should('exist');
//     cy.get('button[aria-label="Закрыть"]').click();
//     cy.contains(/пищевая ценность/i).should('not.exist');
//   });

//   it('можно добавить ингредиенты в конструктор', () => {
//     cy.contains('Булка N-200i').click();
//     cy.get('body').type('{esc}');
//     cy.contains('Мясо бессмертных моллюсков Protostomia').click();
//     cy.get('body').type('{esc}');
//     cy.contains('Оформить заказ').should('exist');
//   });

//   it('оформление заказа при авторизации', () => {
//     cy.intercept('GET', '**/auth/user', {
//       statusCode: 200,
//       body: {
//         success: true,
//         user: { email: 'test@example.com', name: 'Test User' }
//       }
//     }).as('getUser');

//     cy.intercept('POST', '**/orders', {
//       statusCode: 200,
//       body: {
//         success: true,
//         order: { number: 9999 }
//       }
//     }).as('postOrder');

//     cy.window().then((win) => {
//       win.localStorage.setItem('accessToken', 'Bearer mock-token');
//     });

//     cy.contains('Булка N-200i').click();
//     cy.get('body').type('{esc}');
//     cy.contains('Мясо бессмертных моллюсков Protostomia').click();
//     cy.get('body').type('{esc}');

//     cy.contains('Оформить заказ').click();

//     cy.wait('@postOrder');
//     cy.contains(/детали заказа/i).should('exist');
//     cy.contains('9999').should('exist');

//     cy.get('button').contains('×').click();
//     cy.contains('9999').should('not.exist');
//   });
// });

describe('Сборка бургера и создание заказа', () => {
  beforeEach(() => {
    // Загружаем фикстуру ингредиентов
    cy.intercept('GET', '**/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
    cy.visit('/');
    cy.wait('@getIngredients');
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
    // Мокаем авторизацию
    cy.intercept('GET', '**/auth/user', {
      statusCode: 200,
      body: {
        success: true,
        user: { email: 'test@example.com', name: 'Test User' }
      }
    }).as('getUser');

    // Мокаем заказ
    cy.intercept('POST', '**/orders', {
      statusCode: 200,
      body: {
        success: true,
        order: { number: 9999 }
      }
    }).as('postOrder');

    // Устанавливаем cookie токены
    cy.setCookie('accessToken', 'Bearer mock-token');
    cy.setCookie('refreshToken', 'mock-refresh-token');

    // Добавляем булку и начинку в конструктор
    cy.contains('Булка N-200i').click();
    cy.get('body').type('{esc}');
    cy.contains('Мясо бессмертных моллюсков Protostomia').click();
    cy.get('body').type('{esc}');

    // Убедимся, что кнопка активна
    cy.contains('Оформить заказ').should('not.be.disabled');

    // Нажимаем кнопку
    cy.contains('Оформить заказ').click();

    // Ждем POST-запрос
    cy.wait('@postOrder');

    // Проверяем модальное окно с номером заказа
    cy.contains(/детали заказа/i).should('exist');
    cy.contains('9999').should('exist');

    // Закрываем модальное окно
    cy.get('button').contains('×').click();
    cy.contains('9999').should('not.exist');
  });
});
