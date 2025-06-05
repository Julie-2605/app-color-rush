import { startGame, getConsigneColor, clickCircle, getScore } from '../support/helpers';

describe('Interaction avec les cercles', () => {

  it('Réduit le score si mauvaise couleur cliquée', () => {
    startGame();

    getConsigneColor().then((correctColor) => {
      const allColors = ["#5DE3F5", "#406DF5", "#3FA7F4", "#9DF5E2", "#A39DF5", "#BCDCF5"];
      const wrongColor = allColors.find(c => c !== correctColor)!;

      clickCircle(correctColor);

      getScore().then((before) => {
        clickCircle(wrongColor);
        getScore().then((after) => {
          expect(after).to.be.lessThan(before);
        });
      });
    });
  });
});
