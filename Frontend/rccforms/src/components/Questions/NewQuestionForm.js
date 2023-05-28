import React, { Fragment } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import axios from "axios";
import { API_URL_QUESTIONS, API_URL_MC_OPTIONS } from "../../constants";


class NewQuestionForm extends React.Component {
    // Initial state of the form: empty, but question type is selected based on the selected button
    state = {
        question_id: 0,
        question_text: "",
        question_type: this.props.questionType,
        option_a: "",
        option_b: "",
        option_c: "",
        option_d: ""
    };

    componentDidMount() {
        if (this.props.question) {
            const { question_id, question_text } = this.props.question;
            this.setState({
                question_id,
                question_text
            });
        }
        if (this.props.multipleChoice) {
            const { option_a,
                option_b,
                option_c,
                option_d
            } = this.props.multipleChoice;
            this.setState({
                option_a,
                option_b,
                option_c,
                option_d
            });
        }
    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    createQuestion = e => {
        e.preventDefault();
        const { question_type } = this.state;
        const { option_a,
            option_b,
            option_c,
            option_d
        } = this.state;

        axios.post(
            API_URL_QUESTIONS, {
                question_text: this.state.question_text,
                question_type: option_a
                    || option_b
                    || option_c
                    || option_d
                    ? "MC"
                    : question_type,
                })
            .then((response) => {
                this.props.resetState();
                this.props.toggle();
                this.getQuestions();

                if (option_a
                    || option_b
                    || option_c
                    || option_d) {
                    const questionId = response.data.question_id;
                    axios.post(
                        API_URL_MC_OPTIONS, {
                            question_id: questionId,
                            option_a,
                            option_b,
                            option_c,
                            option_d,
                        }).then(
                        () => {
                            this.getMcOptions();
                        });
                }
            });
    };

    editQuestion = e => {
        e.preventDefault();
        axios.put(API_URL_QUESTIONS +
            this.state.pk,
            this.state).then(() => {
                this.props.resetState();
                this.props.toggle();
        });
    };

    defaultIfEmpty = value => {
        return value === "" ? "" : value;
    };

    render() {
        const questionType = this.props.questionType;

        return (
            <Form
                onSubmit={
                this.props.question
                    ? this.editQuestion
                    : this.createQuestion}>
                <FormGroup>
                    <Label for="question">Vraag:</Label>
                    <Input
                        type="text"
                        name="question_text"
                        onChange={this.onChange}
                        value={this.defaultIfEmpty(this.state.question_text)}
                        autoFocus
                        required
                        />
                </FormGroup>
                {questionType === "MC" && (
                    <Fragment>
                        <FormGroup>
                            <Label
                                for="optionA"
                                >
                                Optie A:
                            </Label>
                            <Input
                                type="text"
                                name="option_a"
                                onChange={this.onChange}
                                value={this.defaultIfEmpty(this.state.option_a)}
                                required
                                />
                        </FormGroup>
                        <FormGroup>
                            <Label
                                for="optionB"
                                >
                                Optie B:
                            </Label>
                            <Input
                                type="text"
                                name="option_b"
                                onChange={this.onChange}
                                value={this.defaultIfEmpty(this.state.option_b)}
                                required
                                />
                        </FormGroup>
                        <FormGroup>
                            <Label
                                for="optionC"
                                >
                                Optie C:
                            </Label>
                            <Input
                                type="text"
                                name="option_c"
                                onChange={this.onChange}
                                value={this.defaultIfEmpty(this.state.option_c)}
                                placeholder="Optioneel"
                                />
                        </FormGroup>
                        <FormGroup>
                            <Label
                                for="optionD"
                                >
                                Optie D:
                            </Label>
                            <Input
                                type="text"
                                name="option_d"
                                onChange={this.onChange}
                                value={this.defaultIfEmpty(this.state.option_d)}
                                placeholder="Optioneel"
                                />
                        </FormGroup>
                    </Fragment>
                )}
                <Button>Toevoegen</Button>
            </Form>
        );
    }
}

export default NewQuestionForm;