import * as productRepository from '../repositories/product.repository.js';

export async function getAllProducts() {
    return await productRepository.getAllProducts();
}

export async function getProductById(id: string) {
    const product = await productRepository.getProductById(id);

    if (!product) {
        throw new Error('Produto não encontrado');
    }

    return product;
} 

export async function createProduct(data: {
    name: string,
    description: string,
    price: number,
    stock_quantity: number

}) {
    return await productRepository.createProduct(data);
}

export async function updateProduct(id: string, data: any) {
  return await productRepository.updateProduct(id, data)
}

export async function deleteProduct(id: string) {
    return await productRepository.deleteProduct(id);
}