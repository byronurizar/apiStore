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

  Route.post('usuario/registro', 'UsuarioController.store');
  Route.post('usuario/login', 'UsuarioController.login');

  Route.post('genero', 'GeneroController.create');
  Route.get('genero', 'GeneroController.index');

  Route.post('estados/registro', 'EstadoController.registrar');

  Route.get('estados', 'EstadoController.index');
}).prefix('apiStore/v1/');