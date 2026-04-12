export const getAllProducts = async function () {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/products`)
    const data = await res.json()
    return data ; 
}