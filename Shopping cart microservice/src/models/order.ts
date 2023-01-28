import { model, Schema, Model, Document } from 'mongoose';
import { ProductDocument } from './product.model';

export interface OrderDocument extends Document {
  userEmail: string;
  productList: Array<ProductDocument>;
  total: number;
}
export interface UpdateCartDocument extends Document {
  userEmail: string;
  product: ProductDocument;
}
const OrderSchema: Schema = new Schema(
  {
    userEmail: { type: String, required: true },
    productList: { type: Array, required: true },
    total: { type: Number, required: false },
    isFinished: { type: Boolean, required: false, default: false },
  },
  { timestamps: true }
);
OrderSchema.pre('save', async function (next) {
  let order = this as OrderDocument;
});

const OrderModel = model<OrderDocument>('Order', OrderSchema);

export default OrderModel;
