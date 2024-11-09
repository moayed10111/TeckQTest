// Custom command to start the quiz


/// <reference types="cypress" />



declare namespace Cypress {

    interface Chainable<Subject = any> {
  
      startQuiz(): Chainable<Subject>;
  
      selectRandomAnswer(): Chainable<Subject>;
  
      completeQuizWithRandomAnswers(numQuestions: number): Chainable<Subject>;
  
    }
  
  }
  
describe('Quiz User Interaction', () => {
    beforeEach(() => {
      cy.visit('http://127.0.0.1:3001/');
      cy.log('App loaded');
    });
  
    it('Loads Quiz Page Not Started', () => {
      cy.get('.p-4.text-center').should('exist');
      cy.get('button').should('exist').and('have.text', 'Start Quiz');
    });
  
    it('Starts Quiz and Displays First Question', () => {
      cy.startQuiz();
      cy.log('First question loaded');
    });
  
    it('Selects Random Answers and Proceeds to Quiz Completion', () => {
      cy.startQuiz();
      cy.completeQuizWithRandomAnswers(10); // Adjust 10 based on the total number of questions in your quiz
      cy.get('h2').contains('Quiz Completed');
    });

    it('Restarts the Quiz', () => {
        cy.startQuiz();
        cy.completeQuizWithRandomAnswers(10); // Adjust 10 based on the total number of questions in your quiz
        cy.get('h2').contains('Quiz Completed');
        cy.log('Quiz completed');
        
        // Log the DOM structure to check for the restart button
        cy.get('body').then(($body) => {
            cy.log($body.html());
        });

        cy.log('Restart quiz command executed');
        cy.get('button').should('have.text', 'Take New Quiz');
    });
   
  });
  
  // Custom command to start the quiz
  Cypress.Commands.add('startQuiz', () => {
    cy.get('button').contains('Start Quiz').click();
    cy.get('h2').should('be.visible'); // Ensures question header is visible
  });
  
  // Custom command to select a random answer
  Cypress.Commands.add('selectRandomAnswer', () => {
    cy.get('button', { timeout: 10000 }) // Adjust timeout as needed
      .should('have.length.greaterThan', 0) // Ensures buttons are available
      .then(($buttons) => {
        const randomIndex = Math.floor(Math.random() * $buttons.length);
        cy.wrap($buttons[randomIndex]).click();
      });
  });
  
  // Custom command to complete the quiz by selecting random answers for a given number of questions
  Cypress.Commands.add('completeQuizWithRandomAnswers', (numQuestions) => {
    for (let i = 0; i < numQuestions; i++) {
      cy.selectRandomAnswer();
    }
  });
  
  // Custom command to restart the quiz
  Cypress.Commands.add('restartQuiz', () => {
    cy.get('button.Take New Quiz', { timeout: 10000 })
      .should('be.visible')
      .then(($button) => {
        cy.log('Restart button found and visible');
        cy.wrap($button).click();
      });
    cy.get('button', { timeout: 10000 }).should('have.text', 'Take New Quiz');
});
 