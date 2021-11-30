// Dependencies
import React, { Component } from "react";
import { createAppContainer, createStackNavigator } from "react-navigation";

// Screens
import LoginScreen from "./Screen/LoginScreen";
import Home from "./Screen/Home";
import Profile from "./Screen/Profile";
import ChangePwd from "./Screen/ChangePwd";

/* START MY SCREENS IMPORT */

import Activate account from "./Screen/Activate account";
import Advanced Admin from "./Screen/Advanced Admin";
import CollectiveEdit from "./Screen/CollectiveEdit";
import CollectiveList from "./Screen/CollectiveList";
import FilesystemEdit from "./Screen/FilesystemEdit";
import FilesystemList from "./Screen/FilesystemList";
import GeocodeEdit from "./Screen/GeocodeEdit";
import GeocodeList from "./Screen/GeocodeList";
import Login from "./Screen/Login";
import Logout from "./Screen/Logout";
import Show Map from "./Screen/Show Map";
import StakeholderEdit from "./Screen/StakeholderEdit";
import StakeholderList from "./Screen/StakeholderList";
import TreedataEdit from "./Screen/TreedataEdit";
import TreedataList from "./Screen/TreedataList";
import User Clockins from "./Screen/User Clockins";
import UserEdit from "./Screen/UserEdit";

/* END MY SCREENS IMPORT */

class AppContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const AppNavigator = createStackNavigator(
      {
        Login: { screen: LoginScreen },
        Home: { screen: Home },
        Profile: { screen: Profile },
        ChangePwd: { screen: ChangePwd },

        /* START MY SCREENS */

    Activate account: { screen: Activate account },
    Advanced Admin: { screen: Advanced Admin },
    CollectiveEdit: { screen: CollectiveEdit },
    CollectiveList: { screen: CollectiveList },
    FilesystemEdit: { screen: FilesystemEdit },
    FilesystemList: { screen: FilesystemList },
    GeocodeEdit: { screen: GeocodeEdit },
    GeocodeList: { screen: GeocodeList },
    Login: { screen: Login },
    Logout: { screen: Logout },
    Show Map: { screen: Show Map },
    StakeholderEdit: { screen: StakeholderEdit },
    StakeholderList: { screen: StakeholderList },
    TreedataEdit: { screen: TreedataEdit },
    TreedataList: { screen: TreedataList },
    User Clockins: { screen: User Clockins },
    UserEdit: { screen: UserEdit },
    
     /* END MY SCREENS */
      },
      {
        initialRouteName: this.props.user ? "Home" : "Login",
        headerMode: "none"
      }
    );

    const AppContainerRouter = createAppContainer(AppNavigator);

    return <AppContainerRouter />;
  }
}

export default AppContainer;
