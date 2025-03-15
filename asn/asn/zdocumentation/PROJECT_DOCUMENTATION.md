# GovProcure Project Documentation

## Project Overview
GovPocure is a Vue.js 3 web application with Firebase backend integration, providing a comprehensive user management system with both user and admin roles.

## Technology Stack
- **Frontend Framework**: Vue.js 3
- **State Management**: Vue Router
- **Styling**: Tailwind CSS + Custom CSS
- **Backend**: Firebase (Authentication, Firestore, Storage)
- **Additional Libraries**:
  - Chart.js for data visualization
  - jsPDF for PDF generation
  - Lodash for utility functions
  - Lucide for icons

## Key Features
- User authentication (login/registration)
- Role-based access control (user/admin)
- Profile management
- Admin dashboard
- Data visualization
- PDF report generation
- Image upload and storage

## Project Structure
```
ecomist/
├── public/              # Static assets
├── src/
│   ├── assets/            # Global assets (CSS, images)
│   ├── components/         # Vue components
│   ├── firebase.js         # Firebase configuration
│   ├── main.js             # Application entry point
│   ├── router.js           # Routing configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── vue.config.js          # Vue CLI configuration
├── package.json           # Project dependencies
```

## Setup Instructions

### Prerequisites
- Node.js (v16+)
- Firebase project with Firestore and Storage enabled

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with your Firebase credentials:
   ```env
   VUE_APP_FIREBASE_API_KEY=your-api-key
   VUE_APP_FIREBASE_AUTH_DOMAIN=your-auth-domain
   VUE_APP_FIREBASE_PROJECT_ID=your-project-id
   VUE_APP_FIREBASE_STORAGE_BUCKET=your-storage-bucket
   VUE_APP_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
   VUE_APP_FIREBASE_APP_ID=your-app-id
   ```

### Running the Application
- Development server:
  ```bash
  npm run serve
  ```
- Production build:
  ```bash
  npm run build
  ```

## Key Components

### Authentication Components
- `User_Login.vue`: User login interface
- `User_Register.vue`: User registration form
- `ResetPassword.vue`: Password recovery

### User Components
- `User_Dashboard.vue`: Main user interface
- `EditUserProfile.vue`: Profile management
- `UserProfileDisplay.vue`: Profile view

### Admin Components
- `Admin_Dashboard.vue`: Admin interface
- `AdminManagement.vue`: User management

## Styling Approach
The project uses a combination of:
- **Tailwind CSS** for utility classes and base styling
- **Custom CSS** for component-specific styles
- **Scoped styles** in Vue components to prevent style conflicts

## Firebase Integration
The application uses Firebase for:
- User authentication
- Data storage (Firestore)
- File storage (Cloud Storage)
- Real-time database updates

## Best Practices
- Component-based architecture
- Role-based access control
- Form validation
- Error handling
- Responsive design
- Code linting and formatting
