// Setando constraints para o video
var constraints = { video: { facingMode: "user" }, audio: false };
// Definindo Constants
const cameraView = document.querySelector("#video-camera-view");
const cameraOutput = document.querySelector("#img-camera-output");
const cameraSensor = document.querySelector("#canvas-camera-sensor");
const buttonCapture = document.querySelector("#button-capture");

//Acessando a camera do device
function cameraLoad() {
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then(function (stream) {
      track = stream.getTracks()[0];
      cameraView.srcObject = stream;
    })
    .catch(function (error) {
      console.error("Oops. Algo deu errado.", error);
    });
}

//metodo de captura de foto
function capturePhoto() {
  cameraSensor.width = cameraView.videoWidth;
  cameraSensor.height = cameraView.videoHeight;
  cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
  cameraOutput.src = cameraSensor.toDataURL("image/webp");
  cameraOutput.classList.add("photo-view");
}

// Add metodo para tirar foto no botão
buttonCapture.onclick = capturePhoto;
// Start the video stream when the window loads
window.addEventListener("load", cameraLoad, false);
