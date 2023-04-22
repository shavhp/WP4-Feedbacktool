import React, { Component } from 'react';
import axios from 'axios';

class ExampleComp extends Component {
    state = {
        data: null
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/example/')
            .then(response => this.setState({ data: response.data }))
            .catch(error => console.log(error));
    }

    render() {
        return (
            <div>
                <h1>HALLO FROM COMPONENT</h1>
                {/* render data from API call */}
            </div>
        );
    }
}

export default ExampleComp;