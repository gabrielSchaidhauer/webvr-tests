let camera = document.querySelector('a-camera');
let right = document.querySelector('#right');
let left = document.querySelector('#left');
let topp = document.querySelector('#top');
let bottom = document.querySelector('#bottom');
let centerText = document.querySelector("#centerText");
let rightText = document.querySelector("#rightText");
let leftText = document.querySelector("#leftText");
let upperText = document.querySelector("#upperText");
let bottomText = document.querySelector("#bottomText");
let runningRightText = false;
let runningLeftText = false;
let runningUpperText = false;
let runningBottomText = false;


camera.addEventListener('componentchanged', function (evt) {

    let y = this.getAttribute("rotation").y;
    let x = this.getAttribute("rotation").x;
    let rightPosition = !(y > -71.61972439135303 || y < -120.94761760218213)  && !(x < -20.62648062470965 || x > 20.511889065683473);
    let leftPosition = !(y > 106.79933301238545 || y < 76.89093610655652)  && !(x < -20.62648062470965 || x > 20.511889065683473);
    let topPosition = !(y > 26.126875457965532 || y < -30.24067735047992)  && !(x < 73.45318933577158);
    let bottomPosition = !(y > 26.126875457965532 || y < -30.24067735047992)  && !(x > -65.66096332199236);

    if(rightPosition){
        right.setAttribute("color", "red");
    } else if(leftPosition) {
        left.setAttribute("color", "yellow");
    } else if(topPosition){
        topp.setAttribute("color", "green");
    } else if(bottomPosition){
        bottom.setAttribute("color", "blue");
    }
     else {
        right.setAttribute("color", "blue");
        rightText.setAttribute("value", "");
        left.setAttribute("color", "green");
        leftText.setAttribute("value", "");
        topp.setAttribute("color", "yellow");
        upperText.setAttribute("value", "");
        bottom.setAttribute("color", "red");
        bottomText.setAttribute("value", "");
     }
});

right.addEventListener('componentchanged', function (evt) {
    if(evt.detail.newData != evt.detail.oldData && evt.detail.newData.color == "red"){
        toggleRightText();
    }
});

left.addEventListener('componentchanged', function(evt) {
    if(evt.detail.newData != evt.detail.oldData && evt.detail.newData.color == "yellow"){
        toggleLeftText();
    }
});

topp.addEventListener('componentchanged', function(evt) {
    if(evt.detail.newData != evt.detail.oldData && evt.detail.newData.color == "green"){
        toggleUpperText();
    }
});

bottom.addEventListener('componentchanged', function(evt) {
    if(evt.detail.newData != evt.detail.oldData && evt.detail.newData.color == "blue"){
        toggleBottomText();
    }
});

function showStartText(){
    centerText.setAttribute("value", "Seja bem vindo!");
    
    setTimeout(function(){
        centerText.setAttribute("value", "______-->______");
    }, 5000);
}

function toggleRightText(){
    if(!runningRightText){
        runningRightText = true;
        regressiveCount(rightText, 3, "<-", "______<--______");
    }
}

function toggleUpperText(){
    if(!runningUpperText){
        runningUpperText = true;
        regressiveCount(upperText, 3, "\\/", "______\\/______");
    }
}

function toggleLeftText(){
    if(!runningLeftText){
        runningLeftText = true;
        regressiveCount(leftText, 3, "->", "_______^_______")
    }
}

function toggleBottomText(){
    if(!runningBottomText){
        runningBottomText = true;
        regressiveCount(bottomText, 3, "^", "Obrigado!");
    }
}

function regressiveCount(component, number, nextArrow, nextCenterArrow){
    var toRegress = number;
    
    setTimeout(() => {
        component.setAttribute("value", toRegress);

        if(toRegress > 0){
            regressiveCount(component, --toRegress, nextArrow, nextCenterArrow);
            return;
        } else {
            component.setAttribute("value", nextArrow);
            centerText.setAttribute("value", nextCenterArrow);
            runningRightText = false;
            runningLeftText = false;
            runningBottomText = false;
            runningUpperText = false;
        }
    }, 1000);
}

showStartText();