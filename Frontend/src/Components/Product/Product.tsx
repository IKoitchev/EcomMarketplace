import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button } from 'react-bootstrap';
import { IProduct } from '../../interfaces/IProduct';
import { ImageURL } from '../../service/ImageService';

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
          src={ImageURL(product.image)}
          alt="Product image not found"
        />
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Text>{product.description}</Card.Text>
          <Button variant="primary">Add to cart</Button>
        </Card.Body>
      </Card>
    </>
  );
};

export default Product;
