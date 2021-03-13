import React, { useState } from "react";
import {useHistory} from 'react-router-dom';
import axios from 'axios';

export default function CreateUser() {
  const [userName, setUserName] = useState("");
 
  const history = useHistory();

  const submit = (e)=> {
      e.preventDefault();
      
      const user = {userName};

      axios.post ("http://localhost:5000/users/add", user)
      .then(res => console.log(res.data));

      history.push("/");
      
  }

  return (
    <div>
       
      <h3>Create User </h3>
      <form onSubmit = {submit}>
        <div className="form-group">
          <label> UserName:</label>
          <input
            type="text"
            required
            className="form-control"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          ></input>
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Create User"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
