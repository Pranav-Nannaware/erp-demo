# CSMSS College of Engineering - Student Portal

A comprehensive college management system built with React, TypeScript, and modern web technologies. This application provides separate portals for students, faculty, and administrators with role-based access control.

## 🚀 Quick Start

### Prerequisites
- Node.js (version 18.0 or higher)
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd userflow-boost

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

## 🔐 Demo Credentials

### Admin Account
- **Email:** admin@college.edu
- **Password:** admin123

### Student Account
- **Email:** student@college.edu
- **Password:** student123

### Faculty Account
- **Email:** faculty@college.edu
- **Password:** faculty123

## ✨ Key Features

### 🎓 Student Portal
- **Dashboard:** Academic overview with quick stats
- **Attendance:** Track class attendance and performance
- **Results:** View grades and academic performance
- **Assignments:** Manage assignments and submissions
- **Timetable:** Weekly class schedule
- **Notifications:** Stay updated with announcements
- **Profile:** Manage personal information

### 👨‍🏫 Faculty Portal
- **Dashboard:** Teaching overview and metrics
- **Classes:** Manage assigned courses
- **Students:** Track student performance and attendance
- **Quick Actions:** Mark attendance, upload assignments

### 👨‍💼 Admin Portal
- **Dashboard:** College statistics and overview
- **Students:** Manage student records
- **Attendance:** Mark and track attendance
- **Announcements:** Create and manage college announcements
- **Reports:** Generate analytics and reports

## 🛠️ Technology Stack

- **Frontend:** React 18 with TypeScript
- **Build Tool:** Vite
- **UI Library:** shadcn/ui
- **Styling:** Tailwind CSS
- **Charts:** Recharts
- **Icons:** Lucide React
- **Routing:** React Router DOM
- **State Management:** React Query

## 📱 Responsive Design

The application is fully responsive and works seamlessly across:
- Desktop computers
- Tablets
- Mobile phones

## 🎨 UI/UX Features

- Modern, clean interface design
- Intuitive navigation
- Interactive charts and visualizations
- Real-time notifications
- Mobile-first responsive design
- Accessibility compliant

## 📊 Demo Data

The application includes comprehensive hardcoded data for demonstration:
- Student records and profiles
- Course information and schedules
- Attendance data and reports
- Academic results and grades
- Notifications and announcements
- Faculty and department information

## 🚀 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint

# Production
npm run build:dev    # Build in development mode
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── layouts/        # Layout components
│   └── ui/            # shadcn/ui components
├── pages/             # Page components
│   ├── admin/         # Admin pages
│   ├── student/       # Student pages
│   ├── faculty/       # Faculty pages
│   └── Auth.tsx       # Authentication
├── hooks/             # Custom React hooks
├── lib/               # Utility functions
└── main.tsx           # Application entry point
```

## 🔧 Development

### Code Quality
- TypeScript for type safety
- ESLint for code quality
- Prettier for code formatting
- Consistent coding standards

### Performance
- Code splitting and lazy loading
- Optimized bundle size
- Efficient rendering
- Image optimization

## 📚 Documentation

- [Installation Guide](INSTALLATION.md) - Detailed setup instructions
- [Features Documentation](FEATURES.md) - Comprehensive feature list

## 🌟 Highlights

- **Role-based Access Control:** Different interfaces for different user types
- **Real-time Updates:** Dynamic data updates and notifications
- **Interactive Charts:** Visual data representation
- **Mobile Responsive:** Works on all devices
- **Modern UI:** Clean, professional design
- **Type Safety:** Full TypeScript support
- **Performance Optimized:** Fast loading and smooth interactions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is for demonstration purposes only.

## 🆘 Support

For technical support or questions:
1. Check the documentation
2. Review the demo credentials
3. Check browser console for errors
4. Ensure all dependencies are installed

---

**Note:** This is a demonstration application with hardcoded data designed to showcase a college management system's user interface and functionality.
