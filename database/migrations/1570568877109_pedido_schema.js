'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PedidoSchema extends Schema {
  up () {
    this.create('pedidos', (table) => {
      table.increments()
      table.integer('idPersona').unsigned().references('id').inTable('personas')
      table.integer('idTipoPago').unsigned().references('id').inTable('cat_tipo_pagos')
      table.integer('idEstadoPedido').unsigned().references('id').inTable('cat_estado_pedidos')
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.timestamps()
    })
  }

  down () {
    this.drop('pedidos')
  }
}

module.exports = PedidoSchema
