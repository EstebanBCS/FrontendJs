import { useState, useEffect } from 'react'

function ProductImage({ src, alt, onClick }) {
  const [hasError, setHasError] = useState(false)

  if (!src) {
    return <span> Sin Imagen </span>
  }

  if (hasError) {
    return <span> Imagen No Disponible </span>
  }

  return (
    <img
      src={src}
      alt={alt}
      onClick={onClick}
      className="product-image"
      onError={() => setHasError(true)}
    />
  )
}

function ProductTable({ products, activeFilter, handleEdit, handleDelete, handleActivate }) {
  const [selectedImage, setSelectedImage] = useState(null)

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setSelectedImage(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <>
      <div className="table-container">
        <table className="products-table">
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
                    onClick={() =>
                      setSelectedImage({
                        url: product.imagen_url,
                        nombre: product.nombre,
                      })
                    }
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
      {selectedImage && (
        <div className="image-modal" onClick={() => setSelectedImage(null)}>
          <div className="image-modal-content" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              className="image-modal-close"
              onClick={() => setSelectedImage(null)}
            >
              &times;
            </button>

            <h3>{selectedImage.nombre}</h3>

            <img src={selectedImage.url} alt={selectedImage.nombre} />
          </div>
        </div>
      )}
    </>
  )
}
export default ProductTable
