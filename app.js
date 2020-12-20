let array = []; 
let time = 10; 
let running = false; 
let inFunction = true;
let size = document.getElementById("size").value;
let algorithmChosen = document.getElementById("selection");
const size_div = document.getElementById("size");
const generate_div = document.getElementById("generate");
const sort_div = document.getElementById("sort");
const selection_div = document.getElementsByClassName("selection");
const speed_div = document.getElementById("speed");



main(); 

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }
  


function configureArrays(){
    for(x = 0; x < array.length; x++){
        document.getElementsByClassName("rectangle")[0].remove();
    }
    array = []; 
    for(i = 0; i < size_div.value; i++){
        let elem = document.createElement('div');
        elem.classList.add('rectangle'); 
        document.getElementById("arrays").appendChild(elem); 
        array.push(elem);
        let randomHeight = Math.random() * 98 * (10-document.getElementById("sortedness").value)/10
                         + document.getElementById("sortedness").value/10 * 98 * (i / (size_div.value-1)) + 3;
        array[i].style.height =  randomHeight + "%"; 
        array[i].style.backgroundColor = "white";
    }
   
    size = size_div.value; 
    for(i = 0; i < size; i++){
        let x = 55/size ;
        document.getElementsByClassName("rectangle")[i].style.width = x + "%"; 
    }
}

function changeAlgorithm(algorithm){
    algorithmChosen.style.color = "black";
    document.getElementById(algorithm).style.color = "blue"; 
    algorithmChosen = document.getElementById(algorithm); 
}

function swapElements(a, b){
    let tmp = array[a].style.height;
    array[a].style.height = array[b].style.height;
    array[b].style.height = tmp;
    array[a].style.backgroundColor = "blue"; 
    }

function selectionSort(){
    for(let x = 0; x < size; x++){
        array[x].style.backgroundColor = "white";
    }

    var i = 0;
    var j = 0;
    var minIndex = j; 
    array[minIndex].style.backgroundColor = "green";

    var id = setInterval(selectionInner, time);
    function selectionInner(){
        if(running == false || i == size && j == size){
            running = false; 
            clearInterval(id); 
        }
        else{
            if(j != size){
                array[j].style.backgroundColor = "red";
                if(j!=i && j-1 !=minIndex){
                    array[j-1].style.backgroundColor = "white";
                }
                if (parseFloat(array[minIndex].style.height) > parseFloat(array[j].style.height)){
                    array[minIndex].style.backgroundColor = "white";
                    minIndex = j;
                    array[minIndex].style.backgroundColor = "green";
                }
                j++; 
            }
            else{
                array[j-1].style.backgroundColor = "white";
                array[minIndex].style.backgroundColor = "white";
                swapElements(i, minIndex);
                i++;
                j = i;
                minIndex = j; 
            }
        }
    }
}

function insertionSort(){
    for(x = 0; x < size; x++){
        array[x].style.backgroundColor = "white";
    }
    var i = 0;
    var next = i; 
    array[next].style.backgroundColor = "red"; 
    var id = setInterval(insertionInner, time);
    function insertionInner(){
        if(running == false || i == size){
            running = false; 
            clearInterval(id); 
        }
        else{
            if(next == 0 || parseFloat(array[next].style.height) >= parseFloat(array[next-1].style.height) ){
                array[next].style.backgroundColor = "blue"; 
                array[i].style.backgroundColor = "blue";
                i++; 
                next = i; 
                array[next].style.backgroundColor = "red"; 
            }
            else{
                var temp = array[next].style.height; 
                array[next].style.height = array[next-1].style.height;
                array[next-1].style.height = temp;  
                array[next-1].style.backgroundColor = "red"; 
                array[next].style.backgroundColor = "blue"; 
                next = next - 1;
            }
        }
    }
}


