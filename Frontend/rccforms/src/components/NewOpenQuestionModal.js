import React, { Component, Fragment } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import NewOpenQuestionForm from "./NewOpenQuestionForm";


class NewOpenQuestionModal extends Component {
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

        var title = "Open vraag aanpassen";
        var button =
            <Button onClick={this.toggle}>
                Aanpassen
            </Button>;
        if (create) {
            title = "Nieuwe open vraag toevoeggen";
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
                        <NewOpenQuestionForm
                            resetState={this.props.resetState}
                            toggle={this.toggle}
                            openQuestion={this.props.openQuestion}
                            />
                    </ModalBody>
                </Modal>
            </Fragment>
        )
    }
}

export default NewOpenQuestionModal;