import React, { Component } from "react";
import { Table } from "reactstrap";
import axios from "axios";
import { API_URL_OPEN_QUESTIONS } from "../constants";
import NewOpenQuestionModal from "./NewOpenQuestionModal";


class OpenQuestionList extends Component {
    state = {
        openQuestions: []
    };

    componentDidMount() {
        this.getOpenQuestions();
    }

    getOpenQuestions() {
        axios.get(API_URL_OPEN_QUESTIONS).then(res => this.setState(
            { openQuestions:res.data}
        ));
    }

    render() {
        const openQuestions = this.state.openQuestions;
        return (
            <Table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Vraag</th>
                    {/* Edit button column */}
                    <th></th>
                    {/* Archive button column */}
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {!openQuestions || openQuestions.length <= 0 ? (
                    <tr>
                        <td colSpan="6" align="center">
                            <b>Nog geen vragen in de database.</b>
                        </td>
                    </tr>
                ) : (
                    openQuestions.map(openQuestion => (
                        <tr key={openQuestion.pk}>
                            <td>{openQuestion.open_question_id}</td>
                            <td>{openQuestion.question}</td>
                            <td align="center">
                                <NewOpenQuestionModal
                                    create={false}
                                    openQuestion={openQuestion}
                                    resetState={this.props.resetState}
                                    getOpenQuestions={this.getOpenQuestions}
                                    />
                            </td>
                        </tr>
                    ))
                )}
                </tbody>
            </Table>
        );
    }
}

export default OpenQuestionList;