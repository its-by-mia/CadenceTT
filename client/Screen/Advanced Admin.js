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
import CollectiveActions from "../redux/actions/CollectiveActions";

// END IMPORT ACTIONS

/** APIs

* actionsCollective.list
*	@description CRUD ACTION list
*

**/

class Advanced Admin extends React.Component {
  
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
              <Title>Advanced Admin</Title>
            </Body>
            <Right />
          </Header>
          <Content>
            <List> 
              <ListItem noIndent onPress={() => this.props.navigation.navigate("CollectiveList")}>
                <Left>
                  <Text>CollectiveList</Text>
                </Left>
                <Right>
                  <Icon name="arrow-forward" />
                </Right>
              </ListItem>
              <ListItem noIndent onPress={() => this.props.navigation.navigate("FilesystemList")}>
                <Left>
                  <Text>FilesystemList</Text>
                </Left>
                <Right>
                  <Icon name="arrow-forward" />
                </Right>
              </ListItem>
              <ListItem noIndent onPress={() => this.props.navigation.navigate("GeocodeList")}>
                <Left>
                  <Text>GeocodeList</Text>
                </Left>
                <Right>
                  <Icon name="arrow-forward" />
                </Right>
              </ListItem>
              <ListItem noIndent onPress={() => this.props.navigation.navigate("StakeholderList")}>
                <Left>
                  <Text>StakeholderList</Text>
                </Left>
                <Right>
                  <Icon name="arrow-forward" />
                </Right>
              </ListItem>
              <ListItem noIndent onPress={() => this.props.navigation.navigate("User Clockins")}>
                <Left>
                  <Text>User Clockins</Text>
                </Left>
                <Right>
                  <Icon name="arrow-forward" />
                </Right>
              </ListItem>
              <ListItem noIndent onPress={() => this.props.navigation.navigate("TreedataList")}>
                <Left>
                  <Text>TreedataList</Text>
                </Left>
                <Right>
                  <Icon name="arrow-forward" />
                </Right>
              </ListItem>
              <ListItem noIndent onPress={() => this.props.navigation.navigate("CollectiveList")}>
                <Left>
                  <Text>CollectiveList</Text>
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
    actionsCollective: bindActionCreators(CollectiveActions, dispatch)
  };
};

// Validate types
Advanced Admin.propTypes = {
  actionsUser: PropTypes.object.isRequired,
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
)(Advanced Admin);
