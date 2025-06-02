import React from 'react'; // Es buena práctica importar React

const TotalDisplay = ({ total }) => {
  // total viene en gramos desde App.js
  const totalInGrams = total; // Para mayor claridad, el total recibido es en gramos

  // Lógica para determinar el color basado en el peso en gramos
  const bottleColor = totalInGrams >= 1000 ? 'text-green-600' :
                      totalInGrams >= 500 ? 'text-yellow-600' : 'text-red-600';

  // Frases motivacionales
  const motivationalPhrases = [
    "¡Reciclar es crear!",
    "Cada botella que reciclas le da un respiro al planeta",
    "Reciclar es amar el planeta",
    "Tus acciones construyen un futuro mejor",
    "Pequeños gestos, grandes cambios",
    "Eres parte de la solución",
    "El reciclaje comienza contigo",
    "Juntos cuidamos nuestro hogar",
    "Reciclar hoy para vivir mañana",
    "Transformando residuos en recursos"
  ];

  // Seleccionar frase aleatoria
  const randomPhrase = motivationalPhrases[
    Math.floor(Math.random() * motivationalPhrases.length)
  ];

  // Lógica principal: Formatear el peso para mostrar
  const displayWeight = totalInGrams >= 1000
    ? `${(totalInGrams / 1000).toFixed(3)} Kg` // Si es 1000g o más, convierte a Kg con 2 decimales
    : `${totalInGrams} g`; // De lo contrario, muestra en gramos

  // Mostrar el peso en kg debajo del display principal (opcional, como lo tenías)
  // Aunque ya no es necesario un cálculo separado para 'totalKg' si el display principal maneja la unidad
  // Pero lo mantendremos si quieres ambas representaciones (g y Kg) visibles
  const totalKgOnly = (totalInGrams / 1000).toFixed(3);


  return (
    <div className="flex flex-col items-center justify-center bg-gray-50 rounded-xl p-6 shadow-inner">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Total acumulado</h2>
      {/* Aquí usamos la variable displayWeight que ya contiene la unidad correcta */}
      <div className={`text-3xl font-bold ${bottleColor}`}>
        {displayWeight}
      </div>
      {/* Puedes decidir si quieres mantener la línea de 'kg' siempre visible o solo cuando sea relevante.
          Si totalInGrams >= 1000 ya muestra Kg, esta línea podría ser redundante si quieres una única unidad */}
      {totalInGrams < 1000 && ( // Muestra el peso en kg solo si el principal está en gramos
          <div className="text-lg text-gray-500 mt-1">
              {totalKgOnly} kg
          </div>
      )}
      {totalInGrams > 0 && (
        <div className="mt-3 text-sm text-center text-green-600 italic max-w-xs">
          ✨ {randomPhrase} ✨
        </div>
      )}
    </div>
  );
};

export default TotalDisplay;