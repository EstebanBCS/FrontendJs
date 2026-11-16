import './App.css'
import { useEffect, useState } from 'react'
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  activateProduct,
} from './services/productService.js'

function App() {
  // Estados
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)
  const [editingId, setEditingId] = useState(false)
  const [activeFilter, setActiveFilter] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [limit] = useState(10)
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  })
  const [formData, setFormData] = useState({
    nombre: '',
    categoria: '',
    marca: '',
    precio: '',
    stock: '',
    descripcion: '',
  })

  // funcion para la data del formulario
  function handleChange(event) {
    const { name, value } = event.target

    setFormData({
      ...formData,
      [name]: value,
    })
  }

  // funcion para limpiar el formulario al dar cancelar
  function resetForm() {
    setFormData({
      nombre: '',
      categoria: '',
      marca: '',
      precio: '',
      stock: '',
      descripcion: '',
    })
    setEditingId(null)
    setShowForm(false)
  }

  // funcion para editar producto
  function handleEdit(product) {
    setEditingId(product.id)

    setFormData({
      nombre: product.nombre,
      categoria: product.categoria,
      marca: product.marca,
      precio: product.precio,
      stock: product.stock,
      descripcion: product.descripcion || '',
    })
    setShowForm(true)
  }

  // funcion para pasar los datos al backend
  async function handleSubmit(event) {
    event.preventDefault()

    setSaving(true)

    try {
      const productData = {
        ...formData,
        precio: Number(formData.precio),
        stock: Number(formData.stock),
      }

      if (editingId) {
        await updateProduct(editingId, productData)
      } else {
        await createProduct(productData)
      }

      const response = await getProducts(activeFilter, currentPage, limit)
      setProducts(response.data)
      setPagination(response.meta)

      resetForm()
    } catch (error) {
      alert(error.message)
    } finally {
      setSaving(false)
    }
  }

  // funcion para eliminar producto
  async function handleDelete(id) {
    const confirmed = window.confirm('¿Seguro que deaseas borrar el producto?')

    if (!confirmed) {
      return
    }

    try {
      await deleteProduct(id)

      const response = await getProducts(activeFilter, currentPage, limit)

      if (response.meta.totalPages > 0 && currentPage > response.meta.totalPages) {
        setCurrentPage(response.meta.totalPages)
        return
      }

      setProducts(response.data)
      setPagination(response.meta)
    } catch (error) {
      alert(error.message)
    }
  }

  // funcion para reactivar producto
  async function handleActivate(id) {
    const confirmed = window.confirm('¿Seguro que quieres reactivar este producto?')

    if (!confirmed) {
      return
    }

    try {
      await activateProduct(id)

      const response = await getProducts(activeFilter, currentPage, limit)

      if (response.meta.totalPages > 0 && currentPage > response.meta.totalPages) {
        setCurrentPage(response.meta.totalPages)
        return
      }

      setProducts(response.data)
      setPagination(response.meta)
    } catch (error) {
      alert(error.message)
    }
  }

  // funciones para paginacion
  function handlePreviousPage() {
    setCurrentPage((prev) => prev - 1)
  }

  function handleNextPage() {
    setCurrentPage((prev) => prev + 1)
  }

  // consultar productos y actualizar la tabla
  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await getProducts(activeFilter, currentPage, limit)

        if (response.meta.totalPages > 0 && currentPage > response.meta.totalPages) {
          setCurrentPage(response.meta.totalPages)
          return
        }

        setProducts(response.data)
        setPagination(response.meta)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [activeFilter, currentPage, limit])

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
            <select
              value={activeFilter}
              onChange={(event) => {
                setActiveFilter(event.target.value === 'true')
                setCurrentPage(1)
              }}
            >
              <option value="true">Productos Activos</option>
              <option value="false">Productos Inactivos</option>
            </select>
            <p>Consulta los productos registrados</p>
          </div>

          <button
            className="btn-primary"
            onClick={() => {
              resetForm()
              setShowForm(true)
            }}
          >
            + Nuevo Producto
          </button>
        </div>

        {showForm && (
          <form className="product-form" onSubmit={handleSubmit}>
            <h3>{editingId ? 'Editar Producto' : 'Registrar Nuevo Producto'}</h3>

            <div className="form-grid">
              <div className="form-group">
                <label>Nombre</label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  placeholder="Nombre del Producto"
                  required
                  maxLength={50}
                />
              </div>

              <div className="form-group">
                <label>Categoria</label>
                <input
                  type="text"
                  name="categoria"
                  value={formData.categoria}
                  onChange={handleChange}
                  placeholder="Categoria"
                  required
                  maxLength={50}
                />
              </div>

              <div className="form-group">
                <label>Marca</label>
                <input
                  type="text"
                  name="marca"
                  value={formData.marca}
                  onChange={handleChange}
                  placeholder="Marca"
                  required
                  max={50}
                />
              </div>

              <div className="form-group">
                <label>Precio</label>
                <input
                  type="number"
                  name="precio"
                  value={formData.precio}
                  onChange={handleChange}
                  placeholder="Precio"
                  required
                  min="0.01"
                  step="0.01"
                />
              </div>

              <div className="form-group">
                <label>Stock</label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  placeholder="Cantidad Disponible"
                  required
                  min="0"
                  step="1"
                />
              </div>

              <div className="form-group">
                <label>Descripcion</label>
                <input
                  type="text"
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleChange}
                  placeholder="Descripcion del Producto"
                  maxLength={200}
                />
              </div>
            </div>

            <div className="form-actions">
              <button type="button" className="btn-secondary" onClick={resetForm}>
                Cancelar
              </button>

              <button type="submit" className="btn-primary" disabled={saving}>
                {saving ? 'Guardando...' : editingId ? 'Actualizar Producto' : 'Guardar Producto'}
              </button>
            </div>
          </form>
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
                  <th>Acciones</th>
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
                    <td>
                      {activeFilter ? (
                        <>
                          <button
                            type="button"
                            className="btn-secondary"
                            onClick={() => handleEdit(product)}
                          >
                            Editar
                          </button>

                          <button
                            type="button"
                            className="btn-danger"
                            onClick={() => handleDelete(product.id)}
                          >
                            Eliminar
                          </button>
                        </>
                      ) : (
                        <button
                          type="button"
                          className="btn-primary"
                          onClick={() => handleActivate(product.id)}
                        >
                          Reactivar
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="pagination">
              <button
                type="button"
                className="btn-secondary"
                onClick={handlePreviousPage}
                disabled={currentPage <= 1 || pagination.totalPages === 0}
              >
                Anterior
              </button>

              <span>
                {pagination.totalPages === 0
                  ? 'Sin páginas'
                  : `Página ${pagination.page} de ${pagination.totalPages}`}
              </span>

              <button
                type="button"
                className="btn-secondary"
                onClick={handleNextPage}
                disabled={currentPage >= pagination.totalPages}
              >
                Siguiente
              </button>
            </div>
          </div>
        )}
      </section>
    </main>
  )
}

export default App
