const sequelizeDb = require('../../models')
const Sale = sequelizeDb.Sale
const SaleDetail = sequelizeDb.SaleDetail
const Op = sequelizeDb.Sequelize.Op

exports.create = async (req, res) => {
  try {
    const newDate = new Date()

    const totalBasePrice = req.body.reduce(function (acumulador, producto) {
      return acumulador + (producto.price.basePrice * producto.quantity)
    }, 0)

    const data = {
      customerId: 1,
      reference: '64287',
      totalBasePrice,
      saleDate: newDate.toISOString().slice(0, 10),
      saleTime: newDate.toISOString().slice(11, 19)
    }

    const sale = await Sale.create(data)

    const saleDetails = req.body.map(product => {
      const data = {
        saleId: sale.id,
        productId: product.id,
        priceId: product.price.id,
        productName: product.name,
        basePrice: product.price.basePrice,
        quantity: product.quantity
      }

      return data
    })

    await SaleDetail.bulkCreate(saleDetails)

    res.status(200).send(data)
  } catch (err) {
    console.log(err)
    res.status(500).send({
      message: err.errors || 'Algún error ha surgido al recuperar los datos.'
    })
  }
}

exports.findAll = (req, res) => {
  const page = req.query.page || 1
  const limit = parseInt(req.query.size) || 10
  const offset = (page - 1) * limit
  const whereStatement = {}

  for (const key in req.query) {
    if (req.query[key] !== '' && req.query[key] !== 'null' && key !== 'page' && key !== 'size') {
      whereStatement[key] = { [Op.substring]: req.query[key] }
    }
  }

  const condition = Object.keys(whereStatement).length > 0 ? { [Op.and]: [whereStatement] } : {}

  Sale.findAndCountAll({
    where: condition,
    limit,
    offset,
    attributes: ['id', 'customerId', 'reference', 'totalBasePrice', 'saleDate', 'saleTime', 'createdAt', 'updatedAt', 'deletedAt'],
    order: [['createdAt', 'DESC']]
  })
    .then(result => {
      result.meta = {
        total: result.count,
        pages: Math.ceil(result.count / limit),
        currentPage: page,
        size: limit
      }

      res.status(200).send(result)
    }).catch(err => {
      res.status(500).send({
        message: err.errors || 'Algún error ha surgido al recuperar los datos.'
      })
    })
}
