import { PrismaClient } from '../src/generated/prisma';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Iniciando seed de la base de datos...');

    // Limpiar datos existentes
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();
    await prisma.comboItem.deleteMany();
    await prisma.combo.deleteMany();
    await prisma.product.deleteMany();

    console.log('🗑️ Datos existentes eliminados');

    // Crear productos individuales
    console.log('🍔 Creando productos...');

    // Entradas
    const entradaGeneral = await prisma.product.create({
        data: {
            name: 'Entrada General',
            category: 'entrada',
            price: 2500,
            available: true
        }
    });

    const entradaVIP = await prisma.product.create({
        data: {
            name: 'Entrada VIP',
            category: 'entrada',
            price: 4000,
            available: true
        }
    });

    // Comidas
    const paty = await prisma.product.create({
        data: {
            name: 'Paty',
            category: 'comida',
            price: 800,
            available: true
        }
    });

    const chori = await prisma.product.create({
        data: {
            name: 'Choripán',
            category: 'comida',
            price: 900,
            available: true
        }
    });

    const pancho = await prisma.product.create({
        data: {
            name: 'Pancho',
            category: 'comida',
            price: 700,
            available: true
        }
    });

    const comidaCompleta = await prisma.product.create({
        data: {
            name: 'Comida Completa',
            category: 'comida',
            price: 1500,
            available: true
        }
    });

    // Bebidas
    const gaseosa = await prisma.product.create({
        data: {
            name: 'Gaseosa',
            category: 'bebida',
            price: 400,
            available: true
        }
    });

    const cerveza = await prisma.product.create({
        data: {
            name: 'Cerveza',
            category: 'bebida',
            price: 600,
            available: true
        }
    });

    const agua = await prisma.product.create({
        data: {
            name: 'Agua',
            category: 'bebida',
            price: 300,
            available: true
        }
    });

    console.log('✅ Productos creados exitosamente');

    // Crear combos
    console.log('🎁 Creando combos...');

    // Combo Entrada General (nuevo)
    const comboEntradaGeneral = await prisma.combo.create({
        data: {
            name: 'Entrada General + Bebida',
            price: 2800, // Descuento de $100
            available: true,
            isOfferedInLanding: true // Este combo aparecerá en el landing
        }
    });

    await prisma.comboItem.createMany({
        data: [
            {
                comboId: comboEntradaGeneral.id,
                productId: entradaGeneral.id,
                quantity: 1
            },
            {
                comboId: comboEntradaGeneral.id,
                productId: gaseosa.id,
                quantity: 1
            }
        ]
    });

    // Combo Familiar: 4 comidas + 4 bebidas
    const comboFamiliar = await prisma.combo.create({
        data: {
            name: 'Combo Familiar',
            price: 7200, // Descuento del 20% sobre precio individual
            available: true,
            isOfferedInLanding: true // Este combo aparecerá en el landing
        }
    });

    await prisma.comboItem.createMany({
        data: [
            {
                comboId: comboFamiliar.id,
                productId: comidaCompleta.id,
                quantity: 4
            },
            {
                comboId: comboFamiliar.id,
                productId: gaseosa.id,
                quantity: 4
            }
        ]
    });

    // Combo Pareja: 2 comidas + 2 bebidas
    const comboPareja = await prisma.combo.create({
        data: {
            name: 'Combo Pareja',
            price: 3600, // Descuento del 15% sobre precio individual
            available: true,
            isOfferedInLanding: true // Este combo aparecerá en el landing
        }
    });

    await prisma.comboItem.createMany({
        data: [
            {
                comboId: comboPareja.id,
                productId: comidaCompleta.id,
                quantity: 2
            },
            {
                comboId: comboPareja.id,
                productId: gaseosa.id,
                quantity: 2
            }
        ]
    });

    // Paty + Gaseosa
    const comboPatyGaseosa = await prisma.combo.create({
        data: {
            name: 'Paty + Gaseosa',
            price: 1100, // Descuento de $100
            available: true
        }
    });

    await prisma.comboItem.createMany({
        data: [
            {
                comboId: comboPatyGaseosa.id,
                productId: paty.id,
                quantity: 1
            },
            {
                comboId: comboPatyGaseosa.id,
                productId: gaseosa.id,
                quantity: 1
            }
        ]
    });

    // Chori + Gaseosa
    const comboChorGaseosa = await prisma.combo.create({
        data: {
            name: 'Chori + Gaseosa',
            price: 1200, // Descuento de $100
            available: true
        }
    });

    await prisma.comboItem.createMany({
        data: [
            {
                comboId: comboChorGaseosa.id,
                productId: chori.id,
                quantity: 1
            },
            {
                comboId: comboChorGaseosa.id,
                productId: gaseosa.id,
                quantity: 1
            }
        ]
    });

    // Paty + Cerveza
    const comboPatyCerveza = await prisma.combo.create({
        data: {
            name: 'Paty + Cerveza',
            price: 1300, // Descuento de $100
            available: true
        }
    });

    await prisma.comboItem.createMany({
        data: [
            {
                comboId: comboPatyCerveza.id,
                productId: paty.id,
                quantity: 1
            },
            {
                comboId: comboPatyCerveza.id,
                productId: cerveza.id,
                quantity: 1
            }
        ]
    });

    // Chori + Cerveza
    const comboChorCerveza = await prisma.combo.create({
        data: {
            name: 'Chori + Cerveza',
            price: 1400, // Descuento de $100
            available: true
        }
    });

    await prisma.comboItem.createMany({
        data: [
            {
                comboId: comboChorCerveza.id,
                productId: chori.id,
                quantity: 1
            },
            {
                comboId: comboChorCerveza.id,
                productId: cerveza.id,
                quantity: 1
            }
        ]
    });

    // Pancho + Gaseosa
    const comboPanchoGaseosa = await prisma.combo.create({
        data: {
            name: 'Pancho + Gaseosa',
            price: 1000, // Descuento de $100
            available: true
        }
    });

    await prisma.comboItem.createMany({
        data: [
            {
                comboId: comboPanchoGaseosa.id,
                productId: pancho.id,
                quantity: 1
            },
            {
                comboId: comboPanchoGaseosa.id,
                productId: gaseosa.id,
                quantity: 1
            }
        ]
    });

    console.log('✅ Combos creados exitosamente');

    // Mostrar resumen
    const productCount = await prisma.product.count();
    const comboCount = await prisma.combo.count();

    console.log('\n📊 Resumen del seed:');
    console.log(`   • ${productCount} productos creados`);
    console.log(`   • ${comboCount} combos creados`);
    console.log('\n🎉 Seed completado exitosamente!');
}

main()
    .catch((e) => {
        console.error('❌ Error durante el seed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
