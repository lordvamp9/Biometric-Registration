# BioLogistics Registration

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![face-api.js](https://img.shields.io/badge/face--api.js-AI-06b6d4?style=for-the-badge)
![License: MIT](https://img.shields.io/badge/License-MIT-success.svg?style=for-the-badge)

A modern, secure driver registration system featuring advanced biometric liveness verification for the global supply chain. This project provides a premium user interface with dynamic validations using webcam-based facial recognition.

##  Demo
[https://biometric-regis.netlify.app/](url)

**[Insert Netlify Link Here]**

> *Note: Provide the live deployment link in the space above to test the biometric registration flow online.*

##  Overview

The **BioLogistics Registration** app demonstrates how identity verification can be integrated into a web-based workflow. Originally built in plain HTML/JS, it has been modernized into a robust React application powered by Vite. The UI maintains a sleek, glassmorphic aesthetic with dark-mode undertones, providing an intuitive, "cyber-logistics" feel.

The core technology uses `face-api.js` to detect faces in real-time, enforcing a **liveness challenge** (prompting the user to turn their head) to ensure they are a real person rather than a static photo.

##  Features

- **Modern React Architecture:** Component-based design built with Vite for lightning-fast development.
- **Biometric Identity Verification:**
  - Real-time webcam integration.
  - Facial landmark detection using AI models.
  - Anti-spoofing liveness check (head movement analysis).
  - Fallback visual simulation for unsupported browsers/devices.
- **Premium User Interface:**
  - Split-screen professional layout.
  - Interactive micro-animations and glowing indicators.
  - Conditional rendering for seamless navigation to the success screen.
- **Responsive Design:** Adapts smoothly from desktop dashboards to mobile devices.

## 🛠 Tech Stack

- **Frontend:** React, HTML5 Canvas, CSS Modules
- **Build Tool:** Vite
- **AI/ML:** face-api.js (TinyFaceDetector & FaceLandmark68Net)
- **Deployment-Ready:** Outputs to `/dist` for easy hosting on platforms like Netlify or Vercel.

##  Topics / Tags

`react` `nodejs` `vite` `face-api` `biometrics` `liveness-detection` `identity-verification` `frontend` `ui-ux` `logistics` `ai`

##  How to Run Locally

### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn

### Installation & Setup

1. **Clone the repository** (if not already done).
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Start the development server:**
   ```bash
   npm run dev
   ```
4. **Access the app:** Open the provided `localhost` URL in your browser.
5. **Camera Access:** Allow camera permissions when prompted by the browser to test the biometric scanning.

### Building for Production

To generate a static build suitable for manual deployment (e.g., to Netlify):
```bash
npm run build
```
This will create a `/dist` folder containing the optimized production files.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
