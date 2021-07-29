const baskeUrl = "https://localhost:3000";
export const getproductData = async (url) => {
  const res = await fetch(`http://localhost:3000/api/${url}`);
  const data = await res.json();

  return data;
};

export const getProductById = async (url, id) => {
  const res = await fetch(`http://localhost:3000/api/${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: id,
    },
    body: JSON.stringify({ productid: id }),
  });

  const data = await res.json();
  return JSON.stringify(data);
};
