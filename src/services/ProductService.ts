import { number, parse, safeParse, string, transform, pipe } from "valibot";
import { DraftProductSchema, ProductsSchema, Product, ProductSchema } from "../types";
import axios from "axios";
import { toBoolean } from "../utils";

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
            await axios.post(url, {
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

export async function getProducts(): Promise<Product[]>  {
  try {
    console.log(import.meta.env.VITE_API_URL);
    
    const url = `${import.meta.env.VITE_API_URL}/api/products`
    const { data } = await axios.get(url)

    const result = safeParse(ProductsSchema, data.data)
  
    if (result.success) {
      return result.output
    } else {
      console.log("Schema validation error:", data);
      return []; 
    }

  } catch (error) {
    console.log("Axios error:", error);
    return []; 
  }
}

export async function getProductById(id: Product["id"]) {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
    const { data } = await axios.get(url)

    const result = safeParse(ProductSchema, data.data)

    if (result.success) {
      return result.output;
    } else {
      console.log("Datos no válidos:", data);
      return null; 
    }

  } catch (error) {
    console.log("Error fetching product:", error);
    return null; 
  }
}

export const updateProduct = async(data : ProductData, id : Product["id"] ) => {
    
    try {
        const NumberSchema = pipe(string(), transform(Number), number());
        // metodo para validar los tipos de datos sean correctos al asignado en DraftProductSchema
        const result = safeParse(ProductSchema, {
            id,
            name: data.name,
            price: parse(NumberSchema, data.price),
            availability: toBoolean(data.availability.toString())
        })
        
        if (result.success) {
            const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
            await axios.put(url, {
                name: result.output.name,
                price: result.output.price,
                availability: result.output.availability
            })
            
        } else {
            throw new Error("Datos no validos");
        }
    } catch (error) {
        console.log(error);
        return null; 
    }
};

export const deleteProduct = async(id : Product["id"]) => { 
    
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        await axios.delete(url)
    } catch (error) {
        console.log(error);
        return null; 
    }
}

export const updateProductAvailability = async(id : Product["id"]) => {
    console.log(id);
    
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        await axios.patch(url)
    } catch (error) {
        console.log(error);
        return null; 
    }
}
