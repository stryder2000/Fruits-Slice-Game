var playing=false;
var score;
var trialsLeft;
var step;
var action; //for time interval
var fruits = ["apple", "banana", "cherries", "grapes", "mango", "orange", "peach", "pear", "watermelon"];
$(function(){
    $("#button").click(function(){
        if(playing==true){
            location.reload();
        }else{
            playing=true;
            score=0;

            //show trials left box
            trialsLeft=3;
            $("#lives").show();
            addHearts();
            
            //change button to reset button
            $("#button").text("Reset Game");
            
            //create random fruit
            startAction();
            
            $("#gameOver").hide();
        }
    });
    
    function addHearts(){
        $("#lives").empty();
        for(i=0; i<trialsLeft; i++){
            $("#lives").append("<img src='images/heart.png' height='25px' width='25px' class='heart'></img>");
        }
    }
    
    function startAction(){
//        $("#fruitContainer").append("<img src='images/apple.png' class='fruit'></img>");
        $("#fruit1").show();
        chooseFruit();
        $("#fruit1").css({'left': Math.round(550*Math.random()), 'top': -80});
        //random position
        
        //generate a random step
        step = 1 + Math.round(5*Math.random());
        
        //Move fruit down by one step every 10ms
        action = setInterval(function(){
            $("#fruit1").css('top', $("#fruit1").position().top + step);
            
            if($("#fruit1").position().top > $("#fruitContainer").height()){
                if(trialsLeft>1){
                    //generate a fruit
                    $("#fruit1").show();
                    chooseFruit();
                    $("#fruit1").css({'left': Math.round(550*Math.random()), 'top': -80});
                    //random position

                    //generate a random step
                    step = 1 + Math.round(5*Math.random());
                    
                    --trialsLeft;
                    addHearts();
                }else{//game over
                    playing=false;
                    $("#button").text("Start game");
                    $("#lives").hide();
                    stopAction();
                    $("#gameOver").show();
                    $("#gameOver #final").html($("#score #scoreVal").text());
                    
                }
            }
        }, 10);
    }
    
    function chooseFruit(){
        $("#fruit1").attr('src', 'images/' + fruits[Math.round(9*Math.random())] + '.png');
    }
    
    function stopAction(){
        clearInterval(action);
        $("#fruit1").hide();
    }
    
    $("#fruit1").mouseover(function(){
        score++;
        $("#scoreVal").html(score);
        $("#sliceSound")[0].play();
        clearInterval(action);
        
        $("#fruit1").hide("explode",500);
        setTimeout(startAction, 500);
    });
    
    
});