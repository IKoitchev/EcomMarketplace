import { DocumentDefinition } from 'mongoose';
import ProductModel, { ProductDocument } from '../models/product.model';
import { Route, Get, Put, Post, Delete, Body, Path, Tags } from 'tsoa';

@Route('products')
@Tags('products')
export class ProductService {
  @Post('/')
  public async createProduct(
    @Body() input: DocumentDefinition<ProductDocument>
  ) {
    try {
      const product = await ProductModel.create(input);
      return product.toJSON();
    } catch (e: any) {
      throw new Error(e);
    }
  }
  @Get('/')
  public async getAllProducts() {
    try {
      const products: ProductDocument[] = await ProductModel.find();
      return products;
    } catch (e: any) {
      throw new Error(e);
    }
  }
  @Put('/')
  public async updateProduct(
    @Body() input: DocumentDefinition<ProductDocument>
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
  @Delete('/:productId')
  public async deleteProduct(@Path() productId: string) {
    try {
      return ProductModel.deleteOne({ _id: productId });
    } catch (e: any) {
      throw new Error(e);
    }
  }

  public async getProductsByNames(@Body() names: string[]) {
    try {
      return await ProductModel.find({ name: names });
    } catch (e: any) {
      console.log(e.message);
    }
  }
}
