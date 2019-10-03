'use strict'
const Estado = use('App/Models/CatEstado');
const Database = use('Database')
class EstadoController {
    async index() {
        return await Database.table('cat_estados').select('*')
    }
    async registrar({auth,request}){
        const usuario = await auth.getUser();

        const {descripcion}=request.all();
        const estado=new Estado();
        
        estado.fill({
            descripcion
        });

        usuario.estados().save(estado);
        return estado;
    }
}

module.exports = EstadoController
