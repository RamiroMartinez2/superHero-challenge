import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./SuperHeroDetail.scss";

export const SuperHeroDetail = ({ AddtoLocalStorage }) => {
  const [caracterDetail, setCaracterDetail] = useState([]);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    getCaracterDetail();
  }, []);

  const getCaracterDetail = () => {
    fetch(`https://superheroapi.com/api/10159344441446092/${id}`)
      .then((result) => result.json())
      .then((data) => {
        setCaracterDetail(data);
        setLoading(false);
      });
  };

  return (
    <>
      {loading ? (
        <div>Loading</div>
      ) : (
        <div className="card-detail">
          {caracterDetail?.biography?.alignment === "good" ? (
            <h3 className="detail">Superhero Detail</h3>
          ) : (
            <h3 className="detail">Villain Detail</h3>
          )}

          <p className="detail">Full-name: {caracterDetail?.name}</p>
          <p className="detail">
            Alias: {caracterDetail?.biography?.aliases[0]}
          </p>
          <p className="detail">
            Weight: {caracterDetail?.appearance?.weight[1]}
          </p>
          <p className="detail">
            Height: {caracterDetail?.appearance?.height[1]}
          </p>
          <p className="detail">Work: {caracterDetail?.work?.occupation} </p>

          <button
            className="add-super"
            onClick={() => AddtoLocalStorage(caracterDetail)}
          >
            Add to team
          </button>
          <Link to="/search">
            <button className="go-back-button">Go back</button>
          </Link>
        </div>
      )}
    </>
  );
};
