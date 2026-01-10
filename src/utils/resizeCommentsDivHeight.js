
export function setDynamicHeight() {
    const element = document.querySelector('.details-image')
    // console.log(element);
    const resizedElementHeight = element.naturalHeight / 2;
    // console.log(resizedElementHeight)
    const commentsSection = document.querySelector('.right-details .comments');
    commentsSection.style.height = `${resizedElementHeight}px`;
}
