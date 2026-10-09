const db = require("../db/queries");

const getProducts = async (req, res) => {
  const products = await db.getProducts();
  const categories = await db.getAllCategories();

  res.render("new/products", {
    products,
    categories,
    currentCategory: null,
  });
};

const getProductById = async (req, res) => {
  const product = await db.getProductById(req.params.id);

  if (!product) {
    return res.status(404).send("Producto no encontrado");
  }

  res.render("new/product-detail", { product });
};
const getProductsByCategory = async (req, res) => {
  const categoryName = req.params.categoryName;

  const products = await db.getProductsByCategory(categoryName);
  const categories = await db.getAllCategories();

  res.render("new/products", {
    products,
    categories,
    currentCategory: categoryName,
  });
};
const createProduct = async (req, res) => {
  const product = {
    name: req.body.name,
    price: req.body.price,
    stock: req.body.stock,
    category_id: req.body.category_id,
    brand_id: req.body.brand_id,
  };

  await db.createProduct(product);

  res.redirect("/");
};
const renderCreateForm = async (req, res) => {
  const categories = await db.getAllCategories();
  const brands = await db.getAllBrands();
  res.render("new/products-create", {
    categories,
    brands,
  });
};
const deleteProduct = async (req, res) => {
  const productId = req.params.id;
  const deletedProduct = await db.deleteProduct(productId);
  if (!deletedProduct) {
    return res.status(404).send("Producto no encontrado");
  }
  res.redirect("/");
};
const updateProduct = async (req, res) => {
  const productId = req.params.id;
  const updatedProduct = {
    name: req.body.name,
    price: req.body.price,
    stock: req.body.stock,
    category_id: req.body.category_id,
    brand_id: req.body.brand_id,
  };
  const product = await db.updateProduct(productId, updatedProduct);
  if (!product) {
    return res.status(404).send("Producto no encontrado");
  }
  res.redirect("/");
};
const renderUpdateForm = async (req, res) => {
  const product = await db.getProductById(req.params.id);

  if (!product) {
    return res.status(404).send("Producto no encontrado");
  }

  const categories = await db.getAllCategories();
  const brands = await db.getAllBrands();

  res.render("new/product-update", {
    product,
    categories,
    brands,
  });
};
module.exports = {
  getProducts,
  getProductById,
  getProductsByCategory,
  createProduct,
  renderCreateForm,
  deleteProduct,
  updateProduct,
  renderUpdateForm,
};
