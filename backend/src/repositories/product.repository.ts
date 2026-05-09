import prisma from '../lib/prisma.js';

export async function getAllProducts() {
    return await prisma.product.findMany();
}

export async function getProductById(id: string) {
    return await prisma.product.findUnique({
        where: { id }
    });
}

export async function createProduct(data: {
    name: string,
    description: string,
    price: number,
    stock_quantity: number

}) {
    return await prisma.product.create({ data });
}

export async function updateProduct(id: string, data: {
    name?: string,
    description?: string,
    price?: number,
    stock_quantity?: number
}) {
    return await prisma.product.update({
        where: { id },
        data
    });
}

export async function deleteProduct(id: string) {
    return await prisma.product.delete({
        where: { id }
    });
}