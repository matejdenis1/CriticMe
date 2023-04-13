import styles from "./Rating.module.css";
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import {NewPost} from "./NewPost"
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase-config";

export function Rating(probs) {
    const [rating, setRating] = useState(0);
    const [isSubmitted, setSubmit] = useState(false);
    const navigate = useNavigate()
    // Ukládám na jaké button kliknul abych ho mohl odeslat do databáse
    function handleClickedButton(number){
        setRating(number)
    }
    //Edituju rating v databási
    const editRating = async () => {
            const addRating = doc(db, "games", probs.data.id)
            await updateDoc(addRating, {rating: probs.data.rating + rating, rated: probs.data.rated+1})
    }
    const [currentForm, setCurrentForm] = useState("rating")
    // Přepínám mezi formulářemi
    function toggleForm(forName){
        setCurrentForm(forName);
    }
    function handleSubmitting(e)
    {
        editRating()
        e.preventDefault();
        rating === undefined ? setSubmit(false) : setSubmit(true);
    }
    return(
        <>
        { currentForm === "rating" ?
            <form className={styles.ratingPanel} onSubmit={handleSubmitting}>
            {
            isSubmitted === true ?
            //If statement ------------------------------------------------
            <>
            <h1>Thank you for your review</h1>
            <p className={styles.ratingText}>Please tell us about you opinion on this matter, how did you like the content, if it is good or mad or would you make the game better</p>
            <button className={styles.homeButton} onClick={() => toggleForm("newpost")}>Add new critic</button>
            <button className={styles.homeButton} onClick={() => navigate("/")}>Go Home</button>
            </>
            //Else statement ----------------------------------------------
            :
            (<>
            <h1>How did you like the content?</h1>
            <p className={styles.ratingText}>On a scale from 1 to 5. <br/> How did you like the game.</p>
            <div className={styles.buttonGroup}>
                {[1,2,3,4,5].map((number) => <button key={number} type="button" onClick={() => handleClickedButton(number)}
                 className={styles.ratingButton}>
                    {number}
                 </button>)}
            </div>
            {
                rating === undefined ? (<button type="submit" className={styles.submitButtonInActive}>Submit</button>) : (<button type="submit" className={styles.submitButton}>Submit</button>)
            }
            <button className={styles.homeButton} onClick={() => navigate("/")}>Go Home</button>
            </>)
            }  
        </form>
        : <NewPost data={probs.data} visibility={true} rating={rating}/>
        }
        </>
    );
}
export default Rating;