import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  handleFilterChange = (event) => {
    this.setState({
      filters: {
        type: event.target.value
      }
    });
  };



  findPets = () => {
    let fetchURL = "";
    switch (this.state.filters.type) {
      case 'all': fetchURL = '/api/pets'
        break;
      case 'cat': fetchURL = '/api/pets?type=cat'
        break;
      case 'dog': fetchURL = '/api/pets?type=dog'
        break;
      case 'micropig': fetchURL = '/api/pets?type=micropig'
        break;
    }
    fetch(fetchURL).then(function (response) {
      return response.json();
    }).then(function (json) {
      this.setState({
        pets: json
      }, () => { console.log(this.state.pets) });
    }.bind(this));
  }

  adoptPet = (petID) => {
    let petIndex = this.state.pets.findIndex(p => { return p.id === petID })
    let petsCopy = this.state.pets;
    petsCopy[petIndex].isAdopted = true;

    this.setState({
      pets: petsCopy
    })
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onFindPetsClick={this.findPets} onChangeType={this.handleFilterChange} />
            </div>
            <div className="twelve wide column">
              <PetBrowser onAdoptPet={this.adoptPet} pets={this.state.pets} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
