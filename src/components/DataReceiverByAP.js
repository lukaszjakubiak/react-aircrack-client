import React, { useState } from 'react'
import axios from 'axios'

function DataReceiverByAP() {

  const [data, setData] = useState({
    results: [],
    apmac: ''
  });

  const handleMACChange = e => {
    setData({
      ...data,
      apmac: e.target.value
    });
  }

  const handleSubmit = e => {
    e.preventDefault();
    const bodyFormData = new FormData();
    bodyFormData.set('apmac', data.apmac);
    axios({
      method: 'get',
      url: 'http://localhost:3002/wpaData/apmac/' + data.apmac,
      data: bodyFormData,
      header: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(response => {
        console.log(response);
        setData({
          ...data,
          results: response.data.objects
        });
      })
      .catch(error => {
        console.log(error);
      })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <h2>Get data for this MAC address</h2>
          <label>MAC address:</label>
          <input
            type='text'
            value={data.apmac}
            onChange={handleMACChange}
          ></input>
        </div>
        <button type='submit'>Get data for thi MAC address</button>
      </form>
      <ul>
        {
          data.results.map(obj => (
          <li key={obj._id}>Password for AP, MAC {obj.apmac} is "{obj.password}"</li>
          ))
        }
      </ul>
    </div>
  )
}

export default DataReceiverByAP
