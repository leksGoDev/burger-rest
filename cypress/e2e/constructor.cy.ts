const BASE_URL = 'http://localhost:3000/';
const AUTH_DATA = {
    email: 'Gan-96@yandex.ru',
    password: '123456'
}
const auth = (email: string, password: string) => {
    cy.session([email, password], () => {
        cy.visit(`${BASE_URL}login`);
        cy.get('form').should("exist");

        cy.get("form input[type=email]").as('email');
        cy.get("form input[type=password]").as('password');
        cy.get("form button[type=submit]").contains('Войти').as('submit');

        cy.get('@email').should("exist").and("be.enabled");
        cy.get('@password').should("exist").and("be.enabled");
        cy.get('@submit').should("exist");

        cy.get('@email').type(email);
        cy.get('@password').type(password);

        cy.get('@submit').should("be.enabled");
        cy.get('@submit').click();

        cy.url().should('equal', BASE_URL);
    });
};

describe('Constructor works correctly', () => {
    beforeEach(() => {
        cy.visit(BASE_URL);
        cy.get('header p[class*=text_type_main-large]').should('contain', 'Соберите бургер');
    });

    it('should open and close ingredient details', () => {
        cy.get('a[href*="ingredients"]').as('ingredients');
        cy.get('@ingredients').should('exist');
        cy.get('@ingredients').first().click();

        cy.url().should("contain", "/ingredients/");
        cy.get("aside").should('have.css', "opacity", "0.6");
        cy.get("article[class*=modal]").as("modal");
        cy.get("@modal").should('contain', 'Детали ингредиента');

        cy.get('@modal').find("figure").as('figure');
        cy.get("@figure").children("img").should("exist");
        cy.get("@figure").find("figcaption p[class*=text_type_main-medium]").should("exist");

        cy.get("@figure").find("figcaption article").as("info");
        cy.get('@info').contains("Калории").siblings()
            .should("have.class", "text_type_digits-default");
        cy.get('@info').contains("Белки").siblings()
            .should("have.class", "text_type_digits-default");
        cy.get('@info').contains("Жиры").siblings()
            .should("have.class", "text_type_digits-default");
        cy.get('@info').contains("Углеводы").siblings()
            .should("have.class", "text_type_digits-default");

        cy.get("@modal").children('button').as('exit');
        cy.get('@exit').should("be.enabled");
        cy.get('@exit').click();

        cy.get("aside[class*=overlay]").should("not.exist");
        cy.url().should('equal', BASE_URL);
    });

    it('should drag ingredients and make order', () => {
        auth(AUTH_DATA.email, AUTH_DATA.password);
    });
});