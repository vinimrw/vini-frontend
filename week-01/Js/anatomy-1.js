//function declaration

function sayHello(){
    console.log('Hello')
}


sayHello() 


function sayHelloTo(name){
    console.log('Hello ' + name)
}

sayHelloTo('mike')



function sayHelloTo2(name2){
    console.log(`Hello ${name2}!`) //usa a crase 
}

sayHelloTo2('luka')

function returnHi(){
    return `HI` 
}

let greeting = returnHi()
console.log(greeting)
console.log(returnHi()) //console.log = print

function returnHiTo(name){
    return `Hi ${name}!`
}

console.log(returnHiTo('jhon'))