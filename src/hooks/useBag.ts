import { notifyError, notifySuccess } from "@/const/Notification";
import { useEffect, useState } from "react";
export interface InterfaceProductToBag {
    id: string;
    name: string;
    photo: string;
    price: number;
    size: number | string;
    category: string;
    amount: number;
    maxAmount: number;
}

export function useBag() {

    const [bag, setBag] = useState<InterfaceProductToBag[]>(() => {
        const savedBag = localStorage.getItem('bag');
        return savedBag ? JSON.parse(savedBag) : [];
    });

    useEffect(() => {
        localStorage.setItem('bag', JSON.stringify(bag));
    }, [bag])

    const addToBag = (product: InterfaceProductToBag) => {

        try {
            const existingItem = bag.find((item) => item.id === product.id && item.size === product.size);

            if (existingItem) {

                if (existingItem.maxAmount === existingItem.amount) {

                    return notifyError('Quantidade maxima atingida!');
                }

                const newBag = bag.map((item) =>
                    item.id === product.id
                        ? { ...item, amount: item.amount + 1 }
                        : item
                );
                setBag(newBag);

                return notifySuccess('Produto adicionado a sacola!');
            }

            const newProduct: InterfaceProductToBag = {
                ...product,
                size: product.size,
                amount: product.amount
            };

            setBag([...bag, newProduct]);

            return notifySuccess('Produto adicionado a sacola!');
        }
        catch (error) {
            console.error('Erro ao adicionar o produto à sacola:', error);
            notifyError('Ops... tivemos um probleminha, entre em contato')
        };
    }

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