import { useState, useEffect } from "react";
import styles from "./ContentProfile.module.css"
import Comment from "./Comment"
import { Rating } from "./Rating"
import { auth} from "../config/firebase-config";
import { useNavigate } from "react-router-dom";
export function ContentProfile(probs)
{
    const navigate = useNavigate()
    const [rating, setRating] = useState(0);
    const [isVisible, setVisibility] = useState(false)
    const [currentPage, setCurrentPage] = useState("")
    //Nastavuji currentPage kvůli zobrazení komentářů a ratingu
    useEffect(()=> {
        setCurrentPage(probs.doc.id)
        !probs.doc.rated ? setRating(0) : setRating(Math.round((probs.doc.rating/probs.doc.rated)*10)/10)
    }, [probs.doc.id])
    useEffect(()=> {
        !probs.doc.rated ? setRating(0) : setRating(Math.round((probs.doc.rating/probs.doc.rated)*10)/10)
    }, [])
    //Pokaď je uživatel přihlášenej může ratnout content
    //Pokaď ne, přesměruji ho na login/register
    const rateMe = () => (
        auth.currentUser ?
        setVisibility(true)
        :
        navigate("/reglog")
    )
return(
    <>
    <div className={styles.container}>
    <img className={styles.image} src={probs.doc.img} alt="picture"/>
    {
        isVisible && <Rating data={probs.doc}/>
    }
    <div className={styles.label}>
        <div className={styles.ratingPoints} style={{background: rating>=3 ? "green" : "red"}}>{rating}</div>
        <h1>{probs.doc.title}</h1>
        <p>{probs.doc.description}</p>
        <p>Number of votes: {probs.doc.rated}</p>
        <button className={styles.rating} onClick={rateMe}>Rate me</button>
    </div>
    </div>
    {
        currentPage === probs.doc.id && <Comment doc={probs.doc} data={probs.data}/>
    }
    
    </>
);
}
export default ContentProfile;