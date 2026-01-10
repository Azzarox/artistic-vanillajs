// NOTE: Less strict regex?
const regexPhotoStricter = /^https?:\/\/.*\/.*\.(png|gif|webp|jpeg|jpg)\??.*$/gim;
const regexPhoto = /(https?:\/\/.*\.(?:png|jpg))/i;

// One is more strict (regexPhoto2) and with some links it may not work even though they are image links
// The other is more forgiving and is less strict
export function imageURLIsNotCorrectValidator(imageField) {
    if (regexPhoto.test(imageField) && regexPhotoStricter.test(imageField)) {
        return true;
    }
}
