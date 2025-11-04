# Warm & White — Modern Single-Page Website

A modern single-page scrolling website for the Warm & White handcrafted chocolate brand from Northern India. Built with vanilla HTML5, CSS3, and JavaScript featuring smooth scrolling navigation.

## Features

### 🌊 **Smooth Scrolling Architecture**
- Single-page design with all content visible
- Smooth scrolling navigation between sections
- Active navigation highlighting based on scroll position
- Mobile-responsive design with hamburger menu

### 🎨 **Contemporary Orange Design**
- Lindt-inspired warm orange color palette
- Modern CSS Grid and Flexbox layouts
- Smooth animations and hover effects
- Glassmorphism navigation with backdrop blur
- Loading spinner and scroll effects

### 📱 **Responsive & Interactive**
- Mobile-first responsive design
- Touch-friendly navigation
- Interactive product cards with hover animations
- Working contact form with validation
- Dynamic footer year update

## Files Structure

```
📁 Warm-and-White/
├── 📄 index.html          # Single page with all sections
├── 📁 css/
│   └── 📄 styles.css      # Modern CSS with orange theme
├── 📁 js/
│   └── 📄 app.js          # Smooth scrolling and interactions
└── 📄 README.md           # This file
```

## Quick Start

### Preview locally (Windows PowerShell):
```powershell
Start-Process 'c:\Users\erabh\Source Code\Warm-and-White\index.html'
```

### Or open in VS Code Live Server:
1. Install "Live Server" extension in VS Code
2. Right-click `index.html` → "Open with Live Server"

## Website Sections

### 🏠 **Home Section** (`#home`)
- Hero section with orange gradient background
- Brand introduction and call-to-action buttons
- Feature cards highlighting key benefits

### ℹ️ **About Section** (`#about`)
- Brand story and company values
- Family tradition showcase
- Quality, community, and sustainability focus

### 🍫 **Products Section** (`#products`)
- 6 chocolate varieties with interactive cards
- Seasonal collections including "Autumn Spice Special"
- Custom order information

### 📞 **Contact Section** (`#contact`)
- Working contact form with validation
- Workshop location and contact details
- Business hours and email addresses

## Navigation Features

- **Smooth Scrolling**: Click any nav link to smoothly scroll to that section
- **Active Highlighting**: Navigation automatically highlights current section
- **Mobile Menu**: Responsive hamburger menu for mobile devices
- **Scroll Offset**: Perfect positioning accounting for fixed navbar

## Color Theme

**Orange/Autumn Palette** (Lindt-inspired):
- Primary Orange: `#D2691E` (Chocolate Orange)
- Light Orange: `#FF8C00` (Dark Orange) 
- Accent Orange: `#FF6347` (Tomato Red)
- Warm Orange: `#FF4500` (Orange Red)
- Background: Warm cream gradients

## Key Technologies

- **HTML5**: Semantic sections with proper anchor navigation
- **CSS3**: Grid, Flexbox, scroll-margin-top for smooth navigation
- **Vanilla JavaScript**: Smooth scrolling, active navigation tracking
- **Google Fonts**: Inter font family for modern typography

## Customization

### Update Colors
Edit CSS custom properties in `css/styles.css`:
```css
:root {
  --primary: #D2691E;        /* Brand orange */
  --accent: #FF6347;         /* Accent orange */
  --bg-hero: linear-gradient(135deg, #FF8C00 0%, #D2691E 100%);
  /* ... more variables */
}
```

### Add New Sections
1. Add new section in `index.html` with unique `id`
2. Add navigation link to navbar
3. Update `sections` array in `js/app.js`

## Deployment Options

### Static Hosting
- **Netlify**: Drag and drop the folder
- **Vercel**: Connect GitHub repo
- **GitHub Pages**: Enable in repo settings

### CDN Deployment
- **Cloudflare Pages**
- **AWS S3 + CloudFront**
- **Azure Static Web Apps**

## Browser Support

- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+

## Performance Features

- Smooth scroll behavior with `scroll-behavior: smooth`
- Efficient scroll event handling with throttling
- Optimized CSS with minimal reflows
- Lightweight vanilla JavaScript (no frameworks)
- Mobile-optimized touch interactions

---

Built with ❤️ for Warm & White Chocolates, Northern India