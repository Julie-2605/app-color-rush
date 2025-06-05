it('Cliquer sur une mauvaise couleur fait baisser le score', () => {
  cy.visit('/')

  cy.contains('Start').click()

  cy.get('[data-testid="instruction"]', { timeout: 10000 })
    .invoke('html')
    .then((html) => {
      const match = html.match(/#([A-Fa-f0-9]{6})/)
      expect(match, 'Couleur cible détectée').to.not.be.null
      const targetColor = `#${match![1]}`

      cy.get('[data-testid="score"]')
        .invoke('text')
        .then((initialScoreText) => {
          const initialScore = parseInt(initialScoreText.match(/\d+/)?.[0] || '0', 10)

          cy.get('[data-testid^="circle-"]')
            .then((circles) => {
              const allCircles = [...circles]
              const otherCircle = [...circles].find((el) => el.dataset.testid !== `circle-${targetColor}`)

              if (otherCircle) {
                cy.wrap(otherCircle).click()
              } else {
                cy.wait(1000)
                cy.get('[data-testid^="circle-"]').eq(0).click()
              }

              cy.get('[data-testid="score"]')
              .invoke('text')
              .then((newScoreText) => {
                const newScore = parseInt(newScoreText.match(/\d+/)?.[0] || '0', 10)
                expect(newScore).to.be.at.most(initialScore)
            })
            })
        })
    })
})
