import React from "react";
import axios from "axios";
import uuidv1 from "uuid";
import Chart from "./Chart";

export default class PokemonsList extends React.Component {
  state = {
    id: "",
    pokemonData: "",
    pokemonSpecies: "",
    pokemonSpec: "",
    pokemonSpecColor: "",
    evolutionUrl: "",
    pokemonAbilities: "",
    pokes: [],
    pokemonStats: []
  };

  componentDidMount() {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${this.props.id}`)
      .then(res => {
        this.setState({
          pokemonData: res.data,
          pokes: res.data.abilities,
          pokemonStats: res.data.stats,
          pokemonAbilities: res.data.abilities[0].ability.name
        });
        this.props.parentCallback(res.data.types);
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
            pokemonStats: res.data.stats,
            pokemonAbilities: res.data.abilities[0].ability.name
          });
          this.props.parentCallback(res.data.types);
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
        <h1 className="pokemon-name">{this.state.pokemonData.name}</h1>
        <div className="pokemon-species-container">
          <span
            className="pokemon-species-info"
            style={{
              backgroundColor: `${this.state.pokemonSpecColor}`,
              boxShadow: `0 0 5px ${this.state.pokemonSpecColor}`,
              color:
                this.state.pokemonSpecColor === "white" ||
                this.state.pokemonSpecColor === "yellow"
                  ? "#333"
                  : "#fafafa"
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

        <div className="pokemon-stats-container">
          <Stats stats={this.state.pokemonStats} />
          <span className="pokemon-label">Stats:</span>
        </div>

        <div className="pokemon-stats-chart">
          <Chart />
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

const Stats = ({ stats }) => (
  <>
    {stats.map(stat => (
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
