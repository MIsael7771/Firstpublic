const TotalDisplay = ({ total }) => {
  const totalKg = total / 1000;
  const bottleColor = total >= 2000 ? 'text-red-600' : 
                     total >= 1000 ? 'text-yellow-600' : 'text-green-600';

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

  return (
    <div className="flex flex-col items-center justify-center bg-gray-50 rounded-xl p-6 shadow-inner">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Total acumulado</h2>
      <div className={`text-3xl font-bold ${bottleColor}`}>
        {total}g
      </div>
      <div className="text-lg text-gray-500 mt-1">
        {totalKg.toFixed(3)} kg
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

// DONE