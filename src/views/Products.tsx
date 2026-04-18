import {
  ActionFunctionArgs,
  Link,
  redirect,
  useLoaderData,
} from "react-router-dom";
import {
  getProducts,
  updateProductAvailability,
} from "../services/ProductService";
import ProductDetails from "../components/ProductDetails";
import { Product } from "../types";

export async function loader() {
  const products = await getProducts();
  return Array.isArray(products) ? products : [];
}

export async function action({ request }: ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData());

  await updateProductAvailability(+data.id);
  return redirect("/");
}

const Products = () => {
  const products = useLoaderData() as Product[];

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
        <h2 className="text-2xl md:text-4xl font-black text-slate-500">
          Productos
        </h2>

        <Link
          to="productos/nuevo"
          className="w-full sm:w-auto text-center rounded-md bg-indigo-600 px-4 py-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500"
        >
          Agregar Producto
        </Link>
      </div>

      {/* Tabla */}
      <div className="mt-6 overflow-x-auto">
        <table className="w-full table-auto min-w-[600px]">
          <thead className="bg-slate-800 text-white">
            <tr>
              <th className="p-3 text-left">Producto</th>
              <th className="p-3 text-left">Precio</th>
              <th className="p-3 text-left">Disponibilidad</th>
              <th className="p-3 text-left">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <ProductDetails key={product.id} product={product} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Products;
