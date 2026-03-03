import {
  ActionFunctionArgs,
  Form,
  Link,
  redirect,
  useActionData,
} from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import { addProduct } from "../services/ProductService";
import ProductForm from "../components/ProductForm";

export async function action({ request }: ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData());
  let error = "";
  if (Object.values(data).includes("")) {
    error = "Todos los campos son obligatorios";
  }

  if (error.length) {
    return error;
  }
  await addProduct(data);

  return redirect("/");
}
const NewProducts = () => {
  const error = useActionData() as string;

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
        <h2 className="text-2xl md:text-4xl font-black text-slate-500">
          Registrar Producto
        </h2>

        <Link
          to="/"
          className="w-full sm:w-auto text-center rounded-md bg-indigo-600 px-4 py-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500"
        >
          Volver a Productos
        </Link>
      </div>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <Form className="mt-6 md:mt-10 space-y-5" method="POST">
        <ProductForm />

        <input
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-500 py-3 text-white font-bold text-lg cursor-pointer rounded-md transition"
          value="Registrar Producto"
        />
      </Form>
    </div>
  );
};
export default NewProducts;
