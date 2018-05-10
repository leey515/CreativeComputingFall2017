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

var mediaSource = new MediaSource();
mediaSource.addEventListener('sourceopen', handleSourceOpen, false);
var mediaRecorder;
var recordedBlobs;
var sourceBuffer;

var gumVideo = document.querySelector('video#gum');
var recordedVideo = document.querySelector('video#recorded');

var ongoing = false;

// window.isSecureContext could be used for Chrome
var isSecureOrigin = location.protocol === 'https:' ||
    location.hostname === 'localhost';

var constraints = {
    audio: true
};

function handleSuccess(stream) {
    console.log('getUserMedia() got stream: ', stream);
    window.stream = stream;
    gumVideo.srcObject = stream;
}

function handleError(error) {
    console.log('navigator.getUserMedia error: ', error);
}

navigator.mediaDevices.getUserMedia(constraints).
then(handleSuccess).catch(handleError);

function handleSourceOpen(event) {
    console.log('MediaSource opened');
    sourceBuffer = mediaSource.addSourceBuffer('video/webm; codecs="vp8"');
    console.log('Source buffer: ', sourceBuffer);
}

recordedVideo.addEventListener('error', function(ev) {
    console.error('MediaRecording.recordedMedia.error()');
    alert('Your browser can not play\n\n' + recordedVideo.src
          + '\n\n media clip. event: ' + JSON.stringify(ev));
}, true);

function handleDataAvailable(event) {
    if (event.data && event.data.size > 0) {
        recordedBlobs.push(event.data);
    }
}

function handleStop(event) {
    console.log('Recorder stopped: ', event);
}

function toggleRecording() {
    if (ongoing == false) {
        startRecording();
        ongoing = true;
        console.log("Hi");
    } else {
        stopRecording();
        ongoing = false;
        console.log("bye");
    }
}

function startRecording() {
    recordedBlobs = [];
    var options = {mimeType: 'audio/wav;codecs=vp9'};
    if (!MediaRecorder.isTypeSupported(options.mimeType)) {
        console.log(options.mimeType + ' is not Supported');
        options = {mimeType: 'audio/wav;codecs=vp8'};
        if (!MediaRecorder.isTypeSupported(options.mimeType)) {
            console.log(options.mimeType + ' is not Supported');
            options = {mimeType: 'audio/wav'};
            if (!MediaRecorder.isTypeSupported(options.mimeType)) {
                console.log(options.mimeType + ' is not Supported');
                options = {mimeType: ''};
            }
        }
    }
    try {
        mediaRecorder = new MediaRecorder(window.stream, options);
    } catch (e) {
        console.error('Exception while creating MediaRecorder: ' + e);
        alert('Exception while creating MediaRecorder: '
              + e + '. mimeType: ' + options.mimeType);
        return;
    }
    console.log('Created MediaRecorder', mediaRecorder, 'with options', options);
    ongoing = false;
    mediaRecorder.onstop = handleStop;
    mediaRecorder.ondataavailable = handleDataAvailable;
    mediaRecorder.start(10); // collect 10ms of data
    console.log('MediaRecorder started', mediaRecorder);
}

function stopRecording() {
    mediaRecorder.stop();
    console.log('Recorded Blobs: ', recordedBlobs);
    recordedVideo.controls = true;
}

function play() {
    // workaround for non-seekable video taken from
    // https://bugs.chromium.org/p/chromium/issues/detail?id=642012#c23
    var superBuffer = new Blob(recordedBlobs, {type: 'audio/wav'});
    recordedVideo.src = window.URL.createObjectURL(superBuffer);
    recordedVideo.addEventListener('loadedmetadata', function() {
        if (recordedVideo.duration === Infinity) {
            recordedVideo.currentTime = 1e101;
            recordedVideo.ontimeupdate = function() {
                recordedVideo.currentTime = 0;
                recordedVideo.ontimeupdate = function() {
                    delete recordedVideo.ontimeupdate;
                    var playPromise = recordedVideo.play();
                    if (playPromise !== undefined) {
                        playPromise.then(_ => {
                            // Automatic playback started!
                            // Show playing UI.
                            video.pause();
                        })
                            .catch(error => {
                            // Auto-play was prevented
                            // Show paused UI.
                        });
                    }
                };
            };
        }
    });
}
function download() {
    var blob = new Blob(recordedBlobs, {type: ''});
    var url = window.URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'test.webm';
    document.body.appendChild(a);
    a.click();
    setTimeout(function() {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }, 100);
}

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
    x.setAttribute("onclick", "play(); toggleFlying(); start()");
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
            }, 110).animate({
                top: 55,
                left:-6.5
            }, 310).animate({
                top: 55,
                left:-6.5
            }, 110).animate({
                top: 40,
                left:-6.5
            }, 310);
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

