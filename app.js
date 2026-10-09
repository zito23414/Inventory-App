const express = require("express");
const usersController = require("./controller/userController");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", usersController.getProducts);

app.get("/categories/:categoryName", usersController.getProductsByCategory);
app.get("/products/create", usersController.renderCreateForm);

app.get("/products/:id", usersController.getProductById);

app.get("/products/:id/edit", usersController.renderUpdateForm);
app.post("/products/:id/edit", usersController.updateProduct);
app.post("/products/:id/delete", usersController.deleteProduct);
app.post("/products/create", usersController.createProduct);
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
