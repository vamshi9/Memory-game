var interval,time=0,started = false,numCompleted=0,ready = true;
initialSetup();

function randomAnswers(){
    var arr = [1,1,2,2,3,3,4,4,5];
    //randomizing array
    arr.sort(function(a,b){
        return .5 - Math.random();
    });
    return arr;
}

function startTime(){
     if(started == false){
          interval = setInterval(function(){
            time++;
            document.getElementById('timer').innerHTML ='Time elapsed : ' +  time;
          },1000);
          started = true;
     }
}
var clickedArray=[];
function reveal(cell){
    cell.style.background = 'red';
    cell.innerHTML = cell.value;
    cell.clicked = true;
}

function hide(cell){
    cell.style.background = 'blue';
    cell.innerHTML = "";
    cell.clicked = false;
}

function complete(cell){
     numCompleted++;
     cell.completed = true;
     cell.style.background = 'purple';
}

function initialSetup(){
    var grid = document.getElementsByTagName('td');
    var arr = randomAnswers();
    for(var i=0;i<grid.length;i++){
          var cell = grid[i];
          cell.completed = false;
          cell.clicked = false;
          cell.value = arr[i];
          cell.addEventListener('mouseenter',function(){
                if(this.completed ==false && this.clicked == false){
                     this.style.background = 'orange';
                }
          });
          cell.addEventListener('mouseleave',function(){
                if(this.completed ==false && this.clicked == false){
                     this.style.background = 'blue';
                }
          });
          startTime();
          if(ready == false){
            return;
          }
          cell.addEventListener('click',function(){
                if(this.completed == false && this.clicked == false){
                     clickedArray.push(this);
                     reveal(this);
                }
                if(clickedArray.length ==2){
                    if(clickedArray[0].value == clickedArray[1].value){
                        //if matching is found
                        complete(clickedArray[0]);
                        complete(clickedArray[1]);
                        clickedArray = [];
                        if(numCompleted == 8){
                            alert('You won in ' + time + ' seconds');
                            clearInterval(interval);
                        }
                    }else{
                        //if matching pair is not found
                        document.getElementById('gridTable').style.border = '5px solid red';
                        setTimeout(function(){
                            hide(clickedArray[0]);
                            hide(clickedArray[1]);
                            clickedArray = [];
                            ready = true;
                            document.getElementById('gridTable').style.border = '5px solid black';
                        },500);
                    }
                }
          });


    }
    document.getElementById('restart').addEventListener('click',function(){
            location.reload();
    })

}
