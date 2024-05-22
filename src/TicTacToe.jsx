import { useState, useEffect } from "react";

function TicTacToe() {
  const [playerTurn, setPlayerTurn] = useState(true);
  const [board, setBoard] = useState(Array(9).fill(null));
  const [player1gamesWon, setPlayer1gamesWon] = useState(0);
  const [player2gamesWon, setPlayer2gamesWon] = useState(0);
  const [aWinner, setAWinner] = useState(false);

  const checkForWinner = () => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    winningCombinations.map((combination) => {
      const [a, b, c] = combination;
      if (board[a] === "⭕" && board[a] === board[b] && board[a] === board[c]) {
        setPlayer1gamesWon((prevCount) => prevCount + 1);
        setAWinner(true);
        resetBoard();
      }
      if (board[a] === "✖️" && board[a] === board[b] && board[a] === board[c]) {
        setPlayer2gamesWon((prevCount) => prevCount + 1);
        setAWinner(true);
        resetBoard();
      }
      /*
      The every method in JavaScript is an array method that tests whether all
      elements in the array pass the test implemented by the provided function. 
      It returns true if all elements pass the test, and false otherwise.
      */
      if (!aWinner && board.every((cell) => cell !== null)) {
        setAWinner(false);
        resetBoard();
      }
    });
  };

  const displayPlayerMove = (event) => {
    const index = event.target.value;
    if (board[index] !== null) {
      return;
    }
    const newBoard = board.slice();
    newBoard[index] = playerTurn ? "⭕" : "✖️";
    setBoard(newBoard);
    setPlayerTurn(!playerTurn);
  };

  useEffect(() => {
    checkForWinner();
  }, [board]);

  function resetBoard() {
    setBoard(Array(9).fill(null));
    setPlayerTurn(true);
    setAWinner(false);
  }

  function restartGame() {
    resetBoard();
    setPlayer1gamesWon(0);
    setPlayer2gamesWon(0);
  }

  return (
    <>
      <h1>Tic Tac Toe</h1>
      <h3>
        Player : {playerTurn ? "Player 1" : "Player 2"} turn (
        {playerTurn ? "⭕" : "✖️"})
      </h3>
      <table>
        <tbody>
          {[0, 1, 2].map((row) => (
            <tr key={row}>
              {[0, 1, 2].map((col) => {
                const index = row * 3 + col;
                return (
                  <td key={col}>
                    <button onClick={displayPlayerMove} value={index}>
                      {board[index]}
                    </button>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <h4>Player 1 game's won : {player1gamesWon}</h4>
      <h4>Player 2 game's won : {player2gamesWon}</h4>
      <button className="restart-btn" onClick={restartGame}>
        Restart
      </button>
    </>
  );
}

export default TicTacToe;
