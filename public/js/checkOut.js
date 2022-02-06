function finalizar() {
    var card = {
        nome: document.getElementById('nome').value,
        numero: document.getElementById('numero').value,
        validade: document.getElementById('validade').value,
        cvc: document.getElementById('cvc').value
    }
    var comprar = { 
        ...this.produto, 
        ...this.user, 
        ...card, 
        valorTotal: !this.preco ?  this.produto.valor : this.preco}
        const body = JSON.stringify(comprar)
        
        fetch('/chekOuts', {
            method: "POST",
            body: body,
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then((res) => res.text())
        .then((message) => {
            if (message) throw message
            msg()
            this.typeCheck==='carrinho' ? limparPorItem(this.produto.position, this.produto.quant) : null
            resetCheckout()
        })
        .catch(err => msg(err))
}