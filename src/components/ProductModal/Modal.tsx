import { InterfaceProduct } from "@/const/products";
import { useState } from "react";
import { notifyError } from "@/const/Notification";
import { ModalDesktop } from "./ModalDesktop";
import { ModalMobile } from "./ModalMobile";
import { InterfaceProductToBag } from "@/hooks/useBag";

interface PropsModal {
    product: InterfaceProduct;
    buttonSubmitToBag?: {
        handleClick: (product: InterfaceProductToBag) => void;
        setControlModal: (open: boolean) => void;
    }
}

export function Modal({ product, buttonSubmitToBag: button }: PropsModal) {

    const [sizeSelect, setSizeSelect] = useState<string | number>(product.size.length === 1 ? product.size[0] : '');

    const [amountSelected, setAmountSelected] = useState<number>(1);

    const submitProductToBag = () => {
        try {

            if (sizeSelect) {

                const newProduct: InterfaceProductToBag = {
                    id: product.id,
                    name: product.name,
                    photo: product.photo,
                    price: product.price,
                    size: sizeSelect,
                    category: product.category,
                    amount: amountSelected,
                    maxAmount: product.amount
                };

                button?.handleClick(newProduct);

                button?.setControlModal(false);

                return;
            }

            notifyError('Selecione o tamanho!');
        }
        catch (error) {
            notifyError('Erro ao adiconar!')
            console.error(error);
        }
    };

    const desktop = window.innerWidth >= 1024;

    return desktop ?
        <ModalDesktop
            product={product}
            amount={amountSelected}
            setAmount={setAmountSelected}
            sizeSelect={sizeSelect}
            setSizeSelect={setSizeSelect}
            buttonSubmitToBag={button && { handleClick: submitProductToBag }}
        /> :
        <ModalMobile
            product={product}
            amount={amountSelected}
            setAmount={setAmountSelected}
            sizeSelect={sizeSelect}
            setSizeSelect={setSizeSelect}
            buttonSubmitToBag={button && { handleClick: submitProductToBag }}
        />;
}
