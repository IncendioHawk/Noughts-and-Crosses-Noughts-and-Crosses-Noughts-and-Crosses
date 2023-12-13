import { signal } from "@preact/signals"
import GameBoardOuter from "./GameBoardOuter"

export const currentPlayerSymbol = signal("X")
export const activeOuterBoard = signal(null)
export const activeMiddleBoard = signal(null)
export const boardNotSelected = signal(false)

export default function App() {
  return (
    <main>
      <h1 className="title">
        Noughts and Crosses<sup>3</sup>
      </h1>
      <GameBoardOuter currentPlayerSymbol={currentPlayerSymbol} />
    </main>
  )
}
