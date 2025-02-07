import {
    DialogContent,
    DialogFooter,
} from "@/components/ui/dialog"
import { InterfaceClientData } from "@/router/Bag";
import React, { useState } from "react";
import { notifyError } from "@/const/Notification";
import { seller, SellerInterface } from "@/const/seller";
import { message } from "@/const/message";
import { useBag } from "@/hooks/useBag";
import { DialogTitle } from "@radix-ui/react-dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export function InfoModal({ controlModal }: { controlModal: (open: boolean) => void }) {

    const bag = useBag().bag;

    const [client, setClient] = useState<InterfaceClientData>({ name: '', number: '' });

    const [sellerSelected, setSellerSelected] = useState<SellerInterface>({id: 0, name: '', number: ''});

    console.log(sellerSelected);

    const submitData = () => {

        const { name, number } = client;

        if (name.length < 2 || number.length < 9) {
            notifyError('Preencha seu nome e telefone!');
            return;
        }

        if (sellerSelected.name.length < 2) {
            notifyError('Selecione um vendedor!');
            return;
        }

        message(bag, sellerSelected, client);

        controlModal(false);

    }

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setClient({ ...client, [e.target.name]: e.target.value });
    }

    return (
        <DialogContent className="max-w-[90%] lg:w-2/5 rounded-md bg-[#eee]">

            <DialogTitle asChild aria-describedby="Dados do cliente">

                <div className="flex flex-col gap-3">

                    <div className="flex flex-wrap justify-start items-center gap-1">
                        <label htmlFor="nome do cliente" className="text-lg">Digite seu nome:</label>
                        <input
                            type="text"
                            name="name"
                            id="nameClient"
                            title="Digite seu nome"
                            className="p-1 focus:outline-[#f76382] shadow rounded"
                            minLength={2}
                            onChange={handleOnChange}
                        />
                    </div>

                    <div className="flex flex-wrap justify-start items-center gap-1">
                        <label htmlFor="número do cliente" className="text-lg">Digite seu número:</label>
                        <input
                            type="text"
                            name="number"
                            id="numberClient"
                            title="Digite seu número"
                            className="p-1 focus:outline-[#f76382] shadow rounded"
                            maxLength={11}
                            onChange={handleOnChange}
                        />
                    </div>

                    <Select>
                        <div className="flex flex-wrap justify-start items-center gap-1">
                            <h1 className="text-lg">Selecione o seu vendedor:</h1>
                            <SelectTrigger className="w-fit flex flex-wrap gap-1">
                                <SelectValue placeholder="Selecione uma opção" />
                            </SelectTrigger>
                        </div>

                        <SelectContent>
                            {seller.map((item) => <SelectItem
                                className="text-lg"
                                key={item.id}
                                value={item.name}
                                onClick={() => setSellerSelected(item)}
                            >
                                {item.name}
                            </SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>

            </DialogTitle>

            <DialogFooter>

                <button
                    type="submit"
                    className="bg-[#f76382] text-zinc-50 rounded-md font-semibold w-full py-3 active:scale-95 active:shadow-inner active:shadow-zinc-900"
                    aria-label="Comprar"
                    title="Enviar pedido"
                    onClick={() => submitData()}
                >
                    Enviar
                </button>
            </DialogFooter>


        </DialogContent >
    )
}
