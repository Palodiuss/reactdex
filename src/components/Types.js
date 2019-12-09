import uuidv1 from "uuid";
import React from "react";
import pokeColors from "./Colors";

const Types = ({ pokeData }) => {
  let pokeColor = "";
  let types = pokeData.types;
  if (types) {
    return (
      <>
        {types.map(type => {
          pokeColor = pokeColors(type.type.name);
          return (
            <span
              className="pokemon-species-info"
              style={{
                backgroundColor: `${pokeColor}`,
                boxShadow: `0 0 5px ${pokeColor}`
              }}
              key={uuidv1()}
            >
              {type.type.name}
            </span>
          );
        })}
      </>
    );
  }
};

export default Types;
