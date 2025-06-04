describe('Fonctionnalité : Fin de partie', () => {
  it('affiche le message de fin de partie et le score quand le timer atteint 0', () => {
    cy.clock()
    cy.visit('/')

    cy.get('button.startBtn').click()

    // Avance le temps de 60 secondes
    cy.tick(60000)

    // Then la partie est terminéee : vérifie que le message de fin de partie et le score sont affichés
    cy.get('.gameOver').should('be.visible')
    cy.get('.score').should('be.visible')
    
    // And le bouton "Start" est réaffiché
    cy.get('button.startBtn').should('be.visible')
    // And le conteneur du jeu n'est plus visible
    cy.get('.game-container').should('not.exist')
  })
})