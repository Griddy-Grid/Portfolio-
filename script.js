function copyWithFallback(input) {
  input.focus();
  input.select();
  input.setSelectionRange(0, input.value.length);
  return document.execCommand('copy');
}

document.addEventListener('DOMContentLoaded', () => {
  const emailInput = document.getElementById('emailValue');
  const copyButton = document.querySelector('.copy-btn');
  const copyStatus = document.getElementById('copyStatus');

  if (!emailInput || !copyButton || !copyStatus) {
    throw new Error('The email copy controls could not be found.');
  }

  copyButton.addEventListener('click', async () => {
    let copied = false;

    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(emailInput.value);
        copied = true;
      } catch (error) {
        console.error('Clipboard API copy failed; trying the fallback.', error);
      }
    }

    if (!copied) {
      try {
        copied = copyWithFallback(emailInput);
      } catch (error) {
        console.error('Clipboard fallback failed.', error);
      }
    }

    copyButton.textContent = copied ? 'copied' : 'try again';
    copyStatus.textContent = copied
      ? 'Email copied to clipboard.'
      : 'Unable to copy. Select the email and copy it manually.';

    window.setTimeout(() => {
      copyButton.textContent = 'copy';
      copyStatus.textContent = '';
    }, 1600);
  });
});
