
import { useState, useEffect } from "react";
import Languages from "./Languages";
import styles from './Repo.module.scss';


function Repo({setState, state, user}) {
    
    const [repos, setRepos] = useState([]);
    
    useEffect(() => {
        if (user) {
            
            setState({
                name:"loading", 
                message: `: searching for ${user} repos`
            });
            getUserPublicRepos(user).then(
                (response) => {
                    const temp =getFilteredRepoInformation(response); 
                    
                    if (temp.length === 0) {
                        setState({
                            name:"message", 
                            message: `: ${user} has no public repository yet`
                        });
                    } else {
                        setState({
                            name:"sucess", 
                            message: `: ${user} repos was found`
                        });
                    }
                    
                    setRepos(temp);
                }
            ).catch(
                    (err) => {
                        setState({
                            name:"error", 
                            message: `: ${err}`
                        });
                    }
            );
        }
    }, [setState, user]);
    
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


    return (
        <>
        <ul className={styles.RepoList}>
            {repos}
        </ul>
        </>
    )
}



export default Repo