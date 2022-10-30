import { model, Schema, Model, Document } from 'mongoose';
import { ProductDocument } from './product.model';

export interface CartDocument extends Document {
  userId: string;
  productList: Array<ProductDocument>;
  total: number;
}
const CartSchema: Schema = new Schema(
  {
    userId: { type: String, required: true },
    productList: { type: Array, required: true },
    total: { type: Number, required: false },
  },
  { timestamps: true }
);

CartSchema.pre('save', async function (next) {
  let cart = this as CartDocument;
});

const CartModel = model<CartDocument>('Shopping cart', CartSchema);

export default CartModel;
