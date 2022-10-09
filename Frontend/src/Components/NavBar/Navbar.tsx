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

function NavBar() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  //const navigate = useNavigate();
  function handleSearch() {
    const searchBox = document.getElementById('searchbox') as HTMLInputElement;
    const value = searchBox?.value;

    // if (value != null) {
    //   navigate('/products', { state: { searchedValue: value } });
    // }
  }
  // function handleLogin() {
  //   redirect()
  // }
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
            <Button variant="outline-white">Search</Button>
          </Form>
          {/* <Nav.Link href="/login" onClick={handleLogin}>Login</Nav.Link> */}
          {isAuthenticated ? <LogoutButton /> : <LoginButton />}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
