import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
interface PropsAmountProduct {
    addProduct: () => void;
    removeProduct: () => void;
    amountProduct: number;
    previousAmount: number;
}

export function AmountProduct({ addProduct, amountProduct, previousAmount, removeProduct }: PropsAmountProduct) {
    return (
        <div className="flex justify-center items-center gap-3 w-full">

            <button
                type="button"
                title="Remover"
                className={"rounded-sm bg-[#f76382] w-fit h-fit px-2 py-0.5 active:scale-95 " + (previousAmount === 1 && ' opacity-50')}
                disabled={previousAmount <= 1}
                onClick={() => removeProduct()}
            >
                <FontAwesomeIcon icon={faMinus} color="#fff" />
            </button>

            <span>{previousAmount}</span>

            <button
                type="button"
                title="Adicionar"
                className={"rounded-sm bg-[#f76382] w-fit h-fit px-2 py-0.5 active:scale-95 " + (previousAmount === amountProduct && ' opacity-50')}
                disabled={previousAmount >= amountProduct}
                onClick={() => addProduct()}
            >
                <FontAwesomeIcon icon={faPlus} color="#fff" />
            </button>

        </div>
    )
}
