/**
 * Smooth Scroll Performance Optimization
 * Prevents jank during scroll with debouncing and requestAnimationFrame
 */

// Enable smooth scrolling with hardware acceleration
export const enableSmoothScroll = () => {
  if (typeof window !== 'undefined') {
    // Add smooth scroll to body
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Enable GPU acceleration for smooth animations
    const style = document.createElement('style');
    style.innerHTML = `
      * {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
      body {
        scroll-behavior: smooth;
      }
      /* Optimize scroll performance */
      main, section, div[class*="scroll"] {
        will-change: scroll-position;
      }
    `;
    document.head.appendChild(style);
  }
};

// Debounce scroll events
export const debounceScroll = (callback: () => void, delay: number = 150) => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  let lastCall = 0;

  return () => {
    const now = Date.now();
    
    if (now - lastCall < delay) {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        callback();
        lastCall = now;
      }, delay);
    } else {
      callback();
      lastCall = now;
    }
  };
};

// Throttle scroll with requestAnimationFrame for optimal performance
export const throttleScroll = (callback: () => void) => {
  let rafId: number | null = null;

  return () => {
    if (rafId) return;
    
    rafId = requestAnimationFrame(() => {
      callback();
      rafId = null;
    });
  };
};

// Intersection Observer helper for lazy loading
export const createIntersectionObserver = (
  options: IntersectionObserverInit = {
    threshold: 0.1,
    rootMargin: '50px',
  }
) => {
  if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
    return new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target as HTMLImageElement;
          
          // Load image if it has a data-src attribute
          if (element.dataset.src && !element.src) {
            element.src = element.dataset.src;
            element.removeAttribute('data-src');
          }
          
          // Optional: unobserve after loading
          // observer.unobserve(element);
        }
      });
    }, options);
  }
  return null;
};
