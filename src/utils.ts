export function formData<T extends object>(form: HTMLFormElement): T {
  return Object.fromEntries(new FormData(form)) as T;
}
