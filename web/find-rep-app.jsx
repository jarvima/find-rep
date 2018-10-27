import React from "react";
import { render } from "react-dom";
import DevTools from "mobx-react-devtools";

import RepsList from "./components/RepsList";
import RepsModel from "./models/RepsModel";

const store = new RepsModel();

render(
    <div className="main">
        <DevTools />
        <RepsList store={store} />
    </div>,
    document.getElementById("root")
);

window.store = store;
