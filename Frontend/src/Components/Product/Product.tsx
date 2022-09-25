import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button } from 'react-bootstrap';
import { IProduct } from '../../interfaces/IProduct';

type ProductProps = {
  product: IProduct;
};

const Product: React.FC<ProductProps> = ({ product }) => {
  return (
    <>
      <Card style={{ width: '17rem' }} className="mx-auto my-2">
        <Card.Img
          style={{ maxHeight: '17rem' }}
          variant="top"
          src={product.image}
        />
        <Card.Body>
          <Card.Title>{product.title}</Card.Title>
          <Card.Text>{product.description}</Card.Text>
          <Button variant="primary">Add to cart</Button>
        </Card.Body>
      </Card>
    </>
  );
};

export default Product;
