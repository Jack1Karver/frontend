import { ICar } from "@/interfaces/car.interface"
import React from "react"
import styles from './scss/card.module.scss'
import Card from "./card"

type CardsRowProps = {
    cars: ICar[]
}

const CardsRow = ({cars}:CardsRowProps)=>{

    return <div className={styles.card__row}>
        {cars.map(car=>{
            return <Card car={car}/>
        })}
    </div>
}

export default CardsRow