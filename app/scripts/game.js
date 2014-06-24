var sourceDiv = null;
var questions = null;
var answer = [];
var sentence = null;
var words = null;
var wordsInOrder = null;
var questionCount = -1;

function shuffle(o){
    'use strict';
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x){}
    return o;
}

function displayWord(word){
    'use strict';
    var htmlString = '<div class="word col-xs-2 col-md-1" id="' + word + '">'  + word + '</div>';
    $('#words').append(htmlString);
}

function addLine(lineNumber){
    'use strict';
    var htmlString = '<div class="line col-xs-2 col-md-1" id="'  + lineNumber + '"></div>';
    $('#lines').append(htmlString);
}

function checkWin(){
    'use strict';
    if (answer.toString() === wordsInOrder.toString()){
        $('#winner').show();
        $('#words').hide();
    }
}

$.get( 'http://localhost/citewords/questions.php', function( data ) {
    'use strict';
    questions = shuffle(JSON.parse(data));
    startGame();
});

function startGame(){
    'use strict';

    $('#winner').hide();
    $('#words').show();
    $('#words').html(' ');
    $('#lines').html(' ');

    questionCount++;
    sentence = questions[questionCount];
    words = shuffle(sentence.split(' '));
    wordsInOrder = sentence.split(' ');
    answer = [];

    if (questionCount == questions.length - 1){
        questionCount = -1;
        questions = shuffle(questions);
    }

    words.forEach(function(word){
        displayWord(word);
    });

    for (var x=0; x<words.length; x++){
        addLine(x);
    }

    $( '.word.col-xs-2.col-md-1' ).draggable({
        drag: function( event ) {
            sourceDiv = event.target;
        },
        revert: 'invalid',
        zIndex: 350
    } );

    $('#area').droppable({
        drop: function(){},
        accept: '.word.col-xs-2.col-md-1'
    });

    $( '.line.col-xs-2.col-md-1' ).droppable({
        drop: function( event, ui ) {
            $(this).droppable('option', 'accept', ui.draggable);
            answer[parseInt(event.target.id)] = $(sourceDiv).html();
            checkWin();
        },
        out: function(){
            $(this).droppable('option', 'accept', '.word');
        },
        accept: '.word.col-xs-2.col-md-1'
    });
}
