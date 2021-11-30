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
  ListItem,
  Item,
  Label,
  Input,
  Picker,
  DatePicker,
} from "native-base";
import SecurityService from "../security/SecurityService";

// Redux
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

// Custom Actions


// START IMPORT ACTIONS
import FilesystemActions from "../redux/actions/FilesystemActions";
import CollectiveActions from "../redux/actions/CollectiveActions";
import GeocodeActions from "../redux/actions/GeocodeActions";
import StakeholderActions from "../redux/actions/StakeholderActions";

// END IMPORT ACTIONS

/** APIs

* actionsUser.create
*	@description CRUD ACTION create
*
* actionsUser.update
*	@description CRUD ACTION update
*	@param ObjectId id - Id
*
* actionsUser.get
*	@description CRUD ACTION get
*	@param ObjectId id - Id resource
*
* actionsFilesystem.findByr_owner
*	@description CRUD ACTION findByr_owner
*	@param Objectid key - Id of model to search for
*
* actionsCollective.findByr_members
*	@description CRUD ACTION findByr_members
*	@param Objectid key - Id of model to search for
*
* actionsCollective.findByr_owner
*	@description CRUD ACTION findByr_owner
*	@param Objectid key - Id of model to search for
*
* actionsGeocode.findByr_owner
*	@description Search by findByr_owner
*	@param String key - Id of the resource r_owner to search
*
* actionsStakeholder.findByr_owner
*	@description CRUD ACTION findByr_owner
*	@param Objectid key - Id of model to search for
*
* actionsGeocode.get
*	@description CRUD ACTION get
*	@param ObjectId id - Id resource
*

**/


class UserEdit extends Component {
  
