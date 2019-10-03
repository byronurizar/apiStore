'use strict'
const Genero = use('App/Models/CatGenero');
class GeneroController {
    async index() {
        const genero = Genero.fetch();
        return await genero;
    }
    async create(request) {
        const { descripcion, idEstado } = request.all();
        const genero = await Genero.create({
            descripcion,
            idEstado
        });
        return genero;
    }
    async update() {

    }
    async destroy() {

    }
}

module.exports = GeneroController
