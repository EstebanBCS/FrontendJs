import './App.css'
import { useEffect, useState } from 'react'
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  activateProduct,
} from './services/productService.js'
import ProductForm from './components/ProductForm.jsx'
import ProductTable from './components/ProductTable.jsx'
import Pagination from './components/Pagination.jsx'
import ProductFilter from './components/ProductFilter.jsx'

function App() {
  // Estados
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [activeFilter, setActiveFilter] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const limit = 10
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
    imagen_url: '',
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
      imagen_url: '',
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
      imagen_url: product.imagen_url || '',
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
    const confirmed = window.confirm('¿Seguro que deseas borrar el producto?')

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
        setError('')
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

            <ProductFilter
              activeFilter={activeFilter}
              setActiveFilter={setActiveFilter}
              setCurrentPage={setCurrentPage}
            />

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
          <ProductForm
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            resetForm={resetForm}
            editingId={editingId}
            saving={saving}
          />
        )}

        {loading && <p>Cargando los productos...</p>}
        {error && <p>{error}</p>}

        {!loading && !error && products.length === 0 && <p> No hay productos Registrados.</p>}

        {!loading && !error && products.length > 0 && (
          <>
            <ProductTable
              products={products}
              activeFilter={activeFilter}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              handleActivate={handleActivate}
            />

            <Pagination
              currentPage={currentPage}
              pagination={pagination}
              handlePreviousPage={handlePreviousPage}
              handleNextPage={handleNextPage}
            />
          </>
        )}
      </section>
    </main>
  )
}

export default App
