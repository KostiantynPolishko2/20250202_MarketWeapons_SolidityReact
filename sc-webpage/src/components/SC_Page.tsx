import React, {FC} from 'react';
import logo from '../logo.svg';
import './SC_Page.css';

const SC_Page: FC = () => {
  return (
    <div className="SC_App">
      <header className="SC_App-header">
        <img src={logo} className="SC_App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="SC_App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default SC_Page;
