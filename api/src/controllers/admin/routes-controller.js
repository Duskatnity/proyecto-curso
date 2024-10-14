exports.findAll = (req, res) => {
  const routes = {
    '/admin/usuarios': 'users.html',
    '/admin/empresas': 'companies.html',
    '/admin/categorias-de-producto': 'productcategories.html',
    '/admin/contactos': 'contacts.html',
    '/admin/productos': 'products.html'
  }

  res.status(200).send(routes)
}
