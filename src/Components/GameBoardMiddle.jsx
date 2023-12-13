import { signal } from "@preact/signals"
import GameBoardInner from "./GameBoardInner"

export default function GameBoardMiddle({
  currentPlayerSymbol,
  currentGameBoardMiddle,
  currentGameBoardInner,
}) {
  const gameBoardMiddle = signal([1, 2, 3, 4, 5, 6, 7, 8, 9])

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
