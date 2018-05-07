describe('Тестирование приложения FaceGit', () => {
    it('Вход на главную страницу приложения', () => {
        cy.visit('http://localhost:3000/');
    });

    it('Инпут для ввода токена', () => {
        cy.visit('http://localhost:3000/login');
        cy.get('.app__input');
    });

    it('Нажатие Enter для ввода токена', () => {
        cy.visit('http://localhost:3000/login');
        cy.get('.app__input').keypress('enter');
    });
});