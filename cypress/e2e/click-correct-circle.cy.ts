describe('Interaction avec les cercles', () => {
  it('Cliquer sur le bon cercle fait augmenter le score', () => {
    cy.visit('/')

    cy.contains('Start').click()

    cy.get('[data-testid="instruction"]')
      .invoke('text')
      .then((text) => {
        console.log('Instruction affichée :', text)

        // Regex plus souple : capture le code couleur #xxxxxx
        const match = text.match(/#([A-Fa-f0-9]{6})/)
        const targetColor = match ? `#${match[1]}` : null

        expect(targetColor, 'Couleur cible détectée').to.not.be.null

        // Vérifie qu'un cercle avec cette couleur existe
        cy.get(`[data-testid="circle-${targetColor}"]`).click()

        cy.get('[data-testid="score"]')
          .invoke('text')
          .then((scoreText) => {
            const score = parseInt(scoreText, 10)
            expect(score).to.be.greaterThan(0)
          })
      })
  })
})
