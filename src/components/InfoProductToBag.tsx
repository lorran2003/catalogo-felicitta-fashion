import {
    Dialog,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Modal } from "./Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImages, faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { ProductToBag } from "@/hooks/useBag";
import { Product } from "@/App";

interface PropsInfoProductToBag {
    'productToBag': ProductToBag;
    'addToBag': (product: ProductToBag | Product) => void;
    'removeFromBag': (idProduct: string | number, amount?: boolean) => void
}

export function InfoProductToBag({ productToBag, addToBag, removeFromBag }: PropsInfoProductToBag) {

    const mobile = window.innerWidth <= 640;

    return (
        <>
            {mobile ? (

                <div className="bg-zinc-900 rounded-md w-full p-2">

                    <div className="flex justify-start items-start pb-2">

                        <img src={productToBag.photo} alt={productToBag.name} className="object-cover rounded-md h-52 max-w-40" />

                        <div className="flex flex-col justify-between h-52 text-zinc-50 pl-2">

                            <h1 className="text-lg line-clamp-2 font-normal">{productToBag.name}</h1>

                            <span>Unidade: R$ {productToBag.price.toFixed(2)}</span>

                            <span>Tamanho: {productToBag.size}</span>

                            <div className="flex justify-center items-center gap-3 w-full">

                                <button
                                    type="button"
                                    title="Remover"
                                    className={"rounded-sm bg-[#f76382] p-1 active:scale-95 " + (productToBag.amount === 1 && ' opacity-50')}
                                    onClick={() => removeFromBag(productToBag.id, true)}
                                    disabled={productToBag.amount === 1}
                                >
                                    <FontAwesomeIcon icon={faMinus} size="lg" />
                                </button>

                                <span>{productToBag.amount}</span>

                                <button
                                    type="button"
                                    title="Adicionar"
                                    className="rounded-sm bg-[#f76382] p-1 active:scale-95"
                                    onClick={() => addToBag(productToBag)}
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
                        onClick={() => setTimeout(() => removeFromBag(productToBag.id), 150)}
                    >
                        <FontAwesomeIcon icon={faTrash} size="lg" color="#fff" />
                    </button>

                </div>

            ) : (

                <Dialog>

                    <Modal product={
                        {
                            'id': productToBag.id,
                            'name': productToBag.name,
                            'photo': productToBag.photo,
                            'price': productToBag.price,
                            'category': productToBag.category,
                            'size': [productToBag.size]
                        }
                    }
                    />

                    <div className="flex justify-between items-center gap-5 w-screen p-5 rounded-sm bg-zinc-800 text-zinc-50">

                        <div className="flex justify-start items-center gap-5">

                            <h1 className="text-xl">{productToBag.name}</h1>

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
            )}
        </>
    )
}
