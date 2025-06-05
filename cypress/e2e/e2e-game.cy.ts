import {
  startGame,
  getConsigneColor,
  clickCircle,
  getScore,
} from '../support/helpers';

describe('Parcours utilisateur - Jeu de réflexes et de rapidité', () => {
  beforeEach(() => {
    startGame();
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
    getConsigneColor().then((color) => {
      clickCircle(color);
      getScore().should('be.greaterThan', 0);
    });
  });

  it("Réduit le score si on clique sur un cercle de mauvaise couleur", () => {
    getConsigneColor().then((correctColor) => {
      const allColors = ["#5DE3F5", "#406DF5", "#3FA7F4", "#9DF5E2", "#A39DF5", "#BCDCF5"];
      const wrongColor = allColors.find(c => c !== correctColor)!;

      clickCircle(correctColor); // augmente le score
      getScore().then((beforeScore) => {
        clickCircle(wrongColor); // clique sur mauvaise couleur
        getScore().should('be.lessThan', beforeScore);
      });
    });
  });

  it('Termine le jeu après 60 secondes', () => {
    cy.clock();
    startGame();
    cy.tick(61000); // simule 61 secondes

    cy.get('[data-testid="gameOver"]').should('be.visible');
    cy.get('[data-testid="score"]').should('exist');
  });
});
