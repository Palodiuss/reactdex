const pokeColors = color => {
  switch (color) {
    case "fire":
      return "#FB9B51";
    case "water":
      return "#559EDF";
    case "grass":
      return "#5fbc51";
    case "electric":
      return "#EDD53E";
    case "psychic":
      return "#EC8CE5";
    case "ice":
      return "#70CCBD";
    case "dragon":
      return "#516AAC";
    case "dark":
      return "#595761";
    case "fairy":
      return "#F66F71";
    case "normal":
      return "#C5B489";
    case "fighting":
      return "#CE42657";
    case "flying":
      return "#516AAC";
    case "poison":
      return "#A864C7";
    case "ground":
      return "#C5B489";
    case "rock":
      return "#C5B489";
    case "bug":
      return "#92BC2C6";
    case "ghost":
      return "#516AAC";
    case "steel":
      return "#9298A4";

    default:
      return "#FAFAFA";
  }
};

export default pokeColors;
