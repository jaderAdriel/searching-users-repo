
import styles from './Form.module.scss';

function Form({setUser}) {
    
    function getValue(e) {
        e.preventDefault();
        const user = document.getElementById("user").value;
        setUser(user);
    }

    return (
        <form action="." method="post" className={styles.form}>

            <div className={styles.search__wrapper}>
            <input 
                type="search" 
                name="user" 
                id="user" 
                className={styles.search__input}
                autoComplete="off"
            />
            <button onClick={getValue} className={styles.search__button}>
                <i className="fa-solid fa-magnifying-glass search__icon"></i>
            </button>
            </div>
        </form>
    )
}



export default Form