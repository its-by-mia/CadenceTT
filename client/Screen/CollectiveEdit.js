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
  Switch,
} from "native-base";
import SecurityService from "../security/SecurityService";

// Redux
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

// Custom Actions


// START IMPORT ACTIONS
import CollectiveActions from "../redux/actions/CollectiveActions";
import StakeholderActions from "../redux/actions/StakeholderActions";

// END IMPORT ACTIONS

/** APIs

* actionsCollective.create
*	@description CRUD ACTION create
*
* actionsCollective.update
*	@description CRUD ACTION update
*	@param ObjectId id - Id
*
* actionsCollective.get
*	@description CRUD ACTION get
*	@param ObjectId id - Id resource
*
* actionsUser.list
*	@description CRUD ACTION list
*
* actionsUser.list
*	@description CRUD ACTION list
*
* actionsStakeholder.findByr_collective
*	@description CRUD ACTION findByr_collective
*	@param Objectid key - Id of model to search for
*

**/


class CollectiveEdit extends Component {
  
  // Init collective
  constructor(props) {
    super(props);
    this.state = {
      collective: {},
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
        this.props.actionsCollective.loadCollective(itemId);
        this.props.actionsStakeholder.findByr_collective(itemId);
      } else {
        this.setState({
          collective: {}
        });
      }
      
      this.props.actionsUser.loadUserList();
      this.props.actionsUser.loadUserList();
    });
  }

  // Clear reducer
  componentWillUnmount() {
    this.setState({
      collective: {}
    });
    this.props.actionsCollective.reset();
  }

  // Insert props collective in state
  componentWillReceiveProps(props) {
    this.setState({
      collective: props.collective
    });
  }

  // Save data
  save() {
    // Validation
    let errors = {};
    
    if (!this.state.collective._created || this.state.collective._created.trim() === "") {
      errors._created = true;
    }
    
    if (!this.state.collective._modified || this.state.collective._modified.trim() === "") {
      errors._modified = true;
    }
    
    if (!this.state.collective.class || this.state.collective.class.trim() === "") {
      errors.class = true;
    }
    
    if (!this.state.collective.handle || this.state.collective.handle.trim() === "") {
      errors.handle = true;
    }
    
    if (!this.state.collective.locked || this.state.collective.locked.trim() === "") {
      errors.locked = true;
    }
    
    if (!this.state.collective.status || this.state.collective.status.trim() === "") {
      errors.status = true;
    }
    

    this.setState({ errors: errors });
    if (Object.keys(errors).length > 0) {
      return;
    }

    // Save
    if (this.state.collective._id) {
      // Edit
      this.props.actionsCollective.saveCollective(this.state.collective).then(data => {
        this.props.navigation.navigate("CollectiveList");
      });
    } else {
      // Create
      this.props.actionsCollective.createCollective(this.state.collective).then(data => {
        this.props.navigation.navigate("CollectiveList");
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
            <Title>Detail Collective</Title>
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
                defaultDate={this.state.collective._created }
                onDateChange={value => 
                  this.setState(Object.assign(this.state.collective, { _created: value }))
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
                defaultDate={this.state.collective._expiration }
                onDateChange={value => 
                  this.setState(Object.assign(this.state.collective, { _expiration: value }))
                }
              />
            </Item>
            
            <Item stackedLabel {...(this.state.errors && this.state.errors._modified === true ? { style: styles.validatorItem } : {})}>
              <Label
                {...(this.state.errors && this.state.errors._modified === true ? { style: styles.validatorLabel } : {})}>
                _modified *
              </Label>
              <DatePicker
                placeHolderText="Select a date"
                defaultDate={this.state.collective._modified }
                onDateChange={value => 
                  this.setState(Object.assign(this.state.collective, { _modified: value }))
                }
              />
            </Item>
            {this.state.errors && this.state.errors._modified === true && (
              <Text style={styles.validatorMessage}>Value is required</Text>
            )}
            
            <Item stackedLabel {...(this.state.errors && this.state.errors.class === true ? { style: styles.validatorItem } : {})}>
              <Label
                {...(this.state.errors && this.state.errors.class === true ? { style: styles.validatorLabel } : {})}>
                Class *
              </Label>
              <Picker
                mode="dropdown"
                iosHeader="Select a value"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: undefined }}
                selectedValue={this.state.collective.class }
                value={this.state.collective.class }
                onValueChange={value =>
                  this.setState(Object.assign(this.state.collective, { class: value }))
                }
              >
                <Picker.Item label="DTYPE_CLASS" value="DTYPE_CLASS" />
                <Picker.Item label="ERROR_CLASS" value="ERROR_CLASS" />
                <Picker.Item label="FS_FOLDER" value="FS_FOLDER" />
                <Picker.Item label="OBJECT_CLASS" value="OBJECT_CLASS" />
                <Picker.Item label="POLICY_CLASS" value="POLICY_CLASS" />
                <Picker.Item label="SYSTEM_GROUP" value="SYSTEM_GROUP" />
                <Picker.Item label="UNDEF_GROUP" value="UNDEF_GROUP" />
                <Picker.Item label="UNDEF_TEAM" value="UNDEF_TEAM" />
                <Picker.Item label="USER_GROUP" value="USER_GROUP" />
                <Picker.Item label="USER_TEAM" value="USER_TEAM" />
                <Picker.Item label="WORK_TEAM" value="WORK_TEAM" />
                <Picker.Item label="___ANY___" value="___ANY___" />
                <Picker.Item label="___CLASS___" value="___CLASS___" />
                <Picker.Item label="___GROUP___" value="___GROUP___" />
                <Picker.Item label="___NONE___" value="___NONE___" />
              </Picker>
            </Item>
            {this.state.errors && this.state.errors.class === true && (
              <Text style={styles.validatorMessage}>Value is required</Text>
            )}
            
            <Item floatingLabel>
              <Label>
                Description
              </Label>
              <Input
                onChangeText={value =>
                  this.setState(Object.assign(this.state.collective, { description: value }))
                }
                value={this.state.collective.description && this.state.collective.description.toString()}
              />
            </Item>
          
            
            <Item floatingLabel {...(this.state.errors && this.state.errors.handle === true ? { style: styles.validatorItem } : {})}>
              <Label
                {...(this.state.errors && this.state.errors.handle === true ? { style: styles.validatorLabel } : {})}>
                Handle *
              </Label>
              <Input
                onChangeText={value =>
                  this.setState(Object.assign(this.state.collective, { handle: value }))
                }
                value={this.state.collective.handle && this.state.collective.handle.toString()}
              />
            </Item>
            {this.state.errors && this.state.errors.handle === true && (
              <Text style={styles.validatorMessage}>Value is required</Text>
            )}
          
            <ListItem>
              <Left>
                <Label>Locked *</Label>
              </Left>
              <Right>
                <Switch
                  value={this.state.collective.locked }
                  onValueChange={value =>
                    this.setState(Object.assign(this.state.collective, { locked: value }))
                  }
                />
              </Right>
            </ListItem>
            
            
            <Item floatingLabel>
              <Label>
                Metadata
              </Label>
              <Input
                onChangeText={value =>
                  this.setState(Object.assign(this.state.collective, { metadata: value }))
                }
                value={this.state.collective.metadata && this.state.collective.metadata.toString()}
              />
            </Item>
          
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
                selectedValue={this.state.collective.status }
                value={this.state.collective.status }
                onValueChange={value =>
                  this.setState(Object.assign(this.state.collective, { status: value }))
                }
              >
                <Picker.Item label="ACTIVE" value="ACTIVE" />
                <Picker.Item label="DELETED" value="DELETED" />
                <Picker.Item label="HIDDEN" value="HIDDEN" />
                <Picker.Item label="ISOLATED" value="ISOLATED" />
              </Picker>
            </Item>
            {this.state.errors && this.state.errors.status === true && (
              <Text style={styles.validatorMessage}>Value is required</Text>
            )}
            
            <Item floatingLabel>
              <Label>
                Subclass
              </Label>
              <Input
                onChangeText={value =>
                  this.setState(Object.assign(this.state.collective, { subclass: value }))
                }
                value={this.state.collective.subclass && this.state.collective.subclass.toString()}
              />
            </Item>
          
            
            <Item floatingLabel>
              <Label>
                Token
              </Label>
              <Input
                onChangeText={value =>
                  this.setState(Object.assign(this.state.collective, { token: value }))
                }
                value={this.state.collective.token && this.state.collective.token.toString()}
              />
            </Item>
          

          {/* RELATIONS */}
          
          {/* Relation m:m r_members with User */}
          
          <Item stackedLabel>              
            <Label >
              R_members
            </Label>
            <SectionedMultiSelect
              items={this.props.listUser }
              displayKey="_id"
              uniqueKey="_id"
              selectText="Choose some items..."
              alwaysShowSelectText={true}
              modalAnimationType={"slide"}
              renderSelectText={() => {
                return "Choose some items...";
              }}
              onSelectedItemsChange={value =>
                this.setState(Object.assign(this.state.collective, { r_members: value }))
              }
              selectedItems={this.state.collective.r_members }
            />
          </Item>
          
          
          {/* Relation 1:m r_owner with User */}
          
          <Item stackedLabel>
            <Label >
              R_owner
            </Label>
            <Picker
              mode="dropdown"
              iosHeader="Select a value"
              iosIcon={<Icon name="arrow-down" />}
              style={{ width: undefined }}
              selectedValue={this.state.collective.r_owner }
              value={this.state.collective.r_owner }
              onValueChange={value =>
                this.setState(Object.assign(this.state.collective, { r_owner: value }))
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
          
          
          {/* EXTERNAL RELATIONS */}
          
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
    actionsCollective: bindActionCreators(CollectiveActions, dispatch),
    actionsStakeholder: bindActionCreators(StakeholderActions, dispatch),
  };
};

// Validate types
CollectiveEdit.propTypes = { 
  actionsCollective: PropTypes.object.isRequired,
  actionsStakeholder: PropTypes.object.isRequired,
};

// Get props from state
function mapStateToProps(state, ownProps) {
  return {
    collective: state.CollectiveEditReducer.collective,
    listUser: state.CollectiveEditReducer.listUser,
    listUser: state.CollectiveEditReducer.listUser,
    listStakeholder: state.CollectiveEditReducer.listStakeholder
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CollectiveEdit);

const styles = StyleSheet.create({
  validatorItem: { borderColor: "red" },
  validatorLabel: { color: "red" },
  validatorMessage: { color: "red", marginLeft: 15, marginTop: 5 }
});
