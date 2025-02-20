
import { useState,useEffect } from "react"

const PokemonCard = ({name, types, image, attack, defense, hp}) => {
    const [currentHP, setCurrentHP] = useState(hp)

    // useEffect(() => {
    //     alert("rise and shine")
    
    // },[])

    // useEffect(() => {
    //         console.log('currentHP useEffect', currentHP)
    //     if (currentHP <= 0) {
    //        alert("bulbizarre est mort")
    //     }
    // }, [currentHP])

    // const handleAttack = () => {
    //     console.log("bulbizarre se mange une patate")
    //     setCurrentHP(currentHP - 10)
    // }
 
    return (
        <div>
            <h1>{name}</h1>
            <img src={image} alt={name} />
            {types.map((type) => {
                return (
                    <p key={type}>{type}</p>
                )
            })}
            <p>Attack: {attack}</p>
            <p>Defense: {defense}</p>
            <p>HP: {currentHP}</p>
            {/* <button onClick={handleAttack}>Attack</button> */}

        </div>
    )
}

export default PokemonCard