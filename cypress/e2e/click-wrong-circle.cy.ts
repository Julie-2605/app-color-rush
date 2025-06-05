describe('Interaction avec les cercles', () => {
  it('Cliquer sur une mauvaise couleur fait baisser le score', () => {
    cy.visit('/')

    cy.contains('Start').click()

    cy.get('[data-testid="instruction"]', { timeout: 10000 })
      .should('match', /#([A-Fa-f0-9]{6})/)
      .invoke('text')
      .then((text) => {
        const match = text.match(/#([A-Fa-f0-9]{6})/)
        const targetColor = match ? `#${match[1]}` : null

        expect(targetColor).to.match(/^#[A-Fa-f0-9]{6}$/)

        cy.get('[data-testid="score"]')
          .invoke('text')
          .then((initialScoreText) => {
            const initialScore = parseInt(initialScoreText, 10)

            // Trouver un cercle différent
            cy.get('[data-testid^="circle-"]').then((circles) => {
              const other = [...circles].find(
                (el) => !el.dataset.testid?.includes(targetColor!)
              )

              if (other) {
                cy.wrap(other).click()

                cy.get('[data-testid="score"]')
                  .invoke('text')
                  .then((newScoreText) => {
                    const newScore = parseInt(newScoreText, 10)
                    expect(newScore).to.be.lessThan(initialScore)
                  })
              } else {
                throw new Error('Aucun cercle différent trouvé')
              }
            })
          })
      })
  })
})
