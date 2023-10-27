const knex = require('../connections/postgres');


const productsList = async (req) => {
    let products = "";
    const { pedido_produtos } = req.body;

    for (const order of pedido_produtos) {
        const productData = await knex.select('descricao', 'valor')
            .from('produtos')
            .where("id", order.produto_id)
            .first();

        const productPrice = productData.valor / 100;
        const amount = order.quantidade_produto;
        const total = productPrice * amount;

        const productString = `
        Produto: ${productData.descricao},
        Preço unitário: R$ ${productPrice.toFixed(2)},
        Quantidade: ${amount} unidade(s), 
        Total: R$ ${total.toFixed(2)}
        `
        products = products + productString + "\n";
    }
    return products
}

module.exports = productsList;