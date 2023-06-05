import React, { Component } from "react";
import { Col, Container, Row } from "reactstrap";
import OpenQuestionList from "../components/openQuestions/OpenQuestionList";
import NewQuestionModal from "../components/openQuestions/NewOpenQuestionModal";
import axios from "axios";
import { API_URL_OPEN_Q } from "../constants";


class OpenQuestions extends Component {
    state = {
        openQuestions: [],
        // mcQuestions: [],
        // qSelected: 1
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

    // getMcQuestions = () => {
    //     axios.get(API_URL_MC_Q).then(
    //         res => this.setState({
    //             mcQuestions: res.data
    //         })
    //     );
    // };

    // Refreshes the table and displays questions and mc options
    resetState = () => {
        this.getOpenQuestions();
        // this.getMcQuestions();
    };

    render() {
        return (
            <Container style={{ marginTop: "20px" }}>
                <Row>
                    <Col>
                        <OpenQuestionList
                            openQuestions={this.state.openQuestions}
                            // mcQuestions={this.state.mcQuestions}
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
                            // getMcQuestions={this.getMcQuestions}
                            />
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default OpenQuestions;