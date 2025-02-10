import { InterfaceProduct } from "@/App";
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

export function ModalDesktop({ amount, product, setAmount, setSizeSelect, sizeSelect, buttonSubmitToBag }: PropsModal) {
    return (
        <DialogContent className="max-w-[55rem] bg-[#eee]">
            <DialogHeader className="grid grid-cols-2 gap-5 w-full">
                <div>
                    <img
                        src={product.photo}
                        alt={product.category + ' ' + product.name}
                        className="h-[35rem] w-full rounded-md object-cover"
                    />
                </div>

                <div className="flex flex-col gap-5 py-5">

                    <DialogTitle className="w-fit p-1 text-5xl">
                        {product.name}
                    </DialogTitle>

                    <DialogDescription asChild>

                        <div className="flex flex-col gap-5 p-1 justify-center items-start">

                            <span className="text-4xl">R$ {product.price.toFixed(2)}</span>

                            <div className="text-2xl flex gap-3 flex-wrap">
                                <h3>Tamanho:</h3>

                                <div className="flex gap-3">
                                    {product.size.map((size, index) => <button
                                        key={index}
                                        type="button"
                                        title="Selecionar tamanho"
                                        value={size}
                                        className={"rounded-md duration-75 shadow-md py-1 px-2 " + (sizeSelect === size ? "bg-[#f76382] text-zinc-50 shadow" : "text-zinc-900 bg-zinc-50")}
                                        onClick={() => setSizeSelect(size)}
                                    >
                                        {size}
                                    </button>)}
                                </div>
                            </div>

                            <div className="flex justify-start items-center gap-3 text-2xl">

                                <h3>Quantidade:</h3>

                                <AmountProduct
                                    addProduct={() => setAmount(amount + 1)}
                                    amountProduct={product.amount}
                                    previousAmount={amount}
                                    removeProduct={() => setAmount(amount - 1)}
                                />
                            </div>

                        </div>

                    </DialogDescription>

                    {buttonSubmitToBag && (


                        <button
                            className="bg-[#f76382] text-zinc-50 rounded-md font-semibold w-full py-2 active:scale-95 active:shadow-inner active:shadow-zinc-900"
                            type="button"
                            title="Adicionar a sacola"
                            onClick={() => buttonSubmitToBag.handleClick()}
                        >
                            Adicionar
                        </button>

                    )}

                </div>
            </DialogHeader>
        </DialogContent>
    )
}
