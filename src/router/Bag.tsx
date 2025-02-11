import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useBag } from "../hooks/useBag"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { InfoProductToBag } from "@/components/Bag/InfoProductToBag";
import { Link } from "react-router";
import { Bounce, ToastContainer } from "react-toastify";
import {
    Dialog,
} from "@/components/ui/dialog"
import { useState } from "react";
import { notifyError } from "@/const/Notification";
import { DataModal } from "@/components/DataModal";

export interface InterfaceClientData {
    name: string;
    phone: string;
}

export default function Bag() {

    const [controlModal, setControlModal] = useState<boolean>(false);

    const { bag, removelAllBag, removeFromBag, addToBag } = useBag();

    const handleClickBuy = () => {

        if (bag.length > 0) {
            setControlModal(true);
            return;
        }

        notifyError('Não há produtos na sacola!');
    }

    return (

        <Dialog open={controlModal} onOpenChange={setControlModal}>

            <main className="p-5 flex flex-col gap-5 relative">

                <DataModal controlModal={setControlModal} bag={bag} />

                <div className="flex justify-start items-center gap-5">

                    <Link to={'/'}>
                        <button
                            type="button"
                            title="Voltar"
                            className="py-1 px-2 flex justify-center items-center active:scale-95 bg-[#f76382] text-zinc-50 rounded-md active:shadow-inner"
                        >
                            <FontAwesomeIcon icon={faArrowLeft} size="xl" />
                        </button>
                    </Link>

                    <h1 className="font-semibold text-xl" >Total de produtos: {bag.reduce((prev, cur) => prev + cur.amount, 0)}</h1>

                </div>

                <h2 className="font-semibold text-xl" >Valor total: {bag.reduce((prev, cur) => prev + cur.price * cur.amount, 0).toFixed(2)}</h2>

                <section className="flex flex-wrap justify-center gap-5">

                    {bag.map((item, index) => <InfoProductToBag
                        key={index}
                        productBag={item}
                        addToBag={addToBag}
                        removeFromBag={removeFromBag}
                    />
                    )}

                </section>


                <div className="flex justify-center items-center gap-5 w-full">
                    <button
                        className="bg-zinc-800 text-zinc-50 rounded-md font-semibold w-full py-3 active:scale-95 active:shadow-inner active:shadow-zinc-900"
                        type="button"
                        onClick={() => removelAllBag()}
                    >
                        Remover todos
                    </button>

                    <button
                        className="bg-[#f76382] text-zinc-50 rounded-md font-semibold w-full py-3 active:scale-95 active:shadow-inner active:shadow-zinc-900"
                        type="button"
                        aria-label="Comprar"
                        title="Comprar"
                        onClick={() => handleClickBuy()}
                    >
                        Comprar
                    </button>


                </div>

                <ToastContainer
                    position="top-left"
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss={false}
                    draggable
                    pauseOnHover={false}
                    theme="light"
                    transition={Bounce}
                />

            </main>
        </Dialog>
    )
}
