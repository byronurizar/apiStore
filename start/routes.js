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


  Route.post('usuario/registro', 'UsuarioController.store');
  Route.post('usuario/login', 'UsuarioController.login');

  Route.post('genero', 'GeneroController.create');
  Route.get('genero', 'GeneroController.index');



}).prefix('apiStore/v1/');