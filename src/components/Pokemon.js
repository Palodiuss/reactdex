import React from "react";
import axios from "axios";
import uuidv1 from "uuid";
import Chart from "./Chart";
import Moves from "./Moves";
import Types from "./Types";
import pokeColors from "./Colors";
import Stats from "./Stats";
import Description from "./Description";

export default class PokemonsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      pokemonData: "",
      pokemonSpecies: "",
      evolutionUrl: "",
      pokemonStory: [],
      pokemonEvolutions: [],
      pokemonEvoImages: [],
      loading: true,
      menuOption: "stats"
    };
  }

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
        this.setState({
          pokemonEvolutions: evolutions,
          pokemonEvoImages: images
        });
      });
    }
  }

  click() {
    console.log("asd");
  }

  componentDidMount() {
    this.setState({ loading: true });
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${this.props.id}`)
      .then(res => {
        this.setState({
          pokemonData: res.data
        });

        this.props.parentCallback(res.data.types);
      });

    axios
      .get(`https://pokeapi.co/api/v2/pokemon-species/${this.props.id}`)
      .then(res => {
        this.setState({
          pokemonSpecies: res.data,
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
            pokemonData: res.data
          });
          this.props.parentCallback(res.data.types);
        });

      axios
        .get(`https://pokeapi.co/api/v2/pokemon-species/${this.props.id}`)
        .then(res => {
          this.setState({
            pokemonSpecies: res.data,

            loading: false
          });
          this.getEvolutions();
        });
    }
  }

  renderOption = ({ option }) => {
    console.log(option);
    //console.log(this);
    switch (option) {
      case "stats":
        return (
          <div className="pokemon-stats-container">
            <Stats pokeData={this.state.pokemonData} />
            <span className="pokemon-label">Stats:</span>
          </div>
        );

      case "moves":
        return (
          <div className="pokemon-moves-container">
            <span className="pokemon-label">Moves:</span>
            <Moves pokeData={this.state.pokemonData} />
          </div>
        );
      case "evolutions":
        return (
          <div className="pokemon-evolutions">
            <h2 className="pokemon-evolutions-title">Evolutions</h2>

            <div className="evolutions-images-container">
              {this.state.pokemonEvoImages.map(image => (
                <div
                  key={uuidv1()}
                  className="pokemon-evo-image"
                  style={{
                    backgroundImage: `url(./img/pokemons-optimized/${image}.png)`,
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
        );

      default:
        return <div>asd</div>;
    }
  };

  render() {
    if (!this.state.loading)
      return (
        <div className="pokemon-container">
          <div
            className="pokemon-image"
            style={{
              backgroundImage: `url(./img/pokemons-optimized/${this.props.id}.png)`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover"
            }}
          ></div>
          <h1 className="pokemon-name">{this.state.pokemonData.name}</h1>
          <div className="pokemon-species-container">
            <div className="pokemon-types-container">
              <Types pokeData={this.state.pokemonData} />
            </div>

            <Description pokeData={this.state.pokemonSpecies} />
          </div>

          <div className="buttons-container">
            <div
              className="button"
              onClick={() => this.setState({ menuOption: "stats" })}
              style={
                this.state.menuOption === "stats"
                  ? {
                      backgroundColor: `${pokeColors(
                        this.state.pokemonData.types[0].type.name
                      )}`,

                      boxShadow: `0 0 5px ${pokeColors(
                        this.state.pokemonData.types[0].type.name
                      )}`,
                      color: "#fafafa"
                    }
                  : {
                      backgroundColor: "#fafafa",
                      boxShadow: "none",
                      color: `${pokeColors(
                        this.state.pokemonData.types[0].type.name
                      )}`
                    }
              }
            >
              STATS
            </div>
            <div
              className="button"
              onClick={() => this.setState({ menuOption: "evolutions" })}
              style={
                this.state.menuOption === "evolutions"
                  ? {
                      backgroundColor: `${pokeColors(
                        this.state.pokemonData.types[0].type.name
                      )}`,

                      boxShadow: `0 0 5px ${pokeColors(
                        this.state.pokemonData.types[0].type.name
                      )}`,
                      color: "#fafafa"
                    }
                  : {
                      backgroundColor: "#fafafa",
                      boxShadow: "none",
                      color: `${pokeColors(
                        this.state.pokemonData.types[0].type.name
                      )}`
                    }
              }
            >
              EVOLUTIONS
            </div>
            <div
              className="button"
              onClick={() => this.setState({ menuOption: "moves" })}
              style={
                this.state.menuOption === "moves"
                  ? {
                      backgroundColor: `${pokeColors(
                        this.state.pokemonData.types[0].type.name
                      )}`,

                      boxShadow: `0 0 5px ${pokeColors(
                        this.state.pokemonData.types[0].type.name
                      )}`,
                      color: "#fafafa"
                    }
                  : {
                      backgroundColor: "#fafafa",
                      boxShadow: "none",
                      color: `${pokeColors(
                        this.state.pokemonData.types[0].type.name
                      )}`
                    }
              }
            >
              MOVES
            </div>
          </div>

          {this.state.menuOption === "moves" ? (
            <div className="pokemon-moves-container">
              <Moves pokeData={this.state.pokemonData} />
            </div>
          ) : null}

          {this.state.menuOption === "stats" ? (
            <div>
              {" "}
              {/* <div className="pokemon-stats-container">
                <Stats pokeData={this.state.pokemonData} />
              </div> */}
              <div className="pokemon-stats-chart">
                <Chart
                  chartData={getChartData(
                    this.state.pokemonData.stats,
                    this.state.pokemonData.types
                  )}
                />
              </div>
            </div>
          ) : null}

          {this.state.menuOption === "evolutions" ? (
            <div className="pokemon-evolutions">
              <div className="evolutions-images-container">
                {this.state.pokemonEvoImages.map(image => (
                  <div
                    key={uuidv1()}
                    className="pokemon-evo-image"
                    style={{
                      backgroundImage: `url(./img/pokemons-optimized/${image}.png)`,
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
          ) : null}
        </div>
      );
    else return <div>Loading...</div>;
  }
}

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

const getStats = stats => {
  let statsArray = [];
  if (stats.length) {
    statsArray = stats.map(stat => {
      return stat.base_stat;
    });
  }
  return statsArray;
};

const getID = url => {
  let newUrl = url.split("/");
  let id = newUrl.pop() || newUrl.pop();
  return id;
};
