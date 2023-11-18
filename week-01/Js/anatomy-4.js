//anonymoys function
//IIFE

(function(a,b,c){
    console.log(`result: ${a+b+c}`)
})(1,2,3);

(() => {
    console.log(`arrow 01`)
})();

(() => console.log(`arrow 02`))();