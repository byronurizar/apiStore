'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DetallePedidoSchema extends Schema {
  up () {
    this.create('detalle_pedidos', (table) => {
      table.increments()
      table.integer('idPedido').unsigned().references('id').inTable('pedidos')
      table.integer('idProducto').unsigned().references('id').inTable('productos')
      table.integer('idTalla').unsigned().references('id').inTable('talla_productos')
      table.integer('idColor').unsigned().references('id').inTable('cat_colores')
      table.integer('cantidad').notNullable()
      table.decimal('precio', 500).notNullable()
      table.decimal('descuento', 500)
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.timestamps()
    })
  }

  down () {
    this.drop('detalle_pedidos')
  }
}

module.exports = DetallePedidoSchema
