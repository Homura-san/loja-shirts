var bodyDrop = document.querySelector('.drop')

function drop(produto, a) {
  bodyDrop.style.display='flex' 
  bodyDrop.innerHTML=null
  
  console.log(produto)
  if(a === 'entrar'){
    this.mode = "login"    
    bodyDrop.innerHTML+=`
    <div class="container-form">
            <a class="iconCloseLoginOrCad" onclick="down()"><i class="fa fa-window-close"></i></a>
            <div class="form-login-or-cad">
    <div class="cad row mt-2 mb-2 w-75">
        <input class="nome form-control" placeholder="Nome" type="text" id="nome" />
    </div>
    <div class="login row mb-2 w-75">
        <input class="form-control" placeholder="E-mail" type="email" id="email" />
    </div>
    <div class="login row mb-2 w-75">
        <input class="form-control" placeholder="Senha" type="password" id="password" />
    </div>
    <div class="cad row mb-2 w-75">
        <input class="form-control" placeholder="Repetir senha" type="password" id="repit-password" />
    </div>
    <div class="cad row mb-2 w-75">
        <input class="form-control" placeholder="CPF" maxlength="11" type="text" id="cpf" />
    </div>
    <div class="cad row mb-2 w-75">
        <input class="form-control" placeholder="CEP" maxlength="8" type="text" id="cep" />
    </div>
    <div class="row mb-2 w-75">
        <button class="btn-login-or-cad btn btn-primary btn-block" onclick="signinOrCad()" id="login-or-cad"></button>
    </div>
    <div class="mb-2 w-75">
        <a class="a-login-or-cad" onclick="metodoCadOrLogin()" id="cad-button"></a>
    </div>
</div>
        </div>`
  metodoCadOrLogin()
  } else if(a === 'dropCheckOut'){
    // console.log(produto)
    bodyDrop.innerHTML+=`
    <div class="containerCheckout">
        <a class="iconCloseLoginOrCad" onclick="down()"><i class="fa fa-window-close"></i></a>
        <div class="contentCheckOut">
            <div class="parte-checkout">
                <div class="camisa-checkout">
                    <img class="img-camisa-checkout" src="https://i.ibb.co/RhGt8RP/camiza-azul.png" >
                    <img class="img-estampa-checkout" src="https://i.ibb.co/zQsr2Xz/Printful-Peacock-removebg-preview.png" >
                </div>
                <div class="input-quant-valor">
                    <span>Quantidade </span>
                    <input class="form-control mb-2 ml-2 w-50" onkeyup="soma()" value="1" type="text" id="quantidade">
                    <input class="form-control" type="hidden" id="valor" value="19.99">
                    <div class="valor-checkout" type="text" id="valor-total">19.99</div>
                </div>
            </div>
            <div class="parte-checkout">
                <div class="endereco-entrega">
                    <h1>Endereço de entrega</h1>
                    <div class="cep1">
                          <form method="get" action=".">
        <label>Cep:
        <input name="cep" type="text" id="cep" size="10" maxlength="9"
               onblur="pesquisacep(this.value);" /></label><br />
        <label>Rua:
        <label name="rua" id="rua" size="30"> </label></label><br />
        <label>Bairro:
        <label name="bairro"  id="bairro" size="35"></label> </label><br />
        <label>Cidade:
        <label name="cidade" id="cidade" size="35"></label> </label><br />
        <label>Estado:
        <label name="uf" id="uf" size="2" ></label> </label><br />
      </form>
    </body>
                        
                    </div>
                    <div>
                        <span class="logradouro">
                        </span> - <span id="bairro">
                        </span>
                    </div>
                </div>
            </div>
            <div class="parte-checkout">
                <div class="cartao-credito">
                    Nome: <input class="form-control mb-2" id="nome">
                    Número do Cartão: <input class="form-control mb-2" maxlength="16" id="numero" >
                    <div class="row">
                        <div class="col-6">
                            Data de Validade: <input class="form-control mb-2 w-100" maxlength="5" id="validade">
                        </div>
                        <div class="col-6">
                            CVC: <input class="form-control mb-2 w-50" maxlength="3" id="cvc">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <button class="btn btn-primary mt-2" onclick="finalizar()">Finalizar</button>
    </div>`
  }
  
}
function down() {
  this.mode = "login"
  bodyDrop.style.display='none'
}


 function limpa_formulário_cep() {
            //Limpa valores do formulário de cep.
            document.getElementById('rua').innerHTML=("");
            document.getElementById('bairro').innerHTML=("");
            document.getElementById('cidade').innerHTML=("");
            document.getElementById('uf').innerHTML=("");
            
    }

    function meu_callback(conteudo) {
        if (!("erro" in conteudo)) {
            //Atualiza os campos com os valores.
            document.getElementById('rua').innerHTML=(conteudo.logradouro);
            document.getElementById('bairro').innerHTML=(conteudo.bairro);
            document.getElementById('cidade').innerHTML=(conteudo.localidade);
            document.getElementById('uf').innerHTML=(conteudo.uf);
            
        } //end if.
        else {
            //CEP não Encontrado.
            limpa_formulário_cep();
            alert("CEP não encontrado.");
        }
    }
        
    function pesquisacep(valor) {

        //Nova variável "cep" somente com dígitos.
        var cep = valor.replace(/\D/g, '');

        //Verifica se campo cep possui valor informado.
        if (cep != "") {

            //Expressão regular para validar o CEP.
            var validacep = /^[0-9]{8}$/;

            //Valida o formato do CEP.
            if(validacep.test(cep)) {

                //Preenche os campos com "..." enquanto consulta webservice.
                document.getElementById('rua').innerHTML="...";
                document.getElementById('bairro').innerHTML="...";
                document.getElementById('cidade').innerHTML="...";
                document.getElementById('uf').innerHTML="...";
                

                //Cria um elemento javascript.
                var script = document.createElement('script');

                //Sincroniza com o callback.
                script.src = 'https://viacep.com.br/ws/'+ cep + '/json/?callback=meu_callback';

                //Insere script no documento e carrega o conteúdo.
                document.body.appendChild(script);

            } //end if.
            else {
                //cep é inválido.
                limpa_formulário_cep();
                msg("Formato de CEP inválido.");
            }
        } //end if.
        else {
            //cep sem valor, limpa formulário.
            limpa_formulário_cep();
        }
    };