describe('Modal Application Tests', () => {
  beforeEach(() => {
    cy.visit('https://x-modal-ashen-nu.vercel.app/');
  });

  it('Opens the modal', () => {
    cy.get('button').contains('Open Form').click();
    cy.get('.modal').should('be.visible');
  });

  it('Validates email input field', () => {
    cy.get('button').contains('Open Form').click();
    cy.get('#email').type('invalidemail');
    cy.get('.modal-content .submit-button').click(); // Ensure you're clicking the submit button inside the modal
    cy.on('window:alert', (text) => {
      expect(text).to.contains('Invalid email');
    });
  });

  it('Validates phone number input field', () => {
    cy.get('button').contains('Open Form').click();
    cy.get('#email').type('test@example.com');
    cy.get('#phone').type('12345');
    cy.get('.modal-content .submit-button').click();
    cy.on('window:alert', (text) => {
      expect(text).to.contains('Invalid phone number');
    });
  });

  it('Validates date of birth input field', () => {
    cy.get('button').contains('Open Form').click();
    cy.get('#email').type('test@example.com');
    cy.get('#phone').type('1234567890');
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 1);
    const futureDateString = futureDate.toISOString().split('T')[0];
    cy.get('#dob').type(futureDateString);
    cy.get('.modal-content .submit-button').click();
    cy.on('window:alert', (text) => {
      expect(text).to.contains('Invalid date of birth');
    });
  });

  it('Submits the form with valid data', () => {
    cy.get('button').contains('Open Form').click();
    cy.get('#username').type('testuser');
    cy.get('#email').type('test@example.com');
    cy.get('#phone').type('1234567890');
    cy.get('#dob').type('2000-01-01');
    cy.get('form').submit();
  });

  it('Closes the modal when clicking outside', () => {
    cy.get('button').contains('Open Form').click();
    cy.get('#root').click('topLeft');
    cy.wait(2000);
    cy.get('.modal').should('not.exist');
  });
});