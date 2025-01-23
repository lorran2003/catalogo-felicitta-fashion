import { Product } from "@/App";
import { useEffect, useState } from "react";

export interface ProductToBag {
    'id': string;
    'name': string;
    'photo': string;
    'price': number;
    'size': number | string;
    'category': string;
    'amount': number;
}

export function useBag() {

    const [bag, setBag] = useState<ProductToBag[]>(() => {
        const savedBag = sessionStorage.getItem('bag');
        return savedBag ? JSON.parse(savedBag) : [];
    });

    useEffect(() => {
        sessionStorage.setItem('bag', JSON.stringify(bag));
    }, [bag])

    const addToBag = (product: Product | ProductToBag) => {

        console.log(bag)

        const sizeProduct = Array.isArray(product.size) ? product.size[0] : product.size;

        const existingItem = bag.find(item => item.id === product.id && item.size === sizeProduct);

        if (existingItem) {
            const newBag = bag.map(item =>
                item.id === product.id
                    ? { ...item, amount: item.amount + 1 }
                    : item
            );
            setBag(newBag);
            return;
        }

        const newProduct: ProductToBag = {
            ...product,
            'size': sizeProduct,
            'amount': 1
        };

        setBag([...bag, newProduct]);

    };

    const removeFromBag = (idProduct: string | number, amount?: boolean) => {

        if (amount) {
            const newBag = bag.map((item) => item.id === idProduct ? { ...item, 'amount': item.amount - 1 } : item);
            setBag(newBag);
            return;
        }

        const newBag = bag.filter((item) => item.id !== idProduct);
        setBag(newBag);
    };

    const removelAllBag = () => setBag([]);

    return { 'bag': bag, 'addToBag': addToBag, 'removeFromBag': removeFromBag, 'removelAllBag': removelAllBag };
}