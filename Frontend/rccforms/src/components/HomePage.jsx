import React from 'react';

function HomePage() {
  // Retrieve username from local storage
  const username = localStorage.getItem('username');

  return (
    <div>
      <h1>Welcome, {username}!</h1>
      <p>This is your personalized homepage.</p>
    </div>
  );
}

export default HomePage;
