import { model, Schema, Model, Document } from 'mongoose';

export interface ProductDocument extends Document {
  name: string;
  description: string;
  price: number;
  image: string;
  author: string;
  checksum: string;
}

const ProductSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    author: { type: String, required: false },
    checksum: { type: String, required: false, default: '' },
  },
  { timestamps: false, versionKey: false }
);

ProductSchema.pre('save', async function (next) {
  let product = this as ProductDocument;
});

const ProductModel = model<ProductDocument>('Product', ProductSchema);

export default ProductModel;
