export const validatePhone = (phoneNumber) => {
    var phoneData = ""
    var errorMsg = ""
    if (phoneNumber.startsWith('1') && phoneNumber.length === 11) {
        // eslint-disable-next-line no-unused-vars
        phoneData = phoneNumber
    } else if (!phoneNumber.startsWith('1') && phoneNumber.length === 10) {
        phoneData = "1" + phoneNumber
    } else {
        errorMsg = "Invalid Phone Number"
    }
    return [phoneData, errorMsg]
}