// Generic weighted-random selection. Works for any array of items that carry
// a numeric `probability` — used by every blind box collection, never keyed
// on a product or collection name.
export function selectWeightedFigure(figures) {
  const totalWeight = figures.reduce((sum, figure) => sum + figure.probability, 0);

  if (import.meta.env.DEV && Math.abs(totalWeight - 100) > 0.01) {
    console.warn(`selectWeightedFigure: probabilities sum to ${totalWeight}, expected 100.`);
  }

  let roll = Math.random() * totalWeight;
  for (const figure of figures) {
    if (roll < figure.probability) return figure;
    roll -= figure.probability;
  }
  return figures[figures.length - 1]; // float-rounding safety net, never undefined
}
