import React, { useState, useEffect } from "react";

import axios from "axios";
import { Pie } from "react-chartjs-2";

export default function PieDesc() {
  const [userName, setUserName] = useState("");
  const [users, setUsers] = useState([]);
  const [exerDesc, setExerDesc] = useState([]);
  const [duration, setDuration] = useState([]);

  useEffect(() => {
   
    axios.get("http://localhost:5000/users").then((response) => {
      if (response.data.length > 0) {
        setUsers(response.data.map((user) => user.userName));
        setUserName(response.data[0].userName, () => getData());
      }
    });
    
  }, []);

  // const submit = useCallback( (e) => {
  //   e.preventDefault();
  //   getData();
  // });

  useEffect(() => {
    // console.log("useEffect called after userName changed");
    getData();
  }, [userName,exerDesc]);

  const getData = () => {
    // console.log("get data userName: ", userName);
    axios.get("http://localhost:5000/exercises").then((response) => {
        // console.log("Exercise Responses", response.data);
        setExerDesc(response.data.filter((user) =>  user.userName === userName && user).map(item =>  item.description)
        );
        
        setDuration(
          response.data.filter((user) =>  user.userName === userName && user).map(item =>  item.duration)
        );
       
      });
  }
  const onChange = ( (e) => {
    setUserName(e.target.value);
    getData();
  });


  return (
    <div>
      
      <h3>User Exercise Data</h3>
      
        <select
          required
          className="custom-select"
          value={userName}
          onChange={onChange}
        >
          {users.map((user) => {
            return (
              <option key={user} value={user}>
                {" "}
                {user}{" "}
              </option>
            );
          })}
        </select>
     
        {duration.length>0 ? 
      <Pie
        data={{
          datasets: [
            {
              label: "User Exercise",
              data: duration,
              backgroundColor: [
                "#ffcd56",
                "#ff6384",
                "#36a2eb",
                "#000000",
                "#B3B6B7",
                "#A533FF",
                "#311846",
                "#6D6673",
              ],
            },
          ],
          labels: exerDesc,
        }}
      /> : <> No Exercise Data found for this user</> }
      
      
    </div>
  );
}
