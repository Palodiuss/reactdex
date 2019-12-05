import React, { Component } from "react";
import PokemonsList from "./components/PokemonsList";
import Pokemon from "./components/Pokemon";
import "./App.css";
import logo from "./logo.svg";

class App extends Component {
  state = {
    selected: "",
    selectedColor: ""
  };

  getPokemon = pokemon => {
    this.setState({ selected: pokemon });
  };

  getColor = types => {
    types.forEach(type => {
      if (type.slot === 1) this.setState({ selectedColor: type.type.name });
    });

    //this.setState({ selectedColor: color[0] });
  };

  gradients = color => {
    switch (color) {
      case "fire":
        return "#FB9B51, #FBAE46";
      case "water":
        return "#559EDF, #69B9E3";
      case "grass":
        return "#5fbc51, #5ac178";
      case "electric":
        return "#EDD53E, #FBE273";
      case "psychic":
        return "#EC8CE5, #F3A7E7";
      case "ice":
        return "#70CCBD, #8CDDD4";
      case "dragon":
        return "#516AAC, #7773D4";
      case "dark":
        return "#595761, #6E7587";
      case "fairy":
        return "#F66F71, #FE9F92";
      case "normal":
        return "#C5B489, #D7CD90";
      case "fighting":
        return "#CE4265, #E74347";
      case "flying":
        return "#516AAC, #7773D4";
      case "poison":
        return "#A864C7, #C261D4";
      case "ground":
        return "#C5B489, #D7CD90";
      case "rock":
        //fix
        return "#C5B489, #D7CD90";
      case "bug":
        return "#92BC2C, #AFC836";
      case "ghost":
        return "#516AAC, #7773D4";
      case "steel":
        return "#9298A4, #A3A49E";

      default:
        return "#FAFAFA, #F5F5F5";
    }
  };

  render() {
    return (
      <div
        className="wrapper"
        style={{
          backgroundImage: `linear-gradient(to right, ${this.gradients(
            this.state.selectedColor
          )})`
        }}
      >
        <header>
          <img className="header-logo" src={logo} alt="Pokémon"></img>
          <PokemonsList parentCallback={this.getPokemon} />
        </header>
        {this.state.selected && (
          <Pokemon parentCallback={this.getColor} id={this.state.selected} />
        )}
      </div>
    );
  }
}

export default App;
