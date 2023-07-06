import Die from "./components/Die"
import {useState, useEffect} from "react"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"

export default function App(){

    const [dice, setDice] = useState(allNewDice())
    const [tenzies, setTenzies] = useState(false)
    const [count, setCount] = useState(0)

    useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const sameValue = dice.every(die => die.value === firstValue)
        if(allHeld && sameValue){
            setTenzies(true)
        }

    }, [dice])


    function generatNewDie() {
        return{
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }
    
    function allNewDice(){
        const newDice = []
        for(let i = 0; i < 10; i++){
            newDice.push(generatNewDie())
        }
        return newDice
    }

    function rollDice(){
        tenzies ? (setTenzies(false), setDice(allNewDice()), setCount(0)) :( 
            setCount(prevCount => prevCount + 1),
        setDice(prevDice => prevDice.map(die => {
            return die.isHeld ? die : generatNewDie()
        })) )
    }

    function holdDice(id){
        setDice(prevDice => prevDice.map(die => {
            return die.id === id ? {
                ...die, 
                isHeld: !die.isHeld
            } : die
        }))
    }

    const diceElements = dice.map(die => (
        <Die 
            key={die.id} 
            isHeld={die.isHeld}
            value={die.value}
            holdDice={() => holdDice(die.id)}
        />
    ))

    return(
        <main>
            <h1 className="title">Tenzies</h1>
            
            {tenzies ? <h1> {count} rolls to beat the game!</h1> : null}
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-container">
                {diceElements}
            </div>
            {tenzies ? <Confetti /> : null}
            <button onClick={rollDice} className="roll">{tenzies ? "New Game" : "Roll"}</button>
        </main>
    )
}