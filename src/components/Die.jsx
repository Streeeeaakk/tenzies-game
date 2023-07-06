
export default function Die(props){

    const color = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }

    return (
        <div className="die-face" style={color} onClick={props.holdDice}>
            <h2 className="die-num">{props.value}</h2>
        </div>
    )
}