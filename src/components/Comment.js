import { useState, useEffect } from "react"
import { auth, db } from "../config/firebase-config"
import { getDocs, collection, doc, updateDoc, deleteDoc, serverTimestamp} from "firebase/firestore";
import styles from "./Comment.module.css"
import { useNavigate } from "react-router-dom";
export function Comment(probs){
    const navigate= useNavigate()
    //Ukládám si komenty do promměnné
    const [comments, setComments] = useState([])
    //Ukládám si kolekci z databáse
    const commentsList = collection(db, `${probs.doc.id}-comments`)
    const [isEditing, setIsEditing] = useState(false)
    const [currentComment, setCurrentComment] = useState("")
    const [idOfEdittingComment, setIdOfEdittingComment] = useState("")
    //Beru data z databáse a filtruju je aby se dali číst
    const getComments = async () => {
            try {
                const comments = await getDocs(commentsList)
                const filteredComments = comments.docs.map((comment) => ({
                    ...comment.data(), id : comment.id,
                }))
                setComments(filteredComments)
            } catch(err){
                console.error(err)
            }
        }
        useEffect(() => {
            setComments([])
            getComments()
        }, [])
        // Mažu komentář
        const deleteComment = async (id, rating) => {
            const commentDoc = doc(db, commentsList.id, id)
            const contentDoc = doc(db, probs.data.id, probs.doc.id)
            await updateDoc(contentDoc, {rating: probs.doc.rating - rating, rated: probs.doc.rated - 1})
            await deleteDoc(commentDoc)
            navigate("/")
        }
        //Přebírá informace z kliklého komentáře
        function handleEditButton(text, id){
            setCurrentComment(text)
            setIsEditing(true)
            setIdOfEdittingComment(id)
        }
        //Edituju komentář
        const editComment = async (id) => {
            if(currentComment.length <= 100){
                const commentDoc = doc(db, commentsList.id, id)
                await updateDoc(commentDoc, {text: currentComment, createdAt: serverTimestamp()})
                setIsEditing(false)
                navigate("/")
            }
            
        }
return(
    <>
    <form className={styles.modal} style={{display: isEditing === true ? "" : "none"}}>
    <button type="button" className={styles.exitButton} onClick={()=> setIsEditing(false)}>X</button>
    <label htmlFor="review">What do i think about this topic</label>
    <textarea value={currentComment} type="text"onChange={(e) => setCurrentComment(e.target.value)} required placeholder="What do you think about content"></textarea>
    <p className={styles.count} style={{color: currentComment.length>100 ? "red" : "white"}}>{currentComment.length}/100</p>
    <button type="button" className={styles.buttonSubmitInActive} onClick={()=> editComment(idOfEdittingComment)}>Edit review</button>
    </form>
    <div className={styles.comments}>
        {
        comments.map((comment) => (
            <div className={styles.comment} key={comment.id}>
                <h3>{comment.user}</h3>
                <div style={{background: (comment.rating)>=3 ? "green" : "red"}} className={styles.ratingPointsComments}>{comment.rating}</div>
                <p>{comment.text}</p>
                {
                   auth?.currentUser?.email === comment.user && <>
                   <button title="Delete review" onClick={()=> deleteComment(comment.id,comment.rating)}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"/></svg></button>
                   <button title="Edit review"  onClick={()=> handleEditButton(comment.text, comment.id)}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z"/></svg></button>
                   </>
                }
            </div>
        ))
        }
    </div>
    </>
)
}
export default Comment