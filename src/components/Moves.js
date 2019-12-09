import uuidv1 from "uuid";
import React from "react";

const Moves = ({ pokeData }) => {
  let moves = [];
  pokeData.moves.forEach(move => {
    if (move.version_group_details[0].level_learned_at !== 0)
      moves.push({
        name: move.move.name.split("-").join(" "),
        lvl: move.version_group_details[0].level_learned_at
      });
  });
  moves = moves.sort((a, b) => {
    return a.level > b.level ? 1 : -1;
  });

  return moves.map(move => {
    return (
      <div className="pokemon-move" key={uuidv1()}>
        <span className="move-name">{move.name}</span>
        <span className="move-lvl">level {move.lvl}</span>
      </div>
    );
  });
};

export default Moves;
