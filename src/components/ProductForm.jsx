function ProductForm({ formData, handleChange, handleSubmit, resetForm, editingId, saving }) {
  return (
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
            maxLength={50}
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

        <div className="form-group">
          <label>URL de la imagen</label>
          <input
            type="url"
            name="imagen_url"
            value={formData.imagen_url}
            onChange={handleChange}
            placeholder="https://ejemplo.com/imagen.jpg"
          />
        </div>

        {formData.imagen_url && (
          <div className="image-preview">
            <img
              src={formData.imagen_url}
              alt="Vista previa del producto"
              onError={(event) => {
                event.target.style.display = 'none'
              }}
              onLoad={(event) => {
                event.target.style.display = 'block'
              }}
            />
          </div>
        )}
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
  )
}
export default ProductForm
