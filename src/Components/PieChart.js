import React,{useState,useEffect} from 'react'

import axios from 'axios'
import {Pie} from "react-chartjs-2"

export default function PieChart() {

    const[userData, setUserData] = useState([]);
    const[value, setValue] = useState([])


    useEffect(() => {
        
        axios.get("http://localhost:5000/users")
        .then(response =>  {
           // console.log("User Respones",response.data)
            setUserData(response.data.map( user => user.userName));
            setValue(response.data.map(user => 1))
        })
      
    }, [userData])


    return (
        <div>
            {userData.length>0 && <>
            <h3> List Users</h3>

            
            <Pie
                data = { 
                {
                    datasets: [ {
                        label : 'Users',
                         data : value,
                        backgroundColor: [
                            '#ffcd56',
                            '#ff6384',
                            '#36a2eb',
                            '#000000',
                            '#B3B6B7',
                            '#A533FF',
                            '#311846',
                            '#6D6673'
                        ]
                    
                    }],
                    labels: userData
                    
                }
            }/>
       </> }

           
        </div>
    )
}