  // Init user
  constructor(props) {
    super(props);
    this.state = {
      user: {},
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


      // Load data
      const itemId = this.props.navigation.getParam("id", "new");
      if (itemId !== "new") {
        this.props.actionsUser.loadUser(itemId);
        this.props.actionsCollective.findByr_members(itemId);
        this.props.actionsFilesystem.findByr_owner(itemId);
        this.props.actionsCollective.findByr_owner(itemId);
        this.props.actionsGeocode.findByr_owner(itemId);
        this.props.actionsStakeholder.findByr_owner(itemId);
      } else {
        this.setState({
          user: {}
        });
      }
      
    });
  }

  // Clear reducer
  componentWillUnmount() {
    this.setState({
      user: {}
    });
    this.props.actionsUser.reset();
  }

  // Insert props user in state
  componentWillReceiveProps(props) {
    this.setState({
      user: props.user
    });
  }

  // Save data
  save() {
    // Validation
    let errors = {};
    
    if (!this.state.user.mail_primary || this.state.user.mail_primary.trim() === "") {
      errors.mail_primary = true;
    }
    
    if (!this.state.user.msisdn || this.state.user.msisdn.trim() === "") {
      errors.msisdn = true;
    }
    
    if (!this.state.user.password || this.state.user.password.trim() === "") {
      errors.password = true;
    }
    
    if (!this.state.user.r_role || this.state.user.r_role.trim() === "") {
      errors.r_role = true;
    }
    
    if (!this.state.user.status || this.state.user.status.trim() === "") {
      errors.status = true;
    }
    
    if (!this.state.user.super_class || this.state.user.super_class.trim() === "") {
      errors.super_class = true;
    }
    
    if (!this.state.user.username || this.state.user.username.trim() === "") {
      errors.username = true;
    }
    

    this.setState({ errors: errors });
    if (Object.keys(errors).length > 0) {
      return;
    }

    // Save
    if (this.state.user._id) {
      // Edit
      this.props.actionsUser.saveUser(this.state.user).then(data => {
        this.props.navigation.navigate("UserList");
      });
    } else {
      // Create
      this.props.actionsUser.createUser(this.state.user).then(data => {
        this.props.navigation.navigate("UserList");
      });
    }
  }

  // Show content
  render() { 

    // Check security
    if (!this.state.authorized) {
      return null;
    }

    return (
      <Container>
        <Header>
          <Left>
            <Button
            transparent
            onPress={() => this.props.navigation.goBack()}
            >
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Detail User</Title>
          </Body>
          <Right>
            <Button transparent onPress={() => this.save()}>
              <Text>Save</Text>
            </Button>
          </Right>
        </Header>
        <Content>
          <Form>
            <Item stackedLabel>
              <Label>
                _created
              </Label>
              <DatePicker
                placeHolderText="Select a date"
                defaultDate={this.state.user._created }
                onDateChange={value => 
                  this.setState(Object.assign(this.state.user, { _created: value }))
                }
              />
            </Item>
            
            <Item stackedLabel>
              <Label>
                _expires
              </Label>
              <DatePicker
                placeHolderText="Select a date"
                defaultDate={this.state.user._expires }
                onDateChange={value => 
                  this.setState(Object.assign(this.state.user, { _expires: value }))
                }
              />
            </Item>
            
            <Item stackedLabel>
              <Label>
                _lastactive
              </Label>
              <DatePicker
                placeHolderText="Select a date"
                defaultDate={this.state.user._lastactive }
                onDateChange={value => 
                  this.setState(Object.assign(this.state.user, { _lastactive: value }))
                }
              />
            </Item>
            
            
            <Item floatingLabel>
              <Label>
                Address_1
              </Label>
              <Input
                onChangeText={value =>
                  this.setState(Object.assign(this.state.user, { address_1: value }))
                }
                value={this.state.user.address_1 && this.state.user.address_1.toString()}
              />
            </Item>
          
            
            <Item floatingLabel>
              <Label>
                Address_2
              </Label>
              <Input
                onChangeText={value =>
                  this.setState(Object.assign(this.state.user, { address_2: value }))
                }
                value={this.state.user.address_2 && this.state.user.address_2.toString()}
              />
            </Item>
          
            
            <Item floatingLabel>
              <Label>
                Address_3
              </Label>
              <Input
                onChangeText={value =>
                  this.setState(Object.assign(this.state.user, { address_3: value }))
                }
                value={this.state.user.address_3 && this.state.user.address_3.toString()}
              />
            </Item>
          
            
            <Item floatingLabel>
              <Label>
                Address_city
              </Label>
              <Input
                onChangeText={value =>
                  this.setState(Object.assign(this.state.user, { address_city: value }))
                }
                value={this.state.user.address_city && this.state.user.address_city.toString()}
              />
            </Item>
          
            
            <Item floatingLabel>
              <Label>
                Address_country
              </Label>
              <Input
                onChangeText={value =>
                  this.setState(Object.assign(this.state.user, { address_country: value }))
                }
                value={this.state.user.address_country && this.state.user.address_country.toString()}
              />
            </Item>
          
            
            <Item floatingLabel>
              <Label>
                Address_postalcode
              </Label>
              <Input
                onChangeText={value =>
                  this.setState(Object.assign(this.state.user, { address_postalcode: value }))
                }
                value={this.state.user.address_postalcode && this.state.user.address_postalcode.toString()}
              />
            </Item>
          
            
            <Item floatingLabel>
              <Label>
                Avatar
              </Label>
              <Input
                onChangeText={value =>
                  this.setState(Object.assign(this.state.user, { avatar: value }))
                }
                value={this.state.user.avatar && this.state.user.avatar.toString()}
              />
            </Item>
          
            
            <Item floatingLabel>
              <Label>
                Id_number
              </Label>
              <Input
                onChangeText={value =>
                  this.setState(Object.assign(this.state.user, { id_number: value }))
                }
                value={this.state.user.id_number && this.state.user.id_number.toString()}
              />
            </Item>
          
            
            <Item floatingLabel>
              <Label>
                Locale
              </Label>
              <Input
                onChangeText={value =>
                  this.setState(Object.assign(this.state.user, { locale: value }))
                }
                value={this.state.user.locale && this.state.user.locale.toString()}
              />
            </Item>
          
            
            <Item floatingLabel {...(this.state.errors && this.state.errors.mail_primary === true ? { style: styles.validatorItem } : {})}>
              <Label
                {...(this.state.errors && this.state.errors.mail_primary === true ? { style: styles.validatorLabel } : {})}>
                Mail_primary *
              </Label>
              <Input
                onChangeText={value =>
                  this.setState(Object.assign(this.state.user, { mail_primary: value }))
                }
                value={this.state.user.mail_primary && this.state.user.mail_primary.toString()}
              />
            </Item>
            {this.state.errors && this.state.errors.mail_primary === true && (
              <Text style={styles.validatorMessage}>Value is required</Text>
            )}
          
            
            <Item floatingLabel {...(this.state.errors && this.state.errors.msisdn === true ? { style: styles.validatorItem } : {})}>
              <Label
                {...(this.state.errors && this.state.errors.msisdn === true ? { style: styles.validatorLabel } : {})}>
                Msisdn *
              </Label>
              <Input
                onChangeText={value =>
                  this.setState(Object.assign(this.state.user, { msisdn: value }))
                }
                value={this.state.user.msisdn && this.state.user.msisdn.toString()}
              />
            </Item>
            {this.state.errors && this.state.errors.msisdn === true && (
              <Text style={styles.validatorMessage}>Value is required</Text>
            )}
          
            
            <Item floatingLabel>
              <Label>
                Name_first
              </Label>
              <Input
                onChangeText={value =>
                  this.setState(Object.assign(this.state.user, { name_first: value }))
                }
                value={this.state.user.name_first && this.state.user.name_first.toString()}
              />
            </Item>
          
            
            <Item floatingLabel>
              <Label>
                Name_last
              </Label>
              <Input
                onChangeText={value =>
                  this.setState(Object.assign(this.state.user, { name_last: value }))
                }
                value={this.state.user.name_last && this.state.user.name_last.toString()}
              />
            </Item>
          
            
            <Item floatingLabel>
              <Label>
                Name_title
              </Label>
              <Input
                onChangeText={value =>
                  this.setState(Object.assign(this.state.user, { name_title: value }))
                }
                value={this.state.user.name_title && this.state.user.name_title.toString()}
              />
            </Item>
          
            
            <Item floatingLabel>
              <Label>
                Nationality
              </Label>
              <Input
                onChangeText={value =>
                  this.setState(Object.assign(this.state.user, { nationality: value }))
                }
                value={this.state.user.nationality && this.state.user.nationality.toString()}
              />
            </Item>
          
            
            <Item floatingLabel>
              <Label>
                Opt_ins
              </Label>
              <Input
                onChangeText={value =>
                  this.setState(Object.assign(this.state.user, { opt_ins: value }))
                }
                value={this.state.user.opt_ins && this.state.user.opt_ins.toString()}
              />
            </Item>
          
            
            <Item floatingLabel>
              <Label>
                Opt_outs
              </Label>
              <Input
                onChangeText={value =>
                  this.setState(Object.assign(this.state.user, { opt_outs: value }))
                }
                value={this.state.user.opt_outs && this.state.user.opt_outs.toString()}
              />
            </Item>
          
            
            <Item floatingLabel {...(this.state.errors && this.state.errors.password === true ? { style: styles.validatorItem } : {})}>
              <Label
                {...(this.state.errors && this.state.errors.password === true ? { style: styles.validatorLabel } : {})}>
                Password *
              </Label>
              <Input
                onChangeText={value =>
                  this.setState(Object.assign(this.state.user, { password: value }))
                }
                value={this.state.user.password && this.state.user.password.toString()}
              />
            </Item>
            {this.state.errors && this.state.errors.password === true && (
              <Text style={styles.validatorMessage}>Value is required</Text>
            )}
          
            
            <Item floatingLabel>
              <Label>
                R_group
              </Label>
              <Input
                onChangeText={value =>
                  this.setState(Object.assign(this.state.user, { r_group: value }))
                }
                value={this.state.user.r_group && this.state.user.r_group.toString()}
              />
            </Item>
          
            
            <Item floatingLabel>
              <Label>
                R_parent
              </Label>
              <Input
                onChangeText={value =>
                  this.setState(Object.assign(this.state.user, { r_parent: value }))
                }
                value={this.state.user.r_parent && this.state.user.r_parent.toString()}
              />
            </Item>
          
            
            <Item floatingLabel>
              <Label>
                R_policy
              </Label>
              <Input
                onChangeText={value =>
                  this.setState(Object.assign(this.state.user, { r_policy: value }))
                }
                value={this.state.user.r_policy && this.state.user.r_policy.toString()}
              />
            </Item>
          
            
            <Item floatingLabel {...(this.state.errors && this.state.errors.r_role === true ? { style: styles.validatorItem } : {})}>
              <Label
                {...(this.state.errors && this.state.errors.r_role === true ? { style: styles.validatorLabel } : {})}>
                R_role *
              </Label>
              <Input
                onChangeText={value =>
                  this.setState(Object.assign(this.state.user, { r_role: value }))
                }
                value={this.state.user.r_role && this.state.user.r_role.toString()}
              />
            </Item>
            {this.state.errors && this.state.errors.r_role === true && (
              <Text style={styles.validatorMessage}>Value is required</Text>
            )}
          
            <Item stackedLabel {...(this.state.errors && this.state.errors.status === true ? { style: styles.validatorItem } : {})}>
              <Label
                {...(this.state.errors && this.state.errors.status === true ? { style: styles.validatorLabel } : {})}>
                Status *
              </Label>
              <Picker
                mode="dropdown"
                iosHeader="Select a value"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: undefined }}
                selectedValue={this.state.user.status }
                value={this.state.user.status }
                onValueChange={value =>
                  this.setState(Object.assign(this.state.user, { status: value }))
                }
              >
                <Picker.Item label="ACTIVE" value="ACTIVE" />
                <Picker.Item label="BLOCKED" value="BLOCKED" />
                <Picker.Item label="DELETED" value="DELETED" />
                <Picker.Item label="GUEST" value="GUEST" />
                <Picker.Item label="PAUSED" value="PAUSED" />
                <Picker.Item label="UNKNOWN" value="UNKNOWN" />
                <Picker.Item label="_INVITEE_" value="_INVITEE_" />
                <Picker.Item label="_PENDING_" value="_PENDING_" />
              </Picker>
            </Item>
            {this.state.errors && this.state.errors.status === true && (
              <Text style={styles.validatorMessage}>Value is required</Text>
            )}
            <Item stackedLabel {...(this.state.errors && this.state.errors.super_class === true ? { style: styles.validatorItem } : {})}>
              <Label
                {...(this.state.errors && this.state.errors.super_class === true ? { style: styles.validatorLabel } : {})}>
                Super_class *
              </Label>
              <Picker
                mode="dropdown"
                iosHeader="Select a value"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: undefined }}
                selectedValue={this.state.user.super_class }
                value={this.state.user.super_class }
                onValueChange={value =>
                  this.setState(Object.assign(this.state.user, { super_class: value }))
                }
              >
                <Picker.Item label="ADMIN" value="ADMIN" />
                <Picker.Item label="BACKOFFICE" value="BACKOFFICE" />
                <Picker.Item label="CONTRACT" value="CONTRACT" />
                <Picker.Item label="EXTERNAL" value="EXTERNAL" />
                <Picker.Item label="GENERAL" value="GENERAL" />
                <Picker.Item label="NOBODY" value="NOBODY" />
                <Picker.Item label="ROOT" value="ROOT" />
                <Picker.Item label="SUPERADMIN" value="SUPERADMIN" />
                <Picker.Item label="_UNDEFINED_" value="_UNDEFINED_" />
              </Picker>
            </Item>
            {this.state.errors && this.state.errors.super_class === true && (
              <Text style={styles.validatorMessage}>Value is required</Text>
            )}
            
            <Item floatingLabel>
              <Label>
                Tax_number
              </Label>
              <Input
                onChangeText={value =>
                  this.setState(Object.assign(this.state.user, { tax_number: value }))
                }
                value={this.state.user.tax_number && this.state.user.tax_number.toString()}
              />
            </Item>
          
            
            <Item floatingLabel {...(this.state.errors && this.state.errors.username === true ? { style: styles.validatorItem } : {})}>
              <Label
                {...(this.state.errors && this.state.errors.username === true ? { style: styles.validatorLabel } : {})}>
                Username *
              </Label>
              <Input
                onChangeText={value =>
                  this.setState(Object.assign(this.state.user, { username: value }))
                }
                value={this.state.user.username && this.state.user.username.toString()}
              />
            </Item>
            {this.state.errors && this.state.errors.username === true && (
              <Text style={styles.validatorMessage}>Value is required</Text>
            )}
          

          {/* RELATIONS */}
          
          {/* EXTERNAL RELATIONS */}
          
          {/* External relation with Collective */}

          
          {/* External relation with Filesystem */}

          
          {/* External relation with Collective */}

          
          {/* External relation with Geocode */}

          
          {/* External relation with Stakeholder */}

          

          </Form>
        </Content>
      </Container>
    );
  }
}

