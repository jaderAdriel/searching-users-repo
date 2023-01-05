
import styles from './State.module.scss';

function State({state}) {

    const {name="message", message} = state

    const iconMap = new Map();

    iconMap.set("error", 'fa-regular fa-x');
    iconMap.set("loading", 'fa-solid fa-spinner');
    iconMap.set("sucess", 'fa-solid fa-check');
    iconMap.set("message", 'fa-solid fa-messages');
    console.log(2);
    function getState(){
        const icon= iconMap.get(name);

        return (
            <>
                <i className={`${icon} ${styles.state__icon} ${styles[name]}`}></i>
                <span className={`${styles.state__name}`}>{name}{message}</span>
            </>
        )
    }

    return (
        
        <div className={styles.state}>
            {getState()}
        </div>
    )
}



export default State