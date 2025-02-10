import { InterfaceProduct } from "@/App";
import { useState } from "react";
import { notifyError, notifySuccess } from "@/const/Notification";
import { ModalDesktop } from "./ModalDesktop";
import { ModalMobile } from "./ModalMobile";

interface PropsModal {
    product: InterfaceProduct;
    button?: {
        handleClick: (product: InterfaceProduct) => void;
        setControlModal: (open: boolean) => void;
    }
}

const msgSuccess = () => notifySuccess('Adicionado a sacola!');
const msgError = () => notifyError('Erro ao adiconar!');
const msgSelectSize = () => notifyError('Selecione o tamanho!');

export function Modal({ product, button }: PropsModal) {

    const [sizeSelect, setSizeSelect] = useState<string | number>(product.size.length === 1 ? product.size[0] : '');

    const [amount, setAmount] = useState<number>(1);

    const submitProductToBag = () => {
        try {

            if (sizeSelect) {

                const newProduct = {
                    id: product.id,
                    name: product.name,
                    photo: product.photo,
                    price: product.price,
                    size: [sizeSelect],
                    category: product.category,
                    amount: amount
                };

                button?.handleClick(newProduct);

                button?.setControlModal(false);

                msgSuccess();

                return;
            }

            msgSelectSize();

        } catch (error) {
            msgError();
            console.error(error);
        }
    };

    const desktop = window.innerWidth >= 1024;

    return desktop ?
        <ModalDesktop
            product={product}
            amount={amount}
            setAmount={setAmount}
            sizeSelect={sizeSelect}
            setSizeSelect={setSizeSelect}
            buttonSubmitToBag={button && { handleClick: submitProductToBag }}
        /> :
        <ModalMobile
            product={product}
            amount={amount}
            setAmount={setAmount}
            sizeSelect={sizeSelect}
            setSizeSelect={setSizeSelect}
            buttonSubmitToBag={button && { handleClick: submitProductToBag }}
        />;
}
