import Block from '@/components/block/block'

import React from 'react'
import PopularMarks from './popular-list'

const MainPage = ()=>{

    return <>
    <Block first={true} bg={'dark'} containerMod={'lg'}>
    <h3>Last Offerings</h3>
    </Block>
    <Block bg={'light'} containerMod={'lg'}>
    <PopularMarks/>
    </Block>
    </>
}

export default MainPage