import { Difficulty, GridData, GridIndex, Winner } from "../types/game";
import { sleep } from "../utils";
import MinimaxComputerPlayerService from "./MinimaxComputerPlayerService";
import { rowIndexes, columnIndexes, diagnalIndexes } from "../const/gridData";
import { GridItem } from "../types/game";
import { Player } from "../types/player";

export default class gameService {
  private computerAI: MinimaxComputerPlayerService;
  private humanPlayer: Player;
  private computerPlayer: Player;
  private thinkDelay: number;

  constructor(
    difficulty: Difficulty,
    humanPlayer: Player,
    computerPlayer: Player,
    thinkDelay: number = 300
  ) {
    this.computerAI = new MinimaxComputerPlayerService(
      difficulty,
      humanPlayer.mark,
      computerPlayer.mark
    );
    this.humanPlayer = humanPlayer;
    this.computerPlayer = computerPlayer;
    this.thinkDelay = thinkDelay;
  }

  async doComputerMove(gridData: GridData): Promise<GridData> {
    // simulate computer thinking
    await sleep(this.thinkDelay);

    return this.computerAI.makeNextMove([...gridData]);
  }

  getWinner(): Winner | null {
    return this.computerAI.getWinner();
  }

  getWinningPlayer(): Player | null {
    const winner = this.getWinner();
    if (winner !== Winner.draw) {
      return winner === Winner.huPlayer
        ? this.humanPlayer
        : this.computerPlayer;
    } else {
      return null;
    }
  }

  getWinningLine(gridData: GridData): GridIndex[] {
    const allIndexes = [rowIndexes, columnIndexes, diagnalIndexes];

    let winningLine: GridItem[] = [];

    for (let directionIndexs of allIndexes) {
      for (let lineIndexes of directionIndexs) {
        if (
          lineIndexes.every(
            (index: GridItem) =>
              gridData[index as number] === this.getWinningPlayer()?.mark
          )
        ) {
          winningLine = lineIndexes;

          // avoid extra looping when wining line found
          break;
        }
      }
    }

    return winningLine as GridIndex[];
  }
}
