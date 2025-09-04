# Jaundice Phototherapy System - Frontend

A comprehensive React-based frontend application for managing jaundice phototherapy treatment with real-time monitoring and Arduino device control.

## 🚀 Features

### 📊 Dashboard Overview

- Real-time session monitoring
- Environmental sensor data visualization
- Arduino connection status
- Treatment statistics and analytics

### 👥 Patient Management

- Complete patient registration system
- Patient records with medical information
- Search and filter capabilities
- CRUD operations with form validation

### 🏥 Session Management

- Start and monitor phototherapy sessions
- Real-time progress tracking
- Session history and analytics
- WebSocket-powered live updates

### 🔌 Arduino Control

- Hardware device connection management
- Phototherapy mode control (Low/High/Both/Off)
- Fan control for temperature regulation
- Emergency stop functionality
- Real-time sensor monitoring (Temperature, Humidity, Fan status)

### 🎨 Animated UI Components

- **LED Mode Icons**: Pulsing/bouncing animations based on intensity
- **Fan Control**: Spinning animation when active
- **Connection Status**: Dynamic status indicators
- **Real-time Updates**: Smooth data transitions

## 🛠 Technology Stack

- **Framework**: React 18 with TypeScript
- **Routing**: React Router v6
- **State Management**: Zustand with persistence
- **UI Components**: Shadcn/ui with Tailwind CSS
- **Icons**: Tabler Icons with animations
- **HTTP Client**: Axios with interceptors
- **Real-time**: Socket.IO client
- **Forms**: React Hook Form with Zod validation
- **Notifications**: Sonner toast notifications
- **Data Fetching**: TanStack Query (React Query)

## 📁 Project Structure

```
src/
├── apis/                 # API service functions
│   ├── arduino.ts       # Arduino device control
│   ├── auth.ts          # Authentication
│   ├── measurements.ts  # Sensor data
│   ├── patients.ts      # Patient management
│   └── sessions.ts      # Session management
├── components/          # Reusable components
│   ├── ui/             # Shadcn UI components
│   ├── arduino-control-panel.tsx
│   ├── patient-management.tsx
│   └── session-management.tsx
├── hooks/              # Custom React hooks
│   ├── auth.ts         # Authentication hooks
│   └── jaundice-hooks.ts # System-specific hooks
├── lib/                # Utility libraries
│   ├── axios.ts        # HTTP client setup
│   └── websocket.ts    # WebSocket service
├── pages/              # Route components
│   └── dashboard/      # Dashboard pages
├── stores/             # Zustand state stores
│   ├── arduino-store.ts
│   ├── auth-store.ts
│   ├── measurements-store.ts
│   ├── patients-store.ts
│   └── sessions-store.ts
└── types/              # TypeScript definitions
    └── index.d.ts
```

## 🔧 Setup & Installation

### Prerequisites

- Node.js 18+
- npm or pnpm
- Backend API running on localhost:3000

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd frontend

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Start development server
npm run dev
```

### Environment Variables

```env
VITE_API_URL=http://localhost:3000
VITE_WS_URL=http://localhost:3000
VITE_SIGN_IN_URL=/auth/sign-in
VITE_SIGN_UP_URL=/auth/sign-up
```

## 🎯 Usage Guide

### 1. Dashboard Overview

- Access real-time system status
- Monitor active sessions
- View environmental conditions
- Check Arduino connection status

### 2. Patient Management

- **Add Patient**: Complete form with medical details
- **Edit Patient**: Update patient information
- **Delete Patient**: Remove patient records
- **Search**: Filter by name, mother's name, or phone

### 3. Session Management

- **Start Session**: Select patient, set TSB level, duration, and mode
- **Monitor Progress**: Real-time progress bars and sensor data
- **Stop Session**: Manual session termination
- **History**: View completed and stopped sessions

### 4. Arduino Control

- **Connection**: Select serial port and connect to device
- **Mode Control**: Set phototherapy intensity (Low/High/Both/Off)
- **Fan Control**: Temperature regulation system
- **Emergency Stop**: Immediate system shutdown
- **Statistics**: Communication metrics and diagnostics

## 🔄 Real-time Features

### WebSocket Events

- `session_started` - New session notifications
- `session_data_update` - Live sensor readings
- `session_finished` - Session completion alerts
- `session_stopped_manual` - Manual stop notifications

### Live Data Updates

- Temperature and humidity readings (every second)
- Fan status changes
- Arduino connection status
- Session progress tracking

## 🎨 UI/UX Features

### Responsive Design

- Mobile-first approach
- Tablet and desktop optimized
- Sidebar navigation with collapsible menu

### Accessibility

- Keyboard navigation support
- Screen reader compatible
- High contrast mode support
- Focus management

### Animations & Feedback

- **LED Icons**: Pulse (low), bounce (high), spin (both)
- **Fan Icons**: Spinning animation when active
- **Progress Bars**: Smooth transitions
- **Toast Notifications**: Success/error feedback
- **Loading States**: Skeleton screens and spinners

## 🔐 Security & Best Practices

### Authentication

- JWT token-based authentication
- Automatic token refresh
- Secure local storage
- Route protection

### Data Validation

- Client-side form validation
- Type-safe API responses
- Error boundary implementation
- Input sanitization

### Performance

- Code splitting by routes
- Lazy loading of components
- Optimized bundle size
- Efficient re-rendering

## 📱 Responsive Breakpoints

```css
/* Mobile */
@media (max-width: 768px) {
  ...;
}

/* Tablet */
@media (768px - 1024px) {
  ...;
}

/* Desktop */
@media (1024px+) {
  ...;
}
```

## 🚨 Error Handling

### API Errors

- Network failure handling
- Server error responses
- Timeout management
- Retry mechanisms

### UI Error States

- Form validation errors
- Loading states
- Empty states
- Connection loss indicators

## 🧪 Testing Strategy

### Unit Tests

- Component testing with React Testing Library
- Store testing with Zustand
- API service testing

### Integration Tests

- End-to-end workflows
- Real-time communication testing
- Arduino device simulation

## 🔧 Development Tools

### Code Quality

- ESLint configuration
- Prettier formatting
- TypeScript strict mode
- Husky pre-commit hooks

### Development Experience

- Hot module replacement
- Source maps
- Development server
- Browser dev tools integration

## 📈 Performance Monitoring

### Metrics Tracking

- Real-time data update frequency
- WebSocket connection stability
- API response times
- User interaction tracking

### Optimization

- Bundle size monitoring
- Component render optimization
- Memory leak prevention
- Network request optimization

## 🔮 Future Enhancements

### Planned Features

- Multi-language support
- Advanced analytics dashboard
- Mobile app version
- Offline mode support
- Data export functionality
- Advanced reporting system

### Technical Improvements

- PWA capabilities
- Enhanced accessibility
- Performance optimizations
- Advanced testing coverage

## 🤝 Contributing

1. Follow the established coding patterns
2. Use TypeScript for type safety
3. Implement proper error handling
4. Add appropriate animations for user feedback
5. Maintain responsive design principles
6. Write comprehensive tests

## 📞 Support

For technical support or questions about the jaundice phototherapy system:

- Create an issue in the repository
- Contact the development team
- Refer to the API documentation

---

**Built with ❤️ for better healthcare outcomes**
