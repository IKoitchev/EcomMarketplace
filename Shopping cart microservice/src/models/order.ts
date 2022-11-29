import { model, Schema, Model, Document } from 'mongoose';
import { boolean } from 'zod';
import { ProductDocument } from './product.model';

export interface OrderDocument extends Document {
  userId: string;
  productList: Array<ProductDocument>;
  total: number;
}
const OrderSchema: Schema = new Schema(
  {
    userId: { type: String, required: true },
    productList: { type: Array, required: true },
    total: { type: Number, required: false },
    isFinished: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);

OrderSchema.pre('save', async function (next) {
  let order = this as OrderDocument;
});

const OrderModel = model<OrderDocument>('Order', OrderSchema);

export default OrderModel;
