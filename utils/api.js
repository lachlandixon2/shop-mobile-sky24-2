const API_BASE_URL = "http://localhost:3000/api";



export async function fetchCategories() {
    try {
        const response = await fetch('${API_BASE_URL}/categories');
        if (!response.ok) throw new Error("Failed to fetch categories");
        return await response.json();
    } catch (error) {
        throw error;
    }
}

export async function fetchProducts() {
    try {
        const response = await fetch("http://localhost:3000/api/products");
        if (!response.ok) throw new Error("Failed to fetch products");
        return await response.json();
    } catch (error) {
        throw error;
    }
}

// export async function fetchProductById(id) {
//     try {
//         const response = await fetch("http://localhost:3000/api/products");
//         if (!response.ok) throw new Error("Failed to fetch products");
//         return await response.json();
//     } catch (error) {
//         throw error;
//     }