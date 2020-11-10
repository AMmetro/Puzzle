
let field=document.querySelector(".field")
let cellSize=100;
var diffTimeMin=0;
var diffTimeSec=0;
const empty={value:0, top:0, left:0 }
cells=[];
cells.push(empty);
let movePlace=document.querySelector('.move')
let amountMove=0;


//-------------save data to LocalStorage------------
let save=document.querySelector(".save")
    save.addEventListener("click",()=>{
        localStorage.setItem(cells, JSON.stringify(cells));
    })



//------------Start or Pause game---------------
let pauseButton=document.querySelector(".pause")
pauseButton.addEventListener("click",()=>pauseGame())

   var pause;
function pauseGame() {
    pause= pauseButton.innerHTML=="Continue"?
             pauseButton.innerHTML="Pause":
             pauseButton.innerHTML="Continue"; 
    pauseButton.innerHTML=pause;
};

//----------------game timer-----------------------
     let timer = document.querySelector(".timer")
     let diffTime = 0;
     function increase (){  
        if (pauseButton.innerHTML=="Pause") {
            diffTime += 1      }
      
        timer.innerHTML=`Time: ${diffTime}`;
        if (diffTime>60){          
            diffTimeMin=Math.round(diffTime / 60);
            diffTimeSec=diffTime % 60;
            timer.innerHTML=`Time ${diffTimeMin}:${diffTimeSec}cек`
                    }  
         }      
             setInterval(()=>increase(),1000)    
    // ------------------ reload game------------------------

     reloadButton=document.querySelector(".reload");
     reloadButton.addEventListener('click', ()=>{
     location.reload()
         } )
   
    // ------------move tag by click-------------------
  
    function move(index){
    amountMove +=1;
    movePlace.innerHTML=`Moves:${amountMove}`;

    const cell=cells[index]
    leftDiff=Math.abs(empty.left - cell.left);
    topDiff=Math.abs(empty.top - cell.top);
    if ( leftDiff + topDiff > 1 ) {
        return
    }
   console.log(cells)
   console.log(cell)
   
    cell.payLoad.style.left=`${empty.left*cellSize}px`
    cell.payLoad.style.top=`${empty.top*cellSize}px`
    const emptyLeft=empty.left
    const emptyTop=empty.top
    empty.left=cell.left
    empty.top=cell.top
    cell.left=emptyLeft
    cell.top=emptyTop  
      chesk (); 
}

// ---------chesk if game is over-----------
  function chesk () {
  isFinished=cells.every(elem=> {
     return  elem.value==elem.top*4+elem.left
    })
    gameTime=timer.innerHTML
    if (isFinished) {
    alert(`Ура! Вы решили головоломку за ${gameTime} и ${amountMove}ходов`)
                  }
                   }

   // make random array
   const numbers = [...Array(15).keys()]
    .sort (()=>Math.random()-0.5) 
   
   
   // make array of tag numbers and assign event
   for (i=1; i<=15; i++) {
        let cell = document.createElement("div")
        const cellValue=numbers[i - 1]+1;
        cell.className="cell"
        cell.innerHTML=cellValue;
        cell.id=i;
               
        const left=i % 4;
        const top=(i-left) / 4;

        cells.push({
                value:cellValue,
                top:top,
                left:left,
                payLoad:cell});
                

        cell.style.left=`${left*cellSize}px`
        cell.style.top=`${top*cellSize}px`

        field.append(cell)
            cell.addEventListener("click",()=>{
             move(cell.id)
           } )
                             }

//--------- load data from LocalStorage------------
//    cells=JSON.parse(localStorage.getItem(cells));
//    console.log(cells)

                  




