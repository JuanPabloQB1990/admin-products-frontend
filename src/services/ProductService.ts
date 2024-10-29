import { safeParse } from "valibot";
import { DraftProductSchema, ProductsSchema } from "../types";
import axios from "axios";

type ProductData = {
    [k: string]: FormDataEntryValue;
}

export const addProduct = async(data : ProductData) => {
    try {
        // metodo para validar los tipos de datos sean correctos al asignado en DraftProductSchema
        const result = safeParse(DraftProductSchema, {
            name: data.name,
            price: Number(data.price)
        })

        if (result.success) {
            const url = `${import.meta.env.VITE_API_URL}/api/products`
            const { data } = await axios.post(url, {
                name: result.output.name,
                price: result.output.price
            })
            
            
        } else {
            throw new Error("Datos no validos");
        }
    } catch (error) {
        console.log(error);
        
    }
    
};

export async function getProducts() {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products`
        const { data } = await axios.get(url)
        
        // se validan los tipos de datos que vienen de la api sean correcto a los requeridos en ProductsSchema
        const result = safeParse(ProductsSchema, data.data)
        
        if (result.success) {
            return result.output
        } else {
            throw new Error("Datos no validos");
        }
    } catch (error) {
        console.log(error);
        
    }
}
