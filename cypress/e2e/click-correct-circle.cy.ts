describe('Interaction avec les cercles', () => {
  it('Cliquer sur le bon cercle fait augmenter le score', () => {
    cy.visit('/')

    // Lancer la partie
    cy.contains('Start').click()

    // Attendre que l’instruction affiche la bonne couleur
    cy.get('[data-testid="instruction"]', { timeout: 10000 })
      .invoke('html')
      .then((html) => {
        const match = html.match(/#([A-Fa-f0-9]{6})/)
        const targetColor = match ? `#${match[1]}` : null

        expect(targetColor, 'Couleur cible détectée').to.match(/^#[A-Fa-f0-9]{6}$/)

        // Cliquer sur le bon cercle
        cy.get(`[data-testid="circle-${targetColor}"]`, { timeout: 10000 }).click()

        // Vérifier que le score a augmenté
        cy.get('[data-testid="score"]')
          .invoke('text')
          .then((scoreText) => {
            const score = parseInt(scoreText.match(/\d+/)?.[0] || '0', 10)
            expect(score).to.be.greaterThan(0)
          })
      })
  })
})
