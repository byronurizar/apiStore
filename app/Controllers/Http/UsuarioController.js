'use strict'
const User = use('App/Models/User');
const Persona = use('App/Models/Persona');
const Database = use('Database');
class UsuarioController {
    async login({ request, auth }) {
        const { email, password } = request.all();

        const token = await auth.attempt(email, password);
        return token;

    }

    async  store({ request }) { //puede ser cualquier nombre
        const { email, password } = request.all(); //de todo lo que recibe debe buscar lo primero

        const user = await User.create({
            username: email,
            email,
            password
        });

        // return this.login(...arguments);
        return user;

    };

    async registrarUsuario({ request, response, auth }) {
        let codigoHttp = 200;
        let codigo = 0;
        let error = '';
        let respuesta = '';
        let data = null;

        try {
            let existeCorreo = false;
            let idPersona = 0;
            const { primerNombre, segundoNombre, otrosNombres, primerApellido, segundoApellido, otrosApellidos, fechaNacimiento, idGenero, correo, idMunicipio, idEstado, contrasenia } = request.all();
            const infoPersona = await Database
                .table('users').where('username', correo);
            Database.close();
            await infoPersona.forEach(fila => {
                existeCorreo = true;
                codigo = -1;
                error = "El correo ya existe por favor verifique o puede iniciar sesión con sus credenciales";
            });
            if (!existeCorreo) {

                const persona = await Persona.create({
                    primerNombre,
                    segundoNombre,
                    otrosNombres,
                    primerApellido,
                    segundoApellido,
                    otrosApellidos,
                    fechaNacimiento,
                    idGenero,
                    correo,
                    idMunicipio,
                    idEstado
                });

                idPersona = persona.$attributes.id;

                const usuario = await User.create({
                    username: correo,
                    email: correo,
                    password: contrasenia,
                    idPersona
                });
                if (usuario.$attributes.id) {
                    respuesta = "Usuario creado exitosamente";
                    const token = await auth.attempt(correo, contrasenia);
                    data = token;
                } else {
                    codigo = -1;
                    respuesta = 'Ocurrió un error al intentar crear el usuario';
                }
            }
        } catch (err) {
            codigoHttp = 500;
            codigo = -1;
            error = err.message;
            respuesta = 'Ocurrió un error al realizar la acción solicitada';
            data = null;
            console.log(err);
        }
        return response.status(codigoHttp).json({
            codigo,
            error,
            respuesta,
            data
        });
    };
}

module.exports = UsuarioController
