const fs = require("fs");
const index = fs.readFileSync("index.html", "utf-8");
const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));
const products = data.products;

const express = require("express");
const morgan = require("morgan");
const server = express();

//bodyParser
server.use(express.json());
// server.use(express.urlencoded());
server.use(morgan("default"));
server.use(express.static("public"));

// API - Endpoint - Route

// Products
//API root, base URL
// C R U D
// Creating API
// Create POST /products
server.post("/products", (req, res) => {
  console.log(req.body);
  products.push(req.body);
  res.status(201).json(req.body);
});
// Read Get API
server.get("/products", (req, res) => {
  res.status(200).json(products);
});
// for single prroduct
server.get("/products/:id", (req, res) => {
  console.log(req.params);
  const id = +req.params.id;
  const product = products.find((p) => p.id == id); //finding id in the products matching with the id in params
  res.status(200).json(product);
});

// UPDATE put /products/:id
server.put("/products/:id", (req, res) => {
  const id = +req.params.id;
  const productIndex = products.findIndex((p) => p.id == id); //finding id in the products matching with the id in params
  products.splice(productIndex,1,{id:id,...req.body})
  res.status(202).json();
});


// UPDATE PATCH /products/:id
server.patch("/products/:id", (req, res) => {
  const id = +req.params.id;
  const productIndex = products.findIndex((p) => p.id == id); //finding id in the products matching with the id in params
  const product = products[productIndex];
  products.splice(productIndex,1,{...product, ...req.body})
  res.status(202).json();
});


// delete DELETE /products/:id
server.delete("/products/:id", (req, res) => {
  const id = +req.params.id;
  const productIndex = products.findIndex((p) => p.id == id); //finding id in the products matching with the id in params
  const product = products[productIndex];
  products.splice(productIndex,1)
  res.status(204).json(product);
});

server.listen(8080, () => {
  console.log("server started");
});
