export const getAllProducts = async function () {
    const apiBase = process.env.NEXT_PUBLIC_API_URL || "https://ecommerce.routemisr.com";
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    try {
        const res = await fetch(`${apiBase}/api/v1/products`, {
            signal: controller.signal,
            next: { revalidate: 300 },
        });
        if (!res.ok) {
            throw new Error(`Failed to fetch products: ${res.status}`);
        }
        const data = await res.json();
        return data;
    } catch {
        return { data: [] };
    } finally {
        clearTimeout(timeoutId);
    }
};