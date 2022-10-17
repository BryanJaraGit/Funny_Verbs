// Cargamos todas las id's de nuestro archivo index.html
const ShowVerb = document.getElementById('ShowVerb');
const ShowImage = document.getElementById('ShowImage');
const ShowAudio = document.getElementById('ShowAudio');
const answerAudio = document.getElementById('AnswerAudio')

const first = document.getElementById('first-verb');
const second = document.getElementById('second-verb');
const third = document.getElementById('third-verb');
const fourth = document.getElementById('fourth-verb');

const next = document.getElementById('next');
const verbsCounter = document.getElementById('verbs-counter');
const allRightCounter = document.getElementById('all-right-answer');
const verbsContainer = document.getElementById('verbs-container');
const crono = document.getElementById('cronometro'); 

const numberOfVerbs = verbs.length;

// Nombramos nuestras variables
let answerRoullete = [0,1,1,1];
let everyNumberOfVerb = [];
let rightAnswer;
let rightAnswersCounter = 0;
let cronometro = 0;

// Se ejecuta el evento al hacer click en play to start
next.addEventListener('click', function(){
    ponerVerbo();
    next.style.display = 'none';
    contarPregunta();
    // ShowVerb.innerHTML = "Hola";
});

// Creamos una lista random de manera ordenada
makeRandomList();

let lastPosition = numberOfVerbs -1;

function makeRandomList(){
    for(var i=0; i<numberOfVerbs; i++){
        everyNumberOfVerb.push(i);
    }
    everyNumberOfVerb = everyNumberOfVerb.sort(() => Math.random()-0.5);
}

// function buttonEffect(itsRight, button){
//     if(itsRight === true){
//         button.classList.add('rightAnswer');
//         setTimeout(function(){
//             button.classList.remove('rightAnswer');
//         },1000);
//         rightAnswersCounter = rightAnswersCounter + 1;
//     }else{
//         button.classList.add('wrongAnswer');
//         setTimeout(function(){
//             button.classList.remove('wrongAnswer');
//         },1000);
//     }
//     setTimeout(function(){
//         ponerVerbo();
//     },1000);
// }


// Accion del boton para las respuestas correctas e incorrectas validadas
function buttonEffect(itsRight, button) {
    if(itsRight === true){
        if(button == 1) first.classList.add("rightAnswer");
        if(button == 2) second.classList.add("rightAnswer");
        if(button == 3) third.classList.add("rightAnswer");
        if(button == 4) fourth.classList.add("rightAnswer");

        answerAudio.src = `audio/Good.mp3`;
        answerAudio.play();

        setTimeout(function(){
            first.classList.remove('rightAnswer');
            second.classList.remove('rightAnswer');
            third.classList.remove('rightAnswer');
            fourth.classList.remove('rightAnswer');

            answerAudio.stop();

        },1000);
        rightAnswersCounter = rightAnswersCounter + 1;
    }else{
        if(button == 1) first.classList.add('wrongAnswer');
        if(button == 2) second.classList.add('wrongAnswer');
        if(button == 3) third.classList.add('wrongAnswer');
        if(button == 4) fourth.classList.add('wrongAnswer');

        answerAudio.src = `audio/Laugh.mp3`;
        answerAudio.play();

        setTimeout(function(){
            first.classList.remove('wrongAnswer');
            second.classList.remove('wrongAnswer');
            third.classList.remove('wrongAnswer');
            fourth.classList.remove('wrongAnswer');

            answerAudio.stop()
        },1000);
    }
    setTimeout(function(){
        ponerVerbo();
    },2000);
}



// Eventos que se ejecutan al dar click en los botones
first.addEventListener('click', function(){
    buttonEffect(isItRight_(first.innerHTML), 1);
});

second.addEventListener('click', function(){
    buttonEffect(isItRight_(second.innerHTML), 2);
});

third.addEventListener('click', function(){
    buttonEffect(isItRight_(third.innerHTML), 3);
});

fourth.addEventListener('click', function(){
    buttonEffect(isItRight_(fourth.innerHTML), 4);
});

// Funcion para definir la respuesta correcta con un arreglo
function shuffleAnswers(array){
    let numberOfAnswersButtons = array.length;
    let randomIndex;

    while(numberOfAnswersButtons != 0){
        randomIndex = Math.floor(Math.random()*numberOfAnswersButtons);
        numberOfAnswersButtons--;

        [array[numberOfAnswersButtons], array[randomIndex]] = [array[randomIndex], array[numberOfAnswersButtons]];

    }
    return array;
}

// Funcion para validar respuesta correcta o incorrecta
const isItRight_ = (answer) => { return answer == rightAnswer ? true: false; }
    // function isItRight_(answer){
    //     return answer == rightAnswer?true:false;
    // }

// Generamos un verbo de manera aleatoria por toda la canditad de verbos agregados
function randomVerbo(notThisOne){
    thenOne = Math.floor(Math.random()*verbos.length);
    return thenOne == notThisOne ? randomVerbo(notThisOne) : thenOne;
}

// Agregamos los verbos, contador, audios e imagenes.
function ponerVerbo(){
    cronometro = -1;

    answerRoullete = shuffleAnswers(answerRoullete);
    let randomPosition = everyNumberOfVerb[lastPosition];
    let imgText = "<img src='img/"+verbs[randomPosition]+".jpg' height:'140px' width='100px'>";

    first.classList.add("btn","btn-outline-primary","btn-md");
    second.classList.add("btn","btn-outline-primary","btn-md");
    third.classList.add("btn","btn-outline-primary","btn-md");
    fourth.classList.add("btn","btn-outline-primary","btn-md");

    if(lastPosition >= 0){
        var just_position = lastPosition + 1;
        verbsCounter.innerHTML = ""+just_position+" / "+numberOfVerbs;
        allRightCounter.innerHTML = "Score: "+rightAnswersCounter;

        ShowVerb.innerHTML = verbs[randomPosition];
        ShowImage.innerHTML = imgText;

        ShowAudio.src = "audio/"+verbs[randomPosition]+".mp3";
        ShowAudio.play();


        first.innerHTML = !answerRoullete[0]?verbos[randomPosition]:verbos[randomVerbo(randomPosition)];
        second.innerHTML = !answerRoullete[1]?verbos[randomPosition]:verbos[randomVerbo(randomPosition)];
        third.innerHTML = !answerRoullete[2]?verbos[randomPosition]:verbos[randomVerbo(randomPosition)];
        fourth.innerHTML = !answerRoullete[3]?verbos[randomPosition]:verbos[randomVerbo(randomPosition)];
        
        rightAnswer = verbos[randomPosition];
        lastPosition = lastPosition-1;
    }else{
        verbsCounter.innerHTML = "0 / "+numberOfVerbs;
        allRightCounter.innerHTML = "Total score: "+rightAnswersCounter;
        ShowVerb.innerHTML = "Thx!";
        verbsContainer.innerHTML = "";
    }

}

// Creamos una funcion de cronometro para cada pregunta cada 5 segundos
const contarPregunta = () => {
    
    window.setInterval(() => {
        if(cronometro != 5){
            
            cronometro++;
            crono.innerHTML = cronometro;
        }else {
            cronometro = 0;
            ponerVerbo();
        }

    },1000); 
    contarPregunta.stop
}