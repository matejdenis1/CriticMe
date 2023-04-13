import styles from "./LandingPage.module.css"
import {Link} from "react-router-dom"
export function LandingPage() {
    return(
        <>
        <h1 className={styles.welcome}>Welcome to CriticMe</h1>    
        <div className={styles.description}>On this website you can review and rate content that we prepared beforehand</div>
        <br/>
        <div className={styles.description}>Click bellow to start searching for game that you would like to critic</div>
        <Link className={styles.link} to="/games">Games</Link>
        </>
    );
}
export default LandingPage;