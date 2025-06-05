import { simulateEndGame, assertGameEnded } from '../support/helpers';

describe('Fonctionnalité : Fin de partie', () => {
  it('affiche le message de fin de partie et le score quand le timer atteint 0', () => {
    simulateEndGame();
    assertGameEnded();
  });
});
