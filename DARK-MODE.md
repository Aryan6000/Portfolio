# Dark Mode Feature

## Overview

Your portfolio now includes a beautiful dark mode that users can toggle between light and dark themes. The preference is saved in localStorage and persists across sessions.

## Features

### 🌓 Theme Toggle Button
- **Location**: Bottom left corner (fixed position)
- **Icon**: Moon icon for light mode, Sun icon for dark mode
- **Smooth Transition**: All colors transition smoothly when switching themes
- **Persistent**: User preference is saved in browser localStorage

### 🎨 Color Schemes

#### Light Mode (Default)
- Clean white background
- Dark text for readability
- Indigo accent color (#6366f1)
- Professional and modern look

#### Dark Mode
- Dark slate background (#0f172a)
- Light text for readability
- Lighter indigo accent (#818cf8)
- Easy on the eyes, perfect for night browsing

### 💾 Persistence
- Theme preference is saved to `localStorage`
- Automatically loads saved theme on page refresh
- Works across all pages (main portfolio and project details)

## Technical Implementation

### CSS Variables
The theme system uses CSS custom properties (variables) that change based on the `data-theme` attribute:

```css
:root {
  /* Light mode colors */
}

[data-theme="dark"] {
  /* Dark mode colors */
}
```

### React State Management
```javascript
const [theme, setTheme] = React.useState(() => {
  return localStorage.getItem('theme') || 'light';
});
```

### Theme Toggle Function
```javascript
const toggleTheme = () => {
  setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
};
```

## Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ All modern browsers with localStorage support

## Accessibility

- ✅ Proper ARIA labels on toggle button
- ✅ Keyboard accessible
- ✅ High contrast in both modes
- ✅ Smooth transitions (respects prefers-reduced-motion)

## User Experience

1. **First Visit**: Defaults to light mode
2. **Toggle**: Click the moon/sun icon to switch themes
3. **Persistence**: Theme choice is remembered
4. **Consistency**: Theme applies to all pages

## Mobile Responsive

- Theme toggle button repositions on mobile (above scroll-to-top button)
- Touch-friendly size (50x50px)
- Works perfectly on all screen sizes

## Future Enhancements (Optional)

- Auto-detect system theme preference
- Scheduled theme switching (day/night)
- Additional theme options (e.g., high contrast)
- Theme preview before switching

---

Enjoy your new dark mode! 🌙✨
