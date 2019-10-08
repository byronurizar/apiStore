'use strict'
const ImagenProducto = use('App/Models/ImagenProducto');
const Database = use('Database');
class ImagenProductoController {
    async listar({ auth, response }) {
        let codigoHttp = 200;
        let codigo = 0;
        let error = '';
        let respuesta = '';
        let data = null;

        const usuario = await auth.getUser();
        try {
            data = await ImagenProducto.all();
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
    async imagenesProducto({ auth, params, response }) {
        let codigoHttp = 200;
        let codigo = 0;
        let error = '';
        let respuesta = '';
        let data = null;

        const usuario = await auth.getUser();
        const { id } = params;
        try {
            data = await Database
                .select('productos.id as idProducto',
                    'productos.nombre as Producto',
                    'imagen_productos.id as idImagen',
                    'imagen_productos.pathImagen as pathImagen',
                    'imagen_productos.codigoImagen as codigoImagen',
                    'imagen_productos.esImagenPrincipal as esImagenPrincipal'
                )
                .from('productos')
                .innerJoin('imagen_productos', 'productos.id', 'imagen_productos.idProducto')
                .where({ 'productos.idEstado': 1,'imagen_productos.idEstado': 1, "productos.id": id })

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
    async registrar({ auth, request, response }) {
        let codigoHttp = 200;
        let codigo = 0;
        let error = '';
        let respuesta = '';
        let data = null;

        const imagenProducto = new ImagenProducto();
        try {
            const usuario = await auth.getUser();
            const { idProducto, esImagenPrincipal, idEstado } = request.all();
            const pathImagen='Pendiente de asignar';
            const codigoImagen="pendienteAsignar";
            imagenProducto.fill({
                idProducto,
                pathImagen,
                codigoImagen,
                esImagenPrincipal,
                idEstado
            });
            await usuario.tallas().save(imagenProducto);
            respuesta = 'Imagen registrada exitosamente'
            data = imagenProducto;
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
    async actualizar({ auth, params, request, response }) {
        let codigoHttp = 200;
        let codigo = 0;
        let error = '';
        let respuesta = '';
        let data = null;
        try {
            const usuario = await auth.getUser();
            const { id } = params;
            const imagenProducto = await ImagenProducto.find(id);
            await imagenProducto.merge(request.only(['idProducto','esImagenPrincipal','idEstado']));

            await imagenProducto.save();
            data = imagenProducto;
            respuesta = 'Imagen actualizada exitosamente';
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
    async cargarImagen({auth,request,response}){
        try {

            
           
            let user = await auth.getUser()
    
            const photo = request.file('imagen', {
                types: ['image'],
                size: '2mb',
                extnames: ['png', 'gif', 'jpg', 'jpeg']
            })
    console.log(Date.now());
            let filename ='prueba.jpg'; //`${user.id}.jpg`
    
            await photo.move(`./imagenes`, {
                name: filename,
                overwrite: true
            })
            //console.log("LLego",photo);
    
            if (!photo.moved()) {
                return response.status(422).send({
                    status: false,
                    message: photo.error(),
                    errors: photo.error()
                })
            }
    
            return response.status(200).send({
                status: true,
                message: 'Upload avatar ok.',
                data: {
                    filename
                }
            })
    
        } catch (e) {
    
            return response.status(500).send({
                status: false,
                message: e.message
            })
    
        }

        return response.status(codigoHttp).json({
            codigo,
            error,
            respuesta,
            data
        });
        
    }
}

module.exports = ImagenProductoController
