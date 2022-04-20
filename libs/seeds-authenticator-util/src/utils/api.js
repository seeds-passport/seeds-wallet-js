const callApi = (fetch) => async (url, data) => {
  console.log("CALL API FETCH: ", fetch);
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(data),
  });
  return await response.json();
};

module.exports = callApi;
