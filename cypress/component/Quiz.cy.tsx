import Quiz from '../../client/src/components/Quiz';

describe('Quiz component', () => {
  beforeEach(() => {
    cy.mount(<Quiz />);
  });

  it('renders and displays the "Start Quiz" button with correct properties', () => {
    cy.get('.btn')
      .should('exist')
      .and('be.visible')
      .and('have.text', 'Start Quiz')
      .and('have.class', 'btn-primary');
  });

  describe('Quiz state change', () => {
    it('should hide "Start Quiz" button and display quiz content on click', () => {
      cy.get('.btn').click();
      cy.get('.quiz-content').should('be.visible'); // Assuming .quiz-content is the selector for the quiz content
      cy.get('.btn').should('not.exist');
    });
  });
});
