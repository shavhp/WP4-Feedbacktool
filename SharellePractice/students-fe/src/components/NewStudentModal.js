import React, { Component, Fragment } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import NewStudentForm from "./NewStudentForm";


// Sets the state for the modal: check whether is must be open or closed.
class NewStudentModal extends Component {
    state = {
        modal: false
    };

// Changes the state of the modal to the opposite value.
toggle = () => {
    this.setState(previous => ({
        modal: !previous.modal
    }));
};

// Checks if a create boolean was passed as a parameter from the
// parent caller to decide if the button is for editing or creating.
// The buttons are created dynamically, depending on what the parent said.
render() {
    const create = this.props.create;

    var title = "Edit Student";
    var button = <Button onClick={this.toggle}>Edit</Button>
    if (create) {
        title = "Create New Student";

        button = (
            <Button
                color="primary"
                className="float-right"
                onClick={this.toggle}
                style={{minWidth: "200px"}}
            >
                Create New
            </Button>
        );
    }

    return (
        <Fragment>
            {button}
            <Modal isOpen={this.state.modal} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}>{title}</ModalHeader>

                <ModalBody>
                    <NewStudentForm
                        resetState={this.props.resetState}
                        toggle={this.toggle}
                        student={this.props.student}
                        getStudents={this.props.getStudents}
                    />
                </ModalBody>
            </Modal>
        </Fragment>
        );
    }
}

export default NewStudentModal;