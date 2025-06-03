import React from 'react';

const TotalDisplay = ({ total }) => {
  const displayValue = total >= 1000 ? (total / 1000).toFixed(3) : total;
  const unit = total >= 1000 ? 'kg' : 'g';
  const bottleColor = total >= 1000 ? 'text-green-600' : 
                     total >= 500 ? 'text-yellow-600' : 'text-red-600';

  const motivationalPhrases = [
    "¡Reciclar es crear!",
    "Cada botella que reciclas le da un respiro al planeta",
    "Reciclar es amar el planeta",
    "Tus acciones construyen un futuro mejor",
    "Pequeños gestos, grandes cambios",
    "Reciclar es construir un mejor mañana",
    "Cada acción cuenta, ¡recicla ya!",
    "El cambio empieza contigo: recicla",
    "Protege el planeta, recicla tus desechos",
    "Un mundo más verde, un deseo menos", 
    "El futuro es reciclable , construyámoslo juntos",
    " Dale una segunda vida a tus residuos",
    " Recicla hoy , disfruta un mañana mejor",
    "No es basura, es un recurso en el lugar equivocado",
    "Sé parte de la solución, no de la contaminación",
    " Convierte tus residuos en nuevos productos",
    "El planeta no necesita más promesas, necesita más acción",
    "Cada vez que reciclas, siembras esperanza",
    "Tu compromiso con el reciclaje es el aire que respira el mundo"
  ];

  const randomPhrase = motivationalPhrases[
    Math.floor(Math.random() * motivationalPhrases.length)
  ];

  return (
    <div className="flex flex-col items-center justify-center bg-gray-50 rounded-xl p-6 shadow-inner">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Total acumulado</h2>
      <div className={`text-5xl font-bold ${bottleColor}`}>
        {displayValue} <span className="text-3xl">{unit}</span>
      </div>
      {total > 0 && (
        <div className="mt-3 text-sm text-center text-green-600 italic max-w-xs">
          ✨ {randomPhrase} ✨
        </div>
      )}
    </div>
  );
};

export default TotalDisplay;