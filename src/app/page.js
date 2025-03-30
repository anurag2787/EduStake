'use client'
import React, { useEffect, useRef } from 'react';
import HeroSection from '@/components/HeroSection';
import Showcase from '@/components/Showcase';
import HowItWorksSection from '@/components/HowItWorksSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import ScrollBanner from '@/components/ScrollBanner';

// CSS for the animations
const StarryBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight * 3; // Make it 3x the height to cover all sections
    };
    
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);
    
    // Star properties
    const stars = [];
    const shootingStars = [];
    const sparkles = []; // New array for sparkle effects
    const starCount = Math.floor((canvas.width * canvas.height) / 6000); // Increased density
    
    // Create stars
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.8, // Slightly larger stars
        opacity: Math.random() * 0.8 + 0.3, // Higher minimum opacity
        pulse: Math.random() * 0.1,
        pulseSpeed: 0.02 + Math.random() * 0.03, // Faster pulsing
        sparkleTimer: Math.random() * 100 // Random timer for sparkle effect
      });
    }
    
    // Create occasional shooting stars
    const createShootingStar = () => {
      if (shootingStars.length < 4 && Math.random() < 0.03) { // Increased probability
        const x = Math.random() * canvas.width;
        const y = Math.random() * (canvas.height / 2); // Expanded area
        
        shootingStars.push({
          x,
          y,
          length: 100 + Math.random() * 150, // Longer trails
          speed: 12 + Math.random() * 25, // Faster speed
          angle: (Math.PI / 4) + (Math.random() * Math.PI / 4),
          opacity: 0.9 // Higher opacity
        });
      }
    };
    
    // Create sparkle effect
    const createSparkle = (x, y, size) => {
      sparkles.push({
        x,
        y,
        size: size * 0.7,
        opacity: 0.9,
        duration: 20 + Math.random() * 30
      });
    };
    
    // Draw stars
    const drawStars = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Create darker gradient background with less blue
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#050505'); // Much darker top
      gradient.addColorStop(0.5, '#071428'); // Darker blue middle
      gradient.addColorStop(1, '#081832'); // Darker blue bottom
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw stars
      stars.forEach(star => {
        // Update pulsing
        star.opacity += Math.sin(star.pulse) * star.pulseSpeed;
        star.pulse += 0.04; // Faster pulsing
        
        // Occasionally create sparkle effect
        star.sparkleTimer -= 1;
        if (star.sparkleTimer <= 0 && Math.random() < 0.1) {
          createSparkle(star.x, star.y, star.radius * 3);
          star.sparkleTimer = 80 + Math.random() * 200;
        }
        
        // Create a radial gradient for the glow effect
        const glow = ctx.createRadialGradient(
          star.x, star.y, 0,
          star.x, star.y, star.radius * 3 // Larger glow
        );
        
        glow.addColorStop(0, `rgba(255, 255, 255, ${star.opacity})`);
        glow.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius * 3, 0, Math.PI * 2);
        ctx.fill();
        
        // Core of the star
        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity * 1.7})`; // Brighter core
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
      });
      
      // Draw sparkles
      sparkles.forEach((sparkle, index) => {
        ctx.beginPath();
        const sparkleOpacity = sparkle.opacity * (sparkle.duration / 50);
        ctx.fillStyle = `rgba(255, 255, 255, ${sparkleOpacity})`;
        
        // Draw sparkle (simple 4-point star)
        ctx.beginPath();
        const length = sparkle.size;
        
        // Horizontal line
        ctx.moveTo(sparkle.x - length, sparkle.y);
        ctx.lineTo(sparkle.x + length, sparkle.y);
        
        // Vertical line
        ctx.moveTo(sparkle.x, sparkle.y - length);
        ctx.lineTo(sparkle.x, sparkle.y + length);
        
        ctx.strokeStyle = `rgba(255, 255, 255, ${sparkleOpacity})`;
        ctx.lineWidth = 1;
        ctx.stroke();
        
        // Update sparkle
        sparkle.duration -= 1;
        
        // Remove faded sparkles
        if (sparkle.duration <= 0) {
          sparkles.splice(index, 1);
        }
      });
      
      // Draw shooting stars
      shootingStars.forEach((star, index) => {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.lineWidth = 2;
        
        // Calculate end point
        const endX = star.x - Math.cos(star.angle) * star.length;
        const endY = star.y + Math.sin(star.angle) * star.length;
        
        // Draw line
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(endX, endY);
        ctx.stroke();
        
        // Draw glow
        const gradient = ctx.createLinearGradient(star.x, star.y, endX, endY);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${star.opacity})`);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(endX, endY);
        ctx.stroke();
        
        // Add small sparkles along the trail
        if (Math.random() < 0.3) {
          const trailPos = Math.random();
          const sparkleX = star.x - Math.cos(star.angle) * star.length * trailPos;
          const sparkleY = star.y + Math.sin(star.angle) * star.length * trailPos;
          createSparkle(sparkleX, sparkleY, 1 + Math.random());
        }
        
        // Move shooting star
        star.x += Math.cos(star.angle) * star.speed;
        star.y -= Math.sin(star.angle) * star.speed;
        star.opacity -= 0.01; // Slower fade for longer trails
        
        // Remove if it's gone or faded
        if (star.x < 0 || star.y > canvas.height || star.opacity <= 0) {
          shootingStars.splice(index, 1);
        }
      });
      
      createShootingStar();
    };
    
    // Animate
    const animate = () => {
      drawStars();
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', setCanvasSize);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full -z-10"
    />
  );
};

export default function HomePage() {
  return (
    <div className="min-h-screen text-white relative">
      <StarryBackground />
      <HeroSection />
      <Showcase />
      <ScrollBanner />
      <HowItWorksSection />
      <CTASection />
    </div>
  );
}