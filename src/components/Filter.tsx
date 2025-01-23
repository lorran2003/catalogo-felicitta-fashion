interface Props {
    activeButton: string;
    setActiveButtonFilter: (item: string) => void;
    numberProducts: number;
}

const category = ['Todos', 'Vestido', 'Macaquinho', 'Calçado', 'Conjunto'];


export default function Filter({ activeButton, setActiveButtonFilter, numberProducts }: Props) {

    return (
        <>
            <section className="flex gap-5 overflow-auto snap-proximity snap-x w-full justify-start sm:justify-center items-center p-5">


                {
                    category.map((value) =>
                        <button
                            key={value}
                            type="button"
                            title={'Filtrar por ' + value}
                            className={"w-auto h-10 rounded-md shadow-sm p-5 flex justify-center items-center border font-semibold duration-100 snap-always snap-center " + (value === activeButton ? 'bg-[#f76382] text-zinc-50' : 'bg-[#fff]')}
                            onClick={() => setActiveButtonFilter(value)}
                        >
                            <span className="text-xl">{value}</span>
                        </button>
                    )
                }

            </section>

            <div className="p-5">
                <h1 className="text-3xl font-semibold">{activeButton === 'Todos' ? 'Todos os produtos' : activeButton}</h1>
                <p className="text-lg opacity-70">{'Produtos encontrados: ' + numberProducts}</p>
            </div>
        </>
    )
}
