import React, { Component } from "react";
import { Col, Container, Row } from "reactstrap";
import StudentList from "./StudentList";
import NewStudentModal from "./NewStudentModal";
import axios from "axios";
import { API_URL } from "../constants";

// This state function hosts the array of students from the server
class Home extends Component {
    state = {
        students: []
    };

    // resetState calls getStudents -> calls GET endpoint to get student list
    componentDidMount() {
        this.resetState();
    }

    getStudents = () => {
        axios.get(API_URL).then(res => this.setState({student: res.data}));
    };

    resetState = () => {
        this.getStudents();
    };
    render() {
        return (
            <Container style={{ marginTop: "20px" }}>
                <Row>
                    <Col>
                        <StudentList
                            students={this.state.students}
                            resetState={this.resetState}
                            />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <NewStudentModal create={true} resetState={this.resetState} />
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Home;