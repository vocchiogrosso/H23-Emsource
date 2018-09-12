import React, {Component} from 'react';
import FlipMove from 'react-flip-move';

export default class Emergency extends Component {
  constructor(props){
    super(props)
  }

  render() {
    let userCards;
    if('features' in this.props.userData){
      userCards = this.props.userData.features.map((data, index) => {
        return(

          <div className="card" key={index}>
            <p>{data.name}</p>
            <p>{data.type}</p>
            <p>{data.dist}</p>
          </div>

        )
      })
    } else {
      userCards = null
    }

    console.log(userCards, this.props.userData)
    return (

      <div className="cards">
        {userCards}
      </div>
    )
  }
};
