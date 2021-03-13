import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import PieChart from "./PieChart";
import PieDesc from "./PieDesc";
import { useHistory } from "react-router-dom";
import Jumbotron from "react-bootstrap/Jumbotron";


const Exercise = (props) => (
  <tr>
    <td> {props.exercise.userName}</td>
    <td> {props.exercise.description}</td>
    <td> {props.exercise.duration}</td>
    <td> {props.exercise.date.substr(0, 10)}</td>
    <td>
      <Link to={"/edit/" + props.exercise._id}>edit</Link> ||{" "}
      <a
        href="#"
        onClick={() => {
          props.deleteExercise(props.exercise._id);
        }}
      >
        {" "}
        Delete
      </a>
    </td>
  </tr>
);

export default function ExerciseList() {
  const [exercises, setExercises] = useState([]);
  const history = useHistory();
  // const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      await axios
        .get("http://localhost:5000/exercises")
        .then((response) => {
          // console.log("Response from useeffect: ", response)
          setExercises(response.data);
        })
        .catch((err) => console.log("Error " + err));
    }
     fetchData();
  }, [exercises]);

  // useEffect(() => {
  //     axios.get("http://localhost:8080/users").then((response) => setUsers(response.data)).catch((err) => console.log(err));
  // },[])

  const deleteExercise = (id) => {
    axios
      .delete("http://localhost:5000/exercises/" + id)
      .then((res) => console.log(res.data));
    setExercises(exercises.filter((ex) => ex._id !== id));
  };
  const createExercise = () => {
    history.push("/create");
  };



  const exerciseList = () => {
    // console.log("exerciseList:", exercises);
    return exercises.map((cx) => {
      return (
        <Exercise exercise={cx} deleteExercise={deleteExercise} key={cx._id} />
      );
    });
  };

  return (
    <>
      {" "}
      <Jumbotron id = "jumbo">
        <h1>Welcome!</h1>
        <h4>
          This is a simple Exercise tracker application. which tracks all the
          exercises
        </h4>
        
      </Jumbotron>
      {exercises.length > 0 ? (
        <>
          {" "}
          <h2>List Exercise</h2>
          <table className="table">
            <thead className="thead-light">
              <tr>
                <th>Username</th>
                <th>Description</th>
                <th>Duration</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>{exerciseList()}</tbody>
          </table>{" "}
        </>
      ) : (
        <>
        
          
          <h4>
            {" "}
            No Exercise Data Found Please create your exercises log:
            <button className="btn btn-primary" onClick={createExercise}>
              {" "}
              Create Exercise{" "}
            </button>
          </h4>
        </>
      )}
      <div className="parent">
        <PieChart />
        <PieDesc />
      </div>
    </>
  );
}
