import React, { useState } from 'react';

import LoginScreen from './(tabs)/login';
import Chatbot from './main';


export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return loggedIn ? (
    <Chatbot />
  ) : (
    <LoginScreen onLogin={() => setLoggedIn(true)} />
  );
}
