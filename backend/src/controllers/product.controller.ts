import type { Request, Response } from 'express'
import * as productService from '../services/product.service.js'
import { createProductSchema, updateProductSchema } from '../validators/product.validator.js'

export async function getAllProducts(req: Request, res: Response) {
  try {
    const products = await productService.getAllProducts()
    res.json(products)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar produtos' })
  }
}

export async function getProductById(req: Request, res: Response) {
  try {
    const { id } = req.params
    const product = await productService.getProductById(id as string)
    res.json(product)
  } catch (error) {
    res.status(404).json({ error: 'Produto não encontrado' })
  }
}

export async function createProduct(req: Request, res: Response) {
  try {
    const parsed = createProductSchema.safeParse(req.body)

if (!parsed.success) {
  res.status(400).json({ error: parsed.error.message })
  return
}

    const product = await productService.createProduct(parsed.data)
    res.status(201).json(product)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar produto' })
  }
}

export async function updateProduct(req: Request, res: Response) {
  try {
    const { id } = req.params
    const parsed = updateProductSchema.safeParse(req.body)

if (!parsed.success) {
  res.status(400).json({ error: parsed.error.message })
  return
}

    const product = await productService.updateProduct(id as string, parsed.data)
    res.json(product)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar produto' })
  }
}

export async function deleteProduct(req: Request, res: Response) {
  try {
    const { id } = req.params
    await productService.deleteProduct(id as string)
    res.status(204).send()
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar produto' })
  }
}