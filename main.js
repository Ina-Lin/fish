/**
 * Created by linwanyu on 16/10/16.
 */
var fish = ["1:紅紫鸚哥魚 ","2:孟加拉笛鯛 ", "3:鸚哥魚 ","4:大甲鰺 ", "5:珊瑚和藻類 ","6:拖爾逆鉤鰺 ", "7:點籃子魚 ","8:條紋路鱸 ", "9:大法螺 ","10:龍王鯛 ", "11:棘冠海星 ","12:白結螺 "];
var alive = [true,true,true,true,true,true,true,true,true,true,true,true];
var mid = [109,295,658,423,668,582,233,178,54,611,438,322,397,598,418,462,223,419,579,154,252,543,139,504];
var c=document.getElementById("canvas");
var ctx=c.getContext("2d");
var img = new Image();
img.src="ecosys.png";
img.onload=picture;
var extinct = new Object();
var exist = {};
initialization();

function initialization(){
    exist = {
        1:"紅紫鸚哥魚 ",
        2:"孟加拉笛鯛 ",
        3:"鸚哥魚 ",
        4:"大甲鰺 ",
        5:"珊瑚和藻類 ",
        6:"拖爾逆鉤鰺 ",
        7:"點籃子魚 ",
        8:"條紋路鱸 ",
        9:"大法螺 ",
        10:"龍王鯛 ",
        11:"棘冠海星 ",
        12:"白結螺 "
    }
}

function picture(){
    var w = this.width;
    var h = this.height;
    c.width = w;
    c.height = h;
    ctx.drawImage(img, 0, 0, w, h);
}

function change(e){
    var x = e.clientX;
    var y = e.clientY;
    for(var i=0;i<mid.length;i=i+2) {
        if ((x <= mid[i] + 20) & (x >= mid[i] - 20) & (y >= mid[i + 1] - 20) & (y <= mid[i + 1] + 20)) {
            if(alive[i / 2]) {
                alive[i / 2] = false;
                extinct[(i/2)+1] = exist[(i/2)+1];
                delete exist[(i/2)+1];
                ctx.strokeStyle = "red";
                show(mid[i] - 18, mid[i + 1] - 82);
            }
            else{
                alive[i / 2] = true;
                exist[(i/2)+1] = extinct[(i/2)+1];
                delete extinct[(i/2)+1];
                ctx.strokeStyle = "white";
                show(mid[i] - 18, mid[i + 1] - 82);
            }
            break;
        }
    }
    document.getElementById("exist").innerHTML = string(exist);
    document.getElementById("extinct").innerHTML = string(extinct);
}

function getMouseXY(e) {
    var x = e.clientX;
    var y = e.clientY;
    for(var i=0;i<mid.length;i=i+2){
        if ((x <= mid[i] + 20) & (x >= mid[i] - 20) & (y >= mid[i + 1] - 20) & (y <= mid[i + 1] + 20)) {
            document.getElementById("name").innerHTML = fish[i/2];
            if(alive[i/2]){
                ctx.strokeStyle = "white";
                show(mid[i] - 18, mid[i + 1] - 82);
            }
            else {
                ctx.strokeStyle = "red";
                show(mid[i] - 18, mid[i + 1] - 82);
            }
           break;
        }
        else {
            document.getElementById("name").innerHTML = null;
            ctx.drawImage(img, 0, 0, c.width, c.height);
            for(var j=0;j<mid.length;j=j+2){
                if (alive[j / 2] == false) {
                    ctx.strokeStyle = "red";
                    show(mid[j] - 18, mid[j + 1] - 82);
                }
            }
        }
    }
}

function reset(){
    initialization();
    extinct = new Object();
    document.getElementById("exist").innerHTML = string(exist);
    document.getElementById("extinct").innerHTML = null;
    for(var i=0;i<alive.length;i++){
        alive[i]=true;
    }
    ctx.drawImage(img, 0, 0, c.width, c.height);
}



function string(obj){
    var content = "";
    var i=0;
    for(var key in obj){
        i++;
        content += key+":"+obj[key];
        if(i%2==0){
            content += "\n";
        }
    }
    return content;
}


function show(x,y){
    ctx.lineWidth=3;
    ctx.beginPath();
    ctx.arc(x,y,20,0,2*Math.PI);
     ctx.moveTo(x-20,y-20);
     ctx.lineTo(x+20,y+20);
     ctx.moveTo(x-20,y+20);
     ctx.lineTo(x+20,y-20);
    ctx.stroke();
}
