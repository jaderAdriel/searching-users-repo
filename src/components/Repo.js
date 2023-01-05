
import { useState, useEffect } from "react";
import Form from './Form';
import State from "./State";
import Languages from "./Languages";
import styles from './Repo.module.scss';


function Repo() {
    const [user, setUser] = useState("jaderAdriel");
    const [repos, setRepos] = useState([]);
    const [state, setState] = useState({
        name:"sucess", message: null
    });
    
    
    useEffect(() => {
        
        setState({
            name:"loading", 
            message: `: searching for ${user} repos`
        });
        getUserPublicRepos(user).then(
            (response) => {
                setState({
                    name:"sucess", 
                    message: `: ${user} repos was found`
                });
                setRepos(getFilteredRepoInformation(response));
            }
        ).catch(
            (err) => {
                setState({
                    name:"error", 
                    message: `: ${err}`
                });
            }
        );
    }, [user]);
    
    async function getUserPublicRepos(user) {
        
        const response = await fetch(`https://api.github.com/users/${user}/repos`);
        
        
        let repos = await response.json()
        
        if (response.status > 300) {
            throw new Error(repos.message);
        }

        repos = Object.values(repos)
    
        return repos 
    
    }

    function getFilteredRepoInformation(repos) {
        return (
            repos.map((repo) => {
                return (
                    <li className={styles.repo} key={repo.html_url}>
                    <div className={styles.repo__name}>
                        <i className="fa-brands fa-github"></i>  {repo.name}
                    </div>
                    <Languages url={repo.languages_url}/>
                    <div className={styles.repo__description}>{repo.description}</div>
                    <a href={repo.html_url} className={styles.repo__link} target="_blank" rel="noopener noreferrer">
                        Check here
                    </a>
                    </li>
                )
            })
        )
    }

    function showState() {
        if (repos.length === 0) {
            setState({
                name:"message",
                message:`: ${user} dont have any public repo`
            })
        }
        console.log(state);
        return <State state={state}/>
    }
    console.log(1);
    function showRepos() {
        
        return repos
    }

    return (
        <>
        <Form setUser={setUser} user={user}/>
            {showState()}
        <ul className={styles.RepoList}>
            {showRepos()}
        </ul>
        </>
    )
}



export default Repo