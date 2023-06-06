import React, { Component } from "react";
import { Col, Container, Row } from "reactstrap";
import OpenQuestionList from "../components/openQuestions/OpenQuestionList";
import NewOpenQuestionModal from "../components/openQuestions/NewOpenQuestionModal";
import axios from "axios";
import { API_URL_OPEN_Q } from "../constants";


class OpenQuestions extends Component {
    state = {
        openQuestions: [],
    };

    componentDidMount() {
        this.resetState();
    }

    getOpenQuestions = () => {
        axios.get(API_URL_OPEN_Q).then(
            res => this.setState({
                openQuestions: res.data
            })
        );
    };

    // Refreshes the table and displays questions and mc options
    resetState = () => {
        this.getOpenQuestions();
    };

    render() {
        return (
            <Container style={{ marginTop: "20px" }}>
                <Row>
                    <Col>
                        <OpenQuestionList
                            openQuestions={this.state.openQuestions}
                            resetState={this.resetState}
                            />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <NewOpenQuestionModal
                            create={true}
                            resetState={this.resetState}
                            getOpenQuestions={this.getOpenQuestions}
                            />
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default OpenQuestions;