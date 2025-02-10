import { useBag } from "@/hooks/useBag";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router";

export function Header() {

    const { bag } = useBag();

    return (
        <header className="w-full h-20 shadow-sm fixed top-0 z-10 ">

            <div className="flex px-5 lg:px-10 w-full h-full justify-between items-center bg-[#ffd3e4]">

                <h1 className="font-semibold text-2xl" >Gallery Store</h1>

                <Link to={'/bag'}>
                    <button
                        type="button"
                        title="Sacolinha de compras"
                        className="w-fit h-fit py-1 relative"
                    >
                        <FontAwesomeIcon
                            className="size-9"
                            icon={faBagShopping}
                        />

                        <span
                            className="absolute bottom-0 right-0 bg-[#f76382] text-zinc-50 rounded-full w-6 h-6 flex justify-center items-center"
                        >
                            {bag.reduce((prev, cur) => prev + cur.amount, 0)}
                        </span>
                    </button>
                </Link>
            </div>

        </header>
    )
}
