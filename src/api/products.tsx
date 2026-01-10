export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
};

export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch('https://dummyjson.com/products');
  const json = await res.json();
  return json.products;
}

export async function fetchProduct(id: number): Promise<Product> {
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  return res.json();
}
