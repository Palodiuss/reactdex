import React from "react";
import axios from "axios";
import { Select } from "react-select-virtualized";
import { components } from "react-select";

let isLoadingExternally = false;

export default class PokemonsList extends React.Component {
  state = {
    pokemons: [],
    selectedValue: ""
  };

  componentDidMount() {
    isLoadingExternally = true;
    axios.get(`https://pokeapi.co/api/v2/pokemon?limit=721`).then(res => {
      let newRes = res.data.results.map(pokemon => {
        let url = pokemon.url.split("/");
        let id = url.pop() || url.pop();
        return {
          label: pokemon.name.toUpperCase(),
          value: id
        };
      });

      this.setState({ pokemons: Array.from(newRes) });
      isLoadingExternally = false;
    });
  }

  getPage(array, page) {
    return array.slice(0, page * 20);
  }

  handleChange = val => {
    this.setState({ selectedValue: val });
    if (val) {
      this.props.parentCallback(val.value);
    }
  };

  singleOption = props => (
    <components.Option {...props}>
      {props.data.value}
      {props.label}
    </components.Option>
  );

  singleValue = props => (
    <components.SingleValue {...props}>
      {props.data.value}
    </components.SingleValue>
  );

  render() {
    return (
      <Select
        //classNamePrefix="pokemons-list"
        placeholder={"Select your pokemon"}
        formatOptionLabel={formatOptionLabel}
        name={"form-field-name"}
        value={this.state.selectedValue}
        onChange={this.handleChange}
        isLoading={isLoadingExternally}
        options={this.state.pokemons}
        optionHeight={60}
        styles={colourStyles}
      />
    );
  }
}

const formatOptionLabel = ({ value, label }) => (
  <div
    style={{
      width: "100%",
      margin: "0 auto",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }}
  >
    <div style={{ fontSize: "18px", color: "#333" }}>{label}</div>

    <img
      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${value}.png`}
      alt="pokemon"
      style={{ height: "55px", marginRight: "25px" }}
    ></img>
  </div>
);

const colourStyles = {
  // control: (styles, { data, isDisabled, isFocused, isSelected }) => {
  //   return {
  //     ...styles,
  //     border: "none",
  //     border: isFocused ? "1px solid pink" : "none",
  //     border: isSelected ? "1px solid pink" : "none"
  //     //border: isFocused ? "green" : "blue"
  //   };
  // },

  // input: (styles, { data, isDisabled, isFocused, isSelected }) => {
  //   return {
  //     ...styles,
  //     border: "none",
  //     border: isFocused ? "1px solid pink" : "none",
  //     border: isSelected ? "1px solid pink" : "none"
  //     //border: isFocused ? "green" : "blue"
  //   };
  // },
  // control: styles => ({ ...styles, marginLeft: "10px" }),
  input: styles => ({ ...styles, marginLeft: "10px" }),
  placeholder: styles => ({ ...styles, marginLeft: "10px" }),
  singleValue: (styles, { data }) => ({
    ...styles,
    marginLeft: "10px",
    border: "none"
  })
};
