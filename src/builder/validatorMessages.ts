
export enum UnitErrors {
  TooManyItems = '{count} {name} cannot have more than {count} item(s).',
  TooManyUpgrades = '{count} {name} cannot have more than {count} upgrade(s).',
  TooManyStands = '{count} {name} cannot have more than {count} stand(s).',
  CountOutOfBounds = '{name} count of {count} is out of bounds.'
}

export enum ArmyErrors {
  MaxOneAugment = 'Max 1 {name} per army.',
  StandsOutOfBounds = '{name} stand unit is out of bounds.',
  ArmyNeedsGeneral = 'Army needs a general.',
  ArmyCostExceedsLimit = 'Army cost exceeds the limit.'
}

export const formatError = 
(template: string, values: Record<string, string | number>): string => {
  return template.replace(/{(\w+)}/g, (_, key) => values[key].toString())
}