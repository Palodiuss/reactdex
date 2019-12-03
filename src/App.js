import React, { Component } from "react";
import PokemonsList from "./components/PokemonsList";
import Pokemon from "./components/Pokemon";
import "./App.css";
import logo from "./pokemon2.svg";

class App extends Component {
  state = {
    selected: ""
  };

  getPokemon = pokemon => {
    this.setState({ selected: pokemon });
  };

  render() {
    return (
      <div className="wrapper">
        <header>
          <img className="header-logo" src={logo} alt="Pokémon"></img>
          <PokemonsList parentCallback={this.getPokemon} />
        </header>
        {this.state.selected && <Pokemon id={this.state.selected} />}
      </div>
    );
  }
}

export default App;
