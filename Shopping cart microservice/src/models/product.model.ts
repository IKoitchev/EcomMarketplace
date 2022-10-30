import { model, Schema, Model, Document } from 'mongoose';

export interface ProductDocument extends Document {
  name: string;
  description: string;
  price: number;
}

const ProductSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

ProductSchema.pre('save', async function (next) {
  let product = this as ProductDocument;
});

const ProductModel = model<ProductDocument>('Product', ProductSchema);

export default ProductModel;
