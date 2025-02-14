import { InterfaceProductToBag } from "@/hooks/useBag";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AmountProduct } from "../AmountProduct";
import { products } from "@/const/products";

interface InterfacePreviewMobile {
    productBag: InterfaceProductToBag
    addToBag: (product: InterfaceProductToBag) => void
    removeFromBag: (product: InterfaceProductToBag, all?: boolean) => void
}

export function PreviewMobile({ addToBag, productBag, removeFromBag }: InterfacePreviewMobile) {

    return (
        <div className="bg-zinc-900 rounded-md w-full p-2">

            <div className="flex justify-start items-start pb-2">

                <img src={productBag.photo} alt={productBag.name} className="object-cover rounded-md h-52 max-w-40" />

                <div className="flex flex-col justify-between h-52 text-zinc-50 pl-2">

                    <h1 className="text-lg line-clamp-2 font-normal">{productBag.name}</h1>

                    <span>Unidade: R$ {productBag.price.toFixed(2)}</span>

                    <span>Tamanho: {productBag.size}</span>

                    <AmountProduct
                        addProduct={() => addToBag(productBag)}
                        removeProduct={() => removeFromBag(productBag)}
                        maxAmount={products.find((item) => item.id === productBag.id)?.amount ?? 1}
                        previousAmount={productBag.amount}
                    />

                </div>

            </div>

            <button
                type="button"
                title="Excluir"
                className="rounded-md flex justify-center items-center bg-[#f76382] p-3 active:scale-95 w-full active:shadow-inner"
                onClick={() => removeFromBag(productBag, true)}
            >
                <FontAwesomeIcon icon={faTrash} size="lg" color="#fff" />
            </button>

        </div>

    )
}
