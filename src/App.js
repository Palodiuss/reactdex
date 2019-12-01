import React, { Component } from "react";
import PokemonsList from './components/PokemonsList';

class App extends Component {

  state = {
    contacts: []
  }
  render() {
    return (
      <PokemonsList />
    );
  }

}

export default App;
