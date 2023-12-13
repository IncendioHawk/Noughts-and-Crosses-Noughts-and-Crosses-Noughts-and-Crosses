import { signal } from "@preact/signals"
import GameBoardInner from "./GameBoardInner"
import { boardNotSelected } from "./App"

const gameBoardMiddle = signal([1, 2, 3, 4, 5, 6, 7, 8, 9])

export default function GameBoardMiddle({
  currentPlayerSymbol,
  currentGameBoardMiddle,
  currentGameBoardInner,
}) {
  return (
    <div className="game-board-middle">
      {gameBoardMiddle.value.map((board) => {
        return (
          <GameBoardInner
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
