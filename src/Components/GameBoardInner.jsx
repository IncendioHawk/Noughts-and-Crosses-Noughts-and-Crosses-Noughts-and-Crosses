import { effect, signal } from "@preact/signals"
import { boardNotSelected, activeOuterBoard, activeMiddleBoard, currentPlayerSymbol } from "./App"

const gameBoardInner = signal([1, 2, 3, 4, 5, 6, 7, 8, 9])
const tileSymbol = signal(["", "", "", "", "", "", "", "", ""])
const confirmHidden = signal({ X: true, O: true })
const tempTileSymbol = signal(Array(9).fill(null))
const xMoves = signal([])
const oMoves = signal([])
const btnDisabled = signal(Array(9).fill(false))

effect(() => {
  checkWin()
  btnDisabled.value = tileSymbol.value.map((tile) => (tile !== "" ? true : false))
})

function confirmPlacement() {
  confirmHidden.value = { X: true, O: true }
  tileSymbol.value = tempTileSymbol.value
  currentPlayerSymbol.value = currentPlayerSymbol === "X" ? "O" : "X"
  xMoves.value = tileSymbol.value
    .map((tile, index) => (tile.symbol === "X" ? index : null))
    .filter((index) => index !== null)
  oMoves.value = tileSymbol.value
    .map((tile, index) => (tile.symbol === "O" ? index : null))
    .filter((index) => index !== null)
  activeOuterBoard.value = tileSymbol.value.reduce((acc, tile, index) => {
    if (acc == null) {
      return { tile, index }
    } else if (tile.date > acc.tile.date) {
      return { tile, index }
    } else {
      return null
    }
  }, null)
  console.log({ activeOuterBoard: activeOuterBoard.value })
}

function selectTile(e) {
  const index = e.target.dataset.index
  console.log({ index })
  const tileArray = [...tileSymbol.value]
  tileArray[index] = { symbol: currentPlayerSymbol.value, date: Date.now() }
  tempTileSymbol.value = tileArray
  confirmHidden.value = {
    X: currentPlayerSymbol.value === "X" ? false : true,
    O: currentPlayerSymbol.value === "O" ? false : true,
  }
  console.log({ tempTileSymbol: tempTileSymbol.value })
  console.log({ tileSymbol: tileSymbol.value })
}

function checkWin() {
  const winningCombos = [
    [0, 1, 2], // 1st row
    [3, 4, 5], // 2nd row
    [6, 7, 8], // 3rd row
    [0, 3, 6], // 1st col
    [1, 4, 7], // 2nd col
    [2, 5, 8], // 3rd col
    [0, 4, 8], // diag
    [2, 4, 6], // diag
  ]
  const xWin = winningCombos.some((combo) => {
    return combo.every((index) => xMoves.value.includes(index))
  })
  const oWin = winningCombos.some((combo) => {
    return combo.every((index) => oMoves.value.includes(index))
  })
  console.log({ xWin })
  console.log({ oWin })
}

export default function GameBoardInner({
  currentPlayerSymbol,
  currentGameBoardMiddle,
  currentGameBoardInner,
}) {
  return (
    <>
      <button
        className={`x-confirm ${confirmHidden.value.X && "hidden"}`}
        onClick={confirmPlacement}>
        Confirm X
      </button>
      <button
        className={`o-confirm ${confirmHidden.value.O && "hidden"}`}
        onClick={confirmPlacement}>
        Confirm O
      </button>
      <div className="game-board-inner">
        {gameBoardInner.value.map((board, index) => {
          return (
            <button
              disabled={btnDisabled.value[index] || boardNotSelected.value}
              className="select-tile-btn"
              data-index={index}
              onClick={selectTile}
              key={board}>
              {tempTileSymbol.value[index]?.symbol ?? tileSymbol.value[index]?.symbol ?? "A"}
            </button>
          )
        })}
      </div>
    </>
  )
}
