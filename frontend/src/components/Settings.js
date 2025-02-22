import React, { useState } from 'react';

const Settings = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [advancedSettings, setAdvancedSettings] = useState({
    featureA: false,
    featureB: false,
  });

  const handleLogin = () => {
    // Placeholder authentication logic
    if (username === 'admin' && password === 'password') {
      setIsAuthenticated(true);
    } else {
      alert('Invalid credentials');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername('');
    setPassword('');
  };

  const toggleFeature = (feature) => {
    setAdvancedSettings((prevSettings) => ({
      ...prevSettings,
      [feature]: !prevSettings[feature],
    }));
  };

  return (
    <div className="settings">
      {!isAuthenticated ? (
        <div className="login-form">
          <h2>Login</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
        </div>
      ) : (
        <div className="advanced-settings">
          <h2>Advanced Settings</h2>
          <div>
            <label>
              <input
                type="checkbox"
                checked={advancedSettings.featureA}
                onChange={() => toggleFeature('featureA')}
              />
              Enable Feature A
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                checked={advancedSettings.featureB}
                onChange={() => toggleFeature('featureB')}
              />
              Enable Feature B
            </label>
          </div>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default Settings;