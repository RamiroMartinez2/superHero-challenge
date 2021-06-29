import React from "react";
import './TeamDetail.scss'

const TeamDetail = ({ heroe, parentCallBack }) => {
  const { id: heroId, name, image, powerstats, biography } = heroe || {};
  const { combat, durability, intelligence, power, speed, strength } =
    powerstats || {};
  const { alignment } = biography || {};

  const removeFromTeam = () => {
    const teamLS = localStorage.getItem("superhero");
    const parsedTeamLS = JSON.parse(teamLS);
    if (teamLS) {
      const filteredTeam = parsedTeamLS?.filter((i) => i.id !== heroId);
      parentCallBack(filteredTeam);
      localStorage.setItem("superhero", JSON.stringify(filteredTeam));
    }
  };

  return (
    <>
      <div className="card">
        <img src={image.url} alt={name} />
        <h3 className="h3-team-detail">{name}</h3>
        <p className={alignment === "good" ? "Superhero" : " Villain"}>
          {alignment === "good" ? "Superhero" : " Villain"}
        </p>
        <p className="detail detail-team">Combat: {combat}</p>
        <p className="detail detail-team">Durability: {durability}</p>
        <p className="detail detail-team">Intelligencet: {intelligence}</p>
        <p className="detail detail-team">Power: {power}</p>
        <p className="detail detail-team">Speed: {speed}</p>
        <p className="detail detail-team">Strength: {strength}</p>
        <button className="remove-button" onClick={() => removeFromTeam()}>Delete</button>
      </div>
    </>
  );
};

export default TeamDetail;
