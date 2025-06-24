import React, { useState } from "react";
import "./App.css";
import Row from "./Row";
import Lives from "./Lives.jsx";

const App = () => {
const words = ["MANZANA", "BANANA", "CEREZA", "UVA", "LIMON", "CAMIONETA", "ESTACIONAMIENTO", "AGACHATE", "BARCO", "PRIVADO", "LICEO", "VENEZUELA", "EGIPTO", "ARGENTINA", "PLAYSTATION",
"TELEFONO", "DOLARES", "BOLIBOMBA", "BUBALU", "POLARCITA", "TEPUY", "MARGARITA", "COLIBRI", "GUACAMAYA", "TOMATE", "HIGADO","MANGO", "NARANJA", "DURAZNO", "PERA", "POLLITO",
 "MEDALLONES", "GUISANTES", "CHICHARRON", "ESPELUZNANTE", "ORNITORRINCO", "PARALELEPIPEDO", "NEVERA", "CALENTADOR", "GATORADE", "COCODRILO", "LAMPARA", "COLETO", "POSPRETERITO"];

 const [twoPlayerMode, setTwoPlayerMode] = useState(false);
 const [cpuMode, setCpuMode] = useState(false);
 const [mode, setMode] = useState(false);

const [music, setMusic] = useState(new Audio("assets/music.mp3"));
const gameOver = new Audio("assets/gameover.mp3");
const video = document.getElementById("video");

let numberLives = document.getElementById("numberLives");

const [attempts, setAttempts] = useState(6); //number of attempts 
const [guesses, setGuesses] = useState([]);
const [currentGuess, setCurrentGuess] = useState("");
const [isGameOver, setIsGameOver] = useState(false);
const [targetWord, setTargetWord] = useState("");
const [targetWordFlag, setTargetWordFlag] = useState(false);
const [typeWord, setTypeWord] = useState("");
const [prevGuess, setPrevGuess] = useState("");
const [ready, setReady] = useState(false);

const handleTwoPlayer = () => {       //para jugar en modo 2 jugadores
  music.play();
  music.loop = true;
  setMode(true);
  setTwoPlayerMode(true);
  setCpuMode(false);
}

const handleCPU = () => {       //para jugar en modo CPU
  music.play();
  music.loop = true;
  setMode(true);
  setCpuMode(true);
  setTwoPlayerMode(false);
}


const startPlaying = () => {               //para empezar el juego  MODO CPU
  music.play();
  setTargetWord(words[Math.floor(Math.random() * words.length)]);
  setReady(true);
}

const handleInputChange = (event) => {
  setCurrentGuess(event.target.value.toUpperCase());
}


const handleTargetWordChange = (event) => {       //para registrar la palabra a adivinar  MODO 2 JUGADORES
  setTypeWord(event.target.value.toUpperCase());
}

const sendTargetWord = () => {               //para enviar la palabra a adivinar
  if(typeWord.length > 0) {
  music.play();
  setTargetWordFlag(true);
  setTargetWord(typeWord);
  setTypeWord("");
  setReady(true);
  }
}


const handleGuess = () => {
  const updatedGuesses = [...guesses, currentGuess];
  setAttempts(attempts - 1);
  setGuesses(updatedGuesses);
  setPrevGuess(currentGuess);
  setCurrentGuess("");
  if(updatedGuesses.includes(targetWord)){   //en caso de ganar
    music.pause();
    music.currentTime = 0;
    setAttempts(attempts);
    setIsGameOver(true);
    video.play();
  }
  if(attempts === 1){ //en caso de perder
    music.pause();
    music.currentTime = 0;
    setIsGameOver(true);
    gameOver.play();  
  }
}

const restart = () => {
  music.pause();
  music.currentTime = 0;
  setAttempts(6);
  setGuesses([]);
  setCurrentGuess("");
  setIsGameOver(false);
  setTargetWord("");
  setTargetWordFlag(false);
  setReady(false);
  video.pause();
  video.currentTime = 0;
}

const exit = () => {
  setMode(false);
  setTwoPlayerMode(false);
  setCpuMode(false);
  restart();
}

  return (
    <>
    {mode && <Lives attempts={attempts}/>}
    <div className="main-container">
    {mode && <h1>Wordle</h1>}
    {!mode && <h1>Welcome to my Wordle game!</h1>}
    {!mode && <h3>Please select the mode you want to play:</h3>}
    {!mode && <div style={{display: "flex"}}>
      <button style={{marginRight: "20px"}} onClick={handleTwoPlayer}>2 Players</button> 
      <button style={{marginLeft: "20px"}} onClick={handleCPU}>CPU</button>
      </div>}
    {!mode && <img src="https://cdn2.downdetector.com/static/uploads/logo/Wordle.png" alt="Wordle" style={{width: "1220px", height: "400px"}} id="logo"/>}

    {cpuMode && !ready && <p style={{color: "#222222", fontSize: "20px", fontWeight: "bold"}}>Press Start to fetch a new word to guess!</p>}
    {cpuMode && !ready && <button onClick={startPlaying}>Start</button>}
    {mode && ready && <p style={{color: "#222222", fontSize: "20px", fontWeight: "bold"}}>Your word to guess has {targetWord.length} letters!</p>} 

    {twoPlayerMode && !targetWordFlag && <input type="text" onChange={handleTargetWordChange} placeholder="Enter the word to guess" value={typeWord} />}  
    {twoPlayerMode && !targetWordFlag && <button onClick={sendTargetWord}>Enter</button>}
      
    {mode && guesses.map((guess, index) => (
      <Row key={index} guess={guess} targetWord={targetWord} />  
      ))}
    {mode && ready && (!isGameOver && <input 
      type="text" 
      value={currentGuess}
      onChange={handleInputChange} 
      maxLength={targetWord.length} 
      placeholder="Enter your guess"
    />)}
    {mode && ready && (!isGameOver && <button onClick={handleGuess}>Guess</button>)}
    {mode && (isGameOver && prevGuess !== targetWord) && <p style={{color: "#960018", fontWeight: "bold", fontSize: "20px"}}>GAME OVER.. THE WORD WAS {targetWord}! </p>}
    {mode && (isGameOver && prevGuess === targetWord) && <p style={{color: "green", fontWeight: "bold", fontSize: "20px"}}>YOU WON!🥳🥳 </p>}
    {mode && (isGameOver && prevGuess === targetWord) && <video id="video" width="500px" controls autoPlay loop><source src="assets/winner.mp4" type="video/mp4"></source></video>}
    {mode && isGameOver && <div style={{display: "flex"}}>
    <button onClick={restart} style={{fontWeight: "bold", marginRight: "20px"} }>Restart</button>
    <button onClick={exit} style={{fontWeight: "bold", backgroundColor: "#960018", marginLeft: "20px"}}>Exit Game</button>
    </div>}
    </div>
    <footer>Developed by <em><a href="https://www.linkedin.com/in/andres-santilli/">Andres Santilli</a></em></footer>
    </>
  );
};

export default App;