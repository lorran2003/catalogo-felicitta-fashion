import { Product } from "../App";
import {
  Dialog,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Modal } from "./Modal";
import { useState } from "react";

interface PropsCardProducts {
  'product': Product;
  'handleClick': (product: Product) => void;
  'labelBtn': string;
}

export function CardProduct({ product, handleClick, labelBtn }: PropsCardProducts) {

  const [controlModal, setControlModal] = useState<boolean>(false);

  return (
    <Dialog open={controlModal} onOpenChange={setControlModal}>

      <Modal product={product} button={{ handleClick, labelBtn, setControlModal }} />

      <div className="rounded-md w-[45%] lg:w-1/5">

        <DialogTrigger asChild>
          <div className="w-full h-auto drop-shadow-md">
            <img
              src={product.photo}
              alt={'Foto de um ' + product.name}
              className="rounded-md object-cover w-full h-64 max-lg:sm:h-[30rem] lg:h-[28rem]"
            />
          </div>
        </DialogTrigger>

        <div className="py-2 flex flex-col gap-2">

          <p className="text-lg line-clamp-1">{product.name}</p>
          <span>R$ {product.price.toFixed(2)}</span>

        </div>

        <DialogTrigger asChild>
          <button
            className="bg-[#f76382] text-zinc-50 rounded-md font-semibold w-full py-2 active:scale-95 active:shadow-inner active:shadow-zinc-900"
            type="button"
            title="Adicionar a sacolinha"
          >
            Adicionar
          </button>
        </DialogTrigger>

      </div>

    </Dialog >
  )
}
