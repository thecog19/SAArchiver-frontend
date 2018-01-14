import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <PostArray/>
    );
  }
}

class Post extends React.Component{
  render(){
    return (
      <div>
        <br /> 
        <h1> Post </h1> 
        <p> {this.props.post} </p>
      </div>)
  }
}

function PostArray(){
  return (
    <div>
      <Post post="Sara" />
      <Post post="Cahal" />
      <Post post="Edite" />
    </div>
  );
}

export default App;