function mergeSort() {
    for(x = 0; x < size; x++){
        array[x].style.backgroundColor = "white";
    }
    var arraySize = Math.pow(2,Math.ceil(Math.log(size)/Math.log(2))); 
    var mergeArray = []; 
    var actualArray = [size];
    for(let x = 0; x < arraySize; x++){
        mergeArray.push(1); 
    }

    for(let x = 0; x < Math.ceil(Math.log(size)/Math.log(2)); x++){
        for(let y = 0; y < actualArray.length; y += 2){
            var half = Math.floor(actualArray[y]/2);
            actualArray[y] = actualArray[y] - half;
            actualArray.splice(y+1, 0, half); 
        }
    }
    var firstIndex = 1; 
    var secondIndex = 0;
    var thirdIndex = 0;
    var isMerging = false; 
    var id = setInterval(mergeInner, time);
    function mergeInner(){
        if(running == false || (mergeArray.length == 1 && isMerging == false)){
            running = false; 
            clearInterval(id);
        }
        else{
            if(isMerging == false){
                array[firstIndex-1].style.backgroundColor = "white";
                var index = 0;
                firstIndex = 0; 
                while(mergeArray[index] != mergeArray[index+1]){
                    firstIndex += actualArray[index]; 
                    index++; 
                }
                secondIndex = firstIndex + actualArray[index]; 
                thirdIndex = secondIndex + actualArray[index+1]; 
                mergeArray[index] = mergeArray[index] + mergeArray[index+1]; 
                mergeArray.splice(index+1, 1);
                actualArray[index] = actualArray[index] + actualArray[index+1]; 
                actualArray.splice(index+1, 1);
                isMerging = true; 
            }
            else{        
                if(secondIndex != firstIndex && thirdIndex != secondIndex){
                    if(parseFloat(array[secondIndex].style.height) < parseFloat(array[firstIndex].style.height)){
                        let temp = array[firstIndex].style.height; 
                        array[firstIndex].style.height = array[secondIndex].style.height;
                        for(x = firstIndex+1; x < secondIndex+1; x++){
                            let temp2 = array[x].style.height; 
                            array[x].style.height = temp; 
                            temp = temp2; 
                        }
                        firstIndex++;
                        secondIndex++;
                    } else{
                        firstIndex++; 
                    }
                }
                else if(secondIndex != firstIndex){
                    firstIndex++;
                }
                else if(thirdIndex != secondIndex){
                    firstIndex++;
                    secondIndex++;
                }
                else{
                    isMerging = false; 
                }
                if(mergeArray.length!=1){
                    if(firstIndex-1 != 0){
                        array[firstIndex-2].style.backgroundColor = "white"; 
                    }
                    array[firstIndex-1].style.backgroundColor = "red";
                }
                else{
                    array[firstIndex-1].style.backgroundColor = "blue";
                }
            }
        }
    }   
}  

function quickSort(){
    for(x = 0; x < size; x++){
        array[x].style.backgroundColor = "white";
    }
    var stack = [];
    stack.push(0);
    stack.push(size);

    var endIndex;
    var frontIndex; 
    var pivotIndex; 
    var pivotValue;
    var i; 
    var isPartitioning = false; 
    var id = setInterval(quickInner, time);
    function quickInner(){
        if((stack.length == 0 && isPartitioning == false) || running == false ){
            clearInterval(id);
            running = false;
        }
        else{
            if(isPartitioning == false){
               
                endIndex = stack.pop();
                frontIndex = stack.pop(); 
                pivotIndex = frontIndex + 1; 
                pivotValue = parseFloat(array[pivotIndex-1].style.height); 
                array[pivotIndex-1].style.backgroundColor = "red";
                i = frontIndex + 1; 
                isPartitioning = true; 
            }
            
            if(i != endIndex){
                if(i != frontIndex + 1){
                    array[i-1].style.backgroundColor = "white"; 
                }
                array[i].style.backgroundColor = "green"; 
                if(parseFloat(array[i].style.height) < pivotValue){
                    temp = array[i].style.height;
                    array[i].style.height = array[pivotIndex].style.height; 
                      array[pivotIndex].style.height = temp; 
                    pivotIndex++;
                }
                i++; 
            }
            else{
                array[i-1].style.backgroundColor = "white"; 
                temp = array[pivotIndex-1].style.height;
                array[pivotIndex-1].style.height = array[frontIndex].style.height; 
                array[frontIndex].style.height = temp; 
                array[frontIndex].style.backgroundColor = "white";
                array[pivotIndex-1].style.backgroundColor = "blue";
                if(pivotIndex + 1 < endIndex){
                    stack.push(pivotIndex);
                    stack.push(endIndex); 
                }
                else{
                    if(pivotIndex < endIndex){
                        array[pivotIndex].style.backgroundColor = "blue";
                    }
                }
                if(pivotIndex - 2 > frontIndex){
                    stack.push(frontIndex);
                    stack.push(pivotIndex-1); 
                }
                else{
                    if(pivotIndex -1 > frontIndex){
                        array[pivotIndex-2].style.backgroundColor = "blue";
                    }
                }
                isPartitioning = false; 
            }    
        }
    }
}

