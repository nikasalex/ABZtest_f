import axios from 'axios';
import { useEffect, useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';

export function NewUserPage() {
  const navigate = useNavigate();
  const [positions, setPositions] = useState([]);
  const [token, setToken] = useState();
  const [photo, setPhoto] = useState();

  function getToken() {
    axios.get(`http://abz.mykyta-matvieiev.com:3001/token`).then((data) => {
      setToken(data.data.token);
    });
  }
  useEffect(() => {
    axios.get(`http://abz.mykyta-matvieiev.com:3001/positions`).then((data) => {
      setPositions(data.data.positions);
    });
  }, []);
  const formData = new FormData();
  function onChange(event) {
    setPhoto(event.currentTarget.files[0]);
  }
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      position_id: '',
    },
    onSubmit: (values) => {
      formData.append('name', values.name);
      formData.append('email', values.email);
      formData.append('phone', values.phone);
      formData.append('photo', photo);
      formData.append('position_id', values.position_id);
      axios
        .post(`http://abz.mykyta-matvieiev.com:3001/users`, formData, {
          headers: { token: token, 'Content-Type': 'multipart/form-data' },
        })
        .then((data) => {
          navigate('/users');
        })
        .catch((e) => console.log(e));
    },
  });

  return (
    <>
      <Button onClick={getToken}>get Token</Button>
      {token && (
        <Alert key="success" variant="success">
          Your token: {token}
        </Alert>
      )}
      <br />
      <br />

      <Form onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="text"
            placeholder="name@example.com"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="phone">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Phone"
            name="phone"
            onChange={formik.handleChange}
            value={formik.values.phone}
          />
        </Form.Group>
        <Form.Group controlId="position" className="mb-3">
          <Form.Label>Position</Form.Label>
          <Form.Select
            aria-label="Default select example"
            name="position_id"
            onChange={formik.handleChange}
            value={formik.values.position_id}
          >
            <option value="0">Choose Positions</option>
            {positions.map((position) => {
              return (
                <option key={position.id} value={position.id}>
                  {position.name}
                </option>
              );
            })}
          </Form.Select>
        </Form.Group>
        <Form.Group controlId="photo" className="mb-3">
          <Form.Label>Photo</Form.Label>
          <Form.Control type="file" name="photo" onChange={onChange} />
        </Form.Group>
        <Button type="submit">Add User</Button>
      </Form>
      <br />
      <Button href="/users">Back to list users</Button>
    </>
  );
}
