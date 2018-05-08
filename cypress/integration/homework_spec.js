describe('Тестирование приложения FaceGit', () => {
    it('Вход на главную страницу приложения', () => {
        cy.visit('http://localhost:3000/');
    });

    describe('Вход в систему:', () => {
        describe('Страница Login', () => {
            beforeEach(() => {
                cy.visit('http://localhost:3000/login');
            });

            it('Инпут для ввода токена', () => {
                cy.get('.app__input');
            });

            it('Ввод токена и вход в систему', () => {
                //cy.get('.app__input').type('2441efb226ad11df33780d5f2ebaeed916c06245').type('{enter}');
            });
        });

        describe('Страница пользователя', () => {
            describe('Вёрстка', () => {
                //it('Аватар пользователя', () => {
                //    cy.get('.app-user__photo img');
                //});
                //
                //it('Логин пользователя', () => {
                //    cy.get('h3.app-user__login');
                //});
                //
                //it('Фолловеры пользователя', () => {
                //    cy.get('p.app-user__text.app-user__followers');
                //});
                //
                //it('Количество репозиториев пользователя', () => {
                //    cy.get('p.app-user__text').contains('Public repositories:');
                //});
            });

            describe('Компоненты', () => {
                //it('Компонент Followers', () => {
                //    cy.get('.app__followers');
                //});
                //
                //describe('Компонент Follower', () => {
                //    it('Логин фоловера', () => {
                //        cy.get('.app__follower-login');
                //    });
                //
                //    it('Аватар фоловера', () => {
                //        cy.get('.app__follower-image img');
                //    });
                //});

                describe('Переход на страницу фолловера', () => {
                    it('Клик по ссылке', () => {
                        //cy.get('.app__follower-login').first().click();
                        //cy.visit('http://localhost:3000/user/mvk85');
                    });
                });
            });
        });
    });
});