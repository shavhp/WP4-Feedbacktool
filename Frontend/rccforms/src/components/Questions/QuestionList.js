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
    // Default state of the component with an empty list of questions,
    // Open questions radio button is selected,
    // Empty list of multiple choice options,
    // refreshing of the list is false (only activated when Verbergen button is clicked)
    state = {
        questions: [],
        qSelected: 1,
        options: [],
        refresh: false
    };

    // Preparations before the component appears on screen (mounts).
    // In this case: retrieve questions and mc-options from database
    // before the QuestionList appears on screen.
    componentDidMount() {
        this.getQuestions();
        this.getMcOptions();
    }

    // Radio button above the table,
    // to display open or multiple choice questions
    handleQuestionTypeSelection = value => {
        this.setState({
            qSelected: value
        }, () => {
            if (value === 2) {
                this.getMcOptions();
            }
        });
    };

    // Retrieves all questions from database that are not set as hidden
    getQuestions = () => {
        axios
            .get(API_URL_QUESTIONS)
            .then((res) => {
                const filteredQuestions = res.data.filter(
                    (question) => !question.is_hidden
                );
                this.setState({
                    questions: filteredQuestions.map((question) => ({
                        ...question,
                        is_hidden: false,
                    })),
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    // Retrieves all mc options from database.
    getMcOptions = () => {
        axios
            .get(API_URL_MC_OPTIONS)
            .then(res =>
                this.setState({
                    options:res.data
                }
                ));
    }

    // When you click on the Verbergen button, the is_hidden boolean
    // changes to True and the question also gets hidden from the table
    // because the only questions where is_hidden = false are allowed to be listed.
    handleHideQuestion = (questionId) => {
        axios
            .put(`${API_URL_HIDE_QUESTION}${questionId}/hide/`)
            .then((response) => {
                if (response.data.success) {
                    this.setState((prevState) => ({
                        questions: prevState.questions.filter(
                            (question) => question.question_id !== questionId
                        ),
                    }));
                    this.refreshQuestionList();
                } else {
                    console.log(response.data.error);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    // Refreshes the QuestionList component so the change is
    // immediately visible: hidden questions are filtered out.
    refreshQuestionList = () => {
        this.getQuestions();
    };

    render() {
        // Constant for question state defined above: empty question list
        const questions = this.state.questions;

        const options = this.state.options;
        // Constants for the other state variables
        const { refresh, qSelected } = this.state;
        // Constant for the visible questions: questions where is_hidden = false
        const visibleQuestions = questions.filter(question => !question.is_hidden);

        // If refresh occurs, get the questions and mc options from database and
        // set the state of refresh to false again.
        if (refresh) {
            this.getQuestions();
            this.getMcOptions();
            this.setState({ refresh: false });
        }

        // Constant for the radio button with question types above the table
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

        // Structure and content of what should be rendered on the screen
        return (
            <Fragment>
                {buttonQuestionTypeSelect}
            <Table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Vraag</th>
                    <th>Vraagtype</th>
                    {/* If question type 2 (MC) is selected: show these four additional columns */}
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
                {/* Condition: if there are no questions where is_hidden = false in the database
                then the sentence in <b> tags will be displayed. */}
                {!visibleQuestions || visibleQuestions.length <= 0 ? (
                    <tr>
                        <td colSpan="6" align="center">
                            <b>Nog geen vragen in de database.</b>
                        </td>
                    </tr>
                //    Else if visibleQuestions is not empty, map over each element in the array,
                //    render a table row for each question.
                ) : (
                    visibleQuestions.map((question) => {
                        if (!visibleQuestions.includes(question)) {
                            return null;
                        }

                        // If the Open vraag radio button is selected in the modal to add a question,
                        // return the corresponding columns
                        if (qSelected === 1 && question.question_type === "OPEN") {
                            return (
                                // Return the columns from the questions database
                                <tr key={question.pk}>
                                    <td>{question.question_id}</td>
                                    <td>{question.question_text}</td>
                                    <td>{question.question_type}</td>
                                    <td align="center">
                                        {/* Display the modal to edit questions when Wijzigen button is clicked */}
                                        <NewQuestionModal
                                            create={false}
                                            question={question}
                                            resetState={this.props.resetState}
                                            getQuestions={this.getQuestions}
                                            refreshQuestionList={this.refreshQuestionList}
                                        />
                                    </td>
                                    <td align="center">
                                            {/* Display the button that hides questions */}
                                            <Button
                                                color="danger"
                                                onClick={() => this.handleHideQuestion(question.question_id)}
                                            >
                                                Verbergen
                                            </Button>
                                        </td>
                                </tr>
                            );
                        //    Else if the Meerkeuzevragen radio button is selected, display questions that
                        //    have an MC question type and display corresponding multiple choice options
                        } else if (qSelected === 2 && question.question_type === "MC") {
                                const optionsForMcQuestion = options.filter(
                                    (option) => option.question_id === question.pk
                                );
                                return (
                                    <tr key={question.pk}>
                                        <td>{question.question_id}</td>
                                        <td>{question.question_text}</td>
                                        <td>{question.question_type}</td>
                                        <td>{optionsForMcQuestion.map(option => option.option_a)}</td>
                                        <td>{optionsForMcQuestion.map(option => option.option_b)}</td>
                                        <td>{optionsForMcQuestion.map(option => option.option_c)}</td>
                                        <td>{optionsForMcQuestion.map(option => option.option_d)}</td>
                                        <td align="center">
                                            <NewQuestionModal
                                                create={false}
                                                question={question}
                                                resetState={this.props.resetState}
                                                getQuestions={this.getQuestions}
                                                multipleChoice={optionsForMcQuestion}
                                                refreshQuestionList={this.refreshQuestionList}
                                            />
                                        </td>
                                        <td align="center">
                                            <Button
                                                color="danger"
                                                onClick={() => this.handleHideQuestion(question.question_id)}
                                            >
                                                Verbergen
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