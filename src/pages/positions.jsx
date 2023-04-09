import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Table } from 'react-bootstrap';

export function PositionsPage() {
  const [positions, setPositions] = useState();

  useEffect(() => {
    axios.get(`http://abz.mykyta-matvieiev.com:3001/positions`).then((data) => {
      setPositions(data.data.positions);
    });
  }, []);

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {positions &&
            positions.map((position) => {
              return (
                <tr key={position.id}>
                  <td> {position.id} </td>
                  <td> {position.name} </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      <Button href="/users">Back to list Users</Button>
    </>
  );
}
