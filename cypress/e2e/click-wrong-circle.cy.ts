describe('Interaction avec les cercles', () => {
  it('Cliquer sur une mauvaise couleur fait baisser le score', () => {
    cy.visit('/')

    // Attendre que la consigne s'affiche
    cy.get('[data-testid="instruction"]').should('contain.text', 'Clique sur')

    // Récupérer la couleur cible
    cy.get('[data-testid="instruction"]')
      .invoke('text')
      .then((text) => {
        const match = text.match(/Clique sur le cercle (\w+)/)
        const targetColor = match ? match[1] : null
        expect(targetColor).to.not.be.null

        // Récupérer le score actuel
        cy.get('[data-testid="score"]')
          .invoke('text')
          .then((initialScoreText) => {
            const initialScore = parseInt(initialScoreText, 10)

            // Trouver un cercle d'une couleur différente
            cy.get(`[data-testid^="circle-"]`)
              .not(`[data-testid="circle-${targetColor}"]`)
              .first()
              .click()

            // Vérifier que le score a baissé
            cy.get('[data-testid="score"]')
              .invoke('text')
              .then((newScoreText) => {
                const newScore = parseInt(newScoreText, 10)
                expect(newScore).to.be.lessThan(initialScore)
              })
          })
      })
  })
})
