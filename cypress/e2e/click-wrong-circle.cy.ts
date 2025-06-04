describe('Interaction avec les cercles', () => {
  it('Cliquer sur une mauvaise couleur fait baisser le score', () => {
    cy.visit('/')

    // Lancer la partie
    cy.contains('Start').click()

    // Attendre que la consigne s'affiche
    cy.get('[data-testid="instruction"]').should('contain.text', 'Clique sur')

    // Récupérer la couleur cible dans l'instruction
    cy.get('[data-testid="instruction"]')
      .invoke('text')
      .then((text) => {
        // Extrait la couleur de type "#XXXXXX"
        const match = text.match(/#([A-Fa-f0-9]{6})/)
        const targetColor = match ? `#${match[1]}` : null

        expect(targetColor, 'Couleur cible détectée').to.not.be.null

        // Récupérer le score initial
        cy.get('[data-testid="score"]')
          .invoke('text')
          .then((initialScoreText) => {
            const initialScore = parseInt(initialScoreText, 10)

            // Essayer de cliquer sur un cercle différent
            cy.get('[data-testid^="circle-"]')
              .then((circles) => {
                // Trouve un cercle d'une autre couleur que la cible
                const other = [...circles].find((el) => !el.dataset.testid?.includes(targetColor as string))

                if (other) {
                  cy.wrap(other).click()

                  // Vérifier que le score a baissé
                  cy.get('[data-testid="score"]')
                    .invoke('text')
                    .then((newScoreText) => {
                      const newScore = parseInt(newScoreText, 10)
                      expect(newScore).to.be.lessThan(initialScore)
                    })
                } else {
                  // Aucun cercle de mauvaise couleur n'était disponible
                  throw new Error('Aucun cercle avec une couleur différente trouvée')
                }
              })
          })
      })
  })
})
