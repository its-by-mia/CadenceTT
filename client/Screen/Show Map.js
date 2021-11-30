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
import CollectiveActions from "../redux/actions/CollectiveActions";

// END IMPORT ACTIONS

/** APIs

* actionsGeocode.findByclass
*	@description CRUD ACTION findByclass
*	@param Objectid key - Id of the resource class to search
*
* actionsGeocode.findByr_owner
*	@description Search by findByr_owner
*	@param String key - Id of the resource r_owner to search
*
* actionsGeocode.list
*	@description CRUD ACTION list
*	@param String class
*
* actionsUser.list
*	@description CRUD ACTION list
*
* actionsCollective.findByr_members
*	@description CRUD ACTION findByr_members
*	@param Objectid key - Id of model to search for
*

**/

class Show Map extends React.Component {
  
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
              <Title>Show Map</Title>
            </Body>
            <Right />
          </Header>
          <Content>
            <List> 
              <ListItem noIndent onPress={() => this.props.navigation.navigate("GeocodeEdit")}>
                <Left>
                  <Text>GeocodeEdit</Text>
                </Left>
                <Right>
                  <Icon name="arrow-forward" />
                </Right>
              </ListItem>
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
    actionsGeocode: bindActionCreators(GeocodeActions, dispatch),
    actionsCollective: bindActionCreators(CollectiveActions, dispatch)
  };
};

// Validate types
Show Map.propTypes = {
  actionsUser: PropTypes.object.isRequired,
  actionsGeocode: PropTypes.object.isRequired,
  actionsCollective: PropTypes.object.isRequired
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
)(Show Map);
