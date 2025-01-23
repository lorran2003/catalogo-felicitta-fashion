import { Product } from "@/App";
import {
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "./ui/dialog";
import { useState } from "react";

interface PropsModal {
    'product': Product;
    'button'?: {
        'handleClick': (product: Product) => void;
        'labelBtn': string;
        'setControlModal': (open: boolean) => void;
    }
}


export function Modal({ product, button }: PropsModal) {

    const [sizeSelect, setSizeSelect] = useState<string | number>(product.size.length === 1 ? product.size[0] : '');

    const handleAddToProduct = () => {
        try {

            if (sizeSelect) {

                const newProduct = {
                    'id': product.id,
                    'name': product.name,
                    'photo': product.photo,
                    'price': product.price,
                    'size': [sizeSelect],
                    'category': product.category
                };

                button?.handleClick(newProduct);

                button?.setControlModal(false);

                return;
            }

            alert('Selecione um tamanhos');

        } catch (error) {
            console.log(error);
        }
    };

    const desktop = window.innerWidth >= 1024;

    return (
        <>
            {desktop ? (

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

                                <div className="flex flex-col gap-3 p-1 justify-center items-start">

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


                                </div>

                            </DialogDescription>

                            {button && (


                                <button
                                    className="bg-[#f76382] text-zinc-50 rounded-md font-semibold w-full py-2 active:scale-95 active:shadow-inner active:shadow-zinc-900"
                                    type="button"
                                    title="Adicionar a sacolinha"
                                    onClick={() => handleAddToProduct()}
                                >
                                    {button.labelBtn}
                                </button>

                            )}

                        </div>
                    </DialogHeader>
                </DialogContent>
            ) :
                (
                    <DialogContent className="rounded-md max-w-[90%] sm:max-w-[41rem] max-h-[95%] overflow-auto sm:overflow-hidden bg-[#eee]">

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

                                    <div className="flex flex-col gap-1 items-start w-full text-zinc-800 text-xl sm:text-2xl">

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

                                    </div>

                                    {button && (


                                        <button
                                            className="bg-[#f76382] text-zinc-50 rounded-md font-semibold w-full py-2 active:scale-95 active:shadow-inner active:shadow-zinc-900 text-lg"
                                            type="button"
                                            title="Adicionar a sacolinha"
                                            onClick={() => handleAddToProduct()}
                                        >
                                            {button.labelBtn}
                                        </button>

                                    )}
                                </div>

                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent >
                )
            }
        </>
    )
}
