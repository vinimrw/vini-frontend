function range(a, b, s = 1){
    const n1 = b === undefined ? 1 : a
    const n2 = b === undefined ? a : b
    
    const nums = []
    for(let i = n1; i<= n2; i += s){
        nums.push(i)
    }
    return nums
}

console.log(range(5))
console.log(range(5, 11))
console.log(range(5,11,2))
console.log(range(11,5))