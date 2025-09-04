import { getAllCombosForBuy, getProducts } from '@/lib/db/db';
import CompraClient from '@/components/shop/CompraClient';

export default async function Comprar() {
    'use cache';
    const combos = await getAllCombosForBuy();
    const products = await getProducts();

    const entradaGeneral = products.find((product) => product.name === 'Entrada General');
    const productsWithoutEntrada = products.filter((product) => product.name !== 'Entrada General');

    return (
        <>
            <CompraClient combos={combos} productsWithoutEntrada={productsWithoutEntrada} entradaGeneral={entradaGeneral} />
        </>
    );
}
