import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {persistStore} from "redux-persist";
import {BrowserRouter as Router, Route} from "react-router-dom";
import {ConnectedRouter} from "react-router-redux";
import localForage from "localforage";

import App from "./components/App";
import "./index.css";
import configureStore from "./store/configureStore";
import rootSage from "./sagas";
import * as actions from "./actions";

const store = configureStore();
store.runSaga(rootSage);
persistStore(store, {storage: localForage}, () => {
    store.dispatch(actions.appStart());

    ReactDOM.render(
        <Provider store={store}>
            <ConnectedRouter history={store.history}>
                <Router>
                    <Route component={App}/>
                </Router>
            </ConnectedRouter>
        </Provider>
        , document.getElementById('root')
    );
});

