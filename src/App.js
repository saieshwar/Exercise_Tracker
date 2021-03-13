import React from 'react'
import {BrowserRouter as Router, Route} from "react-router-dom";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from './Components/NavbarComponent';
import ExerciseList from './Components/ExerciseList';
import CreateExercise from './Components/CreateExercise';
import CreateUser from './Components/CreateUser';
import EditExercise from './Components/EditExercise'


function App() {
  return (
    <Router>
      <div className= "container">
        <Navbar/>
        <br/>
        <Route exact path = "/" component= {ExerciseList}/>
        <Route  path = "/edit/:id" component= {EditExercise}/>
        <Route  path = "/create" component= {CreateExercise}/>
        <Route  path = "/user" component= {CreateUser}/>
      </div>
    </Router>
  );
}

export default App;
