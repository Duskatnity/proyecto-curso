exports.findAll = (req, res) => {
  const routes = {
    '/cliente': 'home.html',
    '/cliente/nuevo-pedido': 'new-order.html',
    '/cliente/pedidos-anteriores': 'previous-orders.html'
  }

  res.status(200).send(routes)
}
