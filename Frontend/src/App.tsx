import { Container } from 'react-bootstrap';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './Components/NavBar/Navbar';
import NotFound from './Components/NotFound';
import ProductForm from './Pages/ProductForm/ProductForm';
import ProductPage from './Pages/ProductPage/ProductPage';
import Profile from './Pages/Profile';

function App() {
  return (
    <>
      <NavBar />
      <Container>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Profile />} />
            <Route path="/products" element={<ProductPage />} />
            <Route
              path="/product-form"
              element={<ProductForm product={undefined} />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </Container>
    </>
  );
}

export default App;
