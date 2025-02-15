import Filter from "./components/Filter";
import { Header } from "./components/Header";
import { products } from "./const/products";
import { lazy, Suspense, useState } from "react";
import Loading from "./components/Loading";
import { Bounce, ToastContainer } from 'react-toastify';
import { useBag } from "./hooks/useBag";


const CardProduct = lazy(() => import('./components/CardProduct'));

export default function App() {

  const { bag, addToBag } = useBag();

  const [activeButtonFilter, setActiveButtonFilter] = useState<string>('Todos');

  const filterProducts = activeButtonFilter === 'Todos' ? products : products.filter((product) => product.category === activeButtonFilter);

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
              addTobag={addToBag}
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
