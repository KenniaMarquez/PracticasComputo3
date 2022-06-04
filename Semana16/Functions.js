/*function First(){
    console.log("Primera funcion");
}

function Second(){
    setTimeout(() =>{
    console.log("Segunda funcion");
    }, 0);
}


function Third(){
    console.log("Tercera funcion");
}

// LLamado a las funciones

First();
Second();
Third();*/

function First(){
    console.log("Primera funcion");
}

function Second(callback){
    setTimeout(() =>{
    console.log("Segunda funcion");
    callback();
    }, 0);
}


function Third(){
    console.log("Tercera funcion");
}

// LLamado a las funciones

First();
Second(Third);
//Third();