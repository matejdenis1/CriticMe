import styles from "./NewPost.module.css"
import React, { useState } from 'react';
import { db } from "../config/firebase-config";
import {collection , addDoc} from "firebase/firestore"
import { auth } from "../config/firebase-config";
import { useNavigate } from "react-router-dom";
export function NewPost(probs)
{
    const navigate= useNavigate()
    const [isVisible, setVisibility] = useState(true);
    const [post, setNewPost] = useState("");
    //Přidávání nového komentáře
    const addNewPost = async () => {
        if(post.length <= 100)
        {
            try{
                await addDoc(collection(db, `${probs.data.id}-comments`), {
                    text: post,
                    user: auth?.currentUser?.email,
                    rating: probs.rating,
                })
                setVisibility(false)
                navigate("/")

            } catch(err)
            {
                console.error(err)
            }
        }
        
        
    }
    return(
        <>
        {
        isVisible &&
        <form className={styles.modal}>
           <button type="button" className={styles.exitButton} onClick={() => setVisibility(false)}>X</button>
           <label htmlFor="review">What do i think about this topic</label>
           <textarea type="text" required placeholder="Enter review within 100 words." onChange={(e) => setNewPost(e.target.value)}></textarea>
           <p className={styles.count} style={{color: post.length>100 ? "red" : "white"}}>{post.length}/100</p>
           <button type="button" className={styles.buttonSubmitInActive} onClick={() => addNewPost()}>Add review</button>
        </form> 
        }
        
        
        </>
    );
}
export default NewPost;