
// The form must have div with .error-class and p element with .error-message
export const formDisplayError = (target, err, scrollTrue = true) => {
    const p = target.querySelector('.error-class .error-message');
    if (scrollTrue) {
        p.scrollIntoView({
            behavior: 'smooth',
            block: 'end',
            inline: 'nearest',
        });
    }
    if (err.code) {
        p.textContent = err.code;
    } else {
        p.textContent = err.message;
    }
    setTimeout(() => {
        p.textContent = '';
    }, 2000);
};
