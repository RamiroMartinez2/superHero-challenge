import React from "react";
import { Link } from "react-router-dom";
import { canAddNewTeammate } from "../../utils";
import "./SuperHeroList.scss";

export const SuperHeroList = ({ team, AddtoLocalStorage, heroe}) => {
  const { id: heroId, name, image, biography } = heroe || {};
  const { alignment } = biography || {};
  const { url: imageSrc } = image || {};

  const canAdd = canAddNewTeammate(team, heroe);

  return (
    <>
      <div className="card">
        <Link to={`/SuperHeroDetail/${heroId}`}>
           <img loading="lazy" src={imageSrc} alt={name} />
        </Link>
        <div className="container-heroe">
          <h4>{name}</h4>
          <p className={alignment === "good" ? "Superhero" : " Villain"}>
            {alignment === "good" ? "Superhero" : " Villain"}
          </p>
          <button
            className="add-super"
            onClick={() => AddtoLocalStorage(heroe)}
          >
            {canAdd ? "Add to team" : "Can't add more"}
          </button>
        </div>
      </div>
    </>
  );
};
