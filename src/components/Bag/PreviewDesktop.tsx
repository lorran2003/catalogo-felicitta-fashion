import {
    Dialog,
    DialogTrigger,
} from "@/components/ui/dialog";
import { InterfaceProductToBag } from "@/hooks/useBag";
import { faImages, faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal } from "../ProductModal/Modal";

interface InterfacePreviewDesktop {
    productBag: InterfaceProductToBag
    addToBag: (product: InterfaceProductToBag) => void
    removeFromBag: (idProduct: string | number, amount?: boolean) => void
}

export function PreviewDesktop({ addToBag, productBag, removeFromBag }: InterfacePreviewDesktop) {
    return (
        <Dialog>

            <Modal product={
                {
                    'id': productBag.id,
                    'name': productBag.name,
                    'photo': productBag.photo,
                    'price': productBag.price,
                    'category': productBag.category,
                    'size': [productBag.size]
                }
            }
            />

            <div className="flex justify-between items-center gap-5 w-screen p-5 rounded-sm bg-zinc-800 text-zinc-50">

                <div className="flex justify-start items-center gap-5">

                    <h1 className="text-xl">{productBag.name}</h1>

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

                <span className="text-lg">Tamanho: {productToBag.size}</span>


                <div className="flex justify-center items-center gap-3">

                    <button
                        type="button"
                        title="Remover"
                        className={"rounded-sm bg-[#f76382] p-1 active:scale-95 " + (productToBag.amount === 1 && ' opacity-50')}
                        onClick={() => removeFromBag(productToBag.id, true)}
                        disabled={productToBag.amount === 1}
                    >
                        <FontAwesomeIcon icon={faMinus} size="lg" />
                    </button>

                    <span className="text-lg">{productToBag.amount}</span>

                    <button
                        type="button"
                        title="Adicionar"
                        className="rounded-sm bg-[#f76382] p-1 active:scale-95"
                        onClick={() => addToBag(productToBag)}
                    >
                        <FontAwesomeIcon icon={faPlus} size="lg" />
                    </button>

                </div>

                <span className="text-lg">Unidade: R$ {productToBag.price.toFixed(2)}</span>

                <button
                    type="button"
                    title="Excluir"
                    className="rounded-md flex justify-center items-center bg-red-600 p-3 active:scale-95"
                    onClick={() => removeFromBag(productToBag.id)}
                >
                    <FontAwesomeIcon icon={faTrash} size="lg" />
                </button>

            </div>
        </Dialog >
    )
}
