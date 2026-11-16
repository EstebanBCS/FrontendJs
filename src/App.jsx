import './App.css'
import { useEffect, useState } from 'react'
import { getProducts } from './services/productService.js'

function App() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showForm, setShowForm] = useState(false)

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

          <button className="btn-primary" onClick={() => setShowForm(true)}>
            + Nuevo Producto
          </button>
        </div>

        {showForm && (
          <div className="product-form">
            <h3>Registrar Nuevo Producto</h3>

            <div className="from-grid">
              <div className="form-group">
                <label>Nombre</label>
                <input type="text" placeholder="Nombre del Producto" />
              </div>

              <div className="form-group">
                <label>Categoria</label>
                <input type="text" placeholder="Categoria" />
              </div>

              <div className="form-group">
                <label>Marca</label>
                <input type="text" placeholder="Marca" />
              </div>

              <div className="form-group">
                <label>Precio</label>
                <input type="number" placeholder="Precio" />
              </div>

              <div className="form-group">
                <label>Stock</label>
                <input type="text" placeholder="Cantidad Disponible" />
              </div>

              <div className="form-group">
                <label>Descripcion</label>
                <input type="text" placeholder="Descripcion del Producto" />
              </div>

              <div className="form-actions">
                <button className="btn-secondary" onClick={() => setShowForm(false)}>
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}

        {loading && <p>Cargando los productos...</p>}
        {error && <p>{error}</p>}

        {!loading && !error && products.length === 0 && <p> No hay productos Registrados.</p>}

        {!loading && !error && products.length > 0 && (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Categoria</th>
                  <th>Marca</th>
                  <th>Precio</th>
                  <th>Stock</th>
                </tr>
              </thead>

              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.nombre}</td>
                    <td>{product.categoria}</td>
                    <td>{product.marca}</td>
                    <td>${Number(product.precio).toLocaleString('es-MX')}</td>
                    <td>{product.stock}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  )
}

export default App
