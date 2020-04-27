import React, { useState } from 'react'
import axios from 'axios'

function DataReceiver() {

  const [data, setData] = useState([]);


  const handleSubmit = e => {
    e.preventDefault();
    axios({
      method: 'get',
      url: 'http://localhost:3002/wpaData',
      header: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        console.log(response);
        console.log('response.data %j', response.data);
        setData(response.data.objects);
        // console.log('data %j', data);
      })
      .catch(error => {
        console.log(error);
      })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <h2>Get all data</h2>
        </div>
        <button type='submit'>Get all data</button>
      </form>
      <ul>
        {
          data.map(obj => (
          <li key={obj._id}>Hasło dla AP o MAC {obj.apmac} to "{obj.password}"</li>
          ))
        }
      </ul>
    </div>
  )
}

export default DataReceiver
