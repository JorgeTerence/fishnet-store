export const API_URL = "https://fishnet-api-py.onrender.com";

export const API_URL = "https://fishnet-api-py.onrender.com";

function parseProduct(prod) {
  return {
    ...prod,
    id: prod._id,
    image: prod.image || "/static/placeholder.png", 
    image: prod.image || "/static/placeholder.png",
    quantity: 5,
    feeding: String(prod.feeding),
    tankSize: String(prod.tank_size),
    sizes: prod.size.match(/(\d*\scm)+/g) || ["Tamanho não informado"],
    feeding: String(prod.feeding || "Alimentação não informada"),
    tankSize: String(prod.tank_size || "Tamanho do tanque não informado"),
    sizes: (prod.size ? String(prod.size).match(/\d+\s*cm/g) : null) || [
      "Tamanho não informado",
    ],
    price: prod.price ? Number(String(prod.price).replace("$", "").trim()) : 0,
  };
}



export async function listAllProducts(page = 1, limit = 10) {
  try {
    const data = await fetch(`${API_URL}/prods`);
    const data = await fetch(`${API_URL}/prods`);
    const prods = await data.json();

    if (!Array.isArray(prods)) {
      return []; // Garante que retornamos um array vazio caso 'prods' não seja um array
    }


    if (!Array.isArray(prods)) {
      return []; // Garante que retornamos um array vazio caso 'prods' não seja um array
    }

    const start = (page - 1) * limit;
    const end = start + limit;
    return prods.slice(start, end).map(parseProduct);
  } catch (error) {
    console.error(error.message);
    return []; // Retorna um array vazio em caso de erro
    return []; // Retorna um array vazio em caso de erro
  }
}


export async function getProductById(id) {
  const data = await fetch(`${API_URL}/prods/${id}`);
  const data = await fetch(`${API_URL}/prods/${id}`);
  const prod = await data.json();
  return parseProduct(prod);
}

export async function getProductByFilter(filters) {
  try {
    const query = new URLSearchParams(filters).toString();
    const data = await fetch(`${API_URL}/prods/filtros?${query}`);
    const prods = await data.json();

    if (!Array.isArray(prods)) {
      return []; // Garante que retornamos um array vazio caso 'prods' não seja um array
    }

    return prods.map(parseProduct);
  } catch (error) {
    console.error(error.message);
    return []; // Retorna um array vazio em caso de erro
  }
}


export async function listProductNames(query = "", page = 1, limit = 10) {
  try {
    const response = await fetch(`${API_URL}/prods`);
    const prods = await response.json();
    console.log("Resposta da API:", prods);  

    // Filtra os produtos com base na query
    const filteredProds = prods.filter(prod =>
      prod.name.toLowerCase().includes(query.toLowerCase())
    );
  if (cachedProducts === null) {
    try {
      const response = await fetch(`${API_URL}/prods`);
      if (!response.ok) {
        throw new Error("Erro ao buscar produtos: " + response.statusText);
      }
      const prods = await response.json();
      console.log("Resposta da API:", prods);
      cachedProducts = prods;
    } catch (error) {
      console.error("Erro ao buscar produtos:", error.message);
      return [];
    }
  }

  const filteredProds = cachedProducts.filter((prod) =>
    prod.name.toLowerCase().includes(query.toLowerCase()),
  );

    const start = (page - 1) * limit;
    const end = start + limit;

    return filteredProds.slice(start, end).map(prod => ({
      id: prod._id || "ID não disponível",
      name: prod.name || "Nome não disponível"
    }));

  } catch (error) {
    console.error("Erro ao buscar produtos:", error.message);
    return [];
  }
}

export async function getProductByFilter(filters) {
  try {
    const query = new URLSearchParams(filters).toString();
    const data = await fetch(`${API_URL}/prods/filtros?${query}`);
    const prods = await data.json();

    if (!Array.isArray(prods)) {
      return []; // Garante que retornamos um array vazio caso 'prods' não seja um array
    }

    return prods.map(parseProduct);
  } catch (error) {
    console.error(error.message);
    return []; // Retorna um array vazio em caso de erro
  }
}
  return filteredProds.slice(start, end).map((prod) => ({
    id: prod._id || "ID não disponível",
    name: prod.name || "Nome não disponível",
  }));
}
