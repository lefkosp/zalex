const submitForm = async (formData) => {
  try {
    const response = await fetch(
      "https://zalexinc.azure-api.net/requestcertificate?subscription-key=0e9cb8c5b1e945e99922d8e1a3454f99",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Form submission failed");
    }
  } catch (error) {
    console.error("Error submitting form:", error);
    throw error;
  }
};

export { submitForm };
