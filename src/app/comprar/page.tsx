import { getAllCombosForBuy, getProducts } from '@/lib/db/db';
import CompraClient from '@/components/shop/CompraClient';

export default async function Comprar() {
    'use cache';

    // Usar funciones específicas para mejor cache granular
    const [combos, products] = await Promise.all([getAllCombosForBuy(), getProducts()]);

    const entradaGeneral = products.find((product) => product.category === 'entrada');
    const productsWithoutEntrada = products.filter((product) => product.category !== 'entrada');

    return (
        <>
            <CompraClient combos={combos} productsWithoutEntrada={productsWithoutEntrada} entradaGeneral={entradaGeneral || undefined} />
        </>
    );
}