function heapSort(){
    for(x = 0; x < size; x++){
        array[x].style.backgroundColor = "white";
    }

    var validBinaryHeap = false; 
    
    //represents the node that is being heapified 
    //Only need to heapify nodes that are parents. Start at the last parent node and 
    //heapify in reverse order. 
    var heapifyIndex = Math.floor((size-2)/2); 
    var currentIndex = heapifyIndex; 

    //represents number of values that still need to be removed from binary heap
    //during the heap sort process
    var arraysLeft = size;

    var id = setInterval(heapInner, time);
    function heapInner(){
        if(running == false ){
            clearInterval(id);
            running = false;
        }
        else{
            //heapify process
            if(validBinaryHeap == false){
                if(heapifyIndex == -1){
                    validBinaryHeap = true;
                    currentIndex = 0; 
                }
                else if(2*currentIndex+1 > size -1){
                    array[currentIndex].style.backgroundColor = "white";
                    heapifyIndex--;
                    currentIndex = heapifyIndex; 
                    if(heapifyIndex != -1){
                        array[currentIndex].style.backgroundColor = "red";
                    }  
                }
                //one child
                else if(2*currentIndex+2 > size -1){
                    if(parseFloat(array[currentIndex].style.height) >= parseFloat(array[2*currentIndex+1].style.height)){
                        array[currentIndex].style.backgroundColor = "white";
                        heapifyIndex--;
                        currentIndex = heapifyIndex;
                        if(heapifyIndex != -1){
                            array[currentIndex].style.backgroundColor = "red";
                        }
                    }
                    else{
                        //swap parent with left child 
                        let temp = array[currentIndex].style.height;
                        array[currentIndex].style.height = array[2*currentIndex+1].style.height;
                        array[2*currentIndex+1].style.height = temp; 
                        array[currentIndex].style.backgroundColor = "white";
                        currentIndex = 2*currentIndex+1; 
                        array[currentIndex].style.backgroundColor = "red";
                    }
                }
                //two children
                else{
                    if(parseFloat(array[2*currentIndex+1].style.height) >= parseFloat(array[2*currentIndex+2].style.height)){
                        if(parseFloat(array[currentIndex].style.height) >= parseFloat(array[2*currentIndex+1].style.height)){
                            array[currentIndex].style.backgroundColor = "white";
                            heapifyIndex--;
                            currentIndex = heapifyIndex;
                            if(heapifyIndex != -1){
                                array[currentIndex].style.backgroundColor = "red";
                            }
                        }
                        else{
                            let temp = array[currentIndex].style.height;
                            array[currentIndex].style.height = array[2*currentIndex+1].style.height;
                            array[2*currentIndex+1].style.height = temp; 
                            array[currentIndex].style.backgroundColor = "white";
                            currentIndex = 2*currentIndex+1; 
                            array[currentIndex].style.backgroundColor = "red";
                        }
                    }
                    else{
                        if(parseFloat(array[currentIndex].style.height) >= parseFloat(array[2*currentIndex+2].style.height)){
                            array[currentIndex].style.backgroundColor = "white";
                            heapifyIndex--;
                            currentIndex = heapifyIndex;
                            if(heapifyIndex != -1){
                                array[currentIndex].style.backgroundColor = "red";
                            }
                        }
                        else{
                            let temp = array[currentIndex].style.height;
                            array[currentIndex].style.height = array[2*currentIndex+2].style.height;
                            array[2*currentIndex+2].style.height = temp; 
                            array[currentIndex].style.backgroundColor = "white";
                            currentIndex = 2*currentIndex+2; 
                            array[currentIndex].style.backgroundColor = "red";
                        }
                    }
                }
            }
            //heapsort
            else{
                if(arraysLeft == 0){
                    running = false;
                }
                else{
                    if(2*currentIndex+1 < arraysLeft && parseFloat(array[currentIndex].style.height) < parseFloat(array[2*currentIndex+1].style.height)
                        || 2*currentIndex+2 < arraysLeft && parseFloat(array[currentIndex].style.height) < parseFloat(array[2*currentIndex+2].style.height)){
                        if(2*currentIndex+2 < arraysLeft){
                            if(parseFloat(array[2*currentIndex+1].style.height) > parseFloat(array[2*currentIndex+2].style.height)){
                                let temp = array[currentIndex].style.height;
                                array[currentIndex].style.height = array[2*currentIndex+1].style.height;
                                array[2*currentIndex+1].style.height = temp; 
                                array[currentIndex].style.backgroundColor = "white";
                                currentIndex = 2*currentIndex+1;       
                                array[currentIndex].style.backgroundColor = "green";      
                            }
                            else{
                                let temp = array[currentIndex].style.height;
                                array[currentIndex].style.height = array[2*currentIndex+2].style.height;
                                array[2*currentIndex+2].style.height = temp; 
                                array[currentIndex].style.backgroundColor = "white";
                                currentIndex = 2*currentIndex+2; 
                                array[currentIndex].style.backgroundColor = "green";
                            }
                        }
                        else{
                            let temp = array[currentIndex].style.height;
                            array[currentIndex].style.height = array[2*currentIndex+1].style.height;
                            array[2*currentIndex+1].style.height = temp; 
                            array[currentIndex].style.backgroundColor = "white";
                            currentIndex = 2*currentIndex+1;    
                            array[currentIndex].style.backgroundColor = "green";
                        }
                    }
                    else{
                        array[currentIndex].style.backgroundColor = "white";
                        currentIndex = 0; 
                        arraysLeft--; 
                        let temp = array[currentIndex].style.height; 
                        array[currentIndex].style.height = array[arraysLeft].style.height;  
                        array[arraysLeft].style.height = temp; 
                        array[currentIndex].style.backgroundColor = "green";
                        array[arraysLeft].style.backgroundColor = "blue";
                    }
                }
            }
        }
    }
}


