import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

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

const element = < PostArray />
ReactDOM.render(element, document.getElementById('root'));
