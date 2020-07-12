import React, { useReducer } from 'react';
import Routes from './routes';
import AppContext, { initialState } from './context/state';
import reducer from './context/reducer';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Theme variables */
import './theme/variables.css';

const App: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ ...state, dispatch }}>
      <Routes />
    </AppContext.Provider>
  );
};

export default App;
