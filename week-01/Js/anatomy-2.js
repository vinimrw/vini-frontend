//annymous function
(function(a, b, c){
    return a + b + c
})


//function expression

const x = 1
const sum = function(a,b,c){
    return a + b + c
}

const result = sum(7,59,4)
console.log(result)

const anotherSUM = sum
console.log(anotherSUM(5, 9, 10))

let y = 3
console.log(y)

y = sum
console.log(y(11,16,1))
