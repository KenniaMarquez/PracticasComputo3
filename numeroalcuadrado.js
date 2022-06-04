"use strict"; 
function asyncSqrt(value, callback) { 
    console.log('START execution with value =', value); 
    setTimeout(function() { 
        callback(value, value * value); 
    }, 0 | Math.random() * 100); 
} 
 
asyncSqrt(2, function(value, result) { 
    console.log('END execution with value =', value, 'and result =', result); 
}); 
             console.log('COMPLETED ?'); 