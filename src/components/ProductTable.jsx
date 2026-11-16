import { useState } from 'react'

function ProductImage({ src, alt }) {
  const [hasError, setHasError] = useState(false)

  if (!src) {
    return <span> Sin Imagen </span>
  }

  if (hasError) {
    return <span> Imagen No Disponible </span>
  }

  return <img src={src} alt={alt} className="product-image" onError={() => setHasError(true)} />
}

function ProductTable({ products, activeFilter, handleEdit, handleDelete, handleActivate }) {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Imagen</th>
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
              <td>
                <ProductImage
                  key={product.imagen_url}
                  src={product.imagen_url}
                  alt={product.nombre}
                />
              </td>
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
    </div>
  )
}

export default ProductTable
