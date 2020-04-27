import React, { useState, useRef } from 'react'
import axios from 'axios';

function DataSender() {

    const [data, setData] = useState({
        apmac: ''
    });

    const fileInput = useRef(null);


    const handleMACChange = e => {
        setData({
            ...data,
            apmac: e.target.value
        });
    }

    const handleSubmitForm = e => {
        e.preventDefault();
        // console.log('From ref: %j', fileInput.current.files[0]);
        const bodyFormData = new FormData();
        bodyFormData.set('apmac', data.apmac);
        bodyFormData.append('capfile', fileInput.current.files[0]);

        axios({
            method: 'post',
            url: 'http://localhost:3002/wpaData',
            data: bodyFormData,
            headers: { 'Content-Type': 'multipart/form-data' }
        })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <div>
            Form:
            <form onSubmit={handleSubmitForm}>
                <div>
                    <label>MAC address:</label>
                    <input
                        type='text'
                        value={data.apmac}
                        onChange={handleMACChange}
                    />
                    <label>format: aa:bb:cc:dd:ee:ff</label>
                </div>
                <div>
                    <label>cap file:</label>
                    <input
                        type='file'
                        ref={fileInput}
                    ></input>
                </div>
                <button type='submit'>Send for processing</button>
            </form>
        </div>
    );
}

export default DataSender