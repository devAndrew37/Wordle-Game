import React from "react";
import "./Row.css";

const Row = ({guess, targetWord}) => {

const getLetterStatus = (letter, index) => {
  if(letter === targetWord[index]){
    return "correct";
  } else if(targetWord.includes(letter)){
    return "present";
  } else if(letter === null && targetWord[index] !== null){
    return "empty";
  } else {
    return "absent";
  }
}

 return (
  <div className="word-row">
  {guess.split("").map((letter, index) => (
    <span key={index} className={`letter ${getLetterStatus(letter, index)}`}>
    {letter}
    </span>
  ))} 
 {targetWord.split("").map((_, index) =>
        guess[index] === undefined ? (
          <span key={`empty-${index}`} className="letter empty">
            
          </span>
        ) : null
      )}
  </div>
 )
};

export default Row;

// targetWord = BANANA
// guess =      BANANITA
// guess =      ANA