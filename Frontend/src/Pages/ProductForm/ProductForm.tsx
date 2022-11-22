import { useAuth0 } from '@auth0/auth0-react';
import { string } from 'prop-types';
import React, {
  ChangeEventHandler,
  MouseEventHandler,
  useEffect,
  useState,
} from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { IProduct } from '../../interfaces/IProduct';
import { UploadImage } from '../../service/ImageService';
import ProductService from '../../service/product.service';

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

  const { user, isLoading, getAccessTokenSilently } = useAuth0();
  const inputIsValid = (): Boolean => {
    let emptyError = 'this field is required';
    let productNameError = (document.getElementById('name') as HTMLInputElement)
      .value
      ? ''
      : emptyError;
    let descriptionError = (
      document.getElementById('description') as HTMLInputElement
    ).value
      ? ''
      : emptyError;
    let priceError = (document.getElementById('price') as HTMLInputElement)
      .value
      ? ''
      : emptyError;
    let pictureError = picture ? '' : emptyError;

    setErrors({ productNameError, descriptionError, priceError, pictureError });
    if (
      productNameError != '' ||
      descriptionError != '' ||
      priceError != '' ||
      pictureError != ''
    ) {
      return false;
    }
    return true;
  };

  const handleFileUpload: ChangeEventHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPicture(event.target.files?.item(0));
    return;
  };

  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (inputIsValid()) {
      let product: IProduct = {
        name: (document.getElementById('name') as HTMLInputElement).value,
        description: (
          document.getElementById('description') as HTMLInputElement
        ).value,
        price: parseFloat(
          (document.getElementById('price') as HTMLInputElement).value
        ),
        image: '' + picture?.name,
        author: user?.name || 'UNKNOWN AUTHOR',
      };
      console.log(product);
      getAccessTokenSilently({
        audience: 'https://auth-service',
        permissions: 'create:product',
      })
        .then((res) => {
          const token = res;
          console.log(token);
          ProductService.createProduct(product, {
            headers: { authorization: 'Bearer ' + token },
          })
            .then((res) => {
              console.log(res);
              if (picture)
                UploadImage(picture, {
                  headers: { authorization: 'Bearer ' + token },
                })
                  .then((res) => {
                    console.log('image', res);
                  })
                  .catch((err) => console.log('image', err));
            })
            .catch((err) => {
              console.log(err);
              //display error
            });
        })
        .catch((err) => {
          console.log(err);
        });
    }
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
          <Form.Text className="text-danger">
            {errors.productNameError}
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Product description</Form.Label>
          <Form.Control
            id="description"
            as="textarea"
            rows={3 as number}
            placeholder="Enter product description"
          />
          <Form.Text className="text-danger">
            {errors.descriptionError}
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control id="price" type="number" placeholder="Enter price" />
          <Form.Text className="text-danger">{errors.priceError}</Form.Text>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="file"
            onChange={handleFileUpload}
            id="file"
            placeholder="Upload image"
          />
          <Form.Text className="text-danger">{errors.pictureError}</Form.Text>
        </Form.Group>
        <Button id="button-upload" onClick={handleSubmit}>
          {!product ? <>Upload Product</> : <>Apply Changes</>}
        </Button>
      </Form>
    </>
  );
};
export default ProductForm;
