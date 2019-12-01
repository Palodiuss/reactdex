import React  from 'react'
import axios from 'axios'
import { Select } from "react-select-virtualized";





let isLoadingExternally = false;

export default class PokemonsList extends React.Component {
  state = {
    pokemons: [],
    selectedValue: ''
  }

  

  componentDidMount() {
    isLoadingExternally = true;
    axios.get(`https://pokeapi.co/api/v2/pokemon?limit=964`)
    .then(res => {
  
      let newRes = res.data.results.map((pokemon) => {
        let url = pokemon.url.split("/");
        let id = url.pop() || url.pop();
        return {
          label: pokemon.name,
          value: id
        }
    })

    this.setState({pokemons: Array.from(newRes)});
    isLoadingExternally = false;
    
   });
  }

  getPage(array, page) {
    return array.slice(0, page*20);
  }

  handleChange = (val) => {
    this.setState({selectedValue: val.label});
} 


  render() {
    return (

     <div>
  <span>{this.state.selectedValue}</span>
        <Select
                name="form-field-name"
                value={this.state.selectedValue}
                onChange={this.handleChange}
                clearable={true}
                searchable={true}
                isLoading={isLoadingExternally}
                options={this.state.pokemons}                 
            />

            </div>


    );
  }
}




