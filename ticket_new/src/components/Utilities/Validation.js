
export const NumbersOnly= (e) => { //angka only
    const reg = /^[0-9\b]+$/
    let preval=e.target.value
    if (e.target.value === '' || reg.test(e.target.value)) return true
    else e.target.value = preval.substring(0,(preval.length-2))
}

export const CharactersOnly= (e) => { 
    const reg = /^[A-Za-z \b]+$/
    let preval=e.target.value

    if (e.target.value === '' || reg.test(e.target.value)) 
    return true
    else 
        e.target.value = preval.substring(0,(preval.length-1)) 

}

export const CharactersOnlyWithOutSpace= (e) => { 
    const reg = /^[A-Za-z\b]+$/
    let preval=e.target.value

    if (e.target.value === '' || reg.test(e.target.value)) 
    return true
    else 
        e.target.value = preval.substring(0,(preval.length-1)) 

}

export const EmailOnly= (e) => { 
    var re = /\S+@\S+\.\S+/;
        return re.test(e.target.value);
}