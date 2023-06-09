import React, { Component, Fragment } from "react";
import { Table } from "reactstrap";
import axios from "axios";
import { API_URL_USERS }from "../../constants";


class UserList extends Component {
    getUsers = () => {
        axios.get(API_URL_USERS).then(
            res => this.setState({
                users: res.data
            })
        );
    };

    render() {
        const users = this.props.users
        return (
            <Fragment>
                <Table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Username</th>
                            <th>First name</th>
                            <th>Last name</th>
                            <th>Email address</th>
                            <th>Role</th>
                            <th>Is active</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {!users || users.length <= 0 ? (
                            <tr>
                            <td colSpan="6" align="center">
                                <b>Nog geen gebruikers in de database.</b>
                            </td>
                        </tr>
                        ) : (
                            users.map(user => (
                                <tr key={user.pk}>
                                    <td>{user.id}</td>
                                    <td>{user.username}</td>
                                    <td>{user.first_name}</td>
                                    <td>{user.last_name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.is_staff ? "Admin" : "Member"}</td>
                                    <td>{user.is_active ? "Yes" : "No"}</td>
                                </tr>
                            ))
                        )
                        }
                    </tbody>
                </Table>
            </Fragment>
        )
    }
}

export default UserList