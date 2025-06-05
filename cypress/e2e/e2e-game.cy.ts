
describe('Parcours utilisateur - Jeu de réflexes et de rapiditié', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('.startBtn').click();
  });

  it('Démarre le jeu après avoir cliqué sur "Start"', () => {
    cy.get('.timer').should('contain', '60');
    cy.get('.score').should('contain', '0');
    cy.get('.consigne').should('exist');
    cy.get('[data-testid="instruction"]').then(($consigne) => {
      const text = $consigne.text();
      cy.log('Consigne affichée:', text);
    });
  });

  it("Augmente le score si on clique sur le bon cercle (couleur correcte)", () => {
    cy.get('[data-testid="instruction"] strong')
      .invoke('attr', 'data-testid')
      .then((color) => {
        if (!color) throw new Error('La couleur de la consigne est introuvable');
        const escapedColor = color.replace('#', '\\#');
        // On attend qu'un cercle soit de la bonne couleur apparaisse
        cy.get(`[data-testid="circle-${color}"]`, { timeout: 5000 }).should('exist').first().click();
        cy.get('[data-testid="score"]').invoke('text').then((text) => {
          const score = parseInt(text.replace(/\D/g, ''));
          expect(score).to.be.greaterThan(0);
        });
      });
  });

  it("Réduit le score si on clique sur un cercle de mauvaise couleur", () => {
    cy.get('[data-testid="instruction"] strong')
      .invoke('attr', 'data-testid')
      .then((correctColor) => {
        const allColors = ["#5DE3F5", "#406DF5", "#3FA7F4", "#9DF5E2", "#A39DF5", "#BCDCF5"];
        const wrongColor = allColors.find(c => c !== correctColor)!;

        // Clique d'abord sur un bon cercle pour augmenter le score
        cy.get(`[data-testid="circle-${correctColor}"]`, { timeout: 10000 }).should('exist').first().click();

        // Puis clique sur un mauvais cercle pour le réduire
        cy.get('[data-testid="score"]').invoke('text').then((beforeText) => {
          const before = parseInt(beforeText.replace(/\D/g, ''));
          cy.get(`[data-testid="circle-${wrongColor}"]`, { timeout: 10000 }).should('exist').first().click();
          cy.get('[data-testid="score"]').invoke('text').then((afterText) => {
            const after = parseInt(afterText.replace(/\D/g, ''));
            expect(after).to.be.lessThan(before);
          });
        });
      });
  });

  it('Termine le jeu après 60 secondes', () => {
    cy.clock();
    cy.visit('/');
    cy.get('.startBtn').click();
    cy.tick(61000);

    cy.get('[data-testid="gameOver"]').should('be.visible');
    cy.get('[data-testid="score"]').should('exist');
  });
});