import React, { Component } from "react";
import { Col, Container, Row } from "reactstrap";
import QuestionList from "../components/Questions/QuestionList";
import NewQuestionModal from "../components/Questions/NewQuestionModal";
import axios from "axios";
import { API_URL_QUESTIONS, API_URL_MC_OPTIONS } from "../constants";


class Questions extends Component {
    state = {
        questions: [],
        multipleChoice: []
    };

    componentDidMount() {
        this.resetState();
    }

    getQuestions = () => {
        axios.get(API_URL_QUESTIONS).then(
            res => this.setState({
                questions: res.data
            })
        );
    };

    getMcOptions = () => {
        axios.get(API_URL_MC_OPTIONS).then(
            res => this.setState({
                multipleChoice: res.data
            })
        );
    };

    resetState = () => {
        this.getQuestions();
        this.getMcOptions();
    };

    render() {
        return (
            <Container style={{ marginTop: "20px" }}>
                <Row>
                    <Col>
                        <QuestionList
                            questions={this.state.questions}
                            multipleChoice={this.state.multipleChoice}
                            resetState={this.resetState}
                            />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <NewQuestionModal
                            create={true}
                            resetState={this.resetState}
                            getQuestions={this.getQuestions}
                            getMcOptions={this.getMcOptions}
                            />
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Questions;