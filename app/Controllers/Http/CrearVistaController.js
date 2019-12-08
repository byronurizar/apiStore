'use strict'
const Database = use('Database');
class CrearVistaController {
    async crearVistas({ auth, response }) {
        let codigoHttp = 200;
        let codigo = 0;
        let error = '';
        let respuesta = '';
        let data = null;

        const usuario = await auth.getUser();
        try {

            data = await Database
                .raw('CREATE OR replace VIEW vistaCategorias AS select a.id,a.descripcion,b.descripcion as idEstado from cat_categorias a inner join cat_estados b on a.idEstado=b.id where a.idEstado in(1,2);');

            data = await Database
                .raw('CREATE OR REPLACE VIEW vistaDepartamentos as SELECT a.id,a.descripcion,b.descripcion AS idEstado FROM cat_departamentos a INNER JOIN cat_estados b ON a.idEstado=b.id WHERE a.idEstado IN(1,2);');

            data = await Database
                .raw(`CREATE OR REPLACE VIEW vistaMunicipios AS 
                   SELECT a.id,a.descripcion,b.descripcion AS idDepartamento,c.descripcion AS idEstado 
                   FROM cat_municipios a INNER JOIN cat_departamentos b 
                   ON a.idDepartamento=b.id INNER JOIN cat_estados c 
                   ON a.idEstado=c.id WHERE a.idEstado IN(1,2,3)`);
            data = await Database
                .raw(`CREATE OR REPLACE VIEW vistaRoles
                    AS
                    SELECT a.id,a.descripcion,b.descripcion AS idEstado 
                    FROM cat_rols a INNER JOIN cat_estados b ON a.idEstado=b.id 
                    WHERE a.idEstado IN(1,2)`);

            data =await Database
            .raw(`CREATE OR REPLACE VIEW vistaProveedores
            AS
            SELECT a.id,a.nombre,a.descripcion,a.direccion,b.descripcion AS idEstado FROM proveedors a
            INNER JOIN cat_estados b
            ON a.idEstado=b.id
            WHERE a.idEstado IN(1,2)`);

            Database.close();
        } catch (err) {
            codigoHttp = 500;
            codigo = -1;
            error = err.message;
            respuesta = 'Ocurrió un error al realizar la acción solicitada';
            data = null;
        }

        return response.status(codigoHttp).json({
            codigo,
            error,
            respuesta,
            data
        });
    }
}

module.exports = CrearVistaController
