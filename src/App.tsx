import Filter from "./components/Filter";
import { Header } from "./components/Header";
import { CardProduct } from "./components/CardProduct";
import { category, products } from "./const/products";
import { useState } from "react";
import { useBag } from "./hooks/useBag";

export interface Product {
  'id': string;
  'name': string;
  'photo': string;
  'price': number;
  'size': (number | string)[];
  'category': string;
}

const productsNewPrice: Product[] = products.map((product) => ({ ...product, 'price': product.category === category.calcado ? (product.price + 20) : (product.price + 25) }));

export default function App() {

  const [activeButtonFilter, setActiveButtonFilter] = useState<string>('Todos');

  const { bag, addToBag } = useBag();

  const filterProducts = activeButtonFilter === 'Todos' ? productsNewPrice : productsNewPrice.filter((product) => product.category === activeButtonFilter);

  return (
    <div className="relative">

      <Header numberProducts={bag.reduce((prev, cur) => prev + cur.amount, 0)} />

      <main className="py-20">

        <Filter activeButton={activeButtonFilter} setActiveButtonFilter={setActiveButtonFilter} numberProducts={filterProducts.length} />

        <section className="flex flex-wrap justify-center gap-5">
          {filterProducts.map((product) => <CardProduct
            key={product.id}
            product={product}
            handleClick={addToBag}
            labelBtn="Adicionar"
          />
          )}
        </section>
      </main>
    </div>
  )
}
