import React, { useState,useEffect } from "react";
import {useHistory} from 'react-router-dom'
import DatePicker from 'react-datepicker'
import axios from 'axios';

import "react-datepicker/dist/react-datepicker.css";

export default function CreateExercise() {
  const [userName, setUserName] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState(0);
  const [date, setDate] = useState(new Date());
  const [users, setUsers] = useState([]);
  
    const history = useHistory();

    useEffect(() => {

      axios.get("http://localhost:5000/users")
      .then(response => {
        if(response.data.length > 0) {
          setUsers(response.data.map (user => user.userName))
          setUserName(response.data[0].userName)
        }
      })
    }, [])
 

 const submit = async(e) => {
      e.preventDefault();
   
      const ExerciseData = {userName,description,duration,date};
      axios.post("http://localhost:5000/exercises/add",ExerciseData)
      .then(res => console.log(res.data));
      history.push("/");
    
  }

  return (
    <div> 
    
     <h3>Create Exercise </h3> 
      <form  onSubmit= {submit}>
        <label> UserName:</label>
        <select required className= "form-group" value = {userName} onChange={(e) => setUserName(e.target.value)}>
        { 
            users.map((user) => {
            return <option key = {user} value = {user}> {user} </option>
            })
        }
        
        </select>

        <div className="form-group">
          <label>Description: </label>
          <input
            type="text"
            required
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Duration (in minutes): </label>
          <input
            type="number"
            className="form-control"
            min={0}
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker
              selected={date}
              onChange ={(e) => setDate(e)}
            />
          </div>
        </div>
        <div className="form-group">
          <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
        </div>
      </form>
    </div>
  );
}
