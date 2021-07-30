import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'


class App extends React.Component{

  state = {
    toys: [],
    display: false
  }

  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }

  addNewToy = toy => {
    this.setState(prevState => {
      return {
        toys: [...prevState.toys, toy]
      }
    })
  }

  likeToy = toyId => {
    let index =  this.state.toys.findIndex(toy => toy.id === toyId)
    let toys = [...this.state.toys]
    toys[index].likes ++
    this.setState({
      toys 
    }, () => {
      fetch(`http://localhost:3001/toys/${toyId}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state.toys[index])
      })
        .then(resp => resp.json())
        .then(json => {
          console.log(json)
        })
    })
  }

  donateToy = toyId => {
    this.setState(prevState => {
      return {
        toys: prevState.toys.filter(toy => toy.id !== toyId)
      }
    })
    fetch(`http://localhost:3001/toys/${toyId}`, {
      method: 'DELETE'
    })
  }

  render(){
    return (
      <>
        <Header/>
        { this.state.display ? <ToyForm addNewToy={this.addNewToy}/> : null }
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer toys={this.state.toys ? this.state.toys : []} likeToy={this.likeToy} donateToy={this.donateToy} />
      </>
    );
  }

  // please ensure to be running the db.json on 'localhost:3001'
  componentDidMount(){
    fetch('http://localhost:3001/toys')
      .then(resp => resp.json())
      .then(toys => {
        this.setState({
          toys
        })
      })
  }

}

export default App;
