describe('Interaction avec les cercles', () => {
  it('Cliquer sur le bon cercle fait augmenter le score', () => {
    cy.visit('/')

    // Lancer la partie
    cy.contains('Start').click()

    // Attendre que l’instruction contienne une couleur valide
    cy.get('[data-testid="instruction"]', { timeout: 10000 })
      .should('match', /#([A-Fa-f0-9]{6})/)
      .invoke('text')
      .then((text) => {
        const match = text.match(/#([A-Fa-f0-9]{6})/)
        const targetColor = match ? `#${match[1]}` : null

        expect(targetColor, 'Couleur cible détectée').to.match(/^#[A-Fa-f0-9]{6}$/)

        // Clique sur le bon cercle
        cy.get(`[data-testid="circle-${targetColor}"]`).click()

        // Vérifie que le score a augmenté
        cy.get('[data-testid="score"]')
          .invoke('text')
          .then((scoreText) => {
            const score = parseInt(scoreText, 10)
            expect(score).to.be.greaterThan(0)
          })
      })
  })
})
