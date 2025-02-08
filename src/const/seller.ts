export interface SellerInterface {
    id: string,
    name: string,
    number: string
}

let id = 0;

const generateId = () => {
    return `${id++}`;
};

export const seller: SellerInterface[] = [
    {
        id: generateId(),
        name:'Lorran',
        number: '5521981315814'
    },
    {
        id: generateId(),
        name:'Angela',
        number: '5521993497432'
    },
]