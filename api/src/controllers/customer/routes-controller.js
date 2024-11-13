exports.findAll = (req, res) => {
  const routes = {
    '/cliente': 'home.html',
    '/cliente/nuevo-pedido': 'new-order.html',
    '/cliente/pedidos-anteriores': 'previous-orders.html',
    '/cliente/resumen-pedido': 'summary.html'
  }

  res.status(200).send(routes)
}
