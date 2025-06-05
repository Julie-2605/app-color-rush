import { startGame, getConsigneColor, clickCircle, getScore } from '../support/helpers';

describe('Interaction avec les cercles', () => {
  it('Augmente le score si on clique sur le bon cercle', () => {
    startGame();

    getConsigneColor().then((color) => {
      clickCircle(color);

      getScore().then((score) => {
        expect(score).to.be.greaterThan(0);
      });
    });
  });
});
