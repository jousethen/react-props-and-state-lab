import React from 'react'

import Pet from './Pet'

class PetBrowser extends React.Component {

  generateInnerJSX = () => {
    return this.props.pets.map(item => <Pet key={item.id} pet={item} onAdoptPet={this.props.onAdoptPet} />)
  }

  render() {
    return <div className="ui cards">
      {this.generateInnerJSX()}
    </div>
  }
}

export default PetBrowser
