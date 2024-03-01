
const baseURL = process.env.NEXT_PUBLIC_SERVER_ENDPOINT_GENERAL;

export const createProduct = async (productData: any) => {
  try {
    const userId = localStorage.getItem("userId");
    const response = await fetch(`${baseURL}/products/newproduct`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...productData, userId }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();
    return {
      success: true,
      data: responseData,
    };
  } catch (error) {
    console.error("Error al crear el producto:", error);
    return {
      success: false,
      message: "Error desconocido al crear el producto.",
    };
  }
};

export const getProducts = async () => {
  try {
    const userId = localStorage.getItem("userId");
    const response = await fetch(`${baseURL}/products/getproducts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    return error;
  }
};

export const getProductById = async (id: string) => {
  try {
    const response = await fetch(`${baseURL}/products/${id}`, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    return error;
  }
};

export const updateProduct = async (id: string, updatedData: any) => {
  try {
    const response = await fetch(`${baseURL}/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    return error;
  }
};

export const deleteProduct = async (id: string) => {
  try {
    const response = await fetch(`${baseURL}/products/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    return error;
  }
};
