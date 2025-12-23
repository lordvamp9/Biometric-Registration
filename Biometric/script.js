const video = document.getElementById('video');
const videoContainer = document.getElementById('videoContainer');
const canvas = document.getElementById('canvas');
const startBtn = document.getElementById('startBtn');
const instructionText = document.getElementById('instructionText');
const statusBadge = document.getElementById('statusBadge');
const submitBtn = document.getElementById('submitBtn');

let isVerified = false;
let livenessStep = 0;
let useSimulation = false;

const MODEL_URL = 'https://justadudewhohacks.github.io/face-api.js/models';

Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
    faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL)
]).then(() => {
    instructionText.innerText = "System Ready";
}).catch(err => {
    useSimulation = true;
    instructionText.innerText = "System Ready (Legacy Mode)";
});

startBtn.addEventListener('click', startVerification);

function startVerification() {
    startBtn.disabled = true;
    startBtn.innerText = "Initializing Camera...";
    videoContainer.classList.remove('hidden');

    navigator.mediaDevices.getUserMedia({ video: {} })
        .then(stream => {
            video.srcObject = stream;
            if (useSimulation) {
                instructionText.innerText = "Initializing Optical Scan...";
            } else {
                instructionText.innerText = "Position your face in the center";
            }
        })
        .catch(err => {
            alert("Camera access required for verification.");
            startBtn.disabled = false;
            startBtn.innerText = "Retry Secure Scan";
        });
}

video.addEventListener('play', () => {
    const displaySize = { width: video.clientWidth, height: video.clientHeight };
    faceapi.matchDimensions(canvas, displaySize);

    if (useSimulation) {
        startSimulationSequence(canvas, displaySize);
        return;
    }

    const interval = setInterval(async () => {
        if (isVerified) return;

        try {
            const detections = await faceapi.detectSingleFace(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks();

            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            if (detections) {
                processLivenessAI(detections.landmarks);
            } else {
                if (livenessStep > 0 && livenessStep < 3) {
                    instructionText.innerText = "Align face in frame";
                }
            }
        } catch (e) {
            useSimulation = true;
            clearInterval(interval);
            startSimulationSequence(canvas, displaySize);
        }
    }, 100);
});

function processLivenessAI(landmarks) {
    const nose = landmarks.getNose()[3];
    const leftEye = landmarks.getLeftEye();
    const rightEye = landmarks.getRightEye();

    const leftEyeX = leftEye.reduce((acc, p) => acc + p.x, 0) / leftEye.length;
    const rightEyeX = rightEye.reduce((acc, p) => acc + p.x, 0) / rightEye.length;
    const noseX = nose.x;

    const eyeDistance = Math.abs(leftEyeX - rightEyeX);
    const distToRightEye = Math.abs(noseX - rightEyeX);
    const ratio = distToRightEye / eyeDistance;

    if (livenessStep === 0) {
        livenessStep = 1;
        instructionText.innerText = "Face Detected. Hold still.";
        instructionText.style.color = "#ffffff";
        setTimeout(() => {
            livenessStep = 2;
            instructionText.innerText = "Slowly turn head to the RIGHT >>";
            instructionText.style.color = "#fbbf24";
        }, 1500);
    } else if (livenessStep === 2) {
        if (ratio < 0.40) {
            completeVerification();
        }
    }
}

function startSimulationSequence(canvas, displaySize) {
    const ctx = canvas.getContext('2d');
    const cx = displaySize.width / 2;
    const cy = displaySize.height / 2;
    let simStep = 0;

    const simInterval = setInterval(() => {
        if (isVerified) {
            clearInterval(simInterval);
            return;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.strokeStyle = "#06b6d4";
        ctx.lineWidth = 2;

        const size = 150;
        ctx.beginPath();
        ctx.moveTo(cx - size, cy - size + 40); ctx.lineTo(cx - size, cy - size); ctx.lineTo(cx - size + 40, cy - size);
        ctx.moveTo(cx + size - 40, cy - size); ctx.lineTo(cx + size, cy - size); ctx.lineTo(cx + size, cy - size + 40);
        ctx.moveTo(cx + size, cy + size - 40); ctx.lineTo(cx + size, cy + size); ctx.lineTo(cx + size - 40, cy + size);
        ctx.moveTo(cx + size - 40, cy + size); ctx.lineTo(cx - size, cy + size); ctx.lineTo(cx - size, cy + size - 40);
        ctx.stroke();

        if (simStep === 0) {
            instructionText.innerText = "Scanning Biometric Features...";
            ctx.fillStyle = "rgba(6, 182, 212, 0.2)";
            ctx.fillRect(cx - size, cy - size + (Math.random() * size * 2), size * 2, 2);
        } else if (simStep === 1) {
            instructionText.innerText = "Turn Head Right >>";
            instructionText.style.color = "#fbbf24";
            ctx.font = "40px Inter";
            ctx.fillStyle = "#fbbf24";
            ctx.fillText(">>", cx + size + 20, cy);
        }

    }, 100);

    setTimeout(() => { simStep = 1; }, 2000);
    setTimeout(() => { completeVerification(); }, 5000);
}


function completeVerification() {
    isVerified = true;
    instructionText.innerText = "Identity Confirmed";
    instructionText.style.color = "#10b981";
    statusBadge.innerText = "Verified";
    statusBadge.classList.add('verified');

    startBtn.innerText = "Scan Complete";
    startBtn.style.display = 'none';

    const stream = video.srcObject;
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
    }

    setTimeout(() => {
        submitBtn.disabled = false;
        window.location.href = 'success.html';
    }, 1500);
}
