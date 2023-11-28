import React from "react";

function ReceitasDespesas({ dados, onDelete }) {
  return (
    <div className="flex flex-col gap-5">
      {dados.map((elemento, index) => (
        <div key={index}>
          <ul className="flex justify-around w-full items-center">
            <div>
              {Object.entries(elemento).map(([key, value]) => (
                <li key={key}>
                  <strong>{key}:</strong> {value}
                </li>
              ))}
            </div>
            <button
              onClick={() => onDelete(index)}
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
