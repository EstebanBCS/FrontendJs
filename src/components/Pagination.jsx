function Pagination({ currentPage, pagination, handlePreviousPage, handleNextPage }) {
  return (
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
  )
}

export default Pagination