// Store actions
const mapDispatchToProps = function(dispatch) {
  return { 
    actionsFilesystem: bindActionCreators(FilesystemActions, dispatch),
    actionsCollective: bindActionCreators(CollectiveActions, dispatch),
    actionsGeocode: bindActionCreators(GeocodeActions, dispatch),
    actionsStakeholder: bindActionCreators(StakeholderActions, dispatch),
  };
};

// Validate types
UserEdit.propTypes = { 
  actionsFilesystem: PropTypes.object.isRequired,
  actionsCollective: PropTypes.object.isRequired,
  actionsGeocode: PropTypes.object.isRequired,
  actionsStakeholder: PropTypes.object.isRequired,
};

// Get props from state
function mapStateToProps(state, ownProps) {
  return {
    user: state.UserEditReducer.user,
    listCollective: state.UserEditReducer.listCollective,
    listFilesystem: state.UserEditReducer.listFilesystem,
    listCollective: state.UserEditReducer.listCollective,
    listGeocode: state.UserEditReducer.listGeocode,
    listStakeholder: state.UserEditReducer.listStakeholder
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserEdit);

const styles = StyleSheet.create({
  validatorItem: { borderColor: "red" },
  validatorLabel: { color: "red" },
  validatorMessage: { color: "red", marginLeft: 15, marginTop: 5 }
});
