import { useEffect, useState } from "react";
import styles from './Languages.module.scss';

function Languages({url}) {
    
    const [langs, setLangs] = useState([])

    async function getLanguagesFromRepo(url) {
        const response = await fetch(url);
        
        if (response.status > 300) {
            throw new Error("not found");
        }
        let langs = await response.json()
        // langs = Object.values(langs)
        return langs
    }

    function setListOfLangs(langs) {
        langs = langs.map(( lang )=> {
            return(
                <span className={styles.lang}>{lang}</span>
                )
        })
        setLangs(langs)
        
    }

    useEffect( () => {
       
        getLanguagesFromRepo(url)
        .then(
            (result) => {
                let langsArray = []
                for (let l of Object.keys(result)){
                    langsArray.push(l)
                }
                setListOfLangs(langsArray)
            }
        )
    })

    return (
        <div className={styles.langs}>
            {langs}
        </div>
    )
}



export default Languages