import React from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import axios from "axios";
import { API_URL_OPEN_QUESTIONS } from "../constants";


class NewOpenQuestionForm extends React.Component {
    state = {
        open_question_id: 0,
        question: "",
    };

    componentDidMount() {
        if (this.props.openQuestion) {
            const {open_question_id, question} = this.props.openQuestion;
            this.setState({
                open_question_id, question
            });
        }
    }

    onchange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    createOpenQuestion = e => {
        e.preventDefault();
        axios.post(API_URL_OPEN_QUESTIONS,
            this.state).then(() => {
                this.props.resetState();
                this.props.toggle();
                this.getOpenQuestions();
        });
    };

    //    Edit open questions

    defaultIfEmpty = value => {
        return value === "" ? "" : value;
    };

    render() {
        return (
            <Form
                onSubmit={this.props.openQuestion = this.createOpenQuestion}>
                <FormGroup>
                    <Label for="question">Vraag:</Label>
                    <Input
                        type="text"
                        name="question"
                        onChange={this.onChange}
                        value={this.defaultIfEmpty(this.state.question)}
                        />
                </FormGroup>
                <Button>Toevoegen</Button>
            </Form>
        );
    }
}

export default NewOpenQuestionForm;