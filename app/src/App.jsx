import React, { useState } from 'react';
import './index.css';

function App() {
  const [activeColor, setActiveColor] = useState(0);
  const [activeSize, setActiveSize] = useState('M');

  const colors = ['#2ec4b6', '#f4c535', '#ff3366', '#ffffff'];
  const sizes = ['S', 'M', 'L', 'XL'];

  return (
    <>
      <nav className="navbar">
        <div className="logo-container">
          <div className="logo-text">5TH AVENUE</div>
          <div className="logo-line"></div>
        </div>

        <div className="center-pills">
          <a href="#" className="pill active">Products</a>
          <a href="#" className="pill">Contact</a>
        </div>

        <div className="nav-links">
          <a href="#">Home</a>
          <a href="#">Products</a>
          <a href="#">Contact</a>
          <button className="btn-primary">
            Place order
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </div>
      </nav>

      <main className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Own Your<br/>Style</h1>
          <p className="hero-desc">
            Built for confidence and comfort, every piece combines premium materials and bold design.
            Engineered for the streets, made for movement.
          </p>
        </div>

        <div className="hero-center">
          <div className="bg-text">5TH</div>
          <img src="/hoodie.jpg" alt="Premium Hoodie" className="product-image" />
        </div>

        <div className="hero-options">
          <div className="option-group">
            <span className="option-title">Choose Your Color</span>
            <div className="color-picker">
              {colors.map((color, idx) => (
                <div 
                  key={idx}
                  className={`color-swatch ${activeColor === idx ? 'active' : ''}`}
                  style={{ backgroundColor: color }}
                  onClick={() => setActiveColor(idx)}
                />
              ))}
            </div>
          </div>

          <div className="option-group" style={{ marginTop: '2rem' }}>
            <span className="option-title">Choose your size</span>
            <div className="size-picker">
              {sizes.map((size) => (
                <button 
                  key={size}
                  className={`size-btn ${activeSize === size ? 'active' : ''}`}
                  onClick={() => setActiveSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>

      <footer className="bottom-bar">
        <div className="socials">
          <a href="#" className="social-icon">In</a>
          <a href="#" className="social-icon">Fb</a>
          <a href="#" className="social-icon">Tw</a>
        </div>

        <div className="scroll-indicator">
          Choose your size
          <div className="scroll-line"></div>
        </div>

        <button className="btn-secondary">
          See all products
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="7" y1="17" x2="17" y2="7"></line>
            <polyline points="7 7 17 7 17 17"></polyline>
          </svg>
        </button>
      </footer>
    </>
  );
}

export default App;
