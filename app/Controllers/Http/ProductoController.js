'use strict'
const Producto = use('App/Models/Producto');
const Database = use('Database');
class ProductoController {
    async listar({ auth, params, response }) {
        let codigoHttp = 200;
        let codigo = 0;
        let error = '';
        let respuesta = '';
        let data = null;
        const { tipo, id } = params;

        const usuario = await auth.getUser();
        let stringWhere = { 'productos.idEstado': 1, 'proveedors.idEstado': 1, 'cat_categorias.idEstado': 1 };
        if (params) {
            if (tipo == "proveedor") {
                stringWhere = { 'productos.idEstado': 1, 'proveedors.idEstado': 1, 'cat_categorias.idEstado': 1, 'idProveedor': id };
            } else if (tipo == "categoria") {
                stringWhere = { 'productos.idEstado': 1, 'proveedors.idEstado': 1, 'cat_categorias.idEstado': 1, 'idCategoria': id };
            }
        }
        try {
            data = await Database
                .select('productos.id as idProducto',
                    'productos.nombre as Producto',
                    'productos.descripcion as descripcionProducto',
                    'productos.descripcionCorta as descripcionCorta',
                    'productos.codigo as sku',
                    'productos.precio',
                    'proveedors.id as idProveedor',
                    'proveedors.nombre as Proveedor',
                    'cat_categorias.id as idCategoria',
                    'cat_categorias.descripcion as Categoria')
                .from('productos')
                .innerJoin('proveedors', 'productos.idProveedor', 'proveedors.id')
                .innerJoin('cat_categorias', 'productos.idCategoria', 'cat_categorias.id')
                .where(stringWhere);
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
    async listarPorPrecio({ auth, params, response }) {
        let codigoHttp = 200;
        let codigo = 0;
        let error = '';
        let respuesta = '';
        let data = null;
        const { desde, asta } = params;

        const usuario = await auth.getUser();
       
        try {
            data = await Database
                .select('productos.id as idProducto',
                    'productos.nombre as Producto',
                    'productos.descripcion as descripcionProducto',
                    'productos.descripcionCorta as descripcionCorta',
                    'productos.codigo as sku',
                    'productos.precio',
                    'proveedors.id as idProveedor',
                    'proveedors.nombre as Proveedor',
                    'cat_categorias.id as idCategoria',
                    'cat_categorias.descripcion as Categoria')
                .from('productos')
                .innerJoin('proveedors', 'productos.idProveedor', 'proveedors.id')
                .innerJoin('cat_categorias', 'productos.idCategoria', 'cat_categorias.id')
                .where({ 'productos.idEstado': 1, 'proveedors.idEstado': 1, 'cat_categorias.idEstado': 1 })
                .whereBetween('precio',[desde,asta])
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
    async registrar({ auth, request, response }) {
        let codigoHttp = 200;
        let codigo = 0;
        let error = '';
        let respuesta = '';
        let data = null;

        const producto = new Producto();
        try {
            const usuario = await auth.getUser();
            const { idProveedor, idCategoria, nombre, codigo, descripcion, descripcionCorta, precio, idEstado } = request.all();
            producto.fill({
                idProveedor,
                idCategoria,
                nombre,
                codigo,
                descripcion,
                descripcionCorta,
                precio,
                idEstado
            });
            await usuario.productos().save(producto);
            respuesta = 'Producto registrado exitosamente'
            data = producto;
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
            const producto = await Producto.find(id);
            await producto.merge(request.only(['idProveedor', 'idCategoria', 'nombre', 'codigo', 'descripcion', 'descripcionCorta', 'precio', 'idEstado']));

            await producto.save();
            data = producto;
            respuesta = 'Producto actualizado exitosamente';
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

module.exports = ProductoController
