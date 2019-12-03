import React from "react";
import axios from "axios";

export default class PokemonsList extends React.Component {
  state = {
    id: "",
    pokemonData: "",
    pokemonSpecies: "",
    pokemonSpec: "",
    pokemonSpecColor: "",
    evolutionUrl: "",
    pokemonAbilities: "",
    pokes: []
  };

  componentDidMount() {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${this.props.id}`)
      .then(res => {
        console.log(res.data);
        this.setState({
          pokemonData: res.data,
          pokes: res.data.abilities,
          pokemonAbilities: res.data.abilities[0].ability.name
        });
      });

    axios
      .get(`https://pokeapi.co/api/v2/pokemon-species/${this.props.id}`)
      .then(res => {
        //console.log(res.data);
        this.setState({
          pokemonSpecies: res.data,
          pokemonSpec: res.data.egg_groups[0].name,
          pokemonSpecColor: res.data.color.name,
          pokemonStory: res.data.flavor_text_entries[1].flavor_text,
          evolutionUrl: res.data.evolution_chain.url
        });

        // axios.get(this.state.evolutionUrl).then(res => {
        //   console.log(res.data.chain.evolves_to);
        // });
      });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.id !== this.props.id) {
      axios
        .get(`https://pokeapi.co/api/v2/pokemon/${this.props.id}`)
        .then(res => {
          //console.log(res.data);
          this.setState({
            pokemonData: res.data,
            pokes: res.data.abilities,
            pokemonAbilities: res.data.abilities[0].ability.name
          });
          console.log(this.state.pokes);
        });

      axios
        .get(`https://pokeapi.co/api/v2/pokemon-species/${this.props.id}`)
        .then(res => {
          //console.log(res.data);
          this.setState({
            pokemonSpecies: res.data,
            pokemonSpec: res.data.egg_groups[0].name,
            pokemonSpecColor: res.data.color.name,
            pokemonStory: res.data.flavor_text_entries[1].flavor_text,
            evolutionUrl: res.data.evolution_chain.url
          });
        });
    }
  }

  assignValues() {
    this.setState({
      pokemonSpec: this.pokemonSpecies.egg_groups[0].name
    });
  }

  render() {
    return (
      <div className="pokemon-container">
        <div
          className="pokemon-image"
          style={{
            width: "200px",
            height: "200px",
            backgroundImage: `url(https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.props.id}.png)`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover"
          }}
        ></div>
        <div className="pokemon-species-container">
          <span className="pokemon-label">Species:</span>
          <span
            className="pokemon-species-info"
            style={{
              backgroundColor: `${this.state.pokemonSpecColor}`
            }}
          >
            {this.state.pokemonSpec}
          </span>
          <p className="pokemon-species-story">{this.state.pokemonStory}</p>
        </div>
        <div className="pokemon-abilities-container">
          <span className="pokemon-label">Abilities:</span>
          <Abilities abilities={this.state.pokes} />
        </div>
      </div>
    );
  }
}

//   {this.state.pokemonSpecies.flavor_text_entries[1].flavor_text}

const Abilities = ({ abilities }) => (
  <>
    {abilities.map(ability => (
      <span className="pokemon-abilities-info" key={ability.slot}>
        {ability.ability.name}
      </span>
    ))}
  </>
);
