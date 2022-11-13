import { ChangeEventHandler, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { IProduct } from '../../interfaces/IProduct';

const ProductForm: React.FC<{ product: IProduct | undefined }> = ({
  product,
}) => {
  //props is undefined when creating a new product
  //else we are using the same form for updating a product
  const [picture, setPicture] = useState<File | null>();
  const [errors, setErrors] = useState({
    productNameError: '',
    descriptionError: '',
    priceError: '',
    pictureError: '',
  });
  const validateInput = () => {
    let emptyError = 'this field is required';
    let productNameError = document.getElementById('name')?.innerText
      ? ''
      : emptyError;
    let descriptionError = document.getElementById('description')?.innerText
      ? ''
      : emptyError;
    let priceError = document.getElementById('price')?.innerText
      ? ''
      : emptyError;
    let pictureError = picture ? '' : emptyError;
  };
  const handleFileUpload: ChangeEventHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPicture(event.target.files?.item(0));
    return;
  };
  const handleSubmit = () => {
    console.log(product);
  };
  return (
    <>
      <Form className="w-75">
        <Form.Group className="mb-3">
          <Form.Label>Product name</Form.Label>
          <Form.Control
            type="text"
            id="name"
            placeholder="Enter product name"
          />
          <Form.Label>Product description</Form.Label>
          <Form.Control
            id="description"
            as="textarea"
            rows={3 as number}
            placeholder="Enter product description"
          />
          <Form.Label>Price</Form.Label>
          <Form.Control id="price" type="number" placeholder="Enter price" />
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="file"
            onChange={handleFileUpload}
            id="file"
            placeholder="Upload image"
          />
        </Form.Group>
        <Button id="button-upload" onClick={handleSubmit}>
          {!product ? <>Upload Product</> : <>Apply Changes</>}
        </Button>
      </Form>
    </>
  );
};
export default ProductForm;
