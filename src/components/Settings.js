import styles from "./Settings.module.css"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { updateEmail, updatePassword} from "firebase/auth";
import { auth } from "../config/firebase-config";
export function Settings() {
    const navigate = useNavigate()
    const [form, setForm] = useState()
    const [newEmail, setNewEmail] = useState("")
    const [newPassword, setNewPassword] = useState("")
    let currentForm;
    //Edituju email uživatele
    const EmailUpdate = async () => {
        try{
            await updateEmail(auth.currentUser, newEmail)
            navigate("/")
        } catch(err)
        {
            console.error(err)
        }
        
    }
    //Edituju heslo uživatele
    const PasswordUpdate = async () => {
        try{
            await updatePassword(auth.currentUser, newPassword)
            navigate("/")
        } catch(err)
        {
            console.error(err)
        }
        
    }
    //Přepínám mezi formuláři
    if(form === "email"){
        currentForm = 
        <div className="center">
        <form className="form">
            <label htmlFor="email">Enter your new email</label>
            <input type="email" onChange={(e)=> setNewEmail(e.target.value)} placeholder="youremail@email.com" id="email" name="email" required/>
            <button type="button" onClick={()=> EmailUpdate()}>Change email</button>
        </form>
        </div> 
    }
    else if (form === "password")
    {
        currentForm = <div className="center">
        <form className="form">
            <label htmlFor="password">Enter your new password</label>
            <input type="password" onChange={(e)=> setNewPassword(e.target.value)} placeholder="********" id="newPassword" name="newPassword" required/>
            <button type="button"onClick={()=> PasswordUpdate()}>Change password</button>
        </form>
        </div>
    }
    return (
        <>
            <div className={styles.block}>
            <span className={styles.close} onClick={()=> navigate("/")}>X</span>
            <h1>Settings</h1>
            <div onClick={()=> setForm("password")}>Change Password</div>
            <div onClick={()=> setForm("email")}>Change Email</div>
            </div>
            {
                <div>{currentForm}</div>
            }
            
        </>
    );
}

export default Settings;