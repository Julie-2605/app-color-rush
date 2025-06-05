describe('Fonctionnalité : lancer une partie', () => {
  it('affiche le jeu et un cercle après avoir cliqué sur "Start"', () => {
    // Given je suis sur la page d’accueil
    cy.visit('/')

    // When je clique sur "Start"
    cy.get('button.startBtn').click()

    // Then la partie commence : vérifie que le conteneur du jeu s'affiche
    cy.get('.game-container').should('be.visible')

    // Then le timer est affiché
    cy.get('.timer').should('be.visible')

    // And un cercle coloré est affiché
    cy.get('.circle').should('exist')
  })
})
