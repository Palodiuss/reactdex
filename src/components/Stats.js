import uuidv1 from "uuid";
import React from "react";

const Stats = ({ pokeData }) => {
  return (
    <>
      {pokeData.stats.map(stat => (
        <div className="pokemon-stat-row" key={uuidv1()}>
          <span className="pokemon-stat-value" key={uuidv1()}>
            {stat.base_stat}
          </span>
          <span className="pokemon-stat-label" key={uuidv1()}>
            {stat.stat.name}
          </span>
        </div>
      ))}
    </>
  );
};

export default Stats;
