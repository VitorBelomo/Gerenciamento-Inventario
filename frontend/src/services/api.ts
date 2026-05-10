const BASE_URL = 'http://localhost:3000'

export interface Product {
  id: string
  name: string
  description: string
  price: number
  stock_quantity: number
  created_at: string
}

export async function getProducts(): Promise<Product[]> {
  const response = await fetch(`${BASE_URL}/products`)     
  return response.json()
}

export async function getProductById(id: string): Promise<Product> {
    const response = await fetch(`${BASE_URL}/products/${id}`)
    return response.json()
}

export async function createProduct(data: Omit<Product, 'id' | 'created_at'>): Promise<Product> {
    const response = await fetch(`${BASE_URL}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })
    return response.json()  
}

export async function updateProduct(id: string, data: Partial<Omit<Product, 'id' | 'created_at'>>): Promise<Product> {
  const response = await fetch(`${BASE_URL}/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  return response.json()
}

export async function deleteProduct(id: string): Promise<void> {
    await fetch(`${BASE_URL}/products/${id}`, {
        method: 'DELETE'
    })
}