import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createProduct, updateProduct } from '../services/api'
import type { Product } from '../services/api'

interface Props {
    product?: Product
    onClose: () => void
}

export default function ProductModal({ product, onClose }: Props) {
    const queryClient = useQueryClient()
    const [name, setName] = useState(product?.name ?? '')
    const [description, setDescription] = useState(product?.description ?? '')
    const [price, setPrice] = useState(product?.price.toString() ?? '')
    const [stock_quantity, setStockQuantity] = useState(product?.stock_quantity.toString() ?? '')

    const createMutation = useMutation({
        mutationFn: createProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] })
            onClose()
        }
    })
    const updateMutation = useMutation({
        mutationFn: ({ id, data }: { id: string, data: any }) =>
            updateProduct(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] })
            onClose()
        },
    })

    function handleSubmit() {
        const data = { name, description, price: Number(price), stock_quantity: Number(stock_quantity) }
        if (product) {
            updateMutation.mutate({ id: product.id, data })
        } else {
            createMutation.mutate(data)
        }
    }
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">
                    {product ? 'Editar Produto' : 'Novo Produto'}
                </h2>

                <div className="flex flex-col gap-3">
                    <input
                        placeholder="Nome"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="border p-2 rounded"
                    />
                    <input
                        placeholder="Descrição"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        className="border p-2 rounded"
                    />
                    <input
                        type="number"
                        placeholder="Preço"
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                        className="border p-2 rounded"
                    />
                    <input
                        type="number"
                        placeholder="Quantidade em estoque"
                        value={stock_quantity}
                        onChange={e => setStockQuantity(e.target.value)}
                        className="border p-2 rounded"
                    />
                </div>

                <div className="flex gap-2 mt-4 justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 border rounded"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                    >
                        {product ? 'Salvar' : 'Criar'}
                    </button>
                </div>
            </div>
        </div>
    )
}
