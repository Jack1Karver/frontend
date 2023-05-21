import { observer } from "mobx-react";
import Block from "../block/block";
import { IUser } from "@/interfaces/user.interface";
import styles from './scss/main-screen.module.scss'
import BlockHead from "../block/block-head";

type MainScreenUserProps = {
user: IUser
}

const MainScreenUser = observer(({user}:MainScreenUserProps)=>{
    return <>
    <Block first={true} bg={'dark'}>
        <div className={styles.main_screen}>
        <h3>{user.name}</h3>
        </div>
    </Block>
    </>
})

export default MainScreenUser