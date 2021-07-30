import React, { Component } from 'react';

class ToyForm extends Component {

  constructor() {
    super()

    this.state = {
      name: '',
      image: ''
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    if(this.state.name && this.state.image) {
      fetch('http://localhost:3001/toys', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({...this.state, likes:0})
      })
        .then(resp => resp.json())
        .then(toy => {
          this.props.addNewToy(toy)
          this.setState({
            name: '',
            image: ''
          })
        })
    }
  }

  render() {
    return (
      <div className="container">
        <form className="add-toy-form" onSubmit={this.handleSubmit}>
          <h3>Create a toy!</h3>
          <input type="text" name="name" onChange={this.handleChange} value={this.state.name} placeholder="Enter a toy's name..." className="input-text"/>
          <br/>
          <input type="text" name="image" onChange={this.handleChange} value={this.state.image} placeholder="Enter a toy's image URL..." className="input-text"/>
          <br/>
          <input type="submit" name="submit" value="Create New Toy" className="submit"/>
        </form>
      </div>
    );
  }

}

export default ToyForm;
