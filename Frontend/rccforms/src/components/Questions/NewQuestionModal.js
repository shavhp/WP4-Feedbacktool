import React, { Component, Fragment } from "react";
import { Button, ButtonGroup, Modal, ModalHeader, ModalBody } from "reactstrap";
import NewQuestionForm from "./NewQuestionForm";


class NewQuestionModal extends Component {
    // Default state of the modal where the modal is not active and
    // the default question type selected in the radio button is 1 (OPEN)
    state = {
        modal: false,
        rSelected: 1
    };

    // Handles the activation of the modal
    toggle = () => {
        this.setState(previous => ({
            modal: !previous.modal
        }));
    };

    // Handles the selection of the question type in the modal
    handleButtonGroupChange = value => {
        this.setState({
            rSelected: value
        });
    };

    render() {
        // Assigns the value of the prop 'create' to the constant 'create'
        //
        const create = this.props.create;
        const { modal, rSelected } = this.state;

        // Title of the modal when 'Wijzigen' button is clicked
        let title = "Vraag aanpassen";
        // 'Wijzigen' button displayed in the table rows that activates the modal
        let button =
            <Button onClick={this.toggle}>
                Wijzigen
            </Button>;

        // When create is activated, the title should be different and
        // the button that activates the modal will also be different
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

            // Radio button for the two question types in the modal (Open and Meerkeuze)
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
                {/* Button variable for Toevoegen or Wijzigen */}
                {button}
                {/* Modal (or i.e. this component) is open when button (toggle) is clicked */}
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                    >
                    {/* Modal header is visible when modal is open and
                    shows a title based on which button is clicked */}
                    <ModalHeader
                        toggle={this.toggle}>
                        {title}
                        {buttonQuestionType}
                    </ModalHeader>

                    {/* Renders the form to add a new question in the body of the modal.
                     The form displayed is based on the selected question type above the form */}
                    <ModalBody>
                        <NewQuestionForm
                            create={this.props.create}
                            resetState={this.props.resetState}
                            toggle={this.toggle}
                            questionType={rSelected === 1 ? "OPEN" :
                                rSelected === 2 ? "MC" : ""}
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