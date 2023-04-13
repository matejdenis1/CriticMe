import styles from "./Games.module.css"
import { db } from "../config/firebase-config";
import { useEffect, useState } from "react";
import { collection,getDocs} from "firebase/firestore";
import {Link, Routes, Route} from "react-router-dom"
import {ContentProfile} from "./ContentProfile"

export function Games(probs){
    //Ukládám si hry z databáse
    const [gamesList, setGamesList] =  useState([]);
    const gamesColection = collection(db, "games");
    useEffect(() => {
        const getGamesList = async () => {
            try{
                const data = await getDocs(gamesColection);
                const filteredData = data.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id,
                }))
                setGamesList(filteredData);

            }
            catch(err)
            {
                console.error(err);
            }
        }
        getGamesList();
    }, []);
    //Následně je vypisuju a dělám k nim příslušnou routu
    return(
        <>
        <Routes>
            {
                gamesList.map((game) => {
                    return (<Route path={game.id} key={game.id} element={<ContentProfile doc={game} data={gamesColection}/>}/>)
                })
            }
        </Routes>   
        {
        <div className={styles.container}>  
        {
        gamesList.map((game) => (
            <div className={styles.item} key={game.id}>
                <img className={styles.img} src={game.img} alt={game.title}/>
                <h1>{game.title}</h1>  
                <Link className={styles.viewMore} to={game.id}>View More</Link>            
            </div>   
        ))
        }
        </div>
        }
        
        </>
    );
}
export default Games;