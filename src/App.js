import React, { useEffect, useState } from "react";

import { Board } from "./components/Board";
import { ResetButton } from "./components/ResetButton";
import { ScoreBoard } from "./components/ScoreBoard";
import './App.css';

const App = () => {

  const WIN_CONDITIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  const [xPlaying, setXPlaying] = useState(true);
  const [board, setBoard] = useState(Array(9).fill(null))
  const [scores, setScores] = useState({ xScore: 0, oScore: 0 })
  const [gameOver, setGameOver] = useState(false);

  if(localStorage.getItem("scoreData")===null){
  localStorage.setItem("scoreData",JSON.stringify({ xScore: 0, oScore: 0 }))
  }
   useEffect(()=>{
    // {dor settting the board}
      //   const boradData=localStorage.getItem("data");
      //   console.log(JSON.parse(boradData));
      // setBoard(JSON.parse(boradData));
      const boradData=localStorage.getItem("scoreData");
      setScores(JSON.parse(boradData))
      console.log(JSON.parse(boradData));
   },[])

  const handleBoxClick = (boxIdx) => {
    // Step 1: Update the board
    const updatedBoard = board.map((value, idx) => {
      if (idx === boxIdx) {
        return xPlaying ? "X" : "O";
      } else {
        return value;
      }
    })

    setBoard(updatedBoard);
    // console.log(updatedBoard)
    localStorage.setItem("data",JSON.stringify(updatedBoard));

    // Step 2: Check if either player has won the game
    const winner = checkWinner(updatedBoard);

    if (winner) {
      if (winner === "O") {
        let { oScore } = scores;
        oScore += 1;
        setScores({ ...scores, oScore })
        console.log(scores);
       
      } else {
        let { xScore } = scores;
        xScore += 1;
        setScores({ ...scores, xScore })
       
        
      }
      console.log(scores)
     
    }
    console.log(scores)
    localStorage.setItem("scoreData",JSON.stringify(scores))
    // Step 3: Change active player
    setXPlaying(!xPlaying);
  }
   console.log(scores)
   //localStorage.setItem("scoreData",JSON.stringify(scores))

  const checkWinner = (board) => {
    for (let i = 0; i < WIN_CONDITIONS.length; i++) {
      const [x, y, z] = WIN_CONDITIONS[i];

      // Iterate through win conditions and check if either player satisfies them
      if (board[x] && board[x] === board[y] && board[y] === board[z]) {
        setGameOver(true);
        return board[x];
      }
    }
  }

  const resetBoard = () => {
    setGameOver(false);
    setBoard(Array(9).fill(null));
    // localStorage.setItem("scoreData",JSON.stringify({ xScore: 0, oScore: 0 }))
  }
  const resetScore = () => {
    // setGameOver(false);
    // setBoard(Array(9).fill(null));
     localStorage.setItem("scoreData",JSON.stringify({ xScore: 0, oScore: 0 }))
     
  }

  return (
    <div className="App">
      <ScoreBoard scores={scores} xPlaying={xPlaying} />
      <Board board={board} onClick={gameOver ? resetBoard : handleBoxClick} />
      <ResetButton resetBoard={resetBoard} value="Reset"/>
      <a href="/"><ResetButton resetBoard={resetScore} value="Reset Score" /></a>
    </div>
  );
}

export default App;
