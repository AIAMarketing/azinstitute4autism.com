export function bindMockForms(root: ParentNode = document) {
  root.querySelectorAll<HTMLElement>('[data-aia-form][data-form-mode="mock"]').forEach((form) => {
    if (form.dataset.mockBound === 'true') return;
    form.dataset.mockBound = 'true';
    const button = form.querySelector<HTMLButtonElement>('[data-mock-submit]');
    const status = form.querySelector<HTMLElement>('[data-form-status]');
    if (!button || !status) return;
    button.addEventListener('click', () => {
      const result = form.dataset.mockResult === 'failed' || form.dataset.mockResult === 'unavailable'
        ? form.dataset.mockResult
        : 'success';
      status.textContent = form.dataset[`mock${result[0].toUpperCase()}${result.slice(1)}`] ?? 'Demo only: no information was sent.';
      status.dataset.mockState = result;
    });
  });

  root.querySelectorAll<HTMLElement>('[data-counter][data-counter-mode="mock"]').forEach((counter) => {
    if (counter.dataset.mockBound === 'true') return;
    counter.dataset.mockBound = 'true';
    const button = counter.querySelector<HTMLButtonElement>('[data-like]');
    const status = counter.querySelector<HTMLElement>('.counter-status');
    if (!button || !status) return;
    button.addEventListener('click', () => {
      const liked = button.getAttribute('aria-pressed') === 'true';
      button.setAttribute('aria-pressed', String(!liked));
      button.classList.toggle('liked', !liked);
      status.textContent = 'Demo only: no counter request or cookie was sent.';
    });
  });
}

bindMockForms();
