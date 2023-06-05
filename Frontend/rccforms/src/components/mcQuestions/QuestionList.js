import React, { Component, Fragment } from "react";
import { Table, Button } from "reactstrap";
import axios from "axios";
import {
    API_URL_MC_Q,
    API_URL_HIDE_MC_Q
} from "../../constants";
import NewQuestionModal from "./NewQuestionModal";


class McQuestionList extends Component {
    // Default state of the component with an empty list of questions,
    // Open questions radio button is selected,
    // Empty list of multiple choice options,
    // refreshing of the list is false (only activated when Verbergen button is clicked)
    state = {
        questions: [],
        option_a: [],
        option_b: [],
        option_c: [],
        option_d: [],
        // qSelected: 2,
        refresh: false
    };

    // Preparations before the component appears on screen (mounts).
    // In this case: retrieve questions and mc-options from database
    // before the QuestionList appears on screen.
    componentDidMount() {
        this.getMcQuestions();
    }

    // Radio button above the table,
    // to display open or multiple choice questions
    handleQuestionTypeSelection = value => {
        this.setState({
            qSelected: value
        });
    };

    // Retrieves all questions from database that are not set as hidden
    getMcQuestions = () => {
        axios
            .get(API_URL_MC_Q)
            .then((res) => {
                const filteredMcQ = res.data.filter(
                    (mcQ) => !mcQ.is_hidden
                );
                this.setState({
                    questions: filteredMcQ.map((mcQ) => ({
                        ...mcQ,
                        is_hidden: false,
                    })),
                });
            })
    };

    // When you click on the Verbergen button, the is_hidden boolean
    // changes to True and the question also gets hidden from the table
    // because the only questions where is_hidden = false are allowed to be listed.
    handleHideMcQuestion = (mcQuestionId) => {
        axios
            .put(`${API_URL_HIDE_MC_Q}${mcQuestionId}/hide/`)
            .then((response) => {
                if (response.data.success) {
                    this.setState((prevState) => ({
                        questions: prevState.questions.filter(
                            (mcQ) => mcQ.question_id !== mcQuestionId
                        ),
                    }));
                    this.refreshMcQuestionList();
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
    refreshMcQuestionList = () => {
        this.getMcQuestions();
    };

    render() {
        // Constant for question state defined above: empty question list
        const mcQuestions = this.state.questions;

        // Constants for the other state variables
        const { refresh } = this.state;
        // Constant for the visible questions: questions where is_hidden = false
        const visibleMcQuestions = mcQuestions.filter(mcQ => !mcQ.is_hidden);

        // If refresh occurs, get the questions and mc options from database and
        // set the state of refresh to false again.
        if (refresh) {
            // this.getOpenQuestions();
            this.getMcQuestions();
            this.setState({ refresh: false });
        }

        // // Constant for the radio button with question types above the table
        // const buttonQuestionTypeSelect = (
        //     <ButtonGroup>
        //         <Button
        //             color="primary"
        //             outline
        //             onClick={() => this.handleQuestionTypeSelection(1)}
        //             active={qSelected === 1}
        //         >
        //             Open vragen
        //         </Button>
        //         <Button
        //             color="primary"
        //             outline
        //             onClick={() => this.handleQuestionTypeSelection(2)}
        //             active={qSelected === 2}
        //         >
        //             Meerkeuzevragen
        //         </Button>
        //     </ButtonGroup>
        // );

        // Structure and content of what should be rendered on the screen
        return (
            <Fragment>
                {/*{buttonQuestionTypeSelect}*/}
            <Table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Vraag</th>
                    <th>Vraagtype</th>
                    {/* If question type 2 (MC) is selected: show these four additional columns */}
                    {/*{qSelected === 2 && (*/}
                        <>
                            <th>A</th>
                            <th>B</th>
                            <th>C</th>
                            <th>D</th>
                        </>
                    {/*)}*/}
                    {/* Edit button column */}
                    <th></th>
                    {/* Hide question button column */}
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {/* Condition: if there are no questions where is_hidden = false in the database
                then the sentence in <b> tags will be displayed. */}
                {!visibleMcQuestions || visibleMcQuestions.length <= 0 ? (
                    <tr>
                        <td colSpan="6" align="center">
                            <b>Nog geen vragen in de database.</b>
                        </td>
                    </tr>
                //    Else if visibleQuestions is not empty, map over each element in the array,
                //    render a table row for each question.
                ) : (
                    visibleMcQuestions.map((mcQ) => {
                        if (!visibleMcQuestions.includes(mcQ)) {
                            return null;
                        }

                        // If the Open vraag radio button is selected in the modal to add a question,
                        // return the corresponding columns
                        // if (qSelected === 2) {
                        return (
                            // Return the columns from the questions database
                            <tr key={mcQ.pk}>
                                <td>{mcQ.question_id}</td>
                                <td>{mcQ.question_text}</td>
                                <td>{mcQ.option_a}</td>
                                <td>{mcQ.option_b}</td>
                                <td>{mcQ.option_c}</td>
                                <td>{mcQ.option_d}</td>
                                <td align="center">
                                    {/* Display the modal to edit questions when Wijzigen button is clicked */}
                                    <NewQuestionModal
                                        create={false}
                                        question={mcQ}
                                        resetState={this.props.resetState}
                                        getMcQuestions={this.getMcQuestions}
                                        refreshMcQuestionList={this.refreshMcQuestionList}
                                    />
                                </td>
                                <td align="center">
                                        {/* Display the button that hides questions */}
                                        <Button
                                            color="danger"
                                            onClick={() => this.handleHideMcQuestion(mcQ.question_id)}
                                        >
                                            Verbergen
                                        </Button>
                                    </td>
                            </tr>
                            );
                        // }
                    })
                )}
                </tbody>
            </Table>
            </Fragment>
        );
    }
}

export default McQuestionList;