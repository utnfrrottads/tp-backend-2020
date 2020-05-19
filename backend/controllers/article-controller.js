'use strict'

const Article = require('../models/article-model');
const Supplier = require('../models/supplier-model');
const Supplier_Article = require('../models/supplier-article-model');
const articleController = { };

Supplier.belongsToMany(Article, {through: Supplier_Article, foreignKey:'id_proveedor'});
Article.belongsToMany(Supplier, {through: Supplier_Article, foreignKey:'id_articulo'});

articleController.getAll = async (req, res) => {
  await Article.findAll({
    include: Supplier,
    required: true,
    where: {activo: 1}
  })
    .then(articles => {
      res.json(articles)
    })
    .catch(err => {
      res.json(err)
    });    
}


articleController.getOne = async (req, res) => {
  await Article.findByPk(req.params.id, {
    include: {
      model: Supplier,               
      required: true
    }
  })
    .then(article => {
      res.json(article)
    })
    .catch(err => {
      res.json(err)
    });    
}


articleController.createArticle = async (req, res) => {
    /* const supplier = await Supplier.findByPk(req.body.proveedores[0].id_proveedor);
    let article = null;

      await Article.create({
      descripcion: req.body.descripcion,
      precio: req.body.precio,
      stock: req.body.proveedores[0].proveedores_articulos.cantidad
    })
      .then(art => article = art)
      .catch(err => res.json(err))

      await article.addProveedore(supplier, { through: {
        precio_unitario: req.body.proveedores[0].proveedores_articulos.precio_unitario,
        cantidad: req.body.proveedores[0].proveedores_articulos.cantidad
        } 
    })
      .then(res => res.json(res))
      .catch(err => res.json(err)); */ 
    await Article.create({
      descripcion: req.body.descripcion,
      precio: req.body.precio
    })
    .then(res => res.json("Article created"))
    .catch(err => res.json(err));
}


articleController.updateArticle = async (req, res) => {

    await Article.update({
    descripcion: req.body.descripcion,
    precio: req.body.precio,
    stock: req.body.stock
  })
    .then(art => console.log("Article updated"))
    .catch(err => console.log(err));
}


articleController.loadStock = async (req, res) => {
  let cant_total = 0;
  let cantidad = parseInt(req.body.cantidad);
  
  await Article.findByPk(req.body.id_articulo,{
      attributes: ['stock']
    })
      .then(article => {
        cant_total = article.stock + cantidad;
      })
      .catch(err => console.log(err));

    await Article.update({
      stock: cant_total
    },{
      where: { 
        id_articulo: req.body.id_articulo 
      }
    })
  }

articleController.suspendArticle = async (req, res) => {
  await Article.update(
      {activo: 0},
      {where: { id_articulo: req.params.id }}
  )
      .then(res.json('Article suspended'))
      .catch(err => console.log(err));
}

module.exports = articleController;