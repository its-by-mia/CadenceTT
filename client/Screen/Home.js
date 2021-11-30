import React from "react";
import Sidebar from "../components/SideBar";
import {
  Container,
  Content,
  List,
  ListItem,
  Icon,
  Right,
  Left,
  Header,
  Body,
  Title,
  Drawer,
  Button,
  Text
} from "native-base";
import SecurityService from "../security/SecurityService";

// Redux
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

// Custom Actions
import UserActions from "../redux/actions/UserActions";

// START IMPORT ACTIONS
import GeocodeActions from "../redux/actions/GeocodeActions";

// END IMPORT ACTIONS

/** APIs

* actionsGeocode.create
*	@description create point set
*	@param String class
*
* actionsGeocode.get
*	@description CRUD ACTION get
*	@param ObjectId id - Id resource
*
* actionsUser.list
*	@description CRUD ACTION list
*

**/

class Home extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = { authorized: false };
  }

  componentWillMount() {

    this.props.navigation.addListener("willFocus", async () => {
      // Check security
      if (await SecurityService.isAuth([  ])) {
        this.setState({ authorized: true });
      } else {
        this.props.navigation.navigate("Login", {
          showError: "Not authorized"
        });
      }
    });

    // Close drawer on close
    this.props.navigation.addListener("didBlur", () => {
      if (this._drawer) this._drawer._root.close();
    });
  }

  static navigationOptions = {
    gesturesEnabled: false,
    swipeEnabled: false
  };

  closeDrawer() {
    this._drawer._root.close();
  }

  openDrawer() {
    this._drawer._root.open();
  }
  
  render() { 

    // Check security
    if (!this.state.authorized) {
      return null;
    }

    return (
      <Drawer
        ref={ref => {
          this._drawer = ref;
        }}
        // content={<Sidebar />}
        content={<Sidebar navigation={this.props.navigation} />}
        onClose={() => this.closeDrawer()}
      >
        <Container>
          <Header>
            <Left>
              <Button transparent>
                <Icon name="menu" onPress={() => this.openDrawer()} />
              </Button>
            </Left>
            <Body>
              <Title>Home</Title>
            </Body>
            <Right />
          </Header>
          <Content>
            <List> 
            </List>
          </Content>
        </Container>
      </Drawer>
    );
  }
}

// Store actions
const mapDispatchToProps = function(dispatch) {
  return { 
    actionsUser: bindActionCreators(UserActions, dispatch),
    actionsGeocode: bindActionCreators(GeocodeActions, dispatch)
  };
};

// Validate types
Home.propTypes = {
  actionsUser: PropTypes.object.isRequired,
  actionsGeocode: PropTypes.object.isRequired
};

// Get props from state
function mapStateToProps(state, ownProps) {
  return {
    user: state.LoginReducer.user
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
