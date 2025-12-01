# Biogleam Frontend

React frontend application for Biogleam marketing website.

## Tech Stack

- **React 18** with **Create React App**
- **TypeScript**
- **TailwindCSS** for styling
- **React Router** for navigation
- **React Query** for server state management
- **React Helmet Async** for SEO
- **Axios** for API calls

## Getting Started

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and set:
   ```
   REACT_APP_API_URL=http://localhost:4000/api/v1
   ```

3. **Start development server:**
   ```bash
   npm start
   ```

   The app will open at `http://localhost:3000`

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `REACT_APP_API_URL` | Backend API URL | `http://localhost:4000/api/v1` |

## Project Structure

```
biogleam-frontend/
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── components/     # Reusable components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── ServiceCard.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── PricingCard.tsx
│   │   ├── ContactForm.tsx
│   │   └── Layout.tsx
│   ├── pages/          # Page components
│   │   ├── Home.tsx
│   │   ├── About.tsx
│   │   ├── Services.tsx
│   │   ├── Projects.tsx
│   │   ├── ProjectDetail.tsx
│   │   ├── Pricing.tsx
│   │   ├── Blog.tsx
│   │   ├── BlogPost.tsx
│   │   ├── Contact.tsx
│   │   ├── Login.tsx
│   │   └── Signup.tsx
│   ├── lib/
│   │   └── api.ts      # API client
│   ├── App.tsx
│   ├── index.tsx       # Entry point
│   └── index.css       # Tailwind styles
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── postcss.config.js
```

## Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App (irreversible)

## Pages

- `/` - Home page
- `/about` - About page
- `/services` - Services page
- `/projects` - Projects listing
- `/projects/:slug` - Project detail
- `/pricing` - Pricing page
- `/blog` - Blog listing
- `/blog/:slug` - Blog post detail
- `/contact` - Contact form
- `/login` - User login
- `/signup` - User registration

## Deployment

### Vercel

1. Connect your repository
2. Set build command: `npm run build`
3. Set output directory: `build`
4. Add environment variable: `REACT_APP_API_URL`

### Netlify

1. Connect your repository
2. Set build command: `npm run build`
3. Set publish directory: `build`
4. Add environment variable: `REACT_APP_API_URL`

## Notes

- Make sure the backend API is running and accessible
- Update `REACT_APP_API_URL` for production deployment
- All API calls are handled through `src/lib/api.ts`

