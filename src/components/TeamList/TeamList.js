import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import TeamDetail from "../TeamDetail/TeamDetail";
import "./TeamList.scss";

export const TeamList = ({
  team,
  parentCallBack,
  combatTeam,
  intelligenceTeam,
  strengthTeam,
  speedTeam,
  durabilityTeam,
  averageHeightTeam,
  averageWeightTeam
}) => {
  const history = useHistory();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      history.push("/login");
    } else {
      history.push("/");
    }
  }, [history, token]);

  const stats = [
    { name: "Combat", value: combatTeam },
    { name: "Intelligence", value: intelligenceTeam },
    { name: "Strength", value: strengthTeam },
    { name: "Speed", value: speedTeam },
    { name: "Durability", value: durabilityTeam },
    { name: "Height", value: averageHeightTeam + "" + "cms"},
    { name: "Weight", value: averageWeightTeam + ""  + "kg" }
  ];


  return (
    <>
      <div className="team-stats">
        {stats[0].value === 0 &&
        stats[1].value === 0 &&
        stats[2].value === 0 &&
        stats[3].value === 0 &&
        stats[4].value === 0 ? (
          ""
        ) : (
          <h3>Team Powerstats - Average weight and height
          </h3>
        )}
        {stats[0].value === 0 &&
        stats[1].value === 0 &&
        stats[2].value === 0 &&
        stats[3].value === 0 &&
        stats[4].value === 0
          ? ""
          : stats?.map(({ name, value }) => (
              <p>
                {name}: {value}
              </p>
            ))}
      </div>
      <section className="section-home">
        {team == "" ? (
          <div className="empty-home">
            <div className="paragraph-card"></div>
            <p className="paragraph">
              {" "}
              You are loged now! Please, select search to make your team
            </p>

            <img
              className="background-home"
              src={"https://fondosmil.com/fondo/14671.jpg"}
              alt="background-team"
            />
          </div>
        ) : (
          team?.map((heroe, idx) => {
            return (
              <TeamDetail
                team={team}
                key={idx}
                heroe={heroe}
                parentCallBack={parentCallBack}
              />
            );
          })
        )}
      </section>
    </>
  );
};
