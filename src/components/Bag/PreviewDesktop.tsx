import {
    Dialog,
    DialogTrigger,
} from "@/components/ui/dialog";
import { InterfaceProductToBag } from "@/hooks/useBag";
import { faImages, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal } from "../ProductModal/Modal";
import { useState } from "react";
import { AmountProduct } from "../AmountProduct";
import { products } from "@/const/products";

interface InterfacePreviewDesktop {
    productBag: InterfaceProductToBag;
    addToBag: (product: InterfaceProductToBag) => void;
    removeFromBag: (product: InterfaceProductToBag, all?: boolean) => void;
}

export function PreviewDesktop({ addToBag, productBag, removeFromBag }: InterfacePreviewDesktop) {

    const [controlModal, setControlModal] = useState<boolean>(false);

    const addProduct = () => {
        addToBag(productBag);
    };

    const removeProduct = () => {
        removeFromBag(productBag);
    };

    return (
        <Dialog open={controlModal} onOpenChange={setControlModal}>

            <Modal product={{
                id: productBag.id,
                name: productBag.name,
                photo: productBag.photo,
                price: productBag.price,
                size: [productBag.size],
                category: productBag.category,
                amount: productBag.amount
            }}
            />

            <div className="grid grid-cols-5 justify-center items-center gap-5 w-full p-5 rounded-sm bg-zinc-800 text-zinc-50">

                <div className="flex justify-between items-center">

                    <h1 className="text-xl w-fit">{productBag.name}</h1>

                    <DialogTrigger asChild>

                        <button
                            type="button"
                            title="Abrir modal"
                            className="rounded-md flex justify-center items-center bg-zinc-50 p-1 active:scale-95"
                        >
                            <FontAwesomeIcon icon={faImages} size="xl" color="#000" />
                        </button>

                    </DialogTrigger>
                </div>

                <span className="text-lg text-center">Tamanho: {productBag.size}</span>

                <AmountProduct
                    addProduct={addProduct}
                    removeProduct={removeProduct}
                    maxAmount={products.find((item) => item.id === productBag.id)?.amount ?? 1}
                    previousAmount={productBag.amount}
                />

                <span className="text-lg text-center">Unidade: R$ {productBag.price.toFixed(2)}</span>

                <div className="flex justify-center items-center">
                    <button
                        type="button"
                        title="Excluir"
                        className="rounded-md flex justify-center items-center bg-red-600 px-5 py-3 size-fit active:scale-95"
                        onClick={() => removeFromBag(productBag, true)}
                    >
                        <FontAwesomeIcon icon={faTrash} size="lg" />
                    </button>
                </div>
            </div>
        </Dialog >
    )
}
