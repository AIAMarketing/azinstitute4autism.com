export function preventUnwiredFormSubmission(form: HTMLFormElement) {
  form.addEventListener('submit', (event) => event.preventDefault());
}
