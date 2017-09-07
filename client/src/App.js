import { default as React, Component } from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Map from "./App/Components/Map";

export default class App extends Component {
  render() {
    // @todo: routing, helmet etc
    return (
      <MuiThemeProvider>
        <Map />
      </MuiThemeProvider>
    );
  }
}