import React, { Component, Fragment } from "react";
import { Table, ButtonGroup, Button } from "reactstrap";
import axios from "axios";
import {
    API_URL_QUESTIONS,
    API_URL_MC_OPTIONS,
    API_URL_HIDE_QUESTION,

} from "../../constants";
import NewQuestionModal from "./NewQuestionModal";


class QuestionList extends Component {
    state = {
        questions: [],
        qSelected: 1,
        options: []
    };

    componentDidMount() {
        this.getQuestions();
        this.getMcOptions();
    }

    handleQuestionTypeSelection = value => {
        this.setState({
            qSelected: value
        }, () => {
            if (value === 2) {
                this.getMcOptions();
            }
        });
    };

    getQuestions() {
        axios.get(API_URL_QUESTIONS).then(res => this.setState(
            { questions:res.data }
        ));
    }

    getMcOptions() {
        axios.get(API_URL_MC_OPTIONS).then(res => this.setState(
            { options:res.data }
        ));
    }

    handleHideQuestion = (questionId) => {
        axios
            .post(`${API_URL_HIDE_QUESTION}${questionId}/hide/`)
            .then((response) => {
                if (response.data.success) {
                    this.setState((prevState) => ({
                        questions: prevState.questions.filter(
                            (question) => question.id !== questionId
                        ),
                    }));
                } else {
                    console.log(response.data.error);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    render() {
        const questions = this.state.questions;
        const { qSelected, options } = this.state;

        const buttonQuestionTypeSelect = (
            <ButtonGroup>
                <Button
                    color="primary"
                    outline
                    onClick={() => this.handleQuestionTypeSelection(1)}
                    active={qSelected === 1}
                >
                    Open vragen
                </Button>
                <Button
                    color="primary"
                    outline
                    onClick={() => this.handleQuestionTypeSelection(2)}
                    active={qSelected === 2}
                >
                    Meerkeuzevragen
                </Button>
            </ButtonGroup>
        );

        return (
            <Fragment>
                {buttonQuestionTypeSelect}
            <Table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Vraag</th>
                    <th>Vraagtype</th>
                    {qSelected === 2 && (
                        <>
                            <th>A</th>
                            <th>B</th>
                            <th>C</th>
                            <th>D</th>
                        </>
                    )}
                    {/* Edit button column */}
                    <th></th>
                    {/* Hide question button column */}
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {!questions || questions.length <= 0 ? (
                    <tr>
                        <td colSpan="6" align="center">
                            <b>Nog geen vragen in de database.</b>
                        </td>
                    </tr>
                ) : (
                    questions.map((question) => {
                        if (qSelected === 1 && question.question_type === "OPEN") {
                            return (
                                <tr key={question.pk}>
                                    <td>{question.question_id}</td>
                                    <td>{question.question_text}</td>
                                    <td>{question.question_type}</td>
                                    <td align="center">
                                        <NewQuestionModal
                                            create={false}
                                            question={question}
                                            resetState={this.props.resetState}
                                            getQuestions={this.getQuestions}
                                        />
                                    </td>
                                    <td align="center">
                                            <Button
                                                color="danger"
                                                onClick={() => this.handleHideQuestion(question.question_id)}
                                            >
                                                Verwijderen
                                            </Button>
                                        </td>
                                </tr>
                            );
                        } else if (qSelected === 2 && question.question_type === "MC") {
                                const optionsForMcQuestion = options.find(
                                    (option) => option.question_id === question.pk
                                );
                                return (
                                    <tr key={question.pk}>
                                        <td>{question.question_id}</td>
                                        <td>{question.question_text}</td>
                                        <td>{question.question_type}</td>
                                        <td>{optionsForMcQuestion.option_a}</td>
                                        <td>{optionsForMcQuestion.option_b}</td>
                                        <td>{optionsForMcQuestion.option_c}</td>
                                        <td>{optionsForMcQuestion.option_d}</td>
                                        <td align="center">
                                            <NewQuestionModal
                                                create={false}
                                                question={question}
                                                resetState={this.props.resetState}
                                                getQuestions={this.getQuestions}
                                                multipleChoice={optionsForMcQuestion}
                                            />
                                        </td>
                                        <td align="center">
                                            <Button
                                                color="danger"
                                                onClick={() => this.handleHideQuestion(question.question_id)}
                                            >
                                                Verwijderen
                                            </Button>
                                        </td>
                                    </tr>
                                );
                            }
                            return null;
                    })
                )}
                </tbody>
            </Table>
            </Fragment>
        );
    }
}

export default QuestionList;