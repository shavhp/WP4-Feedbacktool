// Source:
// https://reactstrap.github.io/?path=/docs/components-card--card

import {Card, CardBody, CardTitle, CardText} from "reactstrap";
import {Link} from "react-router-dom";
import React, {useState, useEffect} from "react";
import {API_URL_COUNT_OPEN_Q} from "../constants";
import axios from "axios";


function Homepage() {
    const [counter, setCounter] = useState({});

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(API_URL_COUNT_OPEN_Q);
            setCounter(response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div
            style={{
                margin: '30px'
            }}
        >
            <h2>Dashboard</h2>
            <div
                className="d-flex flex-row"
            >

                <Link
                    to="/openQuestions"
                    style={{
                        textDecoration: "none",
                        color: "white"
                    }}>
                    <Card
                        inverse
                        style={{
                            width: '18rem',
                            height: '7rem',
                            margin: '20px 0',
                            backgroundColor: '#1C5EAD'
                        }}>

                        <CardBody>
                            <CardTitle
                                tag="h5"
                            >
                                Open vragen
                            </CardTitle>
                            <CardText
                                style={{fontSize: '20px'}}
                            >
                                {counter.all_open_q} items
                            </CardText>
                        </CardBody>
                    </Card>
                </Link>


                <Card
                    inverse
                    className="text-center"
                    style={{
                        width: '7rem',
                        height: '7rem',
                        margin: '20px 40px',
                        backgroundColor: '#00807c'
                    }}>
                    <CardBody>
                        <CardTitle
                            tag="h2"
                        >
                            {counter.all_responses}
                        </CardTitle>
                        < CardText>
                            responsen aanwezig
                        </CardText>
                    </CardBody>
                </Card>
            </div>

            <Link
                to="/mcQuestions"
                style={{
                    textDecoration: "none",
                    color: "white"
                }}>
                <Card
                    inverse
                    style={{
                        width: '18rem',
                        height: '7rem',
                        margin: '20px 0',
                        backgroundColor: '#4BA21C'
                    }}>

                    <CardBody>
                        <CardTitle
                            tag="h5">
                            Meerkeuzevragen
                        </CardTitle>
                        <CardText
                            style={{fontSize: '20px'}}
                        >
                            {counter.all_mc_q} items
                        </CardText>
                    </CardBody>
                </Card>
            </Link>

            <Link
                to="/forms"
                style={{
                    textDecoration: "none",
                    color: "white"
                }}>
                <Card
                    inverse
                    style={{
                        width: '18rem',
                        height: '7rem',
                        margin: '40px 0',
                        backgroundColor: '#008FDE'
                    }}>
                    <CardBody>
                        <CardTitle
                            tag="h5"
                        >
                            Vragenlijsten
                        </CardTitle>
                        <CardText
                            style={{fontSize: '20px'}}
                        >
                            {counter.all_surveys} items
                        </CardText>
                    </CardBody>
                </Card>
            </Link>
        </div>
    )
}

export default Homepage;