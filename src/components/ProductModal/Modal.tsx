import { InterfaceProduct } from "@/const/products";
import { useState } from "react";
import { notifyError } from "@/const/Notification";
import { ModalDesktop } from "./ModalDesktop";
import { ModalMobile } from "./ModalMobile";
import { InterfaceProductToBag, useBag } from "@/hooks/useBag";

interface PropsModal {
    product: InterfaceProduct;
    buttonSubmitToBag?: {
        handleClick: (product: InterfaceProductToBag) => void;
        setControlModal: (open: boolean) => void;
    }
}

export function Modal({ product, buttonSubmitToBag }: PropsModal) {

    const bag = useBag().bag;

    const indentfyProduct = () => {

        const productBag = bag.find((item) => item.id === product.id && product.size.length === 1);

        if (productBag) {
            return productBag.amount
        }
        return 1;
    }

    const [sizeSelect, setSizeSelect] = useState<string | number>(product.size.length === 1 ? product.size[0] : '');

    const [amountSelected, setAmountSelected] = useState<number>(indentfyProduct());


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

                buttonSubmitToBag?.handleClick(newProduct);

                buttonSubmitToBag?.setControlModal(false);

                setAmountSelected(1);
               
                setSizeSelect('');

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
            buttonSubmitToBag={buttonSubmitToBag && { handleClick: submitProductToBag }}
        /> :
        <ModalMobile
            product={product}
            amount={amountSelected}
            setAmount={setAmountSelected}
            sizeSelect={sizeSelect}
            setSizeSelect={setSizeSelect}
            buttonSubmitToBag={buttonSubmitToBag && { handleClick: submitProductToBag }}
        />;
}
