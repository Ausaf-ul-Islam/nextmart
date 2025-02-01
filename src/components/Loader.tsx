'use client'
import React from 'react';

const Loader = () => {
  return (
    <div className="loader">
      {/* Letters for NEXMART */}
      <div className="letters">
        <span>N</span>
        <span>e</span>
        <span>x</span>
        <span>M</span>
        <span>a</span>
        <span>r</span>
        <span>t</span>
      </div>

      <style jsx>{`
        .loader {
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #FFFFFF; /* Light gray background */
          height: 100vh;
        }

        /* Letters styling and animation */
        .letters {
          display: flex;
          font-size: 3rem; /* Increased font size for better visibility */
          font-weight: bold;
          animation: fade 3s infinite ease-in-out;
        }

        .letters span {
          margin: 0 0.1em;
          color: #FE6E44; /* Apply orange color */
          animation: bounce 1.5s infinite ease-in-out;
        }

        .letters span:nth-child(1) {
          animation-delay: 0s;
        }

        .letters span:nth-child(2) {
          animation-delay: 0.2s;
        }

        .letters span:nth-child(3) {
          animation-delay: 0.4s;
        }

        .letters span:nth-child(4) {
          animation-delay: 0.6s;
        }

        .letters span:nth-child(5) {
          animation-delay: 0.8s;
        }

        .letters span:nth-child(6) {
          animation-delay: 1s;
        }

        .letters span:nth-child(7) {
          animation-delay: 1.2s;
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px); /* Increased bounce height */
          }
        }

        @keyframes fade {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
};

export default Loader;
