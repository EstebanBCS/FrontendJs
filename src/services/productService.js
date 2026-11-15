const API_URL = import.meta.env.VITE_API_URL

export async function getProducts() {
  const response = await fetch(`${API_URL}/products`)

  if (!response.ok) {
    throw new Error('Error al obtener los productos')
  }

  return response.json()
}
