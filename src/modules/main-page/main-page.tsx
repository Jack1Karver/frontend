import Block from '@/components/block/block'

import React, { useEffect, useState } from 'react'
import PopularMarks from './popular-list'
import { ICar } from '@/interfaces/car.interface'
import { CarRequests } from '@/requests/car.requests'
import CardsRow from '@/components/card/cards-row'

const MainPage = ()=>{
    const [cars, setCars] = useState<ICar[]>([])

    const fetchCars = async()=>{
        setCars(await CarRequests.fetchOffers())
    }

    useEffect(()=>{
        fetchCars()
    }, [])

    return <>
    <Block first={true} bg={'dark'} containerMod={'lg'}>
    <h3>Last Offerings</h3>
    <CardsRow cars={cars}/>
    </Block>
    <Block bg={'light'} containerMod={'lg'}>
    <PopularMarks/>
    </Block>
    </>
}

export default MainPage