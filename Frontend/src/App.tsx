import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './Components/NavBar/Navbar';
import NotFound from './Components/NotFound';
import ProductPage from './Pages/ProductPage/ProductPage';

function App() {
  return (
    <>
      <NavBar />
      <BrowserRouter>
        <Routes>
          <Route path="/products" element={<ProductPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;