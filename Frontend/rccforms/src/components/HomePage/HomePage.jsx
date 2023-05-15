import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/Navbar.css';

function HomePage() {
  return (
    <div>

      <h1>Welcome to the Homepage!</h1>

      <nav>
        <ul>
          <li>
            <Link to="/userlist">User List</Link>
          </li>
          <li>
            <Link to="/openquestions">Open Questions</Link>
          </li>
          <li>
            <Link to="/mcquestions">Multiple Choice Questions</Link>
          </li>
        </ul>
      </nav>

    </div>
  );
}

export default HomePage;
