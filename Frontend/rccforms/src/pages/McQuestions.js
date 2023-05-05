import React, { Component } from "react";
import { Col, Container, Row } from "reactstrap";
import McQuestionList from "../components/mcQuestions/McQuestionList";
import NewMcQuestionModal from "../components/mcQuestions/NewMcQuestionModal";
import axios from "axios";
import { API_URL_MC_QUESTIONS } from "../constants";


class McQuestions extends Component {
    state = {
        mcQuestions: []
    };

    componentDidMount() {
        this.resetState();
    }

    getMcQuestions = () => {
        axios.get(API_URL_MC_QUESTIONS).then(
            res => this.setState({
                mcQuestions: res.data
            })
        );
    };

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
                        <NewMcQuestionModal
                            create={true}
                            resetState={this.resetState}
                            getMcQuestions={this.getMcQuestions}
                            />
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default McQuestions;