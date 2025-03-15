# Components Directory Documentation

## Overview
The `src/components` directory contains all Vue components organized by functionality. Here's a detailed breakdown of each component:

## Authentication Components

### `User_Login.vue`
- Handles user authentication
- Features:
  - Email/password login
  - Google Sign-In
  - Error handling
  - Remember me functionality

### `User_Register.vue`
- Handles new user registration
- Features:
  - Form validation
  - Password strength check
  - Terms and conditions agreement
  - Error handling

### `ResetPassword.vue`
- Handles password recovery
- Features:
  - Email verification
  - Password reset link
  - Success/error messages

## User Components

### `User_Dashboard.vue`
- Main interface for logged-in users
- Features:
  - Welcome message
  - Quick actions
  - Recent activity
  - Navigation to other user features

### `EditUserProfile.vue`
- Allows users to edit their profile
- Features:
  - Profile picture upload
  - Personal information form
  - Validation
  - Save/cancel functionality

### `UserProfileDisplay.vue`
- Displays user profile information
- Features:
  - Profile picture display
  - Personal information view
  - Edit profile button
  - Responsive layout

## Admin Components

### `Admin_Dashboard.vue`
- Main interface for admin users
- Features:
  - User management
  - System statistics
  - Quick actions
  - Navigation to admin features

### `AdminManagement.vue`
- Handles user management for admins
- Features:
  - User list with search/filter
  - User details view
  - Role management
  - Account activation/deactivation

## Shared Components

### `LandingPage.vue`
- Application landing page
- Features:
  - Hero section
  - Features overview
  - Call-to-action buttons
  - Responsive design

### `HelloWorld.vue`
- Example component (can be removed)
- Features:
  - Basic template
  - Example props
  - Simple styling

## Component Relationships
- `User_Login.vue` and `User_Register.vue` work together for authentication
- `EditUserProfile.vue` and `UserProfileDisplay.vue` handle profile management
- `Admin_Dashboard.vue` and `AdminManagement.vue` provide admin functionality
- All components use shared services from `firebase.js`

## Best Practices
1. **Component Structure**:
   - Follow Vue single-file component structure
   - Use scoped styles
   - Maintain consistent naming conventions

2. **State Management**:
   - Use props for parent-to-child communication
   - Use events for child-to-parent communication
   - Use Vue's reactivity system for local state

3. **Styling**:
   - Use Tailwind utility classes
   - Add custom styles in scoped style section
   - Maintain consistent design patterns

4. **Error Handling**:
   - Display user-friendly error messages
   - Handle Firebase errors gracefully
   - Provide feedback for user actions

5. **Performance**:
   - Lazy load components where appropriate
   - Optimize Firebase queries
   - Use efficient rendering techniques
