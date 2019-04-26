import React, { Component } from 'react';
import './App.css';

import Form from './components/Form';
import Recipes from './components/Recipes';

const API_KEY = '8143675f2e95e117fd58db50b573edf5';
const PROXY = 'https://cors-anywhere.herokuapp.com/'

class App extends Component {
  state = {
    recipes: []
  }
  componentDidMount = () => {
    const recipes = JSON.parse(localStorage.getItem("recipes"))
    this.setState({ recipes })
  }
  componentDidUpdate = () => {
    const recipes = JSON.stringify(this.state.recipes);
    localStorage.setItem("recipes", recipes)
  }
  getRecipe = async(e) => {
    e.preventDefault();
    const recipeName = e.target.elements.recipeName.value;
    const api_call = await fetch(`${PROXY}https://www.food2fork.com/api/search?key=${API_KEY}&q=${recipeName}&count=9`);
    const data = await api_call.json();
    this.setState({
      recipes: data.recipes
    })
    console.log(this.state.recipes);
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Recipe Search</h1>
        </header>
        <Form getRecipe={this.getRecipe} />
        <Recipes recipes={this.state.recipes}/>
      </div>
    );
  }
}

export default App;