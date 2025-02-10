import Filter from "./components/Filter";
import { Header } from "./components/Header";
import { products } from "./const/products";
import { lazy, Suspense, useState } from "react";
import Loading from "./components/Loading";
import { Bounce, ToastContainer } from 'react-toastify';

export interface InterfaceProduct {
  id: string;
  name: string;
  photo: string;
  price: number;
  size: (number | string)[];
  category: string;
  amount: number;
}

const productsNewPrice: InterfaceProduct[] = products.map((product) => ({ ...product, 'price': product.price + 20 }));

const CardProduct = lazy(() => import('./components/CardProduct'));

export default function App() {

  const [activeButtonFilter, setActiveButtonFilter] = useState<string>('Todos');

  const filterProducts = activeButtonFilter === 'Todos' ? productsNewPrice : productsNewPrice.filter((product) => product.category === activeButtonFilter);

  return (
    <div className="relative">

      <Header />

      <main className="py-20">

        <Filter activeButton={activeButtonFilter} setActiveButtonFilter={setActiveButtonFilter} numberProducts={filterProducts.length} />

        <Suspense fallback={<Loading />}>

          <section className="flex flex-wrap justify-center gap-5">
            {filterProducts.map((product) => <CardProduct
              key={product.id}
              product={product}
              buttonSubmitToBag={true}
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
