import { InterfaceProduct } from "@/const/products";
import {
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";
import { AmountProduct } from "../AmountProduct";

interface PropsModal {
    product: InterfaceProduct;
    setSizeSelect: (size: string | number) => void;
    sizeSelect: string | number;
    setAmount: (amount: number) => void;
    amount: number;
    buttonSubmitToBag?: {
        handleClick: () => void
    };
}

export function ModalMobile({ product, buttonSubmitToBag, setSizeSelect, setAmount, amount, sizeSelect }: PropsModal) {
    return (
        <DialogContent className="rounded-md max-w-[95%] sm:max-w-[41rem] max-h-[99%] overflow-auto sm:overflow-hidden bg-[#eee]">

            <DialogHeader className="flex flex-col gap-3 items-center">
                <DialogTitle className="py-0.5 sm:text-4xl">
                    {product.name}
                </DialogTitle>

                <DialogDescription asChild>

                    <div className="flex flex-col items-center gap-5">

                        <img
                            src={product.photo}
                            alt={product.category + ' ' + product.name}
                            className="rounded-md object-cover h-96 w-full sm:h-[40rem] sm:w-auto"
                        />

                        <div className="flex flex-col gap-2 items-start w-full text-zinc-800 text-xl sm:text-2xl">

                            <span>R$ {product.price.toFixed(2)}</span>

                            <div className="flex gap-3 flex-wrap justify-start items-center">
                                <h3>Tamanho:</h3>

                                <div className="flex gap-3">
                                    {product.size.map((size, index) => <button
                                        key={index}
                                        type="button"
                                        title="Selecionar tamanho"
                                        value={size}
                                        className={"rounded-md duration-200 shadow-md py-1 px-2 " + (sizeSelect === size ? "bg-[#f76382] text-zinc-50 shadow" : "text-zinc-900 bg-zinc-50")}
                                        onClick={() => setSizeSelect(size)}
                                    >
                                        {size}
                                    </button>)}
                                </div>
                            </div>

                            <div className="flex justify-start items-center gap-3">

                                <h3>Quantidade:</h3>

                                <AmountProduct
                                    addProduct={() => setAmount(amount + 1)}
                                    amountProduct={product.amount}
                                    previousAmount={amount}
                                    removeProduct={() => setAmount(amount - 1)}
                                />
                            </div>

                        </div>


                        {buttonSubmitToBag && (

                            <button
                                className="bg-[#f76382] text-zinc-50 rounded-md font-semibold w-full py-2 active:scale-95 active:shadow-inner active:shadow-zinc-900 text-lg"
                                type="button"
                                title="Adicionar a sacola"
                                onClick={() => buttonSubmitToBag.handleClick()}
                            >
                                Adicionar
                            </button>

                        )}
                    </div>

                </DialogDescription>
            </DialogHeader>
        </DialogContent >
    )
}
