import React, { useState, Component } from 'react'
import axios from 'axios';

class DataSender extends Component {

    constructor(props) {
        super(props)

        this.state = {
            apmac: '',
            capfile: ''
        }
        this.fileInput = React.createRef();
    };


    handleMACChange = e => {
        // setData({
        //     ...data,
        //     apmac: e.target.value
        // });
        this.setState({
            apmac: e.target.value
        });
    }

    handleCAPFileChange = e => {
        // console.log(e);
        // console.log(e.target);
        console.log('From event: %j', e.target.files[0]);
        console.log('From ref: %j', this.fileInput.current.files[0]);
        // setData({
        //     ...data,
        //     capfile: fileInput.current.files[0]
        // });
        // this.setState({
        //     capfile: this.fileInput.current.files[0].name
        // });
        // alert(
        //     `Selected file - ${fileInput.current.files[0].name}`    
        //     );

    }

    handleSubmitForm = e => {
        e.preventDefault();
        // axios.post('http://localhost:3002/wpaData', data,
        //  {
        // headers: {
        // 'Access-Control-Allow-Origin': '*',
        // 'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>'
        // }
        // }, { withCredentials: true }
        // )
        console.log('From ref on submit: %j', this.fileInput.current);
        const bodyFormData = new FormData();
        bodyFormData.set('apmac', this.state.apmac);
        bodyFormData.append('capfile', this.fileInput.current.files[0]);
        console.log(this.state.capfile);
        axios({
            method: 'post',
            url: 'http://localhost:3002/wpaData',
            data: bodyFormData,
            headers: { 'Content-Type': 'multipart/form-data' }
        })
            // })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        return (
            <div>

                <form onSubmit={this.handleSubmitForm}>
                    <div>
                        <label>MAC address:</label>
                        <input
                            type='text'
                            value={this.state.apmac}
                            onChange={this.handleMACChange}
                        />
                        <label>format: aa:bb:cc:dd:ee:ff</label>
                    </div>
                    <div>
                        <label>cap file:</label>
                        <input
                            type='file'
                            // value={this.state.capfile}
                            ref={this.fileInput}
                            // onChange={this.handleCAPFileChange}
                        ></input>
                    </div>
                    <button type='submit'>Send for processing</button>
                </form>
            </div >
        );
    }
}

export default DataSender