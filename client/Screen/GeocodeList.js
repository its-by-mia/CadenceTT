import React, { Component } from "react";
import { FlatList } from "react-native";
import {
  Container,
  Content,
  List,
  ListItem,
  Text,
  Icon,
  Right,
  Left,
  Header,
  Button,
  Body,
  Title
} from "native-base";
import SecurityService from "../security/SecurityService";

// Redux
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

// Custom Actions


// START IMPORT ACTIONS
import GeocodeActions from "../redux/actions/GeocodeActions";

// END IMPORT ACTIONS

/** APIs

* actionsGeocode.list
*	@description CRUD ACTION list
*	@param String class
*

**/

class GeocodeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: props.list,
      authorized: false
    };
  }

  // Load data on start
  componentWillMount() {
    this.props.navigation.addListener("willFocus", async () => { 
      // Check security
      if (await SecurityService.isAuth([  ])) {
        this.setState({ authorized: true });
      } else {
        this.props.navigation.navigate("Login", {
          showError: "Not authorized"
        });
        return;
      }


      // Load list
      this.props.actionsGeocode.loadGeocodeList();
    });
  }

  // Receive props
  componentWillReceiveProps(props) {
    this.setState({
      ...this.state,
      list: props.list
    });
  }

  deleteRow(secId, rowId, rowMap, data) {
    let that = this;
    this.props.actionsGeocode.deleteGeocode(data._id).then(() => {
      rowMap[`${secId}${rowId}`].props.closeRow();
      const newData = that.state.list;
      newData.splice(rowId, 1);
      that.setState({
        list: newData
      });
    });
  }

  render() { 

    // Check security
    if (!this.state.authorized) {
      return null;
    }

    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>List Geocode</Title>
          </Body>
          <Right>
            <Button
              transparent
              name="menu"
              onPress={() => this.props.navigation.navigate("GeocodeEdit")}
            >
              <Text>Add</Text>
            </Button>
          </Right>
        </Header>
        <Content>
          <FlatList
            data={this.state.list}
            renderItem={({ item }) => (
              <ListItem
                noIndent
                onPress={() =>
                  this.props.navigation.navigate("GeocodeEdit", {
                    id: item._id
                  })
                }
              >
                <Left>
                  <Text>{item._id}</Text>
                </Left>
                <Right>
                  <Icon name="arrow-forward" />
                </Right>
              </ListItem>
            )}
            renderRightHiddenRow={(data, secId, rowId, rowMap) => (
              <Button
                full
                danger
                onPress={_ => this.deleteRow(secId, rowId, rowMap, data)}
              >
                <Icon active name="trash" />
              </Button>
            )}
          />
          {this.state.list && this.state.list.length == 0 && (
            <List>
              <ListItem>
                <Text>No elements found</Text>
              </ListItem>
            </List>
          )}
        </Content>
      </Container>
    );
  }
}

// Store actions
const mapDispatchToProps = function(dispatch) {
  return { 
    actionsGeocode: bindActionCreators(GeocodeActions, dispatch),
  };
};

// Validate types
GeocodeList.propTypes = { 
  actionsGeocode: PropTypes.object.isRequired,
};

// Get props from state
function mapStateToProps(state, ownProps) {
  return {
    list: state.GeocodeListReducer.listGeocode
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GeocodeList);
