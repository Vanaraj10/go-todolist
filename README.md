# 🌟 Modern Todo List Application

A beautiful, full-stack todo list application built with **Go** (backend) and **React** (frontend) featuring a stunning dark theme UI with glass morphism effects.

![Todo App Preview](https://via.placeholder.com/800x400/0f0f23/ffffff?text=Modern+Todo+App)

## ✨ Features

### 🎨 **Beautiful Dark Theme UI**
- Glass morphism design with backdrop blur effects
- Gradient backgrounds and smooth animations
- Custom SVG icons throughout the application
- Responsive design that works on all devices
- Modern typography with Inter font family

### 🔐 **Authentication System**
- User registration and login
- JWT-based authentication
- Secure password handling
- Protected routes

### 📝 **Todo Management**
- Create, read, update, and delete todos
- Mark todos as complete/incomplete
- Filter todos by status (All, Pending, Completed)
- Real-time statistics dashboard
- Rich text descriptions for todos

### 🚀 **Modern Tech Stack**
- **Backend**: Go with Gin framework
- **Frontend**: React with Vite
- **Database**: SQLite (easily configurable)
- **Styling**: Tailwind CSS with custom dark theme
- **Authentication**: JWT tokens
- **State Management**: React Context API

## 🛠️ Technology Stack

### Backend
- **Go 1.21+**
- **Gin** - HTTP web framework
- **GORM** - ORM library
- **SQLite** - Database
- **JWT** - Authentication
- **Bcrypt** - Password hashing

### Frontend
- **React 18**
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Axios** - HTTP client
- **Custom SVG Icons**

## 🚀 Getting Started

### Prerequisites
- **Go 1.21+** installed
- **Node.js 18+** and npm installed
- Git installed

### 🔧 Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/go-todolist.git
   cd go-todolist
   ```

2. **Backend Setup**
   ```bash
   cd backend
   go mod download
   go run main.go
   ```
   The backend server will start on `http://localhost:8080`

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   The frontend will start on `http://localhost:5173`

### 🌐 Production Deployment

This application is ready for deployment on Railway! See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

**Quick Deploy to Railway:**
1. Push your code to GitHub
2. Connect your repository to Railway
3. Railway will automatically detect and deploy both services
4. Configure environment variables as specified in the deployment guide

### 🌐 Environment Variables

Create a `.env` file in the backend directory:
```env
DB_CONNECTION=sqlite
DB_DATABASE=todos.db
JWT_SECRET=your-super-secret-jwt-key
PORT=8080
```

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Todos
- `GET /api/todos` - Get all todos for authenticated user
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/:id` - Update a todo
- `DELETE /api/todos/:id` - Delete a todo

## 🎨 UI Features

- **Glass Morphism Effects**: Beautiful translucent cards with backdrop blur
- **Gradient Backgrounds**: Stunning purple-to-slate gradients
- **Smooth Animations**: Fade-in, slide-up, and hover effects
- **Custom Icons**: Hand-crafted SVG icons for all UI elements
- **Responsive Design**: Perfect on desktop, tablet, and mobile
- **Dark Theme**: Easy on the eyes with carefully chosen colors

## 📱 Screenshots

### Login Page
Beautiful authentication with glass morphism effects and animated backgrounds.

### Dashboard
Clean, modern dashboard with statistics cards and smooth animations.

### Todo Management
Intuitive todo cards with status indicators and action buttons.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Icons inspired by Heroicons
- Color palette inspired by Tailwind CSS
- Glass morphism effects inspired by modern design trends

## 📧 Contact

Your Name - your.email@example.com
Project Link: [https://github.com/yourusername/go-todolist](https://github.com/yourusername/go-todolist)

---

⭐ **Star this repository if you found it helpful!** ⭐
