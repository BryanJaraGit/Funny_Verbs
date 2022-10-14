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
const conta = document.getElementById('cronometro'); 

const numberOfVerbs = verbs.length;

let answerRoullete = [0,1,1,1];
let everyNumberOfVerb = [];
let rightAnswer;
let rightAnswersCounter = 0;
let cronometro = 0;

next.addEventListener('click', function(){
    ponerVerbo();
    next.style.display = 'none';
    contarPregunta();
    // ShowVerb.innerHTML = "Hola";
});

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
    },1000);
}




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

function isItRight_(answer){
    return answer == rightAnswer?true:false;
}

function randomVerbo(notThisOne){
    thenOne = Math.floor(Math.random()*verbos.length);
    return thenOne == notThisOne ? randomVerbo(notThisOne) : thenOne;
}

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
        allRightCounter.innerHTML = "Right answer: "+rightAnswersCounter;

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
        allRightCounter.innerHTML = "Right answers: "+rightAnswersCounter;
        ShowVerb.innerHTML = "Thx!";
        verbsContainer.innerHTML = "";
    }

}

const contarPregunta = () => {
    
    window.setInterval(() =>{
        if(cronometro != 5){
            cronometro++;
            conta.innerHTML = cronometro;
        }else {
            cronometro = 0;
            ponerVerbo();
        }


    },1000); 
}