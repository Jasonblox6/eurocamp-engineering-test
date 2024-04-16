import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

interface User {
  id: string;
  name: string;
  email: string;
}

interface UsersTableProps {
  users: User[];
}

const UsersTable: React.FC<UsersTableProps> = ({ users }) => {

  if (!users) {
    return null;
  }

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {
          users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td><FontAwesomeIcon icon={faEdit} className="icon edit-icon" /></td>
              <td><FontAwesomeIcon icon={faTrash} className="icon delete-icon" /></td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default UsersTable;
