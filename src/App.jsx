import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { routes } from './routes';
import Home from './page/Home';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Rendre les routes dynamiques depuis le fichier routes.jsx */}
        {routes.map((route, index) => (
          (
            <Route
              key={index}
              path={route.path}
              element={route.component}
            />
          )
        ))}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
