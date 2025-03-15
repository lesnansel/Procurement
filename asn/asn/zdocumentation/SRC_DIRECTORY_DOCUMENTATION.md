# src Directory Documentation

## Overview
The `src` directory contains all the application source code, organized into logical sections. Here's a breakdown of its structure and contents:

## Main Files

### `main.js`
- Application entry point
- Initializes Vue application
- Sets up Firebase authentication state listener
- Imports global styles (Tailwind CSS)
- Mounts the application

### `App.vue`
- Root component
- Contains the main router view
- Basic application layout and styling

### `router.js`
- Vue Router configuration
- Defines all application routes
- Implements navigation guards for authentication
- Handles role-based access control

### `firebase.js`
- Firebase configuration and initialization
- Exports Firebase services:
  - Authentication
  - Firestore
  - Storage
  - Realtime Database
- Contains helper functions for authentication

## Assets Directory (`src/assets`)
Contains global assets used throughout the application:
- `tailwind.css`: Tailwind CSS styles
- `logo.png`: Application logo
- `google-icon.png`: Google sign-in icon

## Components Directory (`src/components`)
Contains all Vue components, organized by functionality:

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

### Shared Components
- `LandingPage.vue`: Application landing page
- `HelloWorld.vue`: Example component (can be removed)

## Component Structure
Each component follows a consistent structure:
```vue
<template>
  <!-- Component HTML -->
</template>

<script>
// Component logic
</script>

<style scoped>
/* Component-specific styles */
</style>
```

## Best Practices in src Directory
1. **Component Organization**:
   - Components are grouped by functionality
   - Clear naming conventions
   - Single responsibility principle

2. **State Management**:
   - Uses Vue's reactivity system
   - Firebase integration for global state

3. **Styling**:
   - Tailwind CSS for utility classes
   - Scoped styles for component-specific CSS
   - Consistent design patterns

4. **Routing**:
   - Centralized route configuration
   - Protected routes with navigation guards
   - Lazy loading for better performance

5. **Error Handling**:
   - Global error handling in main.js
   - Component-level error states
   - User-friendly error messages

## Development Guidelines
1. **Adding New Components**:
   - Create new .vue file in appropriate subdirectory
   - Follow existing component structure
   - Add necessary route in router.js

2. **Styling**:
   - Prefer Tailwind utility classes
   - Use scoped styles for component-specific CSS
   - Maintain consistent design patterns

3. **Firebase Integration**:
   - Use firebase.js for all Firebase interactions
   - Follow security rules in Firebase console
   - Handle authentication state changes properly
