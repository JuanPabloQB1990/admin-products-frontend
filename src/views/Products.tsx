import { Link, useLoaderData } from "react-router-dom";
import { getProducts } from "../services/ProductService";


export async function loader() {
    
    const products = await getProducts()
    return products
};


const Products = () => {

    const products = useLoaderData()
    console.log(products);
    
    return(
        <div>
            <div className="flex justify-between">
                <h2 className="text-4xl font-black text-slate-500">Productos</h2>
                <Link 
                    to="productos/nuevo"
                    className="rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500"
                >
                    Agregar Productos
                </Link>
            </div>
        </div>
    )
}
export default Products;