import React, { useReducer } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Auth from './pages/Auth';
import Home from './pages/Home';
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
      <IonApp>
        <IonReactRouter>
          <IonRouterOutlet>
            <Switch>
              <Route path="/auth" component={Auth} exact />
              <Route path="/" render={() => <Redirect to="/colors" />} exact />
              <Home />
            </Switch>
          </IonRouterOutlet>
        </IonReactRouter>
      </IonApp>
    </AppContext.Provider>
  );
};

export default App;
