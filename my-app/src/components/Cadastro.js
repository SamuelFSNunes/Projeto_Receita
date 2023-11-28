import React, { useState } from "react";
import ReceitasDespesas from "./ReceitasDespesas";

function Cadastro() {
  const [dados, setDados] = useState([]);
  const [saldo, setSaldo] = useState(0);

  const handleDelete = (index, tipo, valor) => {
    // Lógica para excluir o elemento com o índice fornecido e o tipo correto
    const novosDados = dados.filter(
      (elemento, i) => i !== index || elemento.Tipo !== tipo
    );
    setDados(novosDados);

    // Atualizar o saldo com base no tipo (receita/despesa) e valor do elemento removido
    if (tipo === "receita") {
      setSaldo((prevSaldo) => prevSaldo - valor);
    } else if (tipo === "despesas") {
      setSaldo((prevSaldo) => prevSaldo + valor);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Obter os valores dos inputs
    const nome = document.getElementById("nome").value;
    const valor = parseFloat(
      document.getElementById("valor").value.replace(",", ".")
    );
    const tipo = document.getElementById("tipo").value;
    const viaPagamento = document.getElementById("viaPagamento").value;

    // Atualizar o estado adicionando o novo elemento ao array existente
    setDados([
      ...dados,
      { Nome: nome, Valor: valor, Tipo: tipo, Pagamento: viaPagamento },
    ]);

    // Atualizar o saldo com base no tipo (receita/despesa) e valor
    if (tipo === "receita") {
      setSaldo((prevSaldo) => prevSaldo + valor);
    } else if (tipo === "despesas") {
      setSaldo((prevSaldo) => prevSaldo - valor);
    }
  };

  const receitas = dados.filter((elemento) => elemento.Tipo === "receita");
  const despesas = dados.filter((elemento) => elemento.Tipo === "despesas");

  return (
    <div className="w-full h-full p-4 bg-zinc-300 flex items-center gap-10 rounded-md">
      <form className="w-1/3 flex flex-col p-8 gap-4" onSubmit={handleSubmit}>
        <div className="text-xl font-bold col-span-2 flex justify-center">
          <p>CADASTRO</p>
        </div>
        <div className="flex flex-col">
          <label htmlFor="nome">Nome:</label>
          <input type="text" id="nome" name="nome" required />
        </div>
        <div className="flex flex-col">
          <label htmlFor="valor">Valor:</label>
          <input
            type="text"
            id="valor"
            name="valor"
            required
            pattern="[0-9]+([,\.][0-9]+)?"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="tipo">Tipo:</label>
          <select id="tipo" required>
            <option value="" disabled>
              Selecione
            </option>
            <option value="receita">Receita</option>
            <option value="despesas">Despesas</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="viaPagamento">Via de pagamento:</label>
          <select id="viaPagamento" required>
            <option value="" disabled>
              Selecione
            </option>
            <option value="pix">PIX</option>
            <option value="cartao">Cartão</option>
            <option value="dinheiro">Dinheiro</option>
          </select>
        </div>

        <div className="col-span-2 flex justify-center mt-5">
          <button
            type="submit"
            className="bg-orange-400 rounded-md text-white font-semibold p-2 w-32"
          >
            Enviar
          </button>
        </div>
      </form>
      <div className="w-1/3 h-2/3 overflow-y-hidden flex flex-col items-center gap-3">
        <p className="text-xl font-bold">Receitas</p>
        <div className="bg-zinc-400 rounded-md p-5 overflow-y-auto w-full">
          <ReceitasDespesas dados={receitas} onDelete={handleDelete} />
        </div>
      </div>
      <div className="w-1/3 h-2/3 overflow-y-hidden flex flex-col items-center gap-3">
        <p className="text-xl font-bold">Despesas</p>
        <div className="bg-zinc-400 rounded-md p-5 overflow-y-auto w-full">
          <ReceitasDespesas dados={despesas} onDelete={handleDelete} />
        </div>
      </div>
      <div className="absolute text-xl font-bold mt-5 bottom-10">
        Saldo em Carteira: R${" "}
        {saldo.toLocaleString("pt-BR", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </div>
    </div>
  );
}

export default Cadastro;
