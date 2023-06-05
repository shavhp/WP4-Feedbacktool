import React, { Component } from "react";
import { Col, Container, Row } from "reactstrap";
import McQuestionList from "../components/mcQuestions/QuestionList";
import NewQuestionModal from "../components/openQuestions/NewQuestionModal";
import axios from "axios";
import { API_URL_MC_Q } from "../constants";


class McQuestions extends Component {
    state = {
        mcQuestions: [],
    };

    componentDidMount() {
        this.resetState();
    }

    getOpenQuestions = () => {
        axios.get(API_URL_MC_Q).then(
            res => this.setState({
                mcQuestions: res.data
            })
        );
    };

    getMcQuestions = () => {
        axios.get(API_URL_MC_Q).then(
            res => this.setState({
                mcQuestions: res.data
            })
        );
    };

    // Refreshes the table and displays questions and mc options
    resetState = () => {
        this.getMcQuestions();
    };

    render() {
        return (
            <Container style={{ marginTop: "20px" }}>
                <Row>
                    <Col>
                        <McQuestionList
                            mcQuestions={this.state.mcQuestions}
                            resetState={this.resetState}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <NewQuestionModal
                            create={true}
                            resetState={this.resetState}
                            getOpenQuestions={this.getOpenQuestions}
                            getMcQuestions={this.getMcQuestions}
                            />
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default McQuestions;