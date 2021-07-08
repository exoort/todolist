export function isRequired (value: unknown, errorMsg?: string): boolean | string {
  const msg = errorMsg ?? 'Field is required';
  return !!value || msg;
}

export function lessThenSymbols (value: unknown, num = 200, errorMsg?: string): boolean | string {
  const msg = errorMsg ?? `Must be less then ${num} symbols`;
  const valid = !!value && String(value).length <= num;
  return valid || msg;
}
