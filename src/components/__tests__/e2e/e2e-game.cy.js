const { expect } = require("vitest");

describe('Parcours utilisateur - Jeu de réflexes et de rapiditié', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('[data-testid="start-button"]').click();
  });

  it('Démarre le jeu après avoir cliqué sur "Start"', () => {
    cy.get('[data-testid="timer"]').should('contain', '60');
    cy.get('[data-testid="score"]').should('contain', '0');
    cy.get('[data-testid="consigne-couleur"]').should('exist');
  });

  it("Affiche un cercle de couleur cliquable et augmente le score si la consigne est respectée", () => {
    cy.get('[data-testid="consigne-couleur"]').invoke('text').then((currentColor) => {
        cy.get(`[data-color="${currentColor.trim()}"]`).click();
        cy.get('[data-testid="score"]').should('not.contain', '0'); //Score augmente de +10pts
      });
  });

  it("Réduit le score si mauvaise couleur cliquée", () => {
    cy.get('[data-testid="consigne-couleur"]').invoke('text').then((currentColor) => {
      const colors = ['rouge', 'bleu', 'vert', 'jaune'].filter(c => c !== currentColor.trim());
      const wrongColor = colors[0];
      
      cy.get('[data-testid="score"').invoke('text').then((scoreBefore) => {
        cy.get(`[data-color="${wrongColor}"]`).click();
        cy.get('[data-testid="score"]').invoke('text').then((scoreAfter) => {
          expect(parseInt(scoreAfter)).to.be.lessThan(parseInt(scoreBefore)); //Score a été réduit
        });  
      });
    });
  });

  // it("L'apparition des cercles s'accélère au bout de quelques temps", () => {
  //   cy.get('[data-testid="start-button"]').click();

  //   cy.get('[data-testid="consigne-couleur"]').invoke('text').then((color) => {
  //     for (let i = 0; i < 5; i++) {
  //       cy.get(`[data-color="${color.trim()}"]`).click();
  //       cy.wait(500);
  //     }
  //   });

  //   cy.get('[data-testid="speed"]').should('contain', '500');//Speed en milliseconde
  // });

  it('Termine le jeu après 60 secondes', () => {
    cy.clock(); //Simulation du passage du temps
    cy.tick(60000); //60s

    cy.get('[data-testid="end-game"]').should('be.visible');
    cy.get('[data-testid="final-score"]').should('exist');
  });
});