function shellSort(){
    for(x = 0; x < size; x++){
        array[x].style.backgroundColor = "white";
    }
    
    //shell short uses Knuth intervals 
    let interval = 1;
    while(interval*3 + 1 <= Math.floor(size/3)){
        interval = interval*3 + 1; 
    }

    let sequence = 0; 
    let currentArray = 0;
    let index = 0;  

    var id = setInterval(shellInner, time);
    function shellInner(){
        if(running == false || interval == 0){
            clearInterval(id);
            running = false;
        }
        else{
            if((index - interval < 0) || parseFloat(array[index].style.height) >= parseFloat(array[index-interval].style.height)){
                array[index].style.backgroundColor = "green"; 
                if(interval == 1){
                    array[index].style.backgroundColor = "blue";
                }
                currentArray = currentArray + interval;
                index = currentArray; 
                if(index < size){
                    array[index].style.backgroundColor = "red"; 
                }
            }
            else{
                let temp = array[index].style.height;
                array[index].style.height = array[index-interval].style.height;
                array[index-interval].style.height = temp; 
                array[index].style.backgroundColor = "green"; 
                if(interval == 1){
                    array[index].style.backgroundColor = "blue";
                } 
                index = index - interval; 
                array[index].style.backgroundColor = "red"; 
            }
            if(currentArray >= size){
                if(interval != 1){
                    for(x = sequence; x < size; x+=interval){
                        array[x].style.backgroundColor = "white"; 
                    } 
                }
                sequence++;
                currentArray = sequence; 
                index = currentArray;
                if(interval != 1){
                    for(x = sequence; x < size; x+=interval){
                        array[x].style.backgroundColor = "green"; 
                    } 
                    array[index].style.backgroundColor = "red"; 
                }
            }
            if(sequence == interval){
                if(interval != 1){
                    for(x = sequence; x < size; x+=interval){
                        array[x].style.backgroundColor = "white"; 
                    }
                }
                interval = (interval - 1) / 3; 
                sequence = 0;
                currentArray = 0;
                index = 0; 
                if(interval > 1){
                    for(x = sequence; x < size; x+=interval){
                        array[x].style.backgroundColor = "green"; 
                    } 
                    array[index].style.backgroundColor = "red"; 
                }
            } 
        }
    }
}

function sort(){
    switch(algorithmChosen.id){
        case "selection":
            selectionSort();
            break;
        case "insertion":
            insertionSort();
            break;
        case "merge": 
            mergeSort();
            break;
        case "quick":
            quickSort();
            break;
        case "heap":
            heapSort();
            break;
        case "shell":
            shellSort();
            break;
    }
}

function main(){
    
    algorithmChosen.style.color = "blue";
    configureArrays(); 
    generate_div.addEventListener('click', function(){
        running = false; 
        configureArrays(); 
    })
    sort_div.addEventListener('click', function(){
        if(running != true){
            running = true; 
            sort(); 
        }
    })
    speed_div.addEventListener('click', function(){
        var x = Math.pow(8, speed_div.value / 10); 
        time = 10 / (x / 8);  
    })
}


