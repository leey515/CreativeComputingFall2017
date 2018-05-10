/*
*  Copyright (c) 2015 The WebRTC project authors. All Rights Reserved.
*
*  Use of this source code is governed by a BSD-style license
*  that can be found in the LICENSE file in the root of the source
*  tree.
*/

// This code is adapted from
// https://rawgit.com/Miguelao/demos/master/mediarecorder.html

'use strict';

/* globals MediaRecorder */


var flying = false;
function toggleFlying(){

    if (flying == true)
    {
        clearInterval(id);
        clearInterval(idz);
        createimagecenter();
        flying = false;
    }
    else
    {
        moveUp();
        moveUpz();
        createimagecenter();
        flying = true;
    }
}
var id;
var idz;
function moveUp() {
    var elem = document.getElementById("up");
    var pos = 60;
    var size = 55;
    var wen = 23;
    var minspeed = Math.ceil(7);
    var maxspeed = Math.floor(25);
    var randomspeed = Math.floor(Math.random()*(maxspeed-minspeed+1))+minspeed;
    id = setInterval(frame, randomspeed);
    function frame() {
        if (pos == -20) {
            pos = 60;
            size = 55;
            wen = 23;
            elem.style.top = pos + '%';
            elem.style.width = size + '%';
            elem.style.left = wen + '%';
        } else {
            pos--;
            size+=.5;
            wen-= 0.3;
            elem.style.width = size + '%';
            elem.style.top = pos + '%';
            elem.style.left = wen + '%';
        }
    }
}

function moveUpz() {
    var elem = document.getElementById("upz");
    var pos = 60;
    var size = 55;
    var wen = 23;
    var minspeed = Math.ceil(7);
    var maxspeed = Math.floor(25);
    var randomspeed = Math.floor(Math.random()*(maxspeed-minspeed+1))+minspeed;
    idz = setInterval(frame, randomspeed);
    function frame() {
        if (pos == -20) {
            pos = 60;
            size = 55;
            wen = 23;
            elem.style.top = pos + '%';
            elem.style.width = size + '%';
            elem.style.left = wen + '%';
        } else {
            pos--;
            size+=.5;
            wen-= 0.3;
            elem.style.width = size + '%';
            elem.style.top = pos + '%';
            elem.style.left = wen + '%';
        }
    }
}

function createimagecenter(){
    var x = document.createElement("IMG");
    x.setAttribute("src", "circle.png");
    x.setAttribute("id", "ups");
    x.setAttribute("onclick", "toggleFlying(); start()");
    x.style.top = "63%";
    x.style.position = "fixed";
    x.style.width = "55%";
    x.style.left = "23%";
    document.body.appendChild(x);
}

jQuery.fn.shake = function () {
    this.each(function (i) {
        $(this).css({
            "position": "relative"
        });
        for (var x = 1; x <= 99999; x++) {
            $(this).animate({
                top: 40,
                left:-6.5
            }, 15).animate({
                top: 55,
                left:-6.5
            }, 35).animate({
                top: 55,
                left:-6.5
            }, 15).animate({
                top: 40,
                left:-6.5
            }, 35);
        }
    });

}

function start() {
    $('#imgback').shake();

};

var larged = false;
function sizeUp() {
    var elem = document.getElementById("down");
    var pos = 87;
    var size = 55;
    var leftPos = 25;
    if(larged == false){
        var id = setInterval(frame, 5);
        function frame() {
            size++;
            leftPos-= 0.5;
            elem.style.top = pos + '%';
            elem.style.width = size + '%';
            elem.style.left = leftPos + '%';
            if (size == 58) {
                clearInterval(id);
            }
            larged = true;
        }
    }
    else
    {
        size=58;
        leftPos= 23.5;
        var id = setInterval(frame, 5);
        function frame() {
            size--;
            leftPos+= 0.5;
            //elem.style.top = pos + '%';
            elem.style.width = size + '%';
            elem.style.left = leftPos + '%';
            if (size == 55) {
                clearInterval(id);
            }
            larged = false;
        }
    }
}

