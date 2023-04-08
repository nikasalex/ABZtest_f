import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Button, Pagination, Table } from 'react-bootstrap';

export function UsersPage() {
  const [users, setUsers] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [count, setCount] = useState(searchParams.get('count') || 5);
  const [page, setPage] = useState(searchParams.get('page') || 1);
  const offset = searchParams.get('offset')
  const [totalPages, setTotalPages] = useState();

  let active = +page || 1;
  let items = [];
  for (let number = 1; number <= totalPages; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === active}
        onClick={() => {
          setPage(number);
        }}
      >
        {number}
      </Pagination.Item>
    );
  }

  useEffect(() => {
    axios
      .get(
        `http://localhost:3001/users?count=${count}&page=${page}&offset=${offset}`
      )
      .then((data) => {
        setUsers(data.data.users);
        setTotalPages(data.data.total_pages);
      });
  }, [count, page]);

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
          {users.map((user) => {
            return (
              <tr key={user.id}>
                <td><img src={user.photo} width='70px' height='70px'/></td>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.position}</td>
                <td>{user.position_id}</td>
                <td>{user.registration_timestamp}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      {!offset && (
        <div>
          <Pagination size="sm">{items}</Pagination>
        </div>
      )}
      <Button
        variant="info"
        onClick={() => {
          setCount(+count + 6);
        }}
      >
        Show more
      </Button>{' '}
      <Button variant="info" href="/newuser">
        New user
      </Button>{' '}
      <Button variant="info" href="/positions">
        Positions
      </Button>{' '}
    </>
  );
}
