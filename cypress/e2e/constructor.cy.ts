describe('Constructor works correctly', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000');
        cy.get('header p').should('contain', 'Соберите бургер');
    });

    it('should open and close ingredient details', () => {
        cy.get('a[href*="ingredients"]').first().click();
        cy.get('button[class^=modal_button__]').first().click();
    });

    it('should log in', () => {
        cy.contains('Личный кабинет').as('profile');
        cy.get('@profile').click();

        cy.get('form').as('form');
        cy.get('@form').contains('E-mail').as('email');
        cy.get('@form').contains('Пароль').as('password');
        cy.get('@form').contains('Войти').as('submit');

        cy.get('@email').type('Gan-96@yandex.ru');
        cy.get('@password').type('123456');
        cy.get('@submit').click();
        cy.url().should('contain', '/profile')
    });

    it('should drag ingredients, login and make order', () => {

    });
});