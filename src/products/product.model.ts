import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
  title: String,
  desc: String,
  price: Number,
});

export interface Product {
  id: string;
  title: string;
  desc: string;
  price: number;
}
