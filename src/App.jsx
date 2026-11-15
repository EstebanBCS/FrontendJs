import './App.css'

function App() {
  return (
    <main className="app">
      <header>
        <div>
          <h1>Inventario de Productos</h1>
          <p>Crud para administrar y consultar productos</p>
        </div>
      </header>

      <div className="ticks"></div>

      <section className="products-section">
        <div className="section-header">
          <div>
            <h2>Productos</h2>
            <p>Consulta los productos registrados</p>
          </div>
        </div>

        <div className="products-content">
          <p>Los Productos apareceran aqui:</p>
        </div>
      </section>
    </main>
  )
}

export default App
