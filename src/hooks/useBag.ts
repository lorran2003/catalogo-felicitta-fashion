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
            const existingItem = bag.find((item) => (item.id === product.id && item.size === product.size));

            if (!existingItem) {
                setBag([...bag, product]);

                notifySuccess('Produto adicionado a sacola!');
                return;
            }
            if (existingItem.maxAmount === existingItem.amount) {

                return notifyError('Quantidade maxima atingida!');
            }

            const newBag = bag.map((item) =>
                item === existingItem
                    ? { ...item, amount: item.amount + 1 }
                    : item
            );
            setBag(newBag);
            return;
        }

        catch (error) {
            console.error('Erro ao adicionar o produto à sacola:', error);
            notifyError('Ops... tivemos um probleminha, entre em contato');
            return;
        };
    }

    const removeFromBag = (product: InterfaceProductToBag, all?: boolean) => {

        try {

            const findProduct = bag.find((item) => item.id === product.id && item.size === product.size);

            if (all && findProduct || findProduct?.amount === 1) {
                const newBag = bag.filter((item) => item !== findProduct);
                setBag(newBag);
                return;
            }

            const newBag = bag.map((item) => (item === findProduct ? { ...findProduct, 'amount': item.amount - 1 } : item));
            setBag(newBag);
            return;
        }
        catch (error) {
            console.error('Erro ao adicionar o produto à sacola:', error);
            notifyError('Ops... tivemos um probleminha, entre em contato')
        }
    };

    const removelAllBag = () => setBag([]);

    return { bag: bag, addToBag: addToBag, removeFromBag: removeFromBag, removelAllBag: removelAllBag };
}