exports.findAll = (req, res) => {
  const routes = {
    '/admin/usuarios': 'users.html',
    '/admin/empresas': 'companies.html',
    '/admin/categorias-de-producto': 'productcategories.html'
  }

  res.status(200).send(routes)
}
