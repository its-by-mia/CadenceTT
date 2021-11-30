import React, { Component } from "react";
import { StyleSheet } from "react-native";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
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
import StakeholderActions from "../redux/actions/StakeholderActions";
import FilesystemActions from "../redux/actions/FilesystemActions";
import CollectiveActions from "../redux/actions/CollectiveActions";

// END IMPORT ACTIONS

/** APIs

* actionsStakeholder.create
*	@description CRUD ACTION create
*
* actionsStakeholder.update
*	@description CRUD ACTION update
*	@param ObjectId id - Id
*
* actionsStakeholder.get
*	@description CRUD ACTION get
*	@param ObjectId id - Id resource
*
* actionsFilesystem.list
*	@description List all files
*	@param String t - Unused
*	@returns ARRAY OF Filesystem
*
* actionsCollective.list
*	@description CRUD ACTION list
*
* actionsUser.list
*	@description CRUD ACTION list
*

**/


class StakeholderEdit extends Component {
  
  // Init stakeholder
  constructor(props) {
    super(props);
    this.state = {
      stakeholder: {},
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
        this.props.actionsStakeholder.loadStakeholder(itemId);
      } else {
        this.setState({
          stakeholder: {}
        });
      }
      
      this.props.actionsFilesystem.loadFilesystemList();
      this.props.actionsCollective.loadCollectiveList();
      this.props.actionsUser.loadUserList();
    });
  }

  // Clear reducer
  componentWillUnmount() {
    this.setState({
      stakeholder: {}
    });
    this.props.actionsStakeholder.reset();
  }

  // Insert props stakeholder in state
  componentWillReceiveProps(props) {
    this.setState({
      stakeholder: props.stakeholder
    });
  }

  // Save data
  save() {
    // Validation
    let errors = {};
    
    if (!this.state.stakeholder._created || this.state.stakeholder._created.trim() === "") {
      errors._created = true;
    }
    
    if (!this.state.stakeholder.handle || this.state.stakeholder.handle.trim() === "") {
      errors.handle = true;
    }
    
    if (!this.state.stakeholder.status || this.state.stakeholder.status.trim() === "") {
      errors.status = true;
    }
    
    if (!this.state.stakeholder.r_collective || this.state.stakeholder.r_collective.trim() === "") {
      errors.r_collective = true;
    }
    
    if (!this.state.stakeholder.r_owner || this.state.stakeholder.r_owner.trim() === "") {
      errors.r_owner = true;
    }
    

    this.setState({ errors: errors });
    if (Object.keys(errors).length > 0) {
      return;
    }

    // Save
    if (this.state.stakeholder._id) {
      // Edit
      this.props.actionsStakeholder.saveStakeholder(this.state.stakeholder).then(data => {
        this.props.navigation.navigate("StakeholderList");
      });
    } else {
      // Create
      this.props.actionsStakeholder.createStakeholder(this.state.stakeholder).then(data => {
        this.props.navigation.navigate("StakeholderList");
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
            <Title>Detail Stakeholder</Title>
          </Body>
          <Right>
            <Button transparent onPress={() => this.save()}>
              <Text>Save</Text>
            </Button>
          </Right>
        </Header>
        <Content>
          <Form>
            <Item stackedLabel {...(this.state.errors && this.state.errors._created === true ? { style: styles.validatorItem } : {})}>
              <Label
                {...(this.state.errors && this.state.errors._created === true ? { style: styles.validatorLabel } : {})}>
                _created *
              </Label>
              <DatePicker
                placeHolderText="Select a date"
                defaultDate={this.state.stakeholder._created }
                onDateChange={value => 
                  this.setState(Object.assign(this.state.stakeholder, { _created: value }))
                }
              />
            </Item>
            {this.state.errors && this.state.errors._created === true && (
              <Text style={styles.validatorMessage}>Value is required</Text>
            )}
            
            <Item stackedLabel>
              <Label>
                _expiration
              </Label>
              <DatePicker
                placeHolderText="Select a date"
                defaultDate={this.state.stakeholder._expiration }
                onDateChange={value => 
                  this.setState(Object.assign(this.state.stakeholder, { _expiration: value }))
                }
              />
            </Item>
            
            <Item stackedLabel>
              <Label>
                _modified
              </Label>
              <DatePicker
                placeHolderText="Select a date"
                defaultDate={this.state.stakeholder._modified }
                onDateChange={value => 
                  this.setState(Object.assign(this.state.stakeholder, { _modified: value }))
                }
              />
            </Item>
            
            
            <Item floatingLabel>
              <Label>
                Description
              </Label>
              <Input
                onChangeText={value =>
                  this.setState(Object.assign(this.state.stakeholder, { description: value }))
                }
                value={this.state.stakeholder.description && this.state.stakeholder.description.toString()}
              />
            </Item>
          
            
            <Item floatingLabel {...(this.state.errors && this.state.errors.handle === true ? { style: styles.validatorItem } : {})}>
              <Label
                {...(this.state.errors && this.state.errors.handle === true ? { style: styles.validatorLabel } : {})}>
                Handle *
              </Label>
              <Input
                onChangeText={value =>
                  this.setState(Object.assign(this.state.stakeholder, { handle: value }))
                }
                value={this.state.stakeholder.handle && this.state.stakeholder.handle.toString()}
              />
            </Item>
            {this.state.errors && this.state.errors.handle === true && (
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
                selectedValue={this.state.stakeholder.status }
                value={this.state.stakeholder.status }
                onValueChange={value =>
                  this.setState(Object.assign(this.state.stakeholder, { status: value }))
                }
              >
                <Picker.Item label="ACTIVE" value="ACTIVE" />
                <Picker.Item label="DELETED" value="DELETED" />
                <Picker.Item label="DISABLED" value="DISABLED" />
                <Picker.Item label="EXPIRED" value="EXPIRED" />
              </Picker>
            </Item>
            {this.state.errors && this.state.errors.status === true && (
              <Text style={styles.validatorMessage}>Value is required</Text>
            )}

          {/* RELATIONS */}
          
          {/* Relation 1:m r_avatar with Filesystem */}
          
          <Item stackedLabel>
            <Label >
              R_avatar
            </Label>
            <Picker
              mode="dropdown"
              iosHeader="Select a value"
              iosIcon={<Icon name="arrow-down" />}
              style={{ width: undefined }}
              selectedValue={this.state.stakeholder.r_avatar }
              value={this.state.stakeholder.r_avatar }
              onValueChange={value =>
                this.setState(Object.assign(this.state.stakeholder, { r_avatar: value }))
              }
            >
              {this.props.listFilesystem &&
                this.props.listFilesystem.map(row => (
                  <Picker.Item label={row._id} value={row._id} key={row._id}>
                    {row._id}
                  </Picker.Item>
                ))}
            </Picker>
          </Item>
          
          
          {/* Relation m:m r_collective with Collective */}
          
          <Item stackedLabel>              
            <Label 
              {...(this.state.errors && this.state.errors.r_collective === true ? { style: styles.validatorLabel } : {})}>
              R_collective *
            </Label>
            <SectionedMultiSelect
              items={this.props.listCollective }
              displayKey="_id"
              uniqueKey="_id"
              selectText="Choose some items..."
              alwaysShowSelectText={true}
              modalAnimationType={"slide"}
              renderSelectText={() => {
                return "Choose some items...";
              }}
              onSelectedItemsChange={value =>
                this.setState(Object.assign(this.state.stakeholder, { r_collective: value }))
              }
              selectedItems={this.state.stakeholder.r_collective }
            />
          </Item>
          
          
          {/* Relation 1:m r_owner with User */}
          
          <Item stackedLabel {...(this.state.errors && this.state.errors.r_owner === true ? { style: styles.validatorItem } : {})}>
            <Label 
              {...(this.state.errors && this.state.errors.r_owner === true ? { style: styles.validatorLabel } : {})}>
              R_owner *
            </Label>
            <Picker
              mode="dropdown"
              iosHeader="Select a value"
              iosIcon={<Icon name="arrow-down" />}
              style={{ width: undefined }}
              selectedValue={this.state.stakeholder.r_owner }
              value={this.state.stakeholder.r_owner }
              onValueChange={value =>
                this.setState(Object.assign(this.state.stakeholder, { r_owner: value }))
              }
            >
              {this.props.listUser &&
                this.props.listUser.map(row => (
                  <Picker.Item label={row._id} value={row._id} key={row._id}>
                    {row._id}
                  </Picker.Item>
                ))}
            </Picker>
          </Item>
            {this.state.errors && this.state.errors.r_owner === true && (
              <Text style={styles.validatorMessage}>Value is required</Text>
            )}
          
          

          </Form>
        </Content>
      </Container>
    );
  }
}

// Store actions
const mapDispatchToProps = function(dispatch) {
  return { 
    actionsStakeholder: bindActionCreators(StakeholderActions, dispatch),
    actionsFilesystem: bindActionCreators(FilesystemActions, dispatch),
    actionsCollective: bindActionCreators(CollectiveActions, dispatch),
  };
};

// Validate types
StakeholderEdit.propTypes = { 
  actionsStakeholder: PropTypes.object.isRequired,
  actionsFilesystem: PropTypes.object.isRequired,
  actionsCollective: PropTypes.object.isRequired,
};

// Get props from state
function mapStateToProps(state, ownProps) {
  return {
    stakeholder: state.StakeholderEditReducer.stakeholder,
    listFilesystem: state.StakeholderEditReducer.listFilesystem,
    listCollective: state.StakeholderEditReducer.listCollective,
    listUser: state.StakeholderEditReducer.listUser
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StakeholderEdit);

const styles = StyleSheet.create({
  validatorItem: { borderColor: "red" },
  validatorLabel: { color: "red" },
  validatorMessage: { color: "red", marginLeft: 15, marginTop: 5 }
});
