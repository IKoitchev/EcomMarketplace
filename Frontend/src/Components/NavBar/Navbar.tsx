import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Button,
  Form,
  Container,
  Nav,
  Navbar,
  NavDropdown,
} from 'react-bootstrap';
import LoginButton from '../../service/auth/LoginButton';
import { useAuth0 } from '@auth0/auth0-react';
import LogoutButton from '../../service/auth/LogoutButton';
import axios from 'axios';
import axiosClient from '../../utils/axiosClient';

function NavBar() {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  async function handleSearch() {
    // const searchBox = document.getElementById('searchbox') as HTMLInputElement;
    // const value = searchBox?.value;
    try {
      const token = await getAccessTokenSilently();

      const response = await axiosClient.get(`http://localhost:3009/test`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // const response = await axios.get(`http://localhost:3009/test`, {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // });

      const responseData = await response.data;
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Navbar bg="success" expand="lg">
      <Container>
        <Navbar.Brand href="/home">Ecom {user?.name}</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/products">Products</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              id="searchbox"
            />
            <Button variant="outline-white" onClick={handleSearch}>
              Search
            </Button>
          </Form>
          {/* <Nav.Link href="/login" onClick={handleLogin}>Login</Nav.Link> */}
          {isAuthenticated ? <LogoutButton /> : <LoginButton />}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default NavBar;
