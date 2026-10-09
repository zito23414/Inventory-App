const pool = require("./pool");

const getProducts = async () => {
  const { rows } = await pool.query(`
    SELECT
      products.id,
      products.name,
      products.price,
      products.stock,
      categories.name AS category,
      brands.name AS brand
    FROM products
    JOIN categories ON products.category_id = categories.id
    JOIN brands ON products.brand_id = brands.id
  `);

  return rows;
};

const getProductById = async (id) => {
  const { rows } = await pool.query(
    `
    SELECT  
    products.id,
    products.name,
    products.price, 
    products.stock,
    categories.name AS category,
    brands.name AS brand
    FROM products
    JOIN categories ON products.category_id = categories.id
    JOIN brands ON products.brand_id = brands.id
    WHERE products.id = $1
  `,
    [id],
  );
  return rows[0];
};
const getProductsByCategory = async (categoryName) => {
  const { rows } = await pool.query(
    `SELECT 
    products.id,
    products.name,
    products.price,
    products.stock,
    categories.name AS category,
    brands.name AS brand
    FROM products
    JOIN categories ON products.category_id = categories.id
    JOIN brands ON products.brand_id = brands.id
    WHERE categories.name = $1
  `,
    [categoryName],
  );
  return rows;
};
const getAllCategories = async () => {
  const { rows } = await pool.query("SELECT * FROM categories");
  return rows;
};
const createProduct = async (product) => {
  const { rows } = await pool.query(
    `
    INSERT INTO products (name, price, stock, category_id, brand_id)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
  `,
    [
      product.name,
      product.price,
      product.stock,
      product.category_id,
      product.brand_id,
    ],
  );
  return rows[0];
};
const getAllBrands = async () => {
  const { rows } = await pool.query("SELECT * FROM brands ORDER BY name");
  return rows;
};
const deleteProduct = async (id) => {
  const { rows } = await pool.query(
    "DELETE FROM products WHERE id = $1 RETURNING *",
    [id],
  );
  return rows[0];
};
const updateProduct = async (id, product) => {
  const { rows } = await pool.query(
    `UPDATE products
     SET name = $1, price = $2, stock = $3, category_id = $4, brand_id = $5
     WHERE id = $6
     RETURNING *`,
    [
      product.name,
      product.price,
      product.stock,
      product.category_id,
      product.brand_id,
      id,
    ],
  );
  return rows[0];
};
module.exports = {
  getProducts,
  getProductById,
  getProductsByCategory,
  getAllCategories,
  createProduct,
  getAllBrands,
  deleteProduct,
  updateProduct,
};
