var sourceDiv = null;
var questions = null;
var answer = [];
var sentence = null;
var words = null;
var wordsInOrder = null;

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
        alert ('Winner');
    }
}

function startGame(){
    'use strict';
    sentence = questions[0];
    words = shuffle(sentence.split(' '));
    wordsInOrder = sentence.split(' ');

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

$.get( 'http://localhost/citewords/questions.php', function( data ) {
    'use strict';
    questions = shuffle(JSON.parse(data));
    startGame();
});