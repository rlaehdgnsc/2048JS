var table = document.getElementById('table2048');
var button = document.getElementById('make');
var size = document.getElementById('size');
var score = document.getElementById('score');
var table_data = [];
var drag_flag = false;
var drag_move_flag = false;
var coordinate_start = [];
var coordinate_end = [];
var board = [];

function clear(){
    table.innerHTML = '';
    table_data = [];
    board = [];
    drag_flag = false;
    drag_move_flag = false;
    score.textContent = 0;
}
function init(){
    clear();
    let frag = document.createDocumentFragment();
    for(let i=1;i<=size.value;i++){
        board.push(i);
    }
    //console.log('board : ',board);
    board.forEach(()=>{
        let row_data = [];
        let tr = document.createElement('tr');
        table_data.push(row_data);

        board.forEach(()=>{
            row_data.push(0);
            let td = document.createElement('td');
            tr.appendChild(td);
        });
        frag.appendChild(tr);
    });
    table.appendChild(frag);
    //console.log('table_data :',table_data);
}
function randomCreate(){
    var bin = [];
    table_data.forEach((row, i)=>{
        row.forEach((col, j)=>{
            if(!col){
                bin.push([i,j]);
            }
        });
    });
    //console.log('bin : ',bin);
    if(bin.length === 0){
        alert('You Loose!');
        alert(`Point is ${score.textContent}`);
        clear();
        return;
    }
    //console.log('score is : ',score.textContent);
    let radn = bin[Math.floor(Math.random()*bin.length)];
    //console.log('radn : ',radn);
    table_data[radn[0]][radn[1]] = 2;
    draw();
}
function draw(){
    table_data.forEach((row, i)=>{
        row.forEach((col, j)=>{
            if(col){
                table.children[i].children[j].textContent = col;
            }else{
                table.children[i].children[j].textContent = '';
            }
        })
    });
}
function getAngle(start, end) {
	var rad = Math.atan2(end[1]-start[1],end[0]-start[0]);
	return (rad*180)/Math.PI ;
}

button.addEventListener('click',()=>{
    if(size.value>=4){
        init();
        randomCreate();
    }else{
        alert('more than 3!');
    }
});

window.addEventListener('mousedown',(e)=>{
    if(board.length !=0){
        drag_flag = true;
    }
    coordinate_start = [e.clientX,e.clientY];
});
window.addEventListener('mouseup',(e)=>{
    if(!drag_move_flag||!drag_flag){
        return;
    }
    let direction = null;
    coordinate_end = [e.clientX,e.clientY];
    let ang = getAngle(coordinate_end,coordinate_start);
    
    if(ang>=45&& ang<=135){ 
        direction = 'up';
    }else if(ang<45&&ang>=-45){ 
        direction = 'left';
    }else if(ang<-45&&ang>=-135){ 
        direction = 'down';
    }else{ 
        direction = 'right';
    }
    //console.log(ang);
    let temp = [];
    for(let i=0;i<board.length;i++){
        temp.push([]);
    }

    switch(direction){
        case 'up':
            table_data.forEach((row,i)=>{
                row.forEach((col,j)=>{
                    if(col){
                        if(temp[j][temp[j].length-1]&&temp[j][temp[j].length-1] === col){
                            temp[j][temp[j].length-1] *=2;
                            let cur_point = parseInt(score.textContent,10);;
                            score.textContent = cur_point+temp[j][temp[j].length-1];
                        }else{
                            temp[j].push(col);
                        }
                    }
                });
            });
            table_data.forEach((row,i)=>{
                row.forEach((col,j)=>{
                    table_data[j][i] = temp[i][j]||0;
                });
            });

            break;
        case 'left':
            table_data.forEach((row,i)=>{
                row.forEach((col,j)=>{
                    if(col){
                        if(temp[i][temp[i].length-1]&&temp[i][temp[i].length-1] === col){
                            temp[i][temp[i].length-1] *=2;
                            let cur_point = parseInt(score.textContent,10);
                            score.textContent = cur_point+temp[i][temp[i].length-1];
                        }else{
                            temp[i].push(col);
                        }
                    }
                });
            });
            table_data.forEach((row,i)=>{
                row.forEach((col,j)=>{
                    table_data[i][j] = temp[i][j]||0;
                });
            });
            break;
        case 'down':
            table_data.forEach((row,i)=>{
                row.forEach((col,j)=>{
                    if(col){
                        if(temp[j][0]&&temp[j][0] === col){
                            temp[j][0] *=2;
                            let cur_point = parseInt(score.textContent,10);
                            score.textContent = cur_point+temp[j][0];
                        }else{
                            temp[j].unshift(col);
                        }
                    }
                });
            });
            table_data.forEach((row,i)=>{
                row.forEach((col,j)=>{
                    table_data[board.length-1-j][i] = temp[i][j]||0;
                });
            });
            break;
        case 'right':
            table_data.forEach((row,i)=>{
                row.forEach((col,j)=>{
                    if(col){
                        if(temp[i][0]&&temp[i][0]=== col){
                            temp[i][0] *=2;
                            let cur_point = parseInt(score.textContent,10);;
                            score.textContent = cur_point+temp[i][0];
                        }else{
                            temp[i].unshift(col);
                        }
                    }
                });
            });
            table_data.forEach((row,i)=>{
                row.forEach((col,j)=>{
                    table_data[i][board.length-1-j] = temp[i][j]||0;
                });
            });
            break;
    }

    drag_flag = false;
    drag_move_flag = false;
    randomCreate();
});
window.addEventListener('mousemove',(e)=>{
    if(!drag_flag){
        return;
    } 
    drag_move_flag = true;
});