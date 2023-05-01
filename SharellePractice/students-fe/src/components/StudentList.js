import React, { Component } from "react";
import { Table } from "reactstrap";
import NewStudentModal from "./NewStudentModal";
import ConfirmRemovalModal from "./ConfirmRemovalModal";
import {API_URL} from "../constants";
import axios from "axios";


class StudentList extends Component {
    state = {
        students: []
    };

    componentDidMount() {
        this.getStudents();
    }

    getStudents() {
        axios.get(API_URL).then(res => this.setState({ students:res.data}));
    }

    render() {
        const students = this.state.students;
        return (
            <Table dark>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Document</th>
                    <th>Phone</th>
                    <th>Registration</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {!students || students.length <= 0 ? (
                    <tr>
                        <td colSpan="6" align="center">
                            <b>Oops, no one here yet.</b>
                        </td>
                    </tr>
                ) : (
                    students.map(student => (
                        <tr key={student.pk}>
                            <td>{student.name}</td>
                            <td>{student.email}</td>
                            <td>{student.document}</td>
                            <td>{student.phone}</td>
                            <td>{student.registration_date}</td>
                            <td align="center">
                                <NewStudentModal
                                    create={false}
                                    student={student}
                                    resetState={this.props.resetState}
                                    getStudents={this.getStudents}
                                    />
                                &nbsp;&nbsp;
                                <ConfirmRemovalModal
                                    pk={student.pk}
                                    resetState={this.props.resetState}
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

export default StudentList;