import Card from "./Card";
import "./GameState/css";



export default function GameGrid({ shuffledArray }) {
    const grid = [];
    shuffledArray.forEach((c) => {
        grid.push(
            <Card
                id={c.id}
                value={c.value} />
        )
    })



    return (
        <div className="GameGrid">
            {grid}
        </div>
    )
}
