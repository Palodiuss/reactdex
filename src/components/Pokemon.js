import React from "react";
import axios from "axios";
import uuidv1 from "uuid";
import Chart from "./Chart";

export default class PokemonsList extends React.Component {
  state = {
    id: "",
    pokemonData: "",
    pokemonSpecies: "",
    evolutionUrl: "",
    pokemonAbilities: [],
    pokemonTypes: [],
    pokemonStats: [],
    pokemonStory: [],
    pokemonEvolutions: [],
    pokemonEvoImages: [],
    loading: true
  };

  getEvolutions() {
    const evolutions = [];
    const images = [];
    let nextEvolution;
    let data = this.state.pokemonSpecies;

    if (data) {
      axios.get(data.evolution_chain.url).then(res => {
        evolutions.push(res.data.chain.species.name);
        images.push(getID(res.data.chain.species.url));
        nextEvolution = res.data.chain.evolves_to;
        while (nextEvolution.length) {
          evolutions.push(nextEvolution[0].species.name);
          images.push(getID(nextEvolution[0].species.url));
          nextEvolution = nextEvolution[0].evolves_to;
        }
        console.log(evolutions);
        console.log(images);
        this.setState({
          pokemonEvolutions: evolutions,
          pokemonEvoImages: images
        });
      });
    }
  }

  componentDidMount() {
    this.setState({ loading: true });
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${this.props.id}`)
      .then(res => {
        this.setState({
          pokemonData: res.data,
          pokemonAbilities: res.data.abilities,
          pokemonTypes: res.data.types,
          pokemonStats: res.data.stats
        });
        this.props.parentCallback(res.data.types);
      });

    axios
      .get(`https://pokeapi.co/api/v2/pokemon-species/${this.props.id}`)
      .then(res => {
        this.setState({
          pokemonSpecies: res.data,
          pokemonStory: res.data.flavor_text_entries,
          evolutionUrl: res.data.evolution_chain.url,
          loading: false
        });
        this.getEvolutions();
      });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.id !== this.props.id) {
      this.setState({ loading: true });
      axios
        .get(`https://pokeapi.co/api/v2/pokemon/${this.props.id}`)
        .then(res => {
          this.setState({
            pokemonData: res.data,
            pokemonTypes: res.data.types,
            pokemonAbilities: res.data.abilities,
            pokemonStats: res.data.stats
          });
          this.props.parentCallback(res.data.types);
        });

      axios
        .get(`https://pokeapi.co/api/v2/pokemon-species/${this.props.id}`)
        .then(res => {
          this.setState({
            pokemonSpecies: res.data,

            pokemonStory: res.data.flavor_text_entries,
            evolutionUrl: res.data.evolution_chain.url,
            loading: false
          });
          this.getEvolutions();
          console.log(this.state.pokemonEvolutions);
        });
    }
  }

  render() {
    if (!this.state.loading)
      return (
        <div className="pokemon-container">
          <div
            className="pokemon-image"
            style={{
              backgroundImage: `url(./pokemon/${this.props.id}.png)`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover"
            }}
          ></div>
          <h1 className="pokemon-name">{this.state.pokemonData.name}</h1>
          <div className="pokemon-species-container">
            <div className="pokemon-types-container">
              <Types types={this.state.pokemonTypes} />
            </div>

            <Description descriptions={this.state.pokemonStory} />
          </div>
          <div className="pokemon-abilities-container">
            <span className="pokemon-label">Abilities:</span>
            <Abilities abilities={this.state.pokemonAbilities} />
          </div>

          <div className="pokemon-stats-container">
            <Stats stats={this.state.pokemonStats} />
            <span className="pokemon-label">Stats:</span>
          </div>

          <div className="pokemon-stats-chart">
            <Chart
              chartData={getChartData(
                this.state.pokemonStats,
                this.state.pokemonTypes
              )}
            />
          </div>

          <div className="pokemon-evolutions">
            <h2 className="pokemon-evolutions-title">Evolutions</h2>

            <div className="evolutions-images-container">
              {this.state.pokemonEvoImages.map(image => (
                <div
                  key={uuidv1()}
                  className="pokemon-evo-image"
                  style={{
                    backgroundImage: `url(./pokemon/${image}.png)`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover"
                  }}
                ></div>
              ))}
            </div>
            <div className="evolutions-labels">
              {this.state.pokemonEvolutions.map(evolution => (
                <span className="evolution-name" key={uuidv1()}>
                  {evolution}
                </span>
              ))}
            </div>
          </div>
        </div>
      );
    else return <div>Loading...</div>;
  }
}

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

const getStats = stats => {
  let statsArray = [];
  if (stats.length) {
    statsArray = stats.map(stat => {
      return stat.base_stat;
    });
  }
  return statsArray;
};

const Types = ({ types }) => {
  let pokeColor = "";
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

const Description = descriptions => {
  var text = "";

  for (let i = 0; i < descriptions.descriptions.length; i++) {
    if (descriptions.descriptions[i].language.name === "en") {
      let flavor = descriptions.descriptions[i].flavor_text.replace(
        /(\r\n|\n|\r)/gm,
        " "
      );
      text = <p className="pokemon-species-story">{flavor}</p>;
      break;
    }
  }

  return text;
};

const getPrimaryColor = types => {
  types.forEach(type => {
    if (type.slot === 1) {
      let color = pokeColors(type.type.name);

      return color;
    }
  });
};

const getChartData = (data, types) => {
  let pokeData = getStats(data);

  var chartData = {
    labels: ["SPD", "SDEF", "SATK", "DEF", "ATK", "HP"],
    datasets: [
      {
        label: "stats",
        data: pokeData,
        pointStyle: "circle",

        pointRadius: 3
      }
    ]
  };

  return chartData;
};

const getID = url => {
  let newUrl = url.split("/");
  let id = newUrl.pop() || newUrl.pop();
  return id;
};
