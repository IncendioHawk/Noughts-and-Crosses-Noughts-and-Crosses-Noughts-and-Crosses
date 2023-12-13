import { signal } from "@preact/signals"
import GameBoardMiddle from "./GameBoardMiddle"

export default function GameBoardOuter({ currentPlayerSymbol }) {
  const gameBoardOuter = signal([1, 2, 3, 4, 5, 6, 7, 8, 9])
  const currentGameBoardMiddle = signal(3)
  const currentGameBoardInner = signal(3)

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
