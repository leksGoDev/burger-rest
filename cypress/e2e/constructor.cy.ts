const BASE_URL = 'http://localhost:3000/';
const AUTH_DATA = {
    email: 'Gan-96@yandex.ru',
    password: '123456'
};

const auth = (email: string, password: string) => {
    cy.session([email, password], () => {
        cy.visit(`${BASE_URL}login`);
        cy.get('form').should("exist");

        cy.get("form input[type=email]").as('email').should("be.enabled");
        cy.get("form input[type=password]").as('password').should("be.enabled");
        cy.get("form button[type=submit]").contains('Войти').as('submit').should("exist");

        cy.get('@email').type(email);
        cy.get('@password').type(password);

        cy.get('@submit').should("be.enabled");
        cy.get('@submit').click();

        cy.url().should('equal', BASE_URL);
    });
};

describe('Constructor works correctly', () => {
    beforeEach(() => {
        cy.intercept("post", "https://norma.nomoreparties.space/api/orders").as("orders");
    });
    it('should open and close ingredient details', () => {
        cy.visit(BASE_URL);
        cy.get('header p[class*=text_type_main-large]').should('contain', 'Соберите бургер');

        cy.get('a[href*="ingredients"]').as('ingredients')
            .children().should("have.length.greaterThan", 0);
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
        cy.get("@modal").should("not.exist");
        cy.url().should('equal', BASE_URL);
    });

    it('should drag ingredients and make order', () => {
        auth(AUTH_DATA.email, AUTH_DATA.password);
        cy.visit(BASE_URL);
        cy.get('header p[class*=text_type_main-large]').should('contain', 'Соберите бургер');

        cy.get("header p[class*=text_type_main-medium]").as("sections");
        cy.get("@sections").contains("Булки").parent().siblings()
            .find('a[href*="ingredients"]').as("buns")
            .children().should("have.length.greaterThan", 0);
        cy.get("@sections").contains("Соусы").parent().siblings()
            .find('a[href*="ingredients"]').as("sauces")
            .children().should("have.length.greaterThan", 0);
        cy.get("@sections").contains("Начинки").parent().siblings()
            .find('a[href*="ingredients"]').as("main")
            .children().should("have.length.greaterThan", 0);

        cy.get("header div[class*=constructor-element]").as("bunsDropTop").should("exist");
        cy.get("footer div[class*=constructor-element]").as("bunsDropBottom").should("exist");
        cy.get("ul[class*=burger-constructor-list]").as("ingredientsDrop").should("exist");
        cy.get("form[class*=burger-constructor]").as("form").should("exist");
        cy.get("@form").find("p[class*=text_type_digits-medium]").as("counter")
            .should("have.html", '0');
        cy.get("@form").find("button[type=submit]").as("submit").should("be.enabled");

        cy.get("@buns").first().trigger("dragstart");
        cy.get("@bunsDropTop").trigger("drop");

        cy.get("@bunsDropTop").children("span").should("have.class", "constructor-element__row");
        cy.get("@bunsDropBottom").children("span").should("have.class", "constructor-element__row");

        cy.get("@sauces").first().trigger("dragstart");
        cy.get("@ingredientsDrop").trigger("drop");
        cy.get("@main").first().trigger("dragstart");
        cy.get("@ingredientsDrop").trigger("drop");

        cy.get("@ingredientsDrop").children().should("have.length", 2);
        cy.get("@counter").should("not.have.html", '0');

        cy.get("@submit").click();
        cy.wait("@orders");

        cy.url().should("contain", "/orders/");
        cy.get("aside").should('have.css', "opacity", "0.6");
        cy.get("article[class*=modal]").as("modal");
        cy.get("@modal").should('contain', 'идентификатор заказа');
        cy.get("@modal").find("p").should('have.class', 'text text_type_digits-large');

        cy.get("@modal").children('button').as('exit');
        cy.get('@exit').should("be.enabled");
        cy.get('@exit').click();

        cy.get("aside[class*=overlay]").should("not.exist");
        cy.get("@modal").should("not.exist");
        cy.url().should('equal', BASE_URL);
    });
});