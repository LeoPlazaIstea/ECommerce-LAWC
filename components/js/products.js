// Función que conecta con la API y lista todo los productos creandolos como objetos dentro de un array.
export async function listProducts(){
    try {
        // Conecto con la API
        const response = await fetch('https://fakestoreapi.com/products');
        // Verifico si hay respuesta de la API sino devuelvo error con el status de la respuesta.
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        // Obtengo los datos de la API para luego mapearlos a productos
        const data = await response.json();
        // Realizo el mapeo
        const products = data.map(p => ({
            id: p.id,
            title: p.title,
            price: p.price,
            image: p.image,
            description: p.description,
            category: p.category
        }));
        return products;
    } catch (error) {
        console.error("Error al obtener los productos:", error);
    }
}