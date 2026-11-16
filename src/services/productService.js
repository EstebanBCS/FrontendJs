const API_URL = import.meta.env.VITE_API_URL

// funcion obtener productos para el catalogo
export async function getProducts(activo = true) {
  const response = await fetch(`${API_URL}/products?activo=${activo}`)

  if (!response.ok) {
    throw new Error('Error al obtener los productos')
  }

  return response.json()
}

// funcion para dar de alta producto con el formulario
export async function createProduct(product) {
  const response = await fetch(`${API_URL}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Error al registrar el producto')
  }

  return response.json()
}

// funcion para editar producto
export async function updateProduct(id, product) {
  const response = await fetch(`${API_URL}/products/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Error al actualizar el producto')
  }

  return response.json()
}

// funcion para eliminar producto
export async function deleteProduct(id) {
  const response = await fetch(`${API_URL}/products/${id}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Error al eliminar el producto')
  }
}
