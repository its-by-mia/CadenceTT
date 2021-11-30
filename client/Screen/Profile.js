// Dependencies
import React, { Component } from "react";
import { StyleSheet } from "react-native";
import {
  Header,
  Title,
  Container,
  Content,
  Body,
  Button,
  Text,
  Icon,
  Right,
  Left,
  Form,
  Item,
  Label,
  Input
} from "native-base";

// Redux
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

// Custom Actions
import UserActions from "../redux/actions/UserActions";
import SecurityService from "../security/SecurityService";

/** APIs

* UserService.changePassword
*	@description Change password of user from admin
*	@returns object
*

**/

class Profile extends Component {
  // Init Profile
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      openChangePwd: false
    };
  }

  async componentWillMount() {
    this.setState({
      user: await SecurityService.getUser()
    });
  }

  // Save user
  save() {
    this.setState({ showMessage: false });
    this.props.actionsUser.saveUser(this.state.user).then(async data => {
      await SecurityService.updateUser(this.state.user);
      this.setState({ showMessage: true });

      setTimeout(() => {
        this.setState({ showMessage: false });
      }, 3000);
    });
  }

  // Show contet
  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Profile</Title>
          </Body>
          <Right>
            <Button transparent onPress={this.save.bind(this)}>
              <Text>Save</Text>
            </Button>
          </Right>
        </Header>
        <Content>
          {this.state.showMessage && (
            <Text style={styles.message}>User updated</Text>
          )}
          <Form>
            <Item floatingLabel>
              <Label>Username</Label>
              <Input
                disabled
                value={
                  this.state.user.username &&
                  this.state.user.username.toString()
                }
              />
            </Item>

            <Item floatingLabel>
              <Label>Name</Label>
              <Input
                onChangeText={value =>
                  this.setState(Object.assign(this.state.user, { name: value }))
                }
                value={this.state.user.name && this.state.user.name.toString()}
              />
            </Item>

            <Item floatingLabel>
              <Label>Surname</Label>
              <Input
                onChangeText={value =>
                  this.setState(
                    Object.assign(this.state.user, { surname: value })
                  )
                }
                value={
                  this.state.user.surname && this.state.user.surname.toString()
                }
              />
            </Item>

            <Item floatingLabel>
              <Label>E-mail</Label>
              <Input
                onChangeText={value =>
                  this.setState(Object.assign(this.state.user, { mail: value }))
                }
                value={this.state.user.mail && this.state.user.mail.toString()}
              />
            </Item>
          </Form>

          <Button
            full
            primary
            style={styles.buttonChangePwd}
            onPress={() => this.props.navigation.navigate("ChangePwd")}
          >
            <Text> Change password </Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

// Store actions
const mapDispatchToProps = function(dispatch) {
  return {
    actionsUser: bindActionCreators(UserActions, dispatch)
  };
};

// Validate types
Profile.propTypes = {
  actionsUser: PropTypes.object.isRequired
};

// Get props from state
function mapStateToProps(state, ownProps) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);

const styles = StyleSheet.create({
  message: {
    marginTop: 20,
    marginBottom: 20,
    textAlign: "center",
    color: "white",
    backgroundColor: "green",
    padding: 10
  },
  buttonChangePwd: {
    marginTop: 40
  }
});
