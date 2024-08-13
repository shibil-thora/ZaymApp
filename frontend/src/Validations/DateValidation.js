
export function formattedDate(date) {
    let meridian = 'am'
    let hours = date[11] + date[12]  
    if (hours > 12) {
        hours = hours - 12;
        meridian = 'pm'
    }   
    let minutes = date[14] + date[15]  
    minutes = Number(minutes) + 30  
    if (minutes > 59) {
        minutes = minutes - 60 ;
        hours = Number(hours) + 1;
    } 
    hours = Number(hours) + 5
    if (hours > 12) {
        hours = hours - 12 
        meridian = meridian == 'am' ? 'pm' : 'am' 
    }   
    if (`${hours}`.length < 2) hours = `0${hours}`
    if (`${minutes}`.length < 2) minutes = `0${minutes}`
    return `${hours}:${minutes} ${meridian}`
}