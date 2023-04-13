import React, {useEffect, useState} from "react";
import {Link, Routes, Route} from "react-router-dom"
import { Settings } from "./Settings";
import styles from "./NavBar.module.css"
import { onAuthStateChanged, signOut} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase-config";
import LandingPage from "./LandingPage";
import Games from "./Games";
import RegLog from "./RegLog";
import NotFound from "./NotFound";


export function NavBar() {
    const [settingIsVisible, setSettingVisibility] = useState(false);
    const [currentUser, setCurrentUser] = useState("");
    const navigate = useNavigate()
    //Zajímá mě jestli je uživatel přihlášený aby se mu zobrazovalo uživatelské rozhraní
    useEffect(()=>{
        const setUser = async () => await onAuthStateChanged(auth, (user)=> {
            if(user) {
                setCurrentUser(user)
            }
        })
        setUser()
        
    }, [])
    // Odhlášení uživatele
    const logoff = () => {
        try{
            signOut(auth)
            setCurrentUser(null)
            setSettingVisibility(!settingIsVisible)
            navigate("/")
            window.location.reload()
        }
        catch(err)
        {
            console.error(err);
        }
    }
    return(
        <>

        <ul className={styles.navbar}>
            <li><Link to="/games">Games</Link></li>
            {
                currentUser?.email ? (<li  style={{cursor: "pointer"}} onClick={() => setSettingVisibility(!settingIsVisible)}><a>{currentUser?.email}</a></li>) :
                (<li><Link to="/reglog">Log in / Register</Link></li>)
            }
        </ul>
        {settingIsVisible && 
        <section className={styles.menuPosition}>
            <ul className={styles.menu}>
                <li><Link  to="/settings" onClick={()=> setSettingVisibility(!settingIsVisible)}>Settings</Link></li>
                <li onClick={() => logoff()}><a>Log off</a></li>
            </ul>
        </section>
        } 
        <Routes>
            <Route path="*" element={<NotFound />}/> 
            <Route path="/" element={<LandingPage />}/>
            <Route path="/games/*" element={<Games/>}/>
            {
                !currentUser && <Route path="/reglog" element={<RegLog/>}/>
            }
            {
                currentUser && (<Route path="/settings" element={<Settings/>}/>)
            }
        </Routes>    
        </>
    );

}
export default NavBar;