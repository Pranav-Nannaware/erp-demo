# CSMSS College of Engineering - Student Portal

## Installation & Setup Instructions

### Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (version 18.0 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn** package manager
- **Git** (for cloning the repository) - [Download here](https://git-scm.com/)

### Step 1: Clone the Repository

```bash
# Clone the repository
git clone <repository-url>
cd userflow-boost
```

### Step 2: Install Dependencies

```bash
# Using npm
npm install

# OR using yarn
yarn install
```

### Step 3: Start the Development Server

```bash
# Using npm
npm run dev

# OR using yarn
yarn dev
```

The application will be available at `http://localhost:5173`

### Step 4: Build for Production

```bash
# Using npm
npm run build

# OR using yarn
yarn build
```

### Step 5: Preview Production Build

```bash
# Using npm
npm run preview

# OR using yarn
yarn preview
```

## Demo Credentials

The application comes with pre-configured demo accounts for testing:

### Admin Account
- **Email:** admin@college.edu
- **Password:** admin123
- **Access:** Full administrative privileges

### Student Account
- **Email:** student@college.edu
- **Password:** student123
- **Access:** Student portal features

### Faculty Account
- **Email:** faculty@college.edu
- **Password:** faculty123
- **Access:** Faculty management features

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint for code quality

## Technology Stack

- **Frontend Framework:** React 18
- **Build Tool:** Vite
- **Language:** TypeScript
- **UI Library:** shadcn/ui
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Charts:** Recharts
- **Routing:** React Router DOM
- **State Management:** React Query (TanStack Query)

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── layouts/        # Layout components (Admin, Student, Faculty)
│   └── ui/            # shadcn/ui components
├── pages/             # Page components
│   ├── admin/         # Admin-specific pages
│   ├── student/       # Student-specific pages
│   ├── faculty/       # Faculty-specific pages
│   └── Auth.tsx       # Authentication page
├── hooks/             # Custom React hooks
├── lib/               # Utility functions
└── main.tsx           # Application entry point
```

## Browser Support

This application supports all modern browsers:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

### Common Issues

1. **Port already in use**
   ```bash
   # Kill process using port 5173
   npx kill-port 5173
   # Then restart the dev server
   npm run dev
   ```

2. **Node modules issues**
   ```bash
   # Clear node_modules and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **TypeScript errors**
   ```bash
   # Check TypeScript configuration
   npx tsc --noEmit
   ```

### Getting Help

If you encounter any issues:

1. Check the console for error messages
2. Ensure all dependencies are installed correctly
3. Verify Node.js version compatibility
4. Check the browser developer tools for any runtime errors

## Development Notes

- The application uses hardcoded data for demo purposes
- No database connection is required
- All user sessions are stored in localStorage
- The application is fully responsive and mobile-friendly

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is for demonstration purposes only.
