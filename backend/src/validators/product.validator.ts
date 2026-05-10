import { z } from 'zod';

export const createProductSchema = z.object({
    name: z.string().min(1, 'Nome é obrigatório'),
    description: z.string().min(1, 'Descrição é obrigatória'),
    price: z.number().positive('Preço deve ser um número positivo'),
    stock_quantity: z.number().int().min(0, 'Quantidade não pode ser negativa')
});

export const updateProductSchema = createProductSchema.partial();