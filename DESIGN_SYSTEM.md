# 🎨 DESIGN SYSTEM - FPT Play Inspired

## Book Ecommerce Platform

---

## 🌈 Color Palette

### Primary Colors
```css
--primary-bg: linear-gradient(135deg, #0a1628 0%, #1a2332 100%);
--primary-orange: #ff6b35;
--primary-blue: #4a9eff;
--primary-purple: #9d4edd;
```

### Secondary Colors
```css
--secondary-green: #06ffa5;
--secondary-red: #ff4757;
--secondary-yellow: #ffd93d;
--secondary-pink: #ff6bcb;
```

### Neutral Colors
```css
--text-primary: #ffffff;
--text-secondary: #b8c5d6;
--text-muted: #6b7a8f;
--bg-card: rgba(26, 35, 50, 0.6);
--bg-glass: rgba(255, 255, 255, 0.05);
--border-glass: rgba(255, 255, 255, 0.1);
```

### Gradient Overlays
```css
--gradient-hero: linear-gradient(180deg, rgba(10,22,40,0) 0%, rgba(10,22,40,0.9) 100%);
--gradient-card: linear-gradient(135deg, rgba(74,158,255,0.1) 0%, rgba(157,78,221,0.1) 100%);
--gradient-button: linear-gradient(135deg, #ff6b35 0%, #ff8c42 100%);
```

---

## 📐 Typography

### Font Families
```css
--font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-heading: 'Montserrat', 'Inter', sans-serif;
--font-mono: 'JetBrains Mono', monospace;
```

### Font Sizes
```css
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */
--text-4xl: 2.25rem;   /* 36px */
--text-5xl: 3rem;      /* 48px */
```

### Font Weights
```css
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
--font-extrabold: 800;
```

---

## 🎭 Effects & Shadows

### Glassmorphism
```css
.glass-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
}

.glass-strong {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.15);
}
```

### Glow Effects
```css
.glow-orange {
  box-shadow: 0 0 20px rgba(255, 107, 53, 0.3),
              0 0 40px rgba(255, 107, 53, 0.1);
}

.glow-blue {
  box-shadow: 0 0 20px rgba(74, 158, 255, 0.3),
              0 0 40px rgba(74, 158, 255, 0.1);
}

.glow-hover {
  transition: all 0.3s ease;
}

.glow-hover:hover {
  box-shadow: 0 0 30px rgba(255, 107, 53, 0.5),
              0 0 60px rgba(255, 107, 53, 0.2);
  transform: translateY(-2px);
}
```

### Shadows
```css
--shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.3);
--shadow-md: 0 4px 16px rgba(0, 0, 0, 0.4);
--shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.5);
--shadow-xl: 0 16px 48px rgba(0, 0, 0, 0.6);
```

---

## 🧩 Components

### Buttons

#### Primary Button
```css
.btn-primary {
  background: linear-gradient(135deg, #ff6b35 0%, #ff8c42 100%);
  color: white;
  padding: 12px 32px;
  border-radius: 12px;
  font-weight: 600;
  box-shadow: 0 4px 16px rgba(255, 107, 53, 0.3);
  transition: all 0.3s ease;
}

.btn-primary:hover {
  box-shadow: 0 6px 24px rgba(255, 107, 53, 0.5);
  transform: translateY(-2px);
}
```

#### Secondary Button
```css
.btn-secondary {
  background: rgba(74, 158, 255, 0.2);
  border: 1px solid rgba(74, 158, 255, 0.5);
  color: #4a9eff;
  padding: 12px 32px;
  border-radius: 12px;
  backdrop-filter: blur(10px);
}

.btn-secondary:hover {
  background: rgba(74, 158, 255, 0.3);
  border-color: #4a9eff;
}
```

### Cards

#### Product Card
```css
.product-card {
  background: rgba(26, 35, 50, 0.6);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 16px;
  transition: all 0.3s ease;
}

.product-card:hover {
  background: rgba(26, 35, 50, 0.8);
  border-color: rgba(255, 107, 53, 0.5);
  box-shadow: 0 8px 32px rgba(255, 107, 53, 0.2);
  transform: translateY(-4px);
}
```

#### Glass Card
```css
.glass-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 24px;
}
```

### Inputs

#### Search Bar
```css
.search-input {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 24px;
  padding: 12px 24px;
  color: white;
  backdrop-filter: blur(10px);
}

.search-input:focus {
  border-color: #ff6b35;
  box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.2);
}
```

#### Text Input
```css
.input-field {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 12px 16px;
  color: white;
}

.input-field:focus {
  border-color: #4a9eff;
  box-shadow: 0 0 0 3px rgba(74, 158, 255, 0.2);
}
```

### Badges

#### Discount Badge
```css
.badge-discount {
  background: linear-gradient(135deg, #ff4757 0%, #ff6b7a 100%);
  color: white;
  padding: 4px 12px;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 700;
  box-shadow: 0 2px 8px rgba(255, 71, 87, 0.3);
}
```

#### Status Badge
```css
.badge-success {
  background: rgba(6, 255, 165, 0.2);
  color: #06ffa5;
  border: 1px solid rgba(6, 255, 165, 0.3);
  padding: 4px 12px;
  border-radius: 8px;
  font-size: 0.875rem;
}
```

---

## 📱 Responsive Breakpoints

```css
/* Mobile */
@media (max-width: 640px) {
  --container-padding: 16px;
  --grid-columns: 2;
}

/* Tablet */
@media (min-width: 641px) and (max-width: 1024px) {
  --container-padding: 24px;
  --grid-columns: 3;
}

/* Desktop */
@media (min-width: 1025px) {
  --container-padding: 32px;
  --grid-columns: 4;
}

/* Large Desktop */
@media (min-width: 1440px) {
  --container-padding: 48px;
  --grid-columns: 5;
}
```

---

## 🎬 Animations

### Fade In
```css
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in {
  animation: fadeIn 0.6s ease-out;
}
```

### Slide In
```css
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.slide-in {
  animation: slideIn 0.5s ease-out;
}
```

### Glow Pulse
```css
@keyframes glowPulse {
  0%, 100% {
    box-shadow: 0 0 20px rgba(255, 107, 53, 0.3);
  }
  50% {
    box-shadow: 0 0 40px rgba(255, 107, 53, 0.6);
  }
}

.glow-pulse {
  animation: glowPulse 2s ease-in-out infinite;
}
```

---

## 🖼️ Image Treatments

### Book Cover Glow
```css
.book-cover {
  border-radius: 8px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5),
              0 0 20px rgba(255, 107, 53, 0.2);
  transition: all 0.3s ease;
}

.book-cover:hover {
  box-shadow: 0 12px 48px rgba(0, 0, 0, 0.6),
              0 0 40px rgba(255, 107, 53, 0.4);
  transform: scale(1.05);
}
```

### Category Icon Gradient
```css
.category-icon {
  background: linear-gradient(135deg, #9d4edd 0%, #4a9eff 100%);
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(157, 78, 221, 0.3);
}
```

---

## 🎯 Key Design Principles

### 1. **Dark First**
- Primary background: Dark navy gradient
- All components use glassmorphism
- High contrast white text

### 2. **Cinematic Feel**
- Large hero banners
- Dramatic shadows and glows
- Smooth transitions

### 3. **Premium Look**
- Gradient buttons
- Neon accents
- Sophisticated color palette

### 4. **Modern UX**
- Micro-interactions
- Hover effects
- Loading states

### 5. **Mobile Optimized**
- Touch-friendly buttons (min 44px)
- Swipeable carousels
- Bottom navigation

---

## 📦 Component Library

### Must-Have Components:
- ✅ Navigation Bar (sticky, glassmorphism)
- ✅ Hero Banner (cinematic, with CTA)
- ✅ Category Cards (horizontal scroll)
- ✅ Product Card (hover effects, glow)
- ✅ Product Grid (responsive)
- ✅ Filter Sidebar (glassmorphism)
- ✅ Shopping Cart (slide-in panel)
- ✅ Checkout Form (multi-step)
- ✅ Review Card (user avatar, stars)
- ✅ Footer (dark, multi-column)

---

## 🎨 Design Files

All mockups are generated and saved. Ready for implementation!

**Next Step**: Implement these designs in React components with TailwindCSS.
