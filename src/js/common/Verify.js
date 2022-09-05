export function verifyInt(val = ``, min = -999999999, max = 999999999, defVal = ``) {
    if (val === ``) return defVal
    // Keep number
    let val1 = val.toString().replace(/[^\d.-]/g, ``)
    if (val1 === ``) return defVal
    // val1 > 0
    let lastIndex = val1.toString().lastIndexOf(`-`)
    if (lastIndex < 0) {
        val1 = parseInt(Number(val1))
        return val1 > max ? parseInt(Number(max)) : val1
    }
    // val1 < 0
    if (lastIndex === 0) {
        if (min === 0) return defVal
        // val1 -> -
        if (val1.toString().length === 1) return val1
        val1 = parseInt(Number(val1))
        return val1 < min ? parseInt(Number(min)) : val1
    }
    // val1 -> -100-100-100 (example)
    if (min === 0) return defVal
    val1 = val1.toString().substring(0, lastIndex)
    if (val1.toString().length === 1) return val1
    val1 = parseInt(Number(val1))
    return val1 < min ? parseInt(Number(min)) : val1
}

export function isInt(val) {
    return parseInt(val, 10) === Number(val)
}