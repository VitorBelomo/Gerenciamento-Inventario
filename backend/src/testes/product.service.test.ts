import { describe, it, expect, vi, beforeEach } from 'vitest'
import * as productService from '../services/product.service.js'
import * as productRepository from '../repositories/product.repository.js'

vi.mock('../repositories/product.repository.js')

describe('Product Service', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('deve retornar todos os produtos', async () => {
    const mockProducts = [
      { id: '1', name: 'Notebook', description: 'Notebook Dell', price: 4999, stock_quantity: 10, created_at: new Date() }
    ]

    vi.mocked(productRepository.getAllProducts).mockResolvedValue(mockProducts as any)

    const products = await productService.getAllProducts()

    expect(products).toEqual(mockProducts)
    expect(productRepository.getAllProducts).toHaveBeenCalledTimes(1)
  })

  it('deve retornar um produto pelo id', async () => {
    const mockProduct = { id: '1', name: 'Notebook', description: 'Notebook Dell', price: 4999, stock_quantity: 10, created_at: new Date() }

    vi.mocked(productRepository.getProductById).mockResolvedValue(mockProduct as any)

    const product = await productService.getProductById('1')

    expect(product).toEqual(mockProduct)
  })

  it('deve lançar erro quando produto não encontrado', async () => {
    vi.mocked(productRepository.getProductById).mockResolvedValue(null as any)

    await expect(productService.getProductById('999')).rejects.toThrow('Produto não encontrado')
  })

  it('deve criar um produto', async () => {
    const mockData = { name: 'Mouse', description: 'Mouse gamer', price: 199, stock_quantity: 5 }
    const mockProduct = { id: '2', ...mockData, created_at: new Date() }

    vi.mocked(productRepository.createProduct).mockResolvedValue(mockProduct as any)

    const product = await productService.createProduct(mockData)

    expect(product).toEqual(mockProduct)
    expect(productRepository.createProduct).toHaveBeenCalledWith(mockData)
  })

  it('deve deletar um produto', async () => {
    const mockProduct = { id: '1', name: 'Notebook', description: 'Notebook Dell', price: 4999, stock_quantity: 10, created_at: new Date() }

    vi.mocked(productRepository.deleteProduct).mockResolvedValue(mockProduct as any)

    await productService.deleteProduct('1')

    expect(productRepository.deleteProduct).toHaveBeenCalledWith('1')
  })
})