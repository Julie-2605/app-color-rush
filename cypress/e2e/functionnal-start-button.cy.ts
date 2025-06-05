import { startGame, assertGameStarted } from '../support/helpers';

describe('Fonctionnalité : lancer une partie', () => {
  it('affiche le jeu et un cercle après avoir cliqué sur "Start"', () => {
    startGame();
    assertGameStarted();
  });
});
