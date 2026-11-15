import './App.css'
import { useEffect, useState } from 'react'
import { getProducts } from './services/productService.js'

function App() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await getProducts()
        setProducts(response.data)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  return (
    <main className="app">
      <header className="app-header">
        <div>
          <h1>Inventario de Productos</h1>
          <p>Crud para administrar y consultar productos</p>
        </div>
      </header>

      <section className="products-section">
        <div className="section-header">
          <div>
            <h2>Productos</h2>
            <p>Consulta los productos registrados</p>
          </div>
        </div>

        <div className="products-content">
          {loading && <p>Cargando los productos...</p>}
          {error && <p>{error}</p>}

          {!loading && !error && products.length === 0 && <p> No hay productos Registrados.</p>}

          {!loading && !error && products.length > 0 && (
            <ul>
              {products.map((product) => (
                <li key={product.id}>
                  {product.nombre} - ${product.precio}
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </main>
  )
}

export default App
