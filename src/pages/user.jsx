import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Table } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

export function UserPage() {
  const [user, setUser] = useState();
  const location = useLocation();
  const userId = location.pathname.split('users/')[1];
  useEffect(() => {
    axios.get(`http://abz.mykyta-matvieiev.com:3002/users/${userId}`).then((data) => {
      setUser(data.data.user);
    });
  }, []);

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Photo</th>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Position</th>
            <th>Position ID</th>
            <th>Registration Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {user && (
            <tr key={user.id}>
              <td>{user.photo}</td>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.position}</td>
              <td>{user.position_id}</td>
              <td>{user.registration_timestamp} </td>
            </tr>
          )}
        </tbody>
      </Table>
      <Button href="/users">Back to list Users</Button>
    </>
  );
}
