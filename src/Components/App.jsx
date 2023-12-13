import { signal } from "@preact/signals"
import GameBoardOuter from "./GameBoardOuter"

export default function App() {
  const currentPlayerSymbol = signal("X")

  return (
    <main>
      <h1 className="title">
        Noughts and Crosses<sup>3</sup>
      </h1>
      <GameBoardOuter currentPlayerSymbol={currentPlayerSymbol} />
    </main>
  )
}
