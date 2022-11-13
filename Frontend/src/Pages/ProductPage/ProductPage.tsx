import { useEffect, useState } from 'react';
import Product from '../../Components/Product/Product';
import { IProduct } from '../../interfaces/IProduct';
import ProductService from '../../service/product.service';
import { Button, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

type IProductPageProps = {
  searchedValue?: string;
};

const ProductPage: React.FC<IProductPageProps> = ({ searchedValue }) => {
  const [products, setProducts] = useState<Array<IProduct>>();
  useEffect(() => {
    ProductService.getAll().then((response: any) => {
      setProducts(response.data);
    });
  }, []);
  useEffect(() => {
    console.log(products);
  }, [products]);

  return (
    <>
      <Link to="/product-form" className="btn btn-primary bg-danger border-0">
        Upload a product
      </Link>
      {!products ? (
        <>no products</>
      ) : (
        <Row xs={5} md={3}>
          {products.map((p: IProduct) => {
            return <Product product={p} />;
          })}
        </Row>
      )}
    </>
  );
};

export default ProductPage;
