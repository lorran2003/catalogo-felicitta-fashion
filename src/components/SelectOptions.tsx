import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface SelectInterface{
    onValueChange: (value: string) => void;
    label: string;
    item: Array<string>;
}

export function SelectOptions({label, onValueChange, item}: SelectInterface) {
    return (

        <Select onValueChange={onValueChange}>
            <div className="flex flex-wrap justify-start items-center gap-1">
                <h1 className="text-lg">{label}</h1>
                <SelectTrigger className="w-fit flex flex-wrap gap-1 bg-zinc-50 focus:ring-[#f76382]">
                    <SelectValue placeholder="Selecione uma opção"/>
                </SelectTrigger>
            </div>

            <SelectContent>
                {item.map((item) => <SelectItem
                    className="text-lg bg-zinc-50"
                    key={item}
                    value={item}
                >
                    {item}
                </SelectItem>)}
            </SelectContent>
        </Select>
    )
}
