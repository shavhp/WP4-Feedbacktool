import React, { Component, Fragment } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import NewMcQuestionForm from "./NewMcQuestionForm";


class NewMcQuestionModal extends Component {
    state = {
        modal: false
    };

    toggle = () => {
        this.setState(previous => ({
            modal: !previous.modal
        }));
    };

    render() {
        const create = this.props.create;

        var title = "Meerkeuzevraag aanpassen";
        var button =
            <Button onClick={this.toggle}>
                Wijzigen
            </Button>;
        if (create) {
            title = "Nieuwe meerkeuzevraag toevoegen";
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
                    </ModalHeader>

                    <ModalBody>
                        <NewMcQuestionForm
                            create={this.props.create}
                            resetState={this.props.resetState}
                            toggle={this.toggle}
                            mcQuestion={this.props.mcQuestion}
                            getMcQuestions={this.props.getMcQuestions}
                            />
                    </ModalBody>
                </Modal>
            </Fragment>
        )
    }
}

export default NewMcQuestionModal;