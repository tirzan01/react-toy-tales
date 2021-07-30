import React, { Component } from 'react';

class ToyCard extends Component {
  
  render() {
    return (
      <div key={this.props.toy.id} className="card">
        <h2>{this.props.toy.name}</h2>
        <img src={this.props.toy.image} alt={this.props.toy.name} className="toy-avatar" />
        <p>{this.props.toy.likes} Likes </p>
        <button className="like-btn" onClick={() => this.props.likeToy(this.props.toy.id)}>Like {'<3'}</button>
        <button className="del-btn" onClick={() => this.props.donateToy(this.props.toy.id)}>Donate to GoodWill</button>
      </div>
    );
  }

}

export default ToyCard;
