import React from "react";

function ReceitasDespesas({ dados, onDelete }) {
  return (
    <div className="flex flex-col gap-5">
      {dados.map((elemento, index) => (
        <div key={index}>
          <ul className="flex justify-around w-full items-center">
            <div>
              <li>
                <strong>Nome:</strong> {elemento.Nome}
              </li>
              <li>
                <strong>Valor:</strong> {elemento.Valor}
              </li>
              <li>
                <strong>Tipo:</strong> {elemento.Tipo}
              </li>
              <li>
                <strong>Pagamento:</strong> {elemento.Pagamento}
              </li>
            </div>
            <button
              onClick={() => onDelete(index, elemento.Tipo, elemento.Valor)}
              className="bg-red-600 font-semibold text-white p-2 h-fit rounded-lg"
            >
              Delete
            </button>
          </ul>
        </div>
      ))}
    </div>
  );
}

export default ReceitasDespesas;
