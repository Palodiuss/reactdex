import React from "react";
const Description = ({ pokeData }) => {
  let text = "";

  for (let i = 0; i < pokeData.flavor_text_entries.length; i++) {
    if (pokeData.flavor_text_entries[i].language.name === "en") {
      let flavor = pokeData.flavor_text_entries[i].flavor_text.replace(
        /(\r\n|\n|\r)/gm,
        " "
      );
      text = <p className="pokemon-species-story">{flavor}</p>;
      break;
    }
  }

  return text;
};

export default Description;
