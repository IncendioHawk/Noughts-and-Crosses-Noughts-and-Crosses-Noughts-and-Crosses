import { effect, signal } from "@preact/signals"

export default function GameBoardInner({
  currentPlayerSymbol,
  currentGameBoardMiddle,
  currentGameBoardInner,
}) {
  const gameBoardInner = signal([1, 2, 3, 4, 5, 6, 7, 8, 9])
  const tileSymbol = signal(["", "", "", "", "", "", "", "", ""])
  const confirmHidden = signal({ X: true, O: true })
  const tempTileSymbol = signal(Array(9).fill(null))
  const xMoves = signal([])
  const oMoves = signal([])
  const btnDisabled = signal(Array(9).fill(false))
  const boardNotSelected = signal(true)

  effect(() => {
    checkWin()
    btnDisabled.value = tileSymbol.value.map((tile) => (tile !== "" ? true : false))
  })

  function confirmPlacement() {
    confirmHidden.value = { X: true, O: true }
    tileSymbol.value = tempTileSymbol.value
    tempTileSymbol.value = Array(9).fill(null)
    currentPlayerSymbol.value = currentPlayerSymbol === "X" ? "O" : "X"
    xMoves.value = tileSymbol.value
      .map((tile, index) => (tile === "X" ? index : null))
      .filter((index) => index !== null)
    oMoves.value = tileSymbol.value
      .map((tile, index) => (tile === "O" ? index : null))
      .filter((index) => index !== null)
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

  function selectTile(e) {
    const index = e.target.dataset.index
    const tileArray = [...tileSymbol]
    tileArray[index] = currentPlayerSymbol
    tempTileSymbol.value = tileArray
    confirmHidden.value = {
      X: currentPlayerSymbol === "X" ? false : true,
      O: currentPlayerSymbol === "O" ? false : true,
    }
  }
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
              {tempTileSymbol.value[index] ?? tileSymbol.value[index]}
            </button>
          )
        })}
      </div>
    </>
  )
}
