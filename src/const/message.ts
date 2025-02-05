import { ProductToBag } from "@/hooks/useBag";
import { SellerInterface } from "./Seller";

export function message(bag: ProductToBag[], seller: SellerInterface[], clientName: string) {

    const phoneNumber = seller[0].number;

    const messageContent =
        `💕Cliente: *${clientName}\n\n*` +
        `🥰Vendedor: *${seller[0].name}*\n\n` +
        'Lista de produtos :\n\n'
        + bag.map((item) =>
            `📦 *${item.name}*\n` +
            `📏 Tamanho: ${item.size}\n` +
            `🔢 Quantidade: ${item.amount}\n` +
            `💵 R$ ${item.price.toFixed(2)}\n`
        ).join('\n\n') +
        `\n\n💳 *Total: R$ ${bag.reduce((prev, cur) => prev + cur.price, 0).toFixed(2)}*`;

    const encodedMessage = encodeURIComponent(messageContent);

    try {
        window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
        return 200;

    } catch (error) {
        console.error('Erro ao abrir o WhatsApp:', error);
        return 500;
    }


}