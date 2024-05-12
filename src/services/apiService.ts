export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    image: string;
}

export interface ProductsResponse {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
}

export async function fetchProducts(): Promise<Product[]> {
    try {
        const response = await fetch(`https://dummyjson.com/products`);
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        const data: ProductsResponse = await response.json();
        return data.products;
    } catch (error: any) {
        console.error(error.message);
        throw error;
    }
}