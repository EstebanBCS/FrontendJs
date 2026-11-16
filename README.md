# Frontend - Sistema de Inventario de Productos

## Descripción

Aplicación web desarrollada para la gestión de un inventario de productos. Permite consultar, registrar, editar, eliminar y reactivar productos mediante una interfaz gráfica que consume los servicios REST del backend.

## Tecnologías utilizadas

- **React 19:** biblioteca para la construcción de interfaces de usuario.
- **Vite:** herramienta de desarrollo y compilación.
- **JavaScript:** lenguaje de programación.
- **Fetch API:** consumo de los endpoints del backend.
- **CSS3:** estilos y diseño responsivo.
- **ESLint:** análisis estático del código.
- **Prettier:** formato del código.
- **Husky y lint-staged:** automatización de validaciones y formato mediante Git.

## Funcionalidades

- Visualización de productos registrados.
- Registro de nuevos productos.
- Edición de productos existentes.
- Eliminación lógica de productos.
- Reactivación de productos eliminados.
- Filtrado entre productos activos e inactivos.
- Paginación de resultados.
- Registro y visualización de imágenes mediante URL.
- Vista previa de imágenes en el formulario.
- Ampliación de imágenes mediante una ventana modal.
- Manejo de errores cuando una imagen no está disponible.
- Diseño responsivo para escritorio, tabletas y dispositivos móviles.

## Estructura del proyecto

```text
frontend/
├── husky/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── ProductForm.jsx
│   │   ├── ProductTable.jsx
│   │   ├── Pagination.jsx
│   │   └── ProductFilter.jsx
│   ├── services/
│   │   └── productService.js
│   ├── App.jsx
│   ├── App.css
│   └── index.css
├── .env
├── .env.example
├── package.json
└── README.md
```

## Requisitos previos

- Node.js y npm.
- Backend del sistema de inventario en funcionamiento.
- Base de datos PostgreSQL configurada desde el backend.

## Instalación

1. Clonar el repositorio:

```bash
git clone https://github.com/EstebanBCS/FrontendJs.git
```

2. Acceder a la carpeta del frontend:

```bash
cd frontend
```

3. Instalar las dependencias:

```bash
npm install
```

## Configuración de variables de entorno

Crear un archivo `.env` en la raíz del frontend con la siguiente variable:

```env
VITE_API_URL=http://localhost:3000
```

Esta variable establece la URL base del backend que utiliza la aplicación para realizar las peticiones HTTP.

## Ejecución del proyecto

Iniciar el servidor de desarrollo:

```bash
npm run dev
```

Vite mostrará en la terminal la dirección local para acceder a la aplicación desde el navegador.

## Scripts disponibles

| Comando                | Descripción                                               |
| ---------------------- | --------------------------------------------------------- |
| `npm run dev`          | Inicia el servidor de desarrollo.                         |
| `npm run build`        | Genera la versión de producción.                          |
| `npm run preview`      | Permite previsualizar la compilación.                     |
| `npm run lint`         | Ejecuta ESLint para revisar el código.                    |
| `npm run lint:fix`     | Corrige automáticamente problemas detectables por ESLint. |
| `npm run format`       | Aplica formato al código con Prettier.                    |
| `npm run format:check` | Comprueba el formato del código.                          |

## Comunicación con el backend

La aplicación utiliza Fetch API para consumir los siguientes endpoints:

| Operación           | Método HTTP | Endpoint                 |
| ------------------- | ----------- | ------------------------ |
| Consultar productos | GET         | `/products`              |
| Registrar producto  | POST        | `/products`              |
| Actualizar producto | PUT         | `/products/:id`          |
| Eliminar producto   | DELETE      | `/products/:id`          |
| Reactivar producto  | PATCH       | `/products/:id/activate` |

Las peticiones se encuentran centralizadas en `src/services/productService.js`.

## Diseño responsivo

La interfaz se adapta a diferentes tamaños de pantalla:

- Escritorio.
- Tabletas.
- Dispositivos móviles.

En pantallas pequeñas, la tabla permite desplazamiento horizontal y el formulario adapta su distribución a una sola columna.
