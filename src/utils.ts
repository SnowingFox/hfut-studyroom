export function getFormatNowDate() {
    let date = new Date()
    let month: string | number = date.getMonth();
    let day: string | number = date.getDay();
    if (month < 10) {
        month = '0' + String(month)
    }
    if (day < 10) {
        day = '0' + String(day);
    }
    return `${date.getFullYear()}-${month}-${day}`
}