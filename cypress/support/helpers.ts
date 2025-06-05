export function startGame() {
  cy.visit('/');
  cy.get('.startBtn').click();
}

export function getConsigneColor(): Cypress.Chainable<string> {
  return cy.get('[data-testid="instruction"] strong')
    .invoke('attr', 'data-testid')
    .then((color) => {
      if (!color) throw new Error('Couleur de la consigne introuvable');
      return color;
    });
}

export function clickCircle(color: string) {
  cy.get(`[data-testid="circle-${color}"]`, { timeout: 10000 }).click();
}

export function getScore(): Cypress.Chainable<number> {
  return cy.get('[data-testid="score"]')
    .invoke('text')
    .then((text) => parseInt(text.replace(/\D/g, ''), 10));
}

/**
 * Simule la fin d'une partie après 60 secondes
 */
export function simulateEndGame() {
  cy.clock(); // Fige le temps
  cy.visit('/');
  cy.get('button.startBtn').click();
  cy.tick(61000); // Avance de 61 secondes
}

/**
 * Vérifie que l'écran de jeu s'affiche
 */
export function assertGameStarted() {
  cy.get('.game-container').should('be.visible');
  cy.get('.timer').should('be.visible');
  cy.get('.circle').should('exist');
}

/**
 * Vérifie que la fin de partie est bien affichée
 */
export function assertGameEnded() {
  cy.get('.gameOver').should('be.visible');
  cy.get('.score').should('be.visible');
  cy.get('button.startBtn').should('be.visible');
  cy.get('.game-container').should('not.exist');
}

