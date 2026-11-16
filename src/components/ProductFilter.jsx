function ProductFilter({ activeFilter, setActiveFilter, setCurrentPage }) {
  return (
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
  )
}

export default ProductFilter
