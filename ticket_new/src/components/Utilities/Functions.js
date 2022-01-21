export function getCurrentDate(separator='-'){
    let newDate = new Date()
    let day = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${day < 10 ? `0${day}`:`${day}`}`;


    // return `${date < 10 ? `0${date}`:`${date}`}${separator}${month < 10 ? `0${month}`:`${month}`}${separator}${year}`
}

export function getFormattedDate(date,format,separator){
    let newDate = new Date(date)
    let day = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    if(format==="dd-mm-yyyy")
    {
        return `${day < 10 ? `0${day}`:`${day}`}${separator}${month<10?`0${month}`:`${month}`}${separator}${year}`;
    }
    if(format==="yyyy-mm-dd")
    {
        return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${day < 10 ? `0${day}`:`${day}`}`;
    }
    
}