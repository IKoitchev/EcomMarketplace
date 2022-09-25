import 'bootstrap/dist/css/bootstrap.min.css';
import { type } from 'os';
import {
  Button,
  Form,
  Container,
  Nav,
  Navbar,
  NavDropdown,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function NavBar() {
  const navigate = useNavigate();
  function handleSearch() {
    const searchBox = document.getElementById('searchbox') as HTMLInputElement;
    const value = searchBox?.value;

    if (value != null) {
      navigate('/products', { state: { searchedValue: value } });
    }
  }
  return (
    <Navbar bg="success" expand="lg">
      <Container>
        <Navbar.Brand href="/home">Ecom</Navbar.Brand>
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
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
