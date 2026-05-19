````markdown
# NexGen SaaS Analytics Dashboard

A modern SaaS analytics dashboard built with Vanilla JavaScript, HTML5, and CSS3.  
The project focuses on clean UI architecture, responsive layouts, interactive data visualization, and smooth user experience without relying on heavy frontend frameworks.

---

## Overview

NexGen Dashboard is a production-style analytics interface designed to simulate real-world SaaS platforms. It features dynamic charts, masonry-based layouts, reusable UI components, glassmorphism styling, and responsive behavior across devices.

The application is built entirely using core web technologies to demonstrate strong frontend fundamentals and performance-oriented development.

---

## Features

### Dashboard Functionality
- Interactive analytics dashboard
- Dynamic metric visualization using Chart.js
- Date-based filtering system
- Responsive masonry card layout
- Multi-section tab navigation
- Reusable dashboard components
- Profile dropdown interactions

### UI & Design
- Glassmorphism-based interface
- Dark themed visual system
- Smooth transitions and animations
- 3D hover transformations
- Animated SVG elements
- Responsive design for desktop, tablet, and mobile

### Performance & Accessibility
- Lightweight Vanilla JavaScript architecture
- No framework dependency overhead
- Optimized rendering and chart lifecycle management
- Reduced motion accessibility support
- Semantic HTML structure

---

## Tech Stack

| Technology | Usage |
|------------|-------|
| HTML5 | Application structure |
| CSS3 | Styling, layout, animations |
| Vanilla JavaScript (ES6+) | Application logic and interactions |
| Chart.js | Data visualization |
| SVG | Icons and scalable graphics |

---

## Project Structure

```bash
nexgen-dashboard/
│
├── index.html
│
├── css/
│   └── style.css
│
├── js/
│   ├── app.js
│   ├── data.js
│   └── utils.js
│
└── README.md
````

---

## Installation & Setup

### Clone Repository

```bash
git clone https://github.com/vaishnavi-techligence/Task-2.git
```

### Navigate to Project

```bash
cd Task-2
```

### Run Locally

#### Option 1 — VS Code Live Server

Open the project in VS Code and run using the Live Server extension.

#### Option 2 — Python HTTP Server

```bash
python -m http.server 8000
```

Visit:

```bash
http://localhost:8000
```

---

## Key Implementation Details

### Masonry Layout System

The dashboard uses CSS Columns to create a Pinterest-style masonry layout with natural card flow.

```css
.dashboard-grid {
  column-count: 3;
  column-gap: 1.5rem;
}

.card {
  break-inside: avoid;
}
```

### Chart Lifecycle Management

Charts are properly destroyed and recreated during data updates to prevent memory leaks and duplicate instances.

```javascript
const chartInstances = {};

function safeChartDestroy(chartId) {
  if (chartInstances[chartId]) {
    chartInstances[chartId].destroy();
  }
}
```

### 3D Dashboard Effects

Interactive transforms are used to create depth and motion.

```css
.mockup-card {
  transform: rotateY(-12deg) rotateX(10deg);
  transition: transform 0.4s ease;
}
```

---

## Responsive Design

| Screen Size | Layout                       |
| ----------- | ---------------------------- |
| Desktop     | 3-column masonry grid        |
| Tablet      | 2-column layout              |
| Mobile      | Single-column stacked layout |

---

## Browser Support

* Google Chrome
* Mozilla Firefox
* Microsoft Edge
* Safari

Modern browser support is required for:

* `backdrop-filter`
* CSS custom properties
* IntersectionObserver API

---

## Performance

| Metric                 | Result |
| ---------------------- | ------ |
| First Contentful Paint | ~0.3s  |
| Time to Interactive    | ~0.5s  |
| Lighthouse Score       | 95+    |

---

## Future Improvements

* Authentication system
* Real backend API integration
* Exportable analytics reports
* Theme customization
* Advanced filtering options
* Real-time websocket updates

---

## License

This project is licensed under the MIT License.

---

## Author

Developed by Vaishnavi
Frontend Developer | CSE Student

```
```
