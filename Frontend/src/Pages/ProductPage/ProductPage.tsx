import { useEffect, useState } from 'react';
import Product from '../../Components/Product/Product';
import { IProduct } from '../../interfaces/IProduct';
import ProductService from '../../service/product.service';
import { Row } from 'react-bootstrap';

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