import { useState } from "react"

import { Board } from "../Board/Board";

import './Welcome.scss'

export const Welcome = () => {
    const [playerOne, setPlayerOne] = useState('');
    const [playerTwo, setPlayerTwo] = useState('');
    const [showBoard, setShowBoard] = useState(false);

    const onStartGameClick = () => {
        setShowBoard(true);
    }

    const isBothPlayerSame = playerOne && playerTwo && playerOne === playerTwo;

    return  <>
                <h1>TIC TAC TOE</h1>
                {showBoard ?
                <div data-testid= "board">
                    <Board 
                        {...{
                            playerOne,
                            playerTwo
                        }}
                    />
                </div> :
                <div className="welcome" data-testid= "welcome"> 
                    <div className="formfield" >Player 1 : <input placeholder="name for X" onChange={(e) => setPlayerOne(e.target.value)} data-testid= "player-one-input"/></div>
                    <div className="formfield" >Player 2 : <input placeholder="name for O" onChange={(e) => setPlayerTwo(e.target.value)} data-testid= "player-two-input"/></div>
                    {isBothPlayerSame && <div className="error-message" data-testid= "error-message">Both names cannot be same!!</div>}
                    <div className="start-button-container">
                        <button type="button" onClick ={onStartGameClick} disabled={!(playerOne && playerTwo && playerOne !== playerTwo)} data-testid= "start-btn">Start Game</button>
                    </div>
                </div>}   
            </>
}