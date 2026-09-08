export interface RootShopByCat {
    results: number
    metadata: Metadata
    data: DaumShopByCat[]
}

export interface Metadata {
    currentPage: number
    numberOfPages: number
    limit: number
}

export interface DaumShopByCat {
    _id: string
    name: string
    slug: string
    image: string
    createdAt: string
    updatedAt: string
}

export interface ShopByCategoryCard {
    _id: string
    name: string
    slug: string
    image: string
}
