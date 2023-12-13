import { signal } from "@preact/signals"
import { boardNotSelected } from "./App"
import GameBoardMiddle from "./GameBoardMiddle"

const gameBoardOuter = signal([1, 2, 3, 4, 5, 6, 7, 8, 9])
const currentGameBoardMiddle = signal(3)
const currentGameBoardInner = signal(3)

export default function GameBoardOuter({ currentPlayerSymbol }) {
  return (
    <div className="game-board-outer">
      {gameBoardOuter.value.map((board) => {
        return (
          <GameBoardMiddle
            currentPlayerSymbol={currentPlayerSymbol}
            currentGameBoardMiddle={currentGameBoardMiddle}
            currentGameBoardInner={currentGameBoardInner}
            key={board}
          />
        )
      })}
    </div>
  )
}
