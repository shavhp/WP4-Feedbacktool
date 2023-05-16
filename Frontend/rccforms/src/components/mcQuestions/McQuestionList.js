import React, { Component } from "react";
import { Table } from "reactstrap";
import axios from "axios";
import { API_URL_MC_OPTIONS } from "../../constants";
import NewMcQuestionModal from "./NewMcQuestionModal";


class McQuestionList extends Component {
    state = {
        mcQuestions: []
    };

    componentDidMount() {
        this.getMcQuestions();
    }

    getMcQuestions() {
        axios.get(API_URL_MC_OPTIONS).then(res => this.setState(
            { mcQuestions:res.data}
        ));
    }

    render() {
        const mcQuestions = this.state.mcQuestions;
        return (
            <Table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Vraag</th>
                    <th>Optie A</th>
                    <th>Optie B</th>
                    <th>Optie C</th>
                    <th>Optie D</th>
                    {/* Edit button column */}
                    <th></th>
                    {/* Archive button column */}
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {!mcQuestions || mcQuestions.length <= 0 ? (
                    <tr>
                        <td colSpan="6" align="center">
                            <b>Nog geen vragen in de database.</b>
                        </td>
                    </tr>
                ) : (
                    mcQuestions.map(mcQuestion => (
                        <tr key={mcQuestion.pk}>
                            <td>{mcQuestion.mc_question_id}</td>
                            <td>{mcQuestion.question}</td>
                            <td>{mcQuestion.option_a}</td>
                            <td>{mcQuestion.option_b}</td>
                            <td>{mcQuestion.option_c}</td>
                            <td>{mcQuestion.option_d}</td>
                            <td align="center">
                                <NewMcQuestionModal
                                    create={false}
                                    mcQuestion={mcQuestion}
                                    resetState={this.props.resetState}
                                    getMcQuestions={this.getMcQuestions}
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

export default McQuestionList;