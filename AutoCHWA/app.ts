﻿/// <reference path="typings/cordova/cordova.d.ts" />
/// <reference path="typings/cordova/plugins/Camera.d.ts" />
module CordovaHostedApp {
    "use strict";

    export module Application {
        export function initialize() {
            document.addEventListener('deviceready', onDeviceReady, false);
        }

        function onDeviceReady() {
            // Handle the Cordova pause and resume events
            document.addEventListener('pause', onPause, false);
            document.addEventListener('resume', onResume, false);

            document.getElementsByClassName('btn-lg')[0].addEventListener('click', takePicture);
            
        }

        function takePicture() {
            if (!navigator.camera) {
                alert("Camera API not supported");
                return;
            }
            var options = {
                quality: 20,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: 1,      
                encodingType: 0     
            };

            navigator.camera.getPicture(
                function (imgData) {
                    var el : HTMLElement;
                    el = <HTMLElement>document.getElementsByClassName('media-object')[0];
                    var srcAttr = document.createAttribute("src");
                    srcAttr.value = "data:image/jpeg;base64," + imgData;
                    el.attributes.setNamedItem(srcAttr);                    
                },
                function (err) {
                    log(err);
                    alert('Error taking picture');
                },
                options);

            return false;
        }

        function onPause() {
            
        }

        function onResume() {
            
        }
        
        function log(o: any){
            var el : HTMLElement = document.getElementById("consoleDiv");
            if (el==null)
            {
                el = document.createElement("div");
                el.id="consoleDiv";
                document.body.appendChild(el);
            }
            el.innerText += typeof o + "\n";
            
            for(var p in o){
                el.innerText += p + o[p] + "\n";
            }
            
        }

    }
    var currEvent : any = window.onload;
    window.onload = function () {
        Application.initialize();
        currEvent();
    }
}