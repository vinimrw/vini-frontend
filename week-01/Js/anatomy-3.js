//function expression
const increment1 = function(n){
    return n+1 
}

//arrow function
const increment2 = (n) => { //=> eh sempre funcao anonima
    return n+1 
}

const increment3 = n => { //=> apenas 1 parametro = pode tirar os parenteses
    return n+1 
}

const increment4 = n => n + 1 //tudo em uma linha sem par de {} pode remover o return pois esta explicito

console.log(increment1(1))
console.log(increment2(5))
console.log(increment3(10))
console.log(increment4(100))

const sum = (a,b) => a+b //2 parametros = volta os ()
console.log(sum(3,8))
