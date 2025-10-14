# Password Vault - Secure Password Manager

A secure password manager built with Next.js, TypeScript, and MongoDB. Features client-side encryption to ensure your passwords are never stored in plaintext on the server.

## Features

- 🔐 **Secure Authentication** - Email/password authentication with JWT tokens
- 🔒 **Client-Side Encryption** - All vault data is encrypted before being sent to the server
- 🎲 **Password Generator** - Generate strong passwords with customizable options
- 🗄️ **Password Vault** - Store and manage your passwords securely
- 🔍 **Search & Filter** - Quickly find your stored passwords
- 📋 **Copy to Clipboard** - One-click password copying with auto-clear
- 🌙 **Dark Mode** - Toggle between light and dark themes
- 📱 **Responsive Design** - Works on desktop and mobile devices

## Tech Stack

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT tokens with bcrypt password hashing
- **Encryption**: CryptoJS for client-side encryption
- **UI Components**: Lucide React icons

## Security Features

- **Client-Side Encryption**: All sensitive data is encrypted using AES encryption before being sent to the server
- **Password Hashing**: User passwords are hashed using bcrypt with salt rounds
- **JWT Authentication**: Secure token-based authentication
- **No Plaintext Storage**: Server never stores unencrypted passwords

## Getting Started

### Prerequisites

- Node.js 18+ 
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd password-vault
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/password-vault
   NEXTAUTH_SECRET=your-secret-key-here
   NEXTAUTH_URL=http://localhost:3000
   ```

4. **Start MongoDB**
   Make sure MongoDB is running on your system. If using MongoDB Atlas, update the `MONGODB_URI` in your `.env.local` file.

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Usage

### First Time Setup

1. **Create an Account**: Click "Sign up" to create a new account
2. **Sign In**: Use your email and password to sign in
3. **Generate Passwords**: Use the password generator to create strong passwords
4. **Save to Vault**: Add passwords to your secure vault
5. **Manage Passwords**: Edit, delete, or search through your stored passwords

### Password Generator

- **Length Slider**: Adjust password length from 4 to 50 characters
- **Character Types**: Choose from uppercase, lowercase, numbers, and symbols
- **Exclude Similar**: Option to exclude confusing characters (0, O, 1, l, I)
- **Strength Indicator**: Visual password strength meter
- **Copy to Clipboard**: One-click copying with auto-clear after 2 seconds

### Vault Management

- **Add Items**: Store passwords with title, username, password, URL, and notes
- **Search**: Find items by title, username, URL, or notes
- **Edit**: Update any field of stored items
- **Delete**: Remove items with confirmation
- **Copy**: Copy passwords or usernames to clipboard

## Security Notes

### Encryption Details

- **Algorithm**: AES (Advanced Encryption Standard)
- **Key Derivation**: Uses NEXTAUTH_SECRET as the encryption key
- **Client-Side**: All encryption/decryption happens in the browser
- **Server Storage**: Only encrypted data is stored in the database

### Best Practices

1. **Use a Strong Master Password**: Your account password should be unique and strong
2. **Enable 2FA**: Consider enabling two-factor authentication for your account
3. **Regular Backups**: Export your vault data regularly
4. **Secure Environment**: Only use the app on trusted devices and networks

## Deployment

### Environment Variables for Production

```env
MONGODB_URI=your-production-mongodb-uri
NEXTAUTH_SECRET=your-production-secret-key
NEXTAUTH_URL=https://your-domain.com
```

### Deployment Options

- **Vercel**: Recommended for Next.js applications
- **Netlify**: Alternative deployment platform
- **Railway**: Full-stack deployment with database
- **DigitalOcean**: VPS deployment

## Development

### Project Structure

```
src/
├── app/                 # Next.js app directory
│   ├── api/            # API routes
│   │   ├── auth/       # Authentication endpoints
│   │   └── vault/      # Vault management endpoints
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Home page
├── components/         # React components
│   ├── Dashboard.tsx   # Main dashboard
│   ├── LoginForm.tsx  # Login form
│   ├── PasswordGenerator.tsx # Password generator
│   ├── RegisterForm.tsx # Registration form
│   ├── VaultForm.tsx   # Vault item form
│   ├── VaultItem.tsx   # Individual vault item
│   └── VaultList.tsx   # Vault items list
├── contexts/           # React contexts
│   └── AuthContext.tsx # Authentication context
└── lib/               # Utility libraries
    ├── encryption.ts   # Encryption utilities
    ├── mongodb.ts      # Database connection
    ├── models/         # Database models
    └── passwordGenerator.ts # Password generation logic
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, please open an issue in the repository or contact the development team.

---

**Security Notice**: This application uses client-side encryption to protect your data. However, always ensure you're using a secure connection (HTTPS) in production and keep your master password secure.