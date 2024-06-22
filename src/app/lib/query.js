function parseProduct(prod) {
  return {
    id: String(prod._id),
    name: String(prod.name_species.match(/^[^\(]+/)[0]),
    scientificName: String(prod.name_species.match(/(?<=\()[^\(|"]+/)[0]),
    quantity: 10,
    feeding: String(prod.feeding),
    tankSize: String(prod.tank_size),
    sizes: prod.size.match(/(\d*\scm)+/g) || ["Tamanho não informado"],
    category: "Peixe",
    price: Number(prod.price.replace("$", "").trim()),
    img: "https:" + prod.picture,
    description: String(prod.description),
  };
}

export async function listAllProducts() {
  try {
    const data = await fetch("https://fishnet-api.onrender.com/fishs");
    const prods = await data.json();
    return prods.slice(10, 40).map(parseProduct);
  } catch (error) {
    console.error(error.message);
  }
}

export async function getProductById(id) {
  const data = await fetch("https://fishnet-api.onrender.com/fishs/" + id);
  const prod = await data.json();
  return parseProduct(prod);
}
