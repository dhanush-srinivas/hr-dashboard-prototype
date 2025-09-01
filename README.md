# HR Offboarding Dashboard - Interactive Prototype

This is an interactive prototype of an HR Offboarding Dashboard that demonstrates modern web application design with smooth animations and user interactions.

## Features

### 🎯 Interactive Navigation & Sidebar
- **Clickable Menu Items**: Dashboard, Offboarding Cases, Analytics/Reports, and Settings
- **Visual Feedback**: Active menu item highlighting with teal accent border
- **Smooth Transitions**: Fade-in animations when switching between screens
- **Keyboard Navigation**: Use number keys 1-4 for quick navigation

### 🔔 Send Reminder Functionality
- **Interactive Buttons**: Click any "Send Reminder" button in the employee table
- **Toast Notifications**: Success message appears and auto-closes after 3 seconds
- **Loading States**: Button shows "Sending..." during the process
- **Visual Feedback**: Row highlights with green border on successful reminder

### 📊 Task Status Overview Panel
- **Clickable Segments**: Completed, In Progress, and Overdue status filters
- **Dynamic Filtering**: Click any segment to filter related employee rows
- **Visual Highlighting**: Filtered rows get blue accent border and background
- **Smooth Animations**: Rows animate in with staggered timing

### ✨ Animations & Effects
- **Progress Bar Animations**: Bars fill with smooth transitions on page load
- **Hover Effects**: Panels lift up and show enhanced shadows
- **Click Animations**: Buttons and interactive elements scale on click
- **Loading States**: Progress bars show animated loading patterns
- **KPI Counter Animation**: Numbers count up from 0 to final values

### 🎨 Visual Enhancements
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Clean, professional design with proper spacing
- **Color Coding**: Status badges use appropriate colors for different states
- **Interactive Elements**: Hover effects and smooth transitions throughout

## How to Use

### Getting Started
1. Open `index.html` in a modern web browser
2. The dashboard will load with animations and interactive elements
3. All functionality is ready to use immediately

### Navigation
- **Left Sidebar**: Click menu items to switch between different screens
- **Dashboard**: Main view with employee offboarding list
- **Other Screens**: Placeholder content for future development

### Employee Management
- **Send Reminders**: Click any "Send Reminder" button to trigger the process
- **View Progress**: Progress bars show completion status for each employee
- **Status Filtering**: Use the right sidebar to filter by completion status

### Interactive Elements
- **Initiate Offboarding**: Orange button with loading animation
- **Status Segments**: Click to filter employee rows
- **Alert Items**: Click for action notifications
- **Table Rows**: Hover for enhanced visual feedback

## Technical Details

### File Structure
```
hr-dashboard-prototype/
├── index.html          # Main HTML structure
├── styles.css          # CSS styling and animations
├── script.js           # JavaScript functionality
└── README.md           # This file
```

### Technologies Used
- **HTML5**: Semantic structure and accessibility
- **CSS3**: Modern styling with Flexbox, Grid, and animations
- **JavaScript (ES6+)**: Interactive functionality and event handling
- **Font Awesome**: Icon library for visual elements

### Browser Compatibility
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

### Performance Features
- **Efficient Animations**: CSS transitions and transforms for smooth performance
- **Event Delegation**: Optimized event handling for large tables
- **Debounced Interactions**: Smooth user experience without overwhelming

## Customization

### Colors
The prototype uses a consistent color scheme that can be easily modified in `styles.css`:
- Primary: `#20B2AA` (Teal)
- Accent: `#FF6B35` (Orange)
- Success: `#28a745` (Green)
- Warning: `#ffc107` (Yellow)
- Danger: `#dc3545` (Red)

### Animations
Animation durations and effects can be adjusted in the CSS file:
- Page transitions: 0.5s
- Button interactions: 0.15s
- Progress bars: 0.8s
- Toast notifications: 0.3s

### Adding New Features
The modular JavaScript structure makes it easy to add new functionality:
- New screens can be added to the HTML
- Navigation items can be extended
- Additional interactive elements can be implemented

## Future Enhancements

This prototype provides a solid foundation for:
- **Real API Integration**: Connect to backend services
- **Data Persistence**: Save user preferences and settings
- **Advanced Filtering**: Search and sort functionality
- **User Authentication**: Login and role-based access
- **Real-time Updates**: WebSocket integration for live data
- **Export Features**: PDF reports and data export
- **Mobile App**: Progressive Web App (PWA) capabilities

## Support

For questions or suggestions about this prototype, please refer to the code comments or create an issue in the project repository.

---

**Note**: This is a prototype for demonstration purposes. For production use, additional security, accessibility, and performance optimizations would be required.
