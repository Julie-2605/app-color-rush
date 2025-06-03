describe('Interaction avec les cercles', () => {
  it('Cliquer sur le bon cercle fait augmenter le score', () => {
    // Given : je suis sur la page d'accueil
    cy.visit('/')

    // Given : une consigne de couleur est affichée
    cy.get('[data-testid="instruction"]').should('contain.text', 'Clique sur')

    // Récupérer la couleur attendue dans la consigne
    cy.get('[data-testid="instruction"]')
      .invoke('text')
      .then((text) => {
        const match = text.match(/Clique sur le cercle (\w+)/)
        const targetColor = match ? match[1] : null

        expect(targetColor).to.not.be.null

        // And : un cercle de cette couleur est affiché
        cy.get(`[data-testid="circle-${targetColor}"]`).should('exist')

        // When : je clique dessus
        cy.get(`[data-testid="circle-${targetColor}"]`).click()

        // Then : le score augmente (score >= 1)
        cy.get('[data-testid="score"]')
          .invoke('text')
          .then((scoreText) => {
            const score = parseInt(scoreText, 10)
            expect(score).to.be.greaterThan(0)
          })
      })
  })
})
