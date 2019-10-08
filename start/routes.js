'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

Route.group(() => {
  //Usuarios
  Route.post('usuario/registro', 'UsuarioController.store');
  Route.post('usuario/login', 'UsuarioController.login');

  //Estados
  Route.post('estados/registro', 'EstadoController.registrar');
  Route.patch('estados/actualizar/:id', 'EstadoController.actualizar');
  Route.delete('estados/eliminar/:id', 'EstadoController.eliminar');
  Route.get('estados/listar', 'EstadoController.listar');

  //Generos
  Route.post('generos/registro', 'GeneroController.registrar');
  Route.patch('generos/actualizar/:id', 'GeneroController.actualizar');
  Route.get('generos/listar', 'GeneroController.listar');

  //Departamentos
  Route.post('departamentos/registro', 'DepartamentoController.registrar');
  Route.patch('departamentos/actualizar/:id', 'DepartamentoController.actualizar');
  Route.get('departamentos/listar', 'DepartamentoController.listar');

  //Municipios
  Route.post('municipios/registro', 'MunicipioController.registrar');
  Route.patch('municipios/actualizar/:id', 'MunicipioController.actualizar');
  Route.get('municipios/listar', 'MunicipioController.listar');
  Route.get('municipios/listar/departamento/:id', 'MunicipioController.municipiosDepartamento');

  //Roles
  Route.post('roles/registro', 'RolController.registrar');
  Route.patch('roles/actualizar/:id', 'RolController.actualizar');
  Route.get('roles/listar', 'RolController.listar');

  //Categorias
  Route.post('categorias/registro', 'CategoriaController.registrar');
  Route.patch('categorias/actualizar/:id', 'CategoriaController.actualizar');
  Route.get('categorias/listar', 'CategoriaController.listar');

  //Proveedores
  Route.post('proveedores/registro', 'ProveedorController.registrar');
  Route.patch('proveedores/actualizar/:id', 'ProveedorController.actualizar');
  Route.get('proveedores/listar', 'ProveedorController.listar');

  //Teléfono Proveedor
  Route.post('proveedores/telefonos/registro', 'TelefonoProveedorController.registrar');
  Route.patch('proveedores/telefonos/actualizar/:id', 'TelefonoProveedorController.actualizar');
  Route.get('proveedores/telefonos/listar/:id', 'TelefonoProveedorController.listar');

  //Productos
  Route.post('productos/registro', 'ProductoController.registrar');
  Route.patch('productos/actualizar/:id', 'ProductoController.actualizar');
  Route.get('productos/listar', 'ProductoController.listar');
  Route.get('productos/listar/:tipo/:id', 'ProductoController.listar'); //tipo : proveedor o categoria
  Route.get('productos/listar/precio/:desde/:asta', 'ProductoController.listarPorPrecio');

  //Info Adicional Producto
  Route.post('productos/infoadicional/registro', 'InfoAdicionalProductoController.registrar');
  Route.patch('productos/infoadicional/actualizar/:id', 'InfoAdicionalProductoController.actualizar');
  Route.get('productos/infoadicional/listar/producto/:id', 'InfoAdicionalProductoController.listar');

  //Etiquetas
  Route.post('etiquetas/registro', 'EtiquetaController.registrar');
  Route.patch('etiquetas/actualizar/:id', 'EtiquetaController.actualizar');
  Route.get('etiquetas/listar', 'EtiquetaController.listar');

  //Etiquetas a Producto
  Route.post('etiquetasproducto/registro', 'EtiquetaProductoController.registrar');
  Route.patch('etiquetasproducto/actualizar/:id', 'EtiquetaProductoController.actualizar');
  Route.get('etiquetasproducto/listar/producto/:id', 'EtiquetaProductoController.listar');

  //Tallas
  Route.post('tallas/registro', 'TallaProductoController.registrar');
  Route.patch('tallas/actualizar/:id', 'TallaProductoController.actualizar');
  Route.get('tallas/listar', 'TallaProductoController.listar');
  Route.get('tallas/listar/producto/:id', 'TallaProductoController.tallaProducto');

  //Colores
  Route.post('colores/registro', 'CatColoreController.registrar');
  Route.patch('colores/actualizar/:id', 'CatColoreController.actualizar');
  Route.get('colores/listar', 'CatColoreController.listar');
  Route.get('colores/listar/producto/:id', 'CatColoreController.coloresProducto');
  
  //Stock Producto
  Route.post('productos/stock/registro', 'StockProductoController.registrar');
  Route.patch('productos/stock/actualizar/:id', 'StockProductoController.actualizar');
  Route.get('productos/stock/listar', 'StockProductoController.listar');

  

}).prefix('apiStore/v1/');