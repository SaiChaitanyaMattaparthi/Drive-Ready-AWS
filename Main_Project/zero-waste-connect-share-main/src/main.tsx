import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';
Amplify.configure(awsExports); // ✅ Connect Amplify Auth + other services

createRoot(document.getElementById("root")!).render(<App />);
