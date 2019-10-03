'use strict'
const User=use('App/Models/User');
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
}

module.exports = UsuarioController
