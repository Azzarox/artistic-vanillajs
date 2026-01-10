export function formFieldIsEmptyValidator(fields) {
    return Object.values(fields).some(x => x == '')
}