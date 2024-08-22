export function generateRandomAttributes(): { [traitType: string]: string } {
  const attributes: { [traitType: string]: string } = {};

  // Звезды: 11 вариантов (0-10)
  attributes['stars'] = `stars_${Math.floor(Math.random() * 11)}`;

  // Сияния: 6 вариантов (0-5)
  attributes['northern'] = `northern_${Math.floor(Math.random() * 6)}`;

  // Сугробы: 2 варианта (есть или нет)
  attributes['snow'] = Math.random() < 0.5 ? 'snow_0' : 'snow_1';

  // Бриллианты: 10 вариантов (0-9)
  attributes['diamon'] = `diamond_${Math.floor(Math.random() * 10)}`;

  // Точки на графике: 6 вариантов (0-5)
  attributes['arrow'] = `arrow_${Math.floor(Math.random() * 6)}`;

  return attributes;
}
