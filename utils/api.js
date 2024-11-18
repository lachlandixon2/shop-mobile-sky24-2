const API_BASE_URL = "http://localhost:3000/api";

export async function fetchCategories() {
  try {
    const response = await fetch(`${API_BASE_URL}/categories`);
    if (!response.ok) throw new Error("Failed to fetch Categories");
    return await response.json();
  } catch (error) {
    throw error;
  }
}

export async function fetchProductById(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    if (!response.ok) throw new Error("Failed to fetch Product");
    return await response.json();
  } catch (error) {
    throw error;
  }
}

export async function addProduct(productData) {
  try {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productData),
    });
    if (!response.ok) throw new Error("Failed to add Product");
    return await response.json();
  } catch (error) {
    throw error;
  }
}

export async function updateProduct(id, updatedData) {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });
    if (!response.ok) throw new Error("Failed to update Product");
    return await response.json();
  } catch (error) {
    throw error;
  }
}

export async function fetchProducts() {
  try {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) throw new Error("Failed to fetch Products");
    return await response.json();
  } catch (error) {
    throw error;
  }
}

export async function deleteProduct(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete Product');
    return true;
  } catch (error) {
    throw error;
  }
}