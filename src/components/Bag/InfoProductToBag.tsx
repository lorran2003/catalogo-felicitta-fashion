import { InterfaceProductToBag } from "@/hooks/useBag";
import { PreviewMobile } from "./PreviewMobile";
import { PreviewDesktop } from "./PreviewDesktop";

interface PropsInfoProductToBag {
    productBag: InterfaceProductToBag;
    addToBag: (product: InterfaceProductToBag) => void;
    removeFromBag: (product: InterfaceProductToBag, all?: boolean) => void;
}

export function InfoProductToBag({ productBag, addToBag, removeFromBag}: PropsInfoProductToBag) {
    
    const mobile = window.innerWidth <= 640;

    return mobile ? <PreviewMobile addToBag={addToBag} productBag={productBag} removeFromBag={removeFromBag} /> : <PreviewDesktop addToBag={addToBag} productBag={productBag} removeFromBag={removeFromBag}/>
}
