import { InterfaceProductToBag } from "@/hooks/useBag";
import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface InterfacePreviewMobile {
    productBag: InterfaceProductToBag
    addToBag: (product: InterfaceProductToBag) => void
    removeFromBag: (idProduct: string | number, amount?: boolean) => void
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

                    <div className="flex justify-center items-center gap-3 w-full">

                        <button
                            type="button"
                            title="Remover"
                            className={"rounded-sm bg-[#f76382] p-1 active:scale-95 " + (productBag.amount === 1 && ' opacity-50')}
                            onClick={() => removeFromBag(productBag.id, true)}
                            disabled={productBag.amount === 1}
                        >
                            <FontAwesomeIcon icon={faMinus} size="lg" />
                        </button>

                        <span>{productBag.amount}</span>

                        <button
                            type="button"
                            title="Adicionar"
                            className="rounded-sm bg-[#f76382] p-1 active:scale-95"
                            onClick={() => addToBag(productBag)}
                        >
                            <FontAwesomeIcon icon={faPlus} size="lg" />
                        </button>

                    </div>

                </div>

            </div>

            <button
                type="button"
                title="Excluir"
                className="rounded-md flex justify-center items-center bg-[#f76382] p-3 active:scale-95 w-full active:shadow-inner"
                onClick={() => setTimeout(() => removeFromBag(productBag.id), 150)}
            >
                <FontAwesomeIcon icon={faTrash} size="lg" color="#fff" />
            </button>

        </div>

    )
}
