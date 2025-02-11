import { InterfaceProductToBag } from "@/hooks/useBag";
import { SellerInterface } from "./seller";
import { InterfaceClientData } from "@/router/Bag";
import { PaymentInterface } from "@/components/DataModal";


export function message(bag: InterfaceProductToBag[], seller: SellerInterface, client: InterfaceClientData, payment: PaymentInterface) {

    const phoneNumber = seller.number;

    const totalPrice = bag.reduce((prev, cur) => prev + cur.price * cur.amount, 0);

    const messageContent =
        `💕Cliente: *${client.name}\n\n*` +
        `📞Telefone do cliente: ${client.phone}\n\n` +
        `🥰Vendedor: *${seller.name}*\n\n` +
        'Lista de produtos :\n\n'
        + bag.map((item) =>
            `📦 *${item.name}*` +
            `📏 Tamanho: ${item.size}` +
            `🔢 Quantidade: ${item.amount}` +
            `💵 R$ ${item.price.toFixed(2)}`
        ).join('\n') +
        `\n💳 *Total: R$ ${totalPrice.toFixed(2)}*\n\n` +
        `Forma de pagamento: *${payment.payment}*\n\n` +
        (payment?.installments ? `Parcelas: *${payment.installments}x de R$ ${(totalPrice / Number(payment.installments)).toFixed(2)}*\n\n` : '');

    const encodedMessage = encodeURIComponent(messageContent);

    try {
        window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
        return 200;

    } catch (error) {
        console.error('Erro ao abrir o WhatsApp:', error);
        return 500;
    }


}