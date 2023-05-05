import React from "react";
import {Button, Form, FormGroup, Input, Label} from "reactstrap";
import axios from "axios";
import {API_URL_MC_QUESTIONS} from "../../constants";


class NewMcQuestionForm extends React.Component {
    state = {
        mc_question_id: 0,
        question: "",
        option_a: "",
        option_b: "",
        option_c: "",
        option_d: "",
    };

    componentDidMount() {
        if (this.props.mcQuestion) {
            const {mc_question_id,
                question,
                option_a,
                option_b,
                option_c,
                option_d} = this.props.mcQuestion;
            this.setState({
                mc_question_id,
                question,
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

    createMcQuestion = e => {
        e.preventDefault();
        axios.post(
            API_URL_MC_QUESTIONS,
            this.state).then(() => {
                this.props.resetState();
                this.props.toggle();
                this.getMcQuestions();
        });
    };

    editMcQuestion = e => {
        e.preventDefault();
        axios.put(API_URL_MC_QUESTIONS +
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
        return (
            <Form
                onSubmit={this.props.mcQuestion ? this.editMcQuestion : this.createMcQuestion}>
                <FormGroup>
                    <Label for="question">Vraag:</Label>
                    <Input
                        type="text"
                        name="question"
                        onChange={this.onChange}
                        value={this.defaultIfEmpty(this.state.question)}
                        autoFocus
                        />
                </FormGroup>
                <FormGroup>
                    <Label for="option_a">Optie A:</Label>
                    <Input
                        type="text"
                        name="option_a"
                        onChange={this.onChange}
                        value={this.defaultIfEmpty(this.state.option_a)}
                        />
                </FormGroup>
                <FormGroup>
                    <Label for="option_b">Optie B:</Label>
                    <Input
                        type="text"
                        name="option_b"
                        onChange={this.onChange}
                        value={this.defaultIfEmpty(this.state.option_b)}
                        />
                </FormGroup>
                <FormGroup>
                    <Label for="option_c">Optie C:</Label>
                    <Input
                        type="text"
                        name="option_c"
                        onChange={this.onChange}
                        value={this.defaultIfEmpty(this.state.option_c)}
                        placeholder="Optioneel"
                        />
                </FormGroup>
                <FormGroup>
                    <Label for="option_d">Optie D:</Label>
                    <Input
                        type="text"
                        name="option_d"
                        onChange={this.onChange}
                        value={this.defaultIfEmpty(this.state.option_d)}
                        placeholder="Optioneel"
                        />
                </FormGroup>
                <Button>Toevoegen</Button>
            </Form>
        );
    }
}

export default NewMcQuestionForm;