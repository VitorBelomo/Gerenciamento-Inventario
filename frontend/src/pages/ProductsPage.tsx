import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getProducts, deleteProduct } from '../services/api'
import type { Product } from '../services/api'
import ProductModal from '../components/ProductModal'

export default function ProductsPage() {
  const queryClient = useQueryClient()
  const [search, setSearch] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(undefined)

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  })

  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  })

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  )

  if (isLoading) return <p className="p-8">Carregando...</p>

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gestão de Inventário</h1>
        <button
          onClick={() => { setSelectedProduct(undefined); setModalOpen(true) }}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Novo Produto
        </button>
      </div>

      <input
        type="text"
        placeholder="Buscar produto..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="border p-2 rounded w-full mb-6"
      />

      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2 text-left">Nome</th>
            <th className="border p-2 text-left">Preço</th>
            <th className="border p-2 text-left">Estoque</th>
            <th className="border p-2 text-left">Ações</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(product => (
            <tr key={product.id}>
              <td className="border p-2">{product.name}</td>
              <td className="border p-2">R$ {Number(product.price).toFixed(2)}</td>
              <td className="border p-2">{product.stock_quantity}</td>
              <td className="border p-2 flex gap-2">
                <button
                  onClick={() => { setSelectedProduct(product); setModalOpen(true) }}
                  className="bg-yellow-400 px-3 py-1 rounded"
                >
                  Editar
                </button>
                <button
                  onClick={() => deleteMutation.mutate(product.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Deletar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalOpen && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  )
}