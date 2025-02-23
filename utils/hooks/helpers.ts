export function onlyDigits(text: string) {
  return text.replace(/[^0-9]/g, '');
}

export function isValidSemestre(value: number) {
  return !isNaN(value) && value >= 0 && value <= 14;
}
