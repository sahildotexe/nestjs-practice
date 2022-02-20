import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './product.model';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async insertProduct(title: string, desc: string, price: number) {
    const newProduct = new this.productModel({
      title,
      description: desc,
      price,
    });
    const result = await newProduct.save();
    console.log(result);
    return result.id as string;
  }

  async getProducts() {
    const products = await this.productModel.find().exec();
    return products.map((prod) => ({
      id: prod.id,
      title: prod.title,
      desc: prod.desc,
      price: prod.price,
    }));
  }

  async getProduct(productId: string) {
    const product = await this.findProduct(productId);
    return product;
  }

  async updateProduct(
    productId: string,
    title: string,
    desc: string,
    price: number,
  ) {
    const product = await this.findProduct(productId);
    if (title) {
      product.title = title;
    }
    if (desc) {
      product.desc = desc;
    }
    if (price) {
      product.price = price;
    }
    await product.save();
  }

  async deleteProduct(productId: string) {
    await this.productModel.deleteOne({ _id: productId }).exec();
  }

  private async findProduct(productId) {
    const product = await this.productModel.findById(productId);
    if (!product) {
      throw new NotFoundException('Could not find product.');
    }
    return product;
  }
}
