const listRequests = async () => {
  try {
    const response = await fetch(
      "https://zalexinc.azure-api.net/request-list?subscriptionkey=0e9cb8c5b1e945e99922d8e1a3454f99",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Requests retrieval failed");
    }
  } catch (error) {
    console.error("Failed retrieving requests", error);
    throw error;
  }
};

export { listRequests };
