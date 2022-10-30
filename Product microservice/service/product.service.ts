import { DocumentDefinition } from 'mongoose';
import ProductModel, { ProductDocument } from '../models/product.model';

export async function createProduct(
  input: DocumentDefinition<ProductDocument>
) {
  try {
    const product = await ProductModel.create(input);
    return product.toJSON();
  } catch (e: any) {
    throw new Error(e);
  }
}
export async function getAllProducts() {
  try {
    const products: ProductDocument[] = await ProductModel.find();
    return products;
  } catch (e: any) {
    throw new Error(e);
  }
}

export async function updateProduct(
  input: DocumentDefinition<ProductDocument>
) {
  try {
    const product = await ProductModel.findByIdAndUpdate(input._id, input);
    if (product !== null) {
      return product.toJSON();
    }
    return null;
  } catch (e: any) {
    throw new Error(e);
  }
}
export async function deleteProduct(productId: string) {
  try {
    return ProductModel.deleteOne({ _id: productId });
  } catch (e: any) {
    throw new Error(e);
  }
}
export async function getProductsByNames(names: string[]) {
  try {
    return await ProductModel.find({ name: names });
  } catch (e: any) {
    console.log(e.message);
  }
}
