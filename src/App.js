import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { SuperHeroDetail } from "./components/SuperHeroDetail/SuperHeroDetail";
import { SuperHeroSearch } from "./components/SuperHeroSearch/SuperHeroSearch";
import { Login } from "./components/Login/Login";
import NavBar from "./components/NavBar/NavBar";
import { canAddNewTeammate } from "../src/utils";
import { TeamList } from "./components/TeamList/TeamList";

function App() {
  const [data, setData] = useState({
    name: "",
  });
  const [save, setSave] = useState([]);
 const [team, setTeam] = useState([]);
  
  const getCaracter = () => {
    fetch(`https://superheroapi.com/api/10159344441446092/search/${data.name}`)
      .then((result) => result.json())
      .then((response) => setSave(response));
  };

  useEffect(() => {
    getCaracter();
  }, [data.name]);

  const handleInputChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

 

  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  const powerstatsTeam = team?.map((i) => i.powerstats);
  const combatTeam = powerstatsTeam
    ?.map((i) => parseInt(i.combat))
    ?.filter((i) => !Number.isNaN(parseInt(i)))
    ?.reduce(reducer, 0);
  const intelligenceTeam = powerstatsTeam
    ?.map((i) => parseInt(i.intelligence))
    ?.filter((i) => !Number.isNaN(parseInt(i)))
    ?.reduce(reducer, 0);
  const strengthTeam = powerstatsTeam
    ?.map((i) => parseInt(i.strength))
    ?.filter((i) => !Number.isNaN(parseInt(i)))
    ?.reduce(reducer, 0);
  const speedTeam = powerstatsTeam
    ?.map((i) => parseInt(i.speed))
    ?.filter((i) => !Number.isNaN(parseInt(i)))
    ?.reduce(reducer, 0);
  const durabilityTeam = powerstatsTeam
    ?.map((i) => parseInt(i.durability))
    ?.filter((i) => !Number.isNaN(parseInt(i)))
    ?.reduce(reducer, 0);

  const appearanceTeam = team?.map((i) => i.appearance);
  const teamNumber = team?.map((i) => parseInt(i));

  const heightTeam = appearanceTeam
    ?.map((i) => parseInt(i.height[1]))
    ?.filter((i) => !Number.isNaN(parseInt(i)))
    ?.reduce(reducer, 0);

    const weightTeam = appearanceTeam
    ?.map((i) => parseInt(i.weight[1]))
    ?.filter((i) => !Number.isNaN(parseInt(i)))
    ?.reduce(reducer, 0);

  const averageHeightTeam = heightTeam / teamNumber.length;
  const averageWeightTeam = weightTeam / teamNumber.length;

  const AddtoLocalStorage = (list) => {
    if (canAddNewTeammate(team, list)) {
      const uniqueList = [...new Set([...team, list])];
      setTeam(uniqueList);
      localStorage.setItem("superhero", JSON.stringify(uniqueList));
    }
  };

  return (
    <main className="App">
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route exact path="/search">
            <SuperHeroSearch
              handleInputChange={handleInputChange}
              AddtoLocalStorage={AddtoLocalStorage}
              team={team}
              save={save}
              data={data}
            />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/">
            <TeamList
              parentCallBack={setTeam}
              team={team}
              intelligenceTeam={intelligenceTeam}
              combatTeam={combatTeam}
              strengthTeam={strengthTeam}
              speedTeam={speedTeam}
              durabilityTeam={durabilityTeam}
              averageHeightTeam={averageHeightTeam}
              averageWeightTeam={averageWeightTeam}
            />
          </Route>
          <Route exact path="/SuperHeroDetail/:id">
            <SuperHeroDetail
              save={save}
              AddtoLocalStorage={AddtoLocalStorage}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    </main>
  );
}

export default App;
