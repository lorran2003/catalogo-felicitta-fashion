import { ProductToBag } from "@/hooks/useBag";

export function message(bag: ProductToBag[]) {
    
    const phoneNumber = '5521993497432';
    const encodedMessage = encodeURIComponent('Lista de produtos :\n' + bag.map((item) => item.name + '\nR$ ' + item.price.toFixed(2) + '\nTamanho: ' + item.size + '\nQuantidade: ' + item.amount).join('\n\n\n') + '\nTotal: R$' + bag.reduce((prev, cur) => prev + cur.price, 0).toFixed(2));

    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`);

}