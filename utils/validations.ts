export function isRequired (value: any, errorMsg?: string): boolean | string {
  const msg = errorMsg ?? 'Field is required';
  return !!value || msg;
}

export function lessThenSymbols (value: any, num = 200, errorMsg?: string): boolean | string {
  const msg = errorMsg ?? `Must be less then ${num} symbols`;
  const valid = !!value && value.toString().length <= num;
  return valid || msg;
}
