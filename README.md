# 🎓 EduStake – Learn. Commit. Earn.

EduStake is a Web3-powered, AI-enhanced learning platform designed to keep learners motivated through staking-based accountability. Users commit a refundable token amount before learning. If they complete the course and pass the quiz, they get their stake back — and even a reward for scoring 100%!

## 📑 About

EduStake helps users stay committed to their learning journey by implementing a stake-to-learn model. The platform features:
- AI-powered learning assistance
- Interactive quizzes with token rewards
- Web3 integration for staking and earning
- Comprehensive course marketplace

## 🚀 Tech Stack

### Frontend
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [GSAP](https://greensock.com/gsap/) for animations

### Authentication
- [Firebase Authentication](https://firebase.google.com/products/auth)

### Backend
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- Backend Repository: [anurag2787/EduStake-Backend](https://github.com/anurag2787/EduStake-Backend)

### Blockchain Integration
- [MetaMask](https://metamask.io/)
- [Web3.js](https://web3js.readthedocs.io/) / [ethers.js](https://docs.ethers.org/)

## 🌟 Key Features

- **Secure Authentication**: Login with Email/Password, Google OAuth, or MetaMask wallet
- **AI-Powered Learning**: Summaries, flashcards, and interactive mind maps
- **Token Staking**: Commit tokens and earn them back upon completion
- **Interactive Quizzes**: Test knowledge with rewards for high performance
- **User Dashboard**: Track progress and compete on leaderboards

## 📂 Project Structure

| Route           | Description                                                |
|-----------------|------------------------------------------------------------|
| `/`             | Home page with platform features and benefits              |
| `/login`        | Authentication page with Firebase Auth & MetaMask          |
| `/profile`      | User dashboard with learning progress and rewards          |
| `/studycourses` | Browse and subscribe to available courses                  |
| `/learncourse`  | Access learning material and AI-powered features           |

## 🛠️ Installation & Setup

```bash
# Clone repository
git clone https://github.com/anurag2787/edustake.git
cd edustake

# Install dependencies
npm install

# Create .env.local file with your environment variables
# (See configuration section below)

# Start development server
npm run dev
```

## ⚙️ Configuration

Create a `.env` file in the root directory with the following variables:

```
# Backend URL
NEXT_PUBLIC_PUBLIC_BACKEND_URL=BACKEND_URL

# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

## 🔄 API Integration

This frontend connects to the EduStake backend service for:
- User data management
- Course content delivery
- Quiz processing and scoring
- Token staking and rewards

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 👨‍💻 Author

**Anurag Yadav**  
B.Tech @ IIIT Lucknow

---

> **EduStake: Where your commitment powers your knowledge and earns your reward!**
