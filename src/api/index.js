import {
  CREATE_PRODUCT,
  GET_PRODUCTS,
  LOGIN,
  SEARCH_PRODUCTS,
  VERIFY_TOKEN,
} from "./url";

const fetchApi = async (url, method, data = null, headers = {}) => {
  const options = {
    method,
    headers: {
      ...headers,
    },
  };
  if (data) {
    options.headers["Content-Type"] = "application/json";
    options.body = JSON.stringify(data);
  }

  try {
    const res = await fetch(url, options);
    return {
      status: res.status,
      data: await res.json(),
    };
  } catch (err) {
    console.log(err);
  }
};

export const login = async (username, password) => {
  const data = {
    username,
    password,
  };
  try {
    const res = await fetchApi(LOGIN, "POST", data);
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const verifyToken = async (token) => {
  try {
    const res = await fetchApi(
      VERIFY_TOKEN,
      "POST",
      {
        token,
      },
      {
        authorization: `Bearer ${token}`,
      }
    );
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const getProducts = async (page, pageSize, sort_by, order_by, query) => {
  let url = `${GET_PRODUCTS}?page=${page}&page_size=${pageSize}&sort_by=${sort_by}&order_by=${order_by}`;
  try {
    const res = await fetchApi(
      url + (query ? `&search_query=${query}` : ""),
      "GET"
    );
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const createProduct = async (data) => {
  try {
    const res = await fetchApi(CREATE_PRODUCT, "POST", data);
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const updateProduct = async (id, data) => {
  try {
    const res = await fetchApi(`${CREATE_PRODUCT}/${id}`, "PUT", data);
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const searchProducts = async (query) => {
  try {
    const res = await fetchApi(`${SEARCH_PRODUCTS}?query=${query}`, "GET");
    return res;
  } catch (err) {
    console.log(err);
  }
};
