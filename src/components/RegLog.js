import "./RegLog.css";
import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase-config"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
export const RegLog = () => {
    const [email, setEmail] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [verifyPassword, setVerifyPassword] = useState('');
    const [currentForm, setCurrentForm] = useState('login');
    const [errorMessages, setErrorMessages] = useState("")
    const [validEmail, setValidEmail] = new useState(false)
    const navigate = useNavigate()
    const EMAIL_REDEX = /^(?=.*[@])/;
    //V podstatě validuji přihlašovací údaje a přihlašuji uživatele
    useEffect(()=> {
        const result = EMAIL_REDEX.test(newEmail)
        setValidEmail(result)
    }, [newEmail])
    useEffect(()=> {
        setErrorMessages("")
    }, [email,newEmail,password,newPassword,newPassword])
    const registerIn = async () => {

        if(validEmail === true){
            if(newPassword === verifyPassword){
                try{
                    await createUserWithEmailAndPassword(auth, newEmail, newPassword);
                    await signInWithEmailAndPassword(auth, newEmail, newPassword);
                    navigate("/")
                }
                catch
                {
                    setErrorMessages("Your email has an invalid format!")
                }

            }
            else{
                setErrorMessages("Passwords doesn't match!")
            }
        }
        else{
            setErrorMessages("Your email must containt '@' character!")
        }
            
        
    }
    const signIn = async (e) => {
        try{
            await signInWithEmailAndPassword(auth, email, password);
            e.preventDefault()
            navigate("/")
        } catch{
            setErrorMessages("We don't know this user :( Please check your credentials!")
        }    
    }
    return(
        <>
        {
            currentForm === "login" ?
            (<div className="center">
            <form className="form">
                <p className="errorMessage">{errorMessages}</p>
                <label htmlFor="email">Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)}  type="email" placeholder="youremail@email.com" id="email" name="email" required/>
                <label htmlFor="password">Password</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="********" id="password" name="password" required/>
                <button type="button" onClick={signIn}>Log in</button>
                <p>Don't have an account?</p>
                <button type="button" onClick={() => setCurrentForm("register")}>Register</button> 
            </form>
            </div>)
            : (
                <div className="center">
                <form className="form">
                    <p className="errorMessage">{errorMessages}</p>
                    <label htmlFor="email">Email</label>
                    <input value={newEmail} onChange={(e) => setNewEmail(e.target.value)}  type="email" placeholder="youremail@email.com" id="newEmail" name="newEmail" required/>
                    <label htmlFor="password">Password</label>
                    <input value={newPassword} onChange={(e) => setNewPassword(e.target.value)} type="password" placeholder="********" id="newPassword" name="newPassword" required/>
                    <label htmlFor="verifyPass">Password verification</label>
                    <input value={verifyPassword} onChange={(e) => setVerifyPassword(e.target.value)} type="password" placeholder="********" id="verifyPass" name="verifyPass" required/>
                    <button type="button" onClick={registerIn}>Register</button>
                    <p>Already have an account?</p>
                    <button type="button" onClick={() => setCurrentForm("login")}>Log in</button> 
                </form>
                </div>
            )
        }
        </>
    )
}
export default RegLog