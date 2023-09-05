var quizContainer = document.getElementsByClassName('quizcontainer')[0];
var startbutton = document.getElementById('startButton');
var nextbutton = document.getElementById('next');
var submitbutton = document.getElementById('submit');
var dashboard = document.getElementsByClassName('dashboard')[0];
let questionList =  document.getElementById('questionList');
let OptionsList =  document.getElementById('OptionsList')

let currentIndex = 0;
let questionsListArray = [];
let score = 0;
let clickedValue;

quizContainer.style.display = 'none';



/* 
this methiod will callwhenver u will click on start button
*/
startbutton.addEventListener('click', function(e){
    dashboard.style.display = 'none';
    quizContainer.style.display = 'block';
    getQuestionsList()
})


// get data from api question
async function getQuestionsList(){
    
    try {
        let questionsList = await fetch('https://mocki.io/v1/330d1d17-148e-483b-b3b1-b26a28d48878');
        var questionListData =  await questionsList.json();
        questionListData.questions.length = 12;
        console.log(questionListData);
        // var c = questionListData.questions.length
        questionsListArray.push( ...questionListData.questions);
        getQuestion()
   
    } catch(err){
        console.log(err);
    }
}


// get current question
function getQuestion(){
    const currentQuestionNode = questionsListArray[currentIndex];
    let currentQuestion = currentQuestionNode?.question;
    questionList.textContent = currentQuestion;

    OptionsList.innerHTML ='';
    let correctAnswer = currentQuestionNode.answers[currentQuestionNode.correctIndex];
    currentQuestionNode.answers.forEach(data =>{
        console.log("data",data)
        var div = document.createElement('div');
        div.innerHTML = data;
        div.style.cursor = 'pointer';
        div.classList = 'button';
        div.addEventListener('click',function(e){
            e.target.classList.toggle('selected');
            if(e.target.innerHTML == correctAnswer){
                score++
            }
            // if(!e.target.classList.contains('ccc')){
            //     e.target.classList.add('ccc')
            // } else {
            //     e.target.classList.remove('ccc')
            // }

        })
        OptionsList.appendChild(div);
    })
}


nextbutton.addEventListener('click', function(e){
    if(currentIndex < questionsListArray.length-1){
        currentIndex++;
        getQuestion()

      console.log("clickedValue",clickedValue)
    }else if(currentIndex == questionsListArray.length-1){
    // nextbutton.textContent ="submit"
    questionList.textContent = `your score is ${score} out of ${questionsListArray.length}`;
    OptionsList.style.display ='none'
    nextbutton.style.display = 'none'
    }
});

