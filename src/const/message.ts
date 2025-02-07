import { ProductToBag } from "@/hooks/useBag";
import { SellerInterface } from "./seller";
import { InterfaceClientData } from "@/router/Bag";


export function message(bag: ProductToBag[], seller: SellerInterface, client: InterfaceClientData) {

    const phoneNumber = seller.number;

    const messageContent =
        `💕Cliente: *${client.name}\n\n*` +
        `📞Telefone do cliente: ${client.number}\n\n` +
        `🥰Vendedor: *${seller.name}*\n\n` +
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