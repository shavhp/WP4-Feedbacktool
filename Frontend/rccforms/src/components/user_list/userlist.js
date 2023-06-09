import React, { Component, Fragment } from "react";
import { Table } from "reactstrap";
import axios from "axios";
import { API_URL_USERS, API_URL_DEACTIVATE_USER }from "../../constants";


class UserList extends Component {
    getUsers = () => {
        axios.get(API_URL_USERS).then(
            res => this.setState({
                users: res.data
            })
        );
    };

    handleCheckboxChange = (userId) => {
        axios
            .put(`${API_URL_DEACTIVATE_USER}${userId}/deactivate/`)
            .then((response) => {
                if (response.data.success) {
                    this.setState((prevState) => ({
                        users: prevState.users.filter(
                            (user) => user.userId !== userId
                        ),
                    }));
                } else {
                    console.log(response.data.error);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };
    
    render() {
        const users = this.props.users
        return (
            <Fragment>
                <Table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Gebruikersnaam</th>
                            <th>Voornaam</th>
                            <th>Achternaam</th>
                            <th>Email adres</th>
                            <th>Rol</th>
                            <th>Is actief</th>
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
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={user.is_active}
                                            onChange={() =>
                                                this.handleCheckboxChange(user.pk, "is_active")
                                            }
                                        />
                                    </td>
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