import {
  ActionFunctionArgs,
  Form,
  Link,
  LoaderFunctionArgs,
  redirect,
  useActionData,
  useLoaderData,
} from "react-router-dom";
import { getProductById, updateProduct } from "../services/ProductService";
import { Product } from "../types";
import ErrorMessage from "../components/ErrorMessage";
import ProductForm from "../components/ProductForm";

export async function loader({ params }: LoaderFunctionArgs) {

  if (!params.id) {
    return redirect("/");
  }

  const product = await getProductById(+params.id);

  if (!product) {
    return redirect("/");
  }

  return product;
}

export async function action({ request, params }: ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData());
  let error = "";
  if (Object.values(data).includes("")) {
    error = "Todos los campos son obligatorios";
  }

  if (error.length) {
    return error;
  }
  if (params.id !== undefined) {
    await updateProduct(data, +params.id);
    return redirect("/");
  }
}

const availabilityOptions = [
  { name: "Disponible", value: true },
  { name: "No Disponible", value: false },
];

const EditProduct = () => {
  const product = useLoaderData() as Product;
  const error = useActionData() as string;

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
        <h2 className="text-2xl md:text-4xl font-black text-slate-500">
          Editar Producto
        </h2>

        <Link
          to="/"
          className="w-full sm:w-auto text-center rounded-md bg-indigo-600 px-4 py-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500"
        >
          Volver a Productos
        </Link>
      </div>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <Form className="mt-6 md:mt-10 space-y-5 max-w-2xl" method="POST">
        <ProductForm product={product} />

        <div>
          <label className="text-gray-800 font-medium" htmlFor="availability">
            Disponibilidad:
          </label>

          <select
            id="availability"
            className="mt-2 block w-full p-3 rounded-md bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            name="availability"
            defaultValue={product?.availability.toString()}
          >
            {availabilityOptions.map((option) => (
              <option key={option.name} value={option.value.toString()}>
                {option.name}
              </option>
            ))}
          </select>
        </div>

        <input
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-500 py-3 text-white font-bold text-lg cursor-pointer rounded-md transition"
          value="Guardar Cambios"
        />
      </Form>
    </div>
  );
};
export default EditProduct;
