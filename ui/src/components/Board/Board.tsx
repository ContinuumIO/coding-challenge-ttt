import { useState, useCallback } from 'react'
import { Game } from '../../api/api'
import "./Board.scss"

type BoardProps = {
    playerOne : string,
    playerTwo : string
};

// The default state of the board 
const DEFAULT_BOARD = [...Array(9).fill(null)];

// winner line check array
const winnerCheckArr = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
];

export const Board = ({
    playerOne,
    playerTwo,
	...props
}: BoardProps) => {
    const [squares, setSquares] = useState(DEFAULT_BOARD);
	const [saveSuccess, setSaveSuccess] = useState(false);
	
	const mapSquares = (squares: any[])=>
		// We map every index to the current value in 'squares'
		 winnerCheckArr.map(line => line.map(number => squares[number]));
	
    const getWinner = (squares: any[]) =>{
		// We find the winner line or return 'null'
		const winnerValue = mapSquares(squares).find(([a, b, c]) => a === b && a === c)?.[0]
		
        return winnerValue === undefined ? null : winnerValue 
	};

	const getWinnerLine = (squares: any[])=> 
		// We find the winner line	
		winnerCheckArr[ mapSquares(squares).findIndex(([a, b, c]) => a === b && a === c)];
			
    const getNext = (squares: any[]) =>
	    squares.filter((element)=>
           typeof element === 'number'
        ).length % 2 === 0 ? 1 : 0;

	const next = getNext(squares);
	const winner = getWinner(squares);
    
    //using useCallbacks here to avoid re-renders
	const onRestartClick = useCallback(() => {
		setSaveSuccess(false);
		setSquares(DEFAULT_BOARD)}, 
	[setSquares,saveSuccess]
	);

	const onSquareClick = useCallback(
		index =>
			winner === null && squares[index] === null
				? setSquares([
						...squares.slice(0, index),
						next,
						...squares.slice(index + 1)
				  ])
				: null,
		[next, setSquares, squares, winner]
	);

    const getNextPlayerName = (player : number) =>{
        return player === 1 ? playerOne : playerTwo
    }

    const onSaveClick = () =>{
        const gameDataToSend = {
            "players" : [playerOne,playerTwo],
            "board" : squares
        }
		
        Game.createGame(gameDataToSend)
			.then((data) => {
                if(data)
				//TODO: add a successful notification 
				setSaveSuccess(true);
			})
			.catch((err) => {
				console.log("error",err);
			});
    }
    
    return(
	<div {...props}>
		<div className="status" data-testid= "status">
			{typeof winner === 'number'
				? <span className="winner blink-me">{`${getNextPlayerName(winner)} WON!!!!`}</span>
				: squares.every((element)=>{
					return typeof element === 'number'
				 })
				? "Draw"
				: `Next player: ${getNextPlayerName(next)}`}
		</div>
		<div className='squares'>
			{squares.map((square: number, index: any) => (
				<button
					className={'square '+ (typeof winner === 'number' && getWinnerLine(squares).indexOf(index) > -1 && 'winner-square')}
					key={index}
					onClick={() => onSquareClick(index)}
					data-testid= {`square-${index}`}
				>
					{square === 1 && 'X'}
                    {square === 0 && 'O'}
				</button>
			))}
		</div>
		<div>
			<button  className="restart" onClick={onRestartClick} data-testid= "restart-btn">
				Restart
			</button>
			<button className="save" onClick={onSaveClick} data-testid= "save-btn">
				Save Game
			</button>
		</div>
		{saveSuccess && <div className="game-saved-notification">Game Saved Successfully!!</div>}
	</div>
)};