import { DocumentDefinition } from 'mongoose';
import ProductModel, { ProductDocument } from '../models/product.model';
import { Route, Get, Put, Post, Delete, Body, Path, Tags } from 'tsoa';
import { onProductChange } from '../utils/rabbitmq';
import log from '../utils/logger';
import { hash, objectIsModified } from './hashing/hashingService';

@Route('products')
@Tags('products')
export class ProductService {
  @Post('/')
  public async createProduct(
    @Body() input: DocumentDefinition<ProductDocument>
  ) {
    try {
      //create object
      const product = await ProductModel.create(input);

      const checksum = hash({ ...product.toJSON() });
      log.info(checksum);

      const updated = await ProductModel.findOneAndUpdate(
        { _id: product._id },
        { $set: { checksum: checksum } },
        { upsert: true, new: true }
      );

      return updated?.toJSON();
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
      const newChecksum = hash({ ...input });
      input.checksum = newChecksum;
      const product = await ProductModel.findByIdAndUpdate(
        { _id: input._id, author: input.author },
        input,
        { new: true }
      );
      if (product !== null) {
        log.info('updated');
        onProductChange(product, 'updated');
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
      const deleted = ProductModel.findOneAndDelete({ _id: productId });
      // const deleted = ProductModel.findById({ _id: productId });
      onProductChange(deleted.cast(), 'deleted');
      return deleted;
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
