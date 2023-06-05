import React, { Component, Fragment } from "react";
import { Button, ButtonGroup, Modal, ModalHeader, ModalBody } from "reactstrap";
import NewQuestionForm from "./NewQuestionForm";


class NewQuestionModal extends Component {
    state = {
        modal: false,
        rSelected: 1,
        question_id: 0,
        question_type: "",
    };

    toggle = () => {
        this.setState(previous => ({
            modal: !previous.modal,
            question_id: this.props.question.question_id,
            question_type: this.props.question.question_type
        }));
    };

    handleButtonGroupChange = value => {
        this.setState({
            rSelected: value
        });
    };

    render() {
        const create = this.props.create;
        const { modal, rSelected } = this.state;

        var title = "Vraag aanpassen";
        var button =
            <Button onClick={this.toggle}>
                {create ? "Toevoegen" : "Wijzigen"}
            </Button>;
        if (create) {
            title = "Nieuwe vraag toevoegen";
            button = (
                <Button
                    color="primary"
                    className="float-right"
                    onClick={this.toggle}
                    style={{ minWidth: "200px" }}
                    >
                    Toevoegen
                </Button>
            );

            var buttonQuestionType = (
                <ButtonGroup>
                    <Button
                        color="primary"
                        outline
                        onClick={() => this.handleButtonGroupChange(1)}
                        active={rSelected === 1}
                    >
                        Open vraag
                    </Button>
                    <Button
                        color="primary"
                        outline
                        onClick={() => this.handleButtonGroupChange(2)}
                        active={rSelected === 2}
                    >
                        Meerkeuzevraag
                    </Button>
                </ButtonGroup>
            );
        }

        return (
            <Fragment>
                {button}
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                    >
                    <ModalHeader
                        toggle={this.toggle}>
                        {title}
                        {buttonQuestionType}
                    </ModalHeader>

                    <ModalBody>
                        <NewQuestionForm
                            create={this.props.create}
                            question={create ? null : this.props.question}
                            resetState={this.props.resetState}
                            toggle={this.toggle}
                            questionType={rSelected === 1 ? "OPEN" : "MC" }
                            getQuestions={this.props.getQuestions}
                            getMcOptions={this.props.getMcOptions}
                            />
                    </ModalBody>
                </Modal>
            </Fragment>
        )
    }
}

export default NewQuestionModal;