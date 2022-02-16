const baseUrl = process.env.REACT_APP_API_URL;

export const fetchSinToken = async (endpoint, data, method = "GET") => {
  console.log({ baseUrl,endpoint, data, method });
  try {
    const url = `${baseUrl}/${endpoint}`;

    if (method === "GET") {
      const resp = await fetch(url);
      return await resp.json();
    } else {
      const resp = await fetch(url, {
        method,
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      return await resp.json();
    }
  } catch (err) {
    console.log({ err: err.name, message: err.message });
    return { err: err.name, message: err.message };
  }
};

export const fetchConToken = async (endpoint, data, method = "GET") => {
  try {
    const url = `${baseUrl}/${endpoint}`;
    const token = localStorage.getItem("token") || "";

    if (method === "GET") {
      const resp = await fetch(url, {
        headers: {
          "x-token": token,
        },
      });
      return await resp.json();
    } else {
      const resp = await fetch(url, {
        method,
        headers: {
          "Content-type": "application/json",
          "x-token": token,
        },
        body: JSON.stringify(data),
      });

      return await resp.json();
    }
  } catch (err) {
    console.log({ err: err.name, message: err.message });
    return { err: err.name, message: err.message };
  }
};
