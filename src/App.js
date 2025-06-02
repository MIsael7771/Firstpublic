import { useState } from 'react';
import bottleTypes from './mock/bottleTypes';
import BottleCard from './components/BottleCard';
import TotalDisplay from './components/TotalDisplay';

const App = () => {
  const [totalWeight, setTotalWeight] = useState(0);
  const [bottleCounts, setBottleCounts] = useState(
    bottleTypes.reduce((acc, bottle) => {
      acc[bottle.id] = 0;
      return acc;
    }, {})
  );

  const handleAddBottle = (bottle) => {
    setTotalWeight(prev => prev + bottle.weight);
    setBottleCounts(prev => ({
      ...prev,
      [bottle.id]: prev[bottle.id] + 1
    }));
  };

  const handleRemoveBottle = (bottle) => {
    if (bottleCounts[bottle.id] > 0) {
      setTotalWeight(prev => prev - bottle.weight);
      setBottleCounts(prev => ({
        ...prev,
        [bottle.id]: prev[bottle.id] - 1
      }));
    }
  };

  const handleReset = () => {
    setTotalWeight(0);
    setBottleCounts(
      bottleTypes.reduce((acc, bottle) => {
        acc[bottle.id] = 0;
        return acc;
      }, {})
    );
  };

  const selectedBottles = bottleTypes.reduce((acc, bottle) => {
    if (bottleCounts[bottle.id] > 0) {
      return [...acc, ...Array(bottleCounts[bottle.id]).fill(bottle)];
    }
    return acc;
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Calculadora PET</h1>
        <p className="text-gray-600">Calcula el peso de tus botellas para reciclaje</p>
      </header>

      <TotalDisplay total={totalWeight} />

      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Tipos de botellas</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {bottleTypes.map(bottle => (
            <BottleCard 
              key={bottle.id} 
              bottle={bottle} 
              onAdd={handleAddBottle}
              onRemove={handleRemoveBottle}
              count={bottleCounts[bottle.id]}
            />
          ))}
        </div>
      </div>

      {selectedBottles.length > 0 && (
        <div className="mt-8">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold text-gray-700">Botellas seleccionadas</h2>
            <button 
              onClick={handleReset}
              className="px-3 py-1 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
            >
              Reiniciar
            </button>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <ul className="divide-y divide-gray-200">
              {bottleTypes.map(bottle => (
                bottleCounts[bottle.id] > 0 && (
                  <li key={bottle.id} className="py-2 flex justify-between">
                    <span>{bottle.name} (x{bottleCounts[bottle.id]})</span>
                    <span className="font-medium">{(bottle.weight * bottleCounts[bottle.id]).toFixed(2)} kg</span>
                  </li>
                )
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;

// DONE