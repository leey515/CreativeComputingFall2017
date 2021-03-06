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

var recorder = document.getElementById('recorder');
var player = document.getElementById('recorded');

recorder.addEventListener('change', function(e) {
    var file = e.target.files[0];
    // Do something with the audio file.
    player.src = URL.createObjectURL(file);
});


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
    var size = 40;
    var wen = 29;
    var minspeed = Math.ceil(7);
    var maxspeed = Math.floor(25);
    var randomspeed = Math.floor(Math.random()*(maxspeed-minspeed+1))+minspeed;
    id = setInterval(frame, randomspeed);
    function frame() {
        if (pos == -20) {
            pos = 60;
            size = 40;
            wen = 29;
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
    var size = 40;
    var wen = 29;
    var minspeed = Math.ceil(7);
    var maxspeed = Math.floor(25);
    var randomspeed = Math.floor(Math.random()*(maxspeed-minspeed+1))+minspeed;
    idz = setInterval(frame, randomspeed);
    function frame() {
        if (pos == -20) {
            pos = 60;
            size = 40;
            wen = 29;
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
    x.style.width = "40%";
    x.style.left = "29%";
    document.body.appendChild(x);
}

jQuery.fn.shake = function () {
    this.each(function (i) {
        $(this).css({
            "position": "relative"
        });
        for (var x = 1; x <= 99999; x++) {
            $(this).animate({
                top: 10,

            }, 15).animate({
                top: 25,
        
            }, 35).animate({
                top: 25,
  
            }, 15).animate({
                top: 10,
       
            }, 35);
        }
    });

}

function start() {
    $('#imgback').shake();

};

function playMusic(){
    // Audio Loop Limit
    var loopLimit = 4;
    var loopCounter = 0;
    var vol = 1.0;
    var aud = document.getElementById("recorded");
    aud.play();
    document.getElementById("recorded").addEventListener('ended', function(){
        if (loopCounter < loopLimit){
            this.currentTime = 0;
            this.play();
            aud.volume = vol;
            vol = vol * .5;
            loopCounter++;
        }
    }, false);
}

var larged = false;
function sizeUp() {
    var elem = document.getElementById("down");
    var pos = 100;
    var size = 31;
    var leftPos = 33;
    if(larged == false){
        var id = setInterval(frame, 5);
        function frame() {
            size++;
            leftPos-= 0.5;
            elem.style.top = pos + '%';
            elem.style.width = size + '%';
            elem.style.left = leftPos + '%';
            if (size == 36) {
                clearInterval(id);
            }
            larged = true;
        }
    }
    else
    {
        size=36;
        leftPos= 31.5;
        var id = setInterval(frame, 5);
        function frame() {
            size--;
            leftPos+= 0.5;
            //elem.style.top = pos + '%';
            elem.style.width = size + '%';
            elem.style.left = leftPos + '%';
            if (size == 30) {
                clearInterval(id);
            }
            larged = false;
        }
    }
}

