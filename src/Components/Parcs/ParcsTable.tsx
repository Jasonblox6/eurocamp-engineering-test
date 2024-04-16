import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

interface Parc {
  id: string;
  name: string;
  description: string;
}

interface ParcsTableProps {
  parcs: Parc[];
}

const ParcsTable: React.FC<ParcsTableProps> = ({ parcs }) => {

  //Again redundant guard maybe
  if (!parcs) {
    return null;
  }

  //Self explanatory
  const capitalizeFirstLetter = (string : string) => {
    return (string.charAt(0).toUpperCase() + string.slice(1));
  } 

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {
          parcs.map((parc) => (
            <tr key={parc.id}>
              <td>{capitalizeFirstLetter(parc.name)}</td>
              <td>{parc.description}</td>
              <td><FontAwesomeIcon icon={faEdit} className="icon edit-icon" /></td>
              <td><FontAwesomeIcon icon={faTrash} className="icon delete-icon" /></td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default ParcsTable;
