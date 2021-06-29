import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { SuperHeroList } from "../SuperHeroList/SuperHeroList";
import "./SuperHeroSearch.scss";

export const SuperHeroSearch = ({
  handleInputChange,
  AddtoLocalStorage,
  team,
  save,
  data,
}) => {

  const history = useHistory();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) history.push("/login");
  }, [history, token]);

  const justLyric = new RegExp("^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$");

  return (
    <>
      {token && (
        <>
          <section className="section-container">
            <div className="container-search">
              <form className="form-search">
                <h1 className="title">Choose your team</h1>
                <h3 className="h3-title-container">
                  You can select 3 superheros and 3 villains
                </h3>
                <input
                  className="input-search"
                  type="search"
                  placeholder="Search your SuperHero here"
                  onChange={handleInputChange}
                  name="name"
                ></input>
                <p className="error-found">
                  {" "}
                  {data.name &&
                    save.error &&
                    justLyric?.test(data?.name) &&
                    "Character with given name not found"}
                </p>
              </form>
            </div>
          </section>
          <section className="super-heros-wrapper">
            {save?.results
              ?.filter((heroe) => heroe?.biography?.alignment !== "neutral")
              ?.map((heroe) => (
                <SuperHeroList
                  AddtoLocalStorage={AddtoLocalStorage}
                  team={team}
                  heroe={heroe}
                />
              ))}
          </section>
        </>
      )}
    </>
  );
};
