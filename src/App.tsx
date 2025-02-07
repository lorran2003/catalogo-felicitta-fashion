import Filter from "./components/Filter";
import { Header } from "./components/Header";
import { products } from "./const/products";
import { lazy, Suspense, useState } from "react";
import { useBag } from "./hooks/useBag";
import Loading from "./components/Loading";
import { Bounce, ToastContainer } from 'react-toastify';

export interface Product {
  'id': string;
  'name': string;
  'photo': string;
  'price': number;
  'size': (number | string)[];
  'category': string;
}

const productsNewPrice: Product[] = products.map((product) => ({ ...product, 'price': product.price + 20}));

const CardProduct = lazy(() => import('./components/CardProduct'));

export default function App() {

  const [activeButtonFilter, setActiveButtonFilter] = useState<string>('Todos');

  const { bag, addToBag } = useBag();

  const filterProducts = activeButtonFilter === 'Todos' ? productsNewPrice : productsNewPrice.filter((product) => product.category === activeButtonFilter);

  return (
    <div className="relative">

      <Header numberProducts={bag.reduce((prev, cur) => prev + cur.amount, 0)} />

      <main className="py-20">

        <Filter activeButton={activeButtonFilter} setActiveButtonFilter={setActiveButtonFilter} numberProducts={filterProducts.length} />

        <Suspense fallback={<Loading />}>

          <section className="flex flex-wrap justify-center gap-5">
            {filterProducts.map((product) => <CardProduct
              key={product.id}
              product={product}
              handleClick={addToBag}
              labelBtn="Adicionar"
            />
            )}
          </section>

        </Suspense>
      </main>

      <ToastContainer
        position="top-left"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="light"
        transition={Bounce}
      />
    </div>
  )
}
