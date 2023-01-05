import { useState } from "react";
import State from "./components/State";
import Form from './components/Form';
import Repo from './components/Repo';
import './App.css';

function App() {
  const [user, setUser] = useState("jaderAdriel");
  const [state, setState] = useState({
    name:"sucess", message: null
  });

  return (
    <div className="App">
        <Form setUser={setUser} user={user}/>
        <State state={state}/>
        <Repo state={state} setState={setState} user={user}/>
    </div>
  );
}

export default App;
