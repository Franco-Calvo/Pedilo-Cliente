interface ICategoryResponse {
  success: boolean;
  message: string;
  data?: any;
}

export const createCategory = async (
  name: string
): Promise<ICategoryResponse> => {
  try {
    const userId = localStorage.getItem("userId");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT_CATEGORIES}/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, userId }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();
    return {
      success: true,
      message: "Categoría creada con éxito",
      data: responseData,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Error al crear la categoría",
    };
  }
};

export const getUserCategories = async (): Promise<ICategoryResponse> => {
  try {
    const userId = localStorage.getItem("userId");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT_CATEGORIES}/${userId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const categories = data.map((category: any) => ({
      ...category,
      createdAt: new Date(category.createdAt),
    }));

    return {
      success: true,
      message: "Categorías obtenidas con éxito",
      data: categories,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Error al obtener las categorías",
    };
  }
};

export const getCategoryById = async (
  id: string
): Promise<ICategoryResponse> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT_CATEGORIES}/category/${id}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();
    return {
      success: true,
      message: "Categoría obtenida con éxito",
      data: responseData,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Error al obtener la categoría",
    };
  }
};

export const updateCategory = async (
  id: string,
  name: string
): Promise<ICategoryResponse> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT_CATEGORIES}/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();
    return {
      success: true,
      message: "Categoría actualizada con éxito",
      data: responseData,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Error al actualizar la categoría",
    };
  }
};

export const deleteCategory = async (
  id: string
): Promise<ICategoryResponse> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT_CATEGORIES}/${id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return { success: true, message: "Categoría eliminada con éxito" };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Error al eliminar la categoría",
    };
  }
};
