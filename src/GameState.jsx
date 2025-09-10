import { useState, useEffect } from "react";
import './GameState.css'
import PsychologyAltIcon from '@mui/icons-material/PsychologyAlt';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

export default function GameState() {
    const [shuffledArray, setShuffledArray] = useState([]);
    const [playerOne, setPlayer1] = useState([]);
    const [playerTwo, setPlayer2] = useState([]);
    const [activePlayer, setActivePlayer] = useState("Player1");
    const [flippedCards, setFlippedCards] = useState([]);
    const [winner, setWinner] = useState(null);

    const cardData = [
        { id: 0, name: "card1", value: "https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?q=80&w=1476&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
        { id: 1, name: "card2", value: "https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?q=80&w=1476&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
        { id: 2, name: "card3", value: "https://images.unsplash.com/photo-1433162653888-a571db5ccccf?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
        { id: 3, name: "card4", value: "https://images.unsplash.com/photo-1433162653888-a571db5ccccf?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
        { id: 4, name: "card5", value: "https://images.unsplash.com/photo-1638311737517-7b4f624c251a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
        { id: 5, name: "card6", value: "https://images.unsplash.com/photo-1638311737517-7b4f624c251a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }
    ];

    // Shuffle and initialize cards
    const shuffleCards = () => {
        const originalArray = [...cardData];
        for (let i = originalArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [originalArray[i], originalArray[j]] = [originalArray[j], originalArray[i]];
        }
        return originalArray;
    };

    useEffect(() => {
        setShuffledArray(shuffleCards());
    }, []);

    const restartGame = () => {
        setShuffledArray(shuffleCards());
        setPlayer1([]);
        setPlayer2([]);
        setActivePlayer("Player1");
        setFlippedCards([]);
        setWinner(null);
    };

    const handleCardClick = (card) => {
        if (flippedCards.length === 2) return;
        if (flippedCards.some((flipped) => flipped.id === card.id)) return;
        if (playerOne.some((matched) => matched.id === card.id) || playerTwo.some((matched) => matched.id === card.id)) return;

        const newFlipped = [...flippedCards, card];
        setFlippedCards(newFlipped);

        if (newFlipped.length === 2) {
            setTimeout(() => checkMatch(newFlipped), 1000);
        }
    };

    const checkGameEnd = (p1, p2) => {
        if (p1.length + p2.length === shuffledArray.length) {
            const winner = p1.length > p2.length ? "Player1" : "Player2";
            setWinner(winner);
        }
    };

    const checkMatch = (cards) => {
        const [first, second] = cards;
        let matched = false;

        if (first.value === second.value) {
            matched = true;
            if (activePlayer === "Player1") {
                setPlayer1((prev) => {
                    const updated = [...prev, first, second];
                    setTimeout(() => checkGameEnd(updated, playerTwo), 0);
                    return updated;
                });
            } else {
                setPlayer2((prev) => {
                    const updated = [...prev, first, second];
                    setTimeout(() => checkGameEnd(playerOne, updated), 0);
                    return updated;
                });
            }
        }

        setFlippedCards([]);

        if (!matched) {
            setActivePlayer((prev) => (prev === "Player1" ? "Player2" : "Player1"));
        }
    };

    return (
        <div className="game-container">
            <div style={{
                width: "100%",
                maxWidth: "1000px",
                padding: "20px",
                margin: "0 auto"
            }}>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)",
                        gap: "20px",
                    }}
                >
                    <h1 style={{ gridColumn: "span 3", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
                        <PsychologyAltIcon fontSize="large" />
                        Memory Game
                    </h1>
                    <h2 style={{ gridColumn: "span 3", textAlign: "center" }}>
                        {winner ? "Game Over" : `Current Player: ${activePlayer}`}
                    </h2>

                    {shuffledArray.map((card) => (
                        <div
                            key={card.id}
                            onClick={() => handleCardClick(card)}
                            style={{
                                border: "4px solid black",
                                padding: "20px",
                                margin: "5px",
                                cursor: "pointer",
                                width: "350px",
                                boxSizing: "border-box",
                                height: "250px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            {flippedCards.includes(card) ||
                                playerOne.includes(card) ||
                                playerTwo.includes(card) ? (
                                <img
                                    src={card.value}
                                    alt={card.name}
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                        display: "block",
                                    }}
                                />
                            ) : (
                                <b>Click to Flip</b>
                            )}
                        </div>
                    ))}

                    <h3 style={{ gridColumn: "span 3", textAlign: "center" }}>
                        <b>Player 1 Matched:</b> {playerOne.length / 2} pairs
                    </h3>
                    <h3 style={{ gridColumn: "span 3", textAlign: "center" }}>
                        <b>Player 2 Matched:</b> {playerTwo.length / 2} pairs
                    </h3>

                    {winner && (
                        <>
                            <h2 style={{ gridColumn: "span 3", textAlign: "center", color: "green" }}>
                                {`${winner} Wins 🎉🎉🎉!!!`}
                            </h2>
                            <div style={{ gridColumn: "span 3", textAlign: "center" }}>
                                <button onClick={restartGame} style={{
                                    marginTop: "20px",
                                    padding: "10px 20px",
                                    fontSize: "25px",
                                    backgroundColor: "#4CAF50",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "5px",
                                    cursor: "pointer"
                                }}>
                                    <b>
                                        <RestartAltIcon />
                                        Restart
                                    </b>
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div >
    );
}
