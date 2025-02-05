import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { seller, SellerInterface } from "@/const/Seller";

export function SelectSeller({ setSeller }: { setSeller: (item: SellerInterface[]) => void }) {

    return (

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
                    onClick={() => setSeller([item])}
                >
                    {item.name}
                </SelectItem>)}
            </SelectContent>
        </Select>
    )
}
