import {
    DialogContent,
    DialogFooter,
} from "@/components/ui/dialog"
import { InterfaceClientData } from "@/router/Bag";
import React, { useState } from "react";
import { notifyError } from "@/const/Notification";
import { seller, SellerInterface } from "@/const/seller";
import { message } from "@/const/message";
import { InterfaceProductToBag } from "@/hooks/useBag";
import { DialogTitle } from "@radix-ui/react-dialog";
import { SelectOptions } from "./SelectOptions";

export interface PaymentInterface {
    payment: string;
    installments?: string;
}

interface PropsInfoModal {
    controlModal: (open: boolean) => void;
    bag: InterfaceProductToBag[];
}

const payment = { money: 'Dinheiro', creditCard: 'Cartão de crédito', debitCard: 'Cartão de debito', pix: 'Pix' };

export function DataModal({ controlModal, bag }: PropsInfoModal) {

    const [client, setClient] = useState<InterfaceClientData>({ name: '', phone: '' });

    const [selectedSeller, setSelectedSeller] = useState<SellerInterface>({ id: '0', name: '', number: '' });

    const [selectedPayment, setSelectedPayment] = useState<PaymentInterface>({ payment: '' });

    const totalPrice = bag.reduce((prev, cur) => prev + cur.price * cur.amount, 0);

    const submitData = () => {

        const { name, phone } = client;

        if (name.length < 2 || phone.length < 9) {
            notifyError('Preencha seu nome e telefone!');
            return;
        }

        if (selectedSeller.name.length < 2) {
            notifyError('Selecione um vendedor!');
            return;
        }

        if (!selectedPayment.payment) {
            notifyError('Selecione uma forma de pagamento!');
            return;
        }

        if (!selectedPayment?.installments && selectedPayment.payment === payment.creditCard) {
            notifyError('Selecione a quantidade de parcelas!');
            return
        }

        message(bag, selectedSeller, client, selectedPayment);

        setClient({ name: '', phone: '' });
        setSelectedPayment({ payment: '' });
        setSelectedSeller({ id: '0', name: '', number: '' });
        controlModal(false);

    }

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setClient({ ...client, [e.target.name]: e.target.value });
    }

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let input = e.target.value.replace(/\D/g, '');

        
        if (input.length > 0) {
            input = `${input.substring(0, 2)} ${input.substring(2)}`;
        }
        
        setClient({...client, [e.target.name]: input});
    };

    const handleSellerChange = (str: string) => {

        const findSeller = seller.find((seller) => seller.name === str);

        if (findSeller) {
            setSelectedSeller(findSeller);
            return;
        }

        notifyError('Ops não encontramos esse vendedor, entre em contato!');
    }

    const handlePayment = (payment: string) => {
        setSelectedPayment({ 'payment': payment });
    };

    const handleCreditCard = (installments: string) => {
        setSelectedPayment({ 'payment': payment.creditCard, 'installments': installments });
    };

    return (
        <DialogContent className="max-w-[90%] lg:w-2/5 rounded-md bg-[#eee]">

            <DialogTitle asChild aria-describedby="Dados do cliente">

                <div className="flex flex-col gap-3">

                    <div className="flex flex-wrap justify-start items-center gap-1">
                        <label htmlFor="nome do cliente" className="text-lg">Digite seu nome:</label>
                        <input
                            value={client.name}
                            type="text"
                            name="name"
                            id="nameClient"
                            title="Digite seu nome"
                            className="p-1 focus:outline-[#f76382] shadow rounded"
                            minLength={2}
                            onChange={handleNameChange}
                        />
                    </div>

                    <div className="flex flex-wrap justify-start items-center gap-1">
                        <label htmlFor="número do cliente" className="text-lg">Digite seu número:</label>
                        <input
                            value={client.phone}
                            type="text"
                            name="phone"
                            id="numberClient"
                            title="Digite seu número"
                            className="p-1 focus:outline-[#f76382] shadow rounded"
                            maxLength={12}
                            minLength={12}
                            placeholder="Ex:21 938171945"
                            onChange={handlePhoneChange}
                        />
                    </div>

                    <SelectOptions
                        item={seller.map((item) => item.name)}
                        onValueChange={handleSellerChange}
                        lastValue={selectedSeller.name}
                        label="Selecione o seu vendedor:"
                    />

                    <SelectOptions
                        item={Object.values(payment)}
                        onValueChange={handlePayment}
                        lastValue={selectedPayment.payment}
                        label="Forma de pagamento:"
                    />

                    {
                        selectedPayment.payment === payment.creditCard && (
                            <SelectOptions
                                item={['1', '2', '3']}
                                onValueChange={handleCreditCard}
                                lastValue={selectedPayment?.installments}
                                label="Número de parcelas:"
                            />
                        )
                    }

                    <div className="flex flex-col gap-1 opacity-70 italic font-semibold text-lg">

                        <h1>Pedido:</h1>

                        {
                            selectedPayment.installments && selectedPayment.payment === payment.creditCard ?
                                (
                                    <span>
                                        {
                                            `${selectedPayment.installments}x de R$ ${(totalPrice / Number(selectedPayment.installments)).toFixed(2)}`
                                        }
                                    </span>
                                ) :
                                (
                                    <span>
                                        R$ {totalPrice.toFixed(2)}
                                    </span>
                                )
                        }
                    </div>

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
