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
import TreedataActions from "../redux/actions/TreedataActions";
import StakeholderActions from "../redux/actions/StakeholderActions";

// END IMPORT ACTIONS

/** APIs

* actionsFilesystem.create
*	@description POST a new file - File contents in the body.
*	@param String obj - Object to insert
*
* actionsFilesystem.update
*	@description CRUD ACTION update
*	@param ObjectId id - Id
*
* actionsFilesystem.get
*	@description Download or receive a file from the database.
*	@param String id - The path to file
*	@returns Filesystem
*
* actionsUser.list
*	@description CRUD ACTION list
*
* actionsTreedata.findBys_lastchild
*	@description CRUD ACTION findBys_lastchild
*	@param Objectid key - Id of model to search for
*
* actionsTreedata.findBys_parent
*	@description By parent
*	@param String key - Id of the resource s_parent to search
*
* actionsStakeholder.findByr_avatar
*	@description CRUD ACTION findByr_avatar
*	@param Objectid key - Id of model to search for
*

**/


class FilesystemEdit extends Component {
  
  // Init filesystem
  constructor(props) {
    super(props);
    this.state = {
      filesystem: {},
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
        this.props.actionsFilesystem.loadFilesystem(itemId);
        this.props.actionsStakeholder.findByr_avatar(itemId);
        this.props.actionsTreedata.findBys_lastchild(itemId);
        this.props.actionsTreedata.findBys_parent(itemId);
      } else {
        this.setState({
          filesystem: {}
        });
      }
      
      this.props.actionsUser.loadUserList();
    });
  }

  // Clear reducer
  componentWillUnmount() {
    this.setState({
      filesystem: {}
    });
    this.props.actionsFilesystem.reset();
  }

  // Insert props filesystem in state
  componentWillReceiveProps(props) {
    this.setState({
      filesystem: props.filesystem
    });
  }

  // Save data
  save() {
    // Validation
    let errors = {};
    
    if (!this.state.filesystem._created || this.state.filesystem._created.trim() === "") {
      errors._created = true;
    }
    
    if (!this.state.filesystem._status || this.state.filesystem._status.trim() === "") {
      errors._status = true;
    }
    
    if (!this.state.filesystem.basepath || this.state.filesystem.basepath.trim() === "") {
      errors.basepath = true;
    }
    
    if (!this.state.filesystem.filename || this.state.filesystem.filename.trim() === "") {
      errors.filename = true;
    }
    
    if (!this.state.filesystem.locked || this.state.filesystem.locked.trim() === "") {
      errors.locked = true;
    }
    
    if (!this.state.filesystem.permission || this.state.filesystem.permission.trim() === "") {
      errors.permission = true;
    }
    

    this.setState({ errors: errors });
    if (Object.keys(errors).length > 0) {
      return;
    }

    // Save
    if (this.state.filesystem._id) {
      // Edit
      this.props.actionsFilesystem.saveFilesystem(this.state.filesystem).then(data => {
        this.props.navigation.navigate("FilesystemList");
      });
    } else {
      // Create
      this.props.actionsFilesystem.createFilesystem(this.state.filesystem).then(data => {
        this.props.navigation.navigate("FilesystemList");
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
            <Title>Detail Filesystem</Title>
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
                defaultDate={this.state.filesystem._created }
                onDateChange={value => 
                  this.setState(Object.assign(this.state.filesystem, { _created: value }))
                }
              />
            </Item>
            {this.state.errors && this.state.errors._created === true && (
              <Text style={styles.validatorMessage}>Value is required</Text>
            )}
            
            <Item stackedLabel>
              <Label>
                _modified
              </Label>
              <DatePicker
                placeHolderText="Select a date"
                defaultDate={this.state.filesystem._modified }
                onDateChange={value => 
                  this.setState(Object.assign(this.state.filesystem, { _modified: value }))
                }
              />
            </Item>
            
            <Item stackedLabel {...(this.state.errors && this.state.errors._status === true ? { style: styles.validatorItem } : {})}>
              <Label
                {...(this.state.errors && this.state.errors._status === true ? { style: styles.validatorLabel } : {})}>
                _status *
              </Label>
              <Picker
                mode="dropdown"
                iosHeader="Select a value"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: undefined }}
                selectedValue={this.state.filesystem._status }
                value={this.state.filesystem._status }
                onValueChange={value =>
                  this.setState(Object.assign(this.state.filesystem, { _status: value }))
                }
              >
                <Picker.Item label="DELETED" value="DELETED" />
                <Picker.Item label="OFFLINE" value="OFFLINE" />
                <Picker.Item label="ONLINE" value="ONLINE" />
                <Picker.Item label="_UNDEFINED_" value="_UNDEFINED_" />
              </Picker>
            </Item>
            {this.state.errors && this.state.errors._status === true && (
              <Text style={styles.validatorMessage}>Value is required</Text>
            )}
            
            <Item floatingLabel {...(this.state.errors && this.state.errors.basepath === true ? { style: styles.validatorItem } : {})}>
              <Label
                {...(this.state.errors && this.state.errors.basepath === true ? { style: styles.validatorLabel } : {})}>
                Basepath *
              </Label>
              <Input
                onChangeText={value =>
                  this.setState(Object.assign(this.state.filesystem, { basepath: value }))
                }
                value={this.state.filesystem.basepath && this.state.filesystem.basepath.toString()}
              />
            </Item>
            {this.state.errors && this.state.errors.basepath === true && (
              <Text style={styles.validatorMessage}>Value is required</Text>
            )}
          
            
            <Item floatingLabel>
              <Label>
                Blob
              </Label>
              <Input
                onChangeText={value =>
                  this.setState(Object.assign(this.state.filesystem, { blob: value }))
                }
                value={this.state.filesystem.blob && this.state.filesystem.blob.toString()}
              />
            </Item>
          
            
            <Item floatingLabel {...(this.state.errors && this.state.errors.filename === true ? { style: styles.validatorItem } : {})}>
              <Label
                {...(this.state.errors && this.state.errors.filename === true ? { style: styles.validatorLabel } : {})}>
                Filename *
              </Label>
              <Input
                onChangeText={value =>
                  this.setState(Object.assign(this.state.filesystem, { filename: value }))
                }
                value={this.state.filesystem.filename && this.state.filesystem.filename.toString()}
              />
            </Item>
            {this.state.errors && this.state.errors.filename === true && (
              <Text style={styles.validatorMessage}>Value is required</Text>
            )}
          
            
            <Item floatingLabel>
              <Label>
                Filesize
              </Label>
              <Input
                onChangeText={value =>
                  this.setState(Object.assign(this.state.filesystem, { filesize: value }))
                }
                value={this.state.filesystem.filesize && this.state.filesystem.filesize.toString()}
              />
            </Item>
          
            <Item stackedLabel {...(this.state.errors && this.state.errors.locked === true ? { style: styles.validatorItem } : {})}>
              <Label
                {...(this.state.errors && this.state.errors.locked === true ? { style: styles.validatorLabel } : {})}>
                Locked *
              </Label>
              <Picker
                mode="dropdown"
                iosHeader="Select a value"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: undefined }}
                selectedValue={this.state.filesystem.locked }
                value={this.state.filesystem.locked }
                onValueChange={value =>
                  this.setState(Object.assign(this.state.filesystem, { locked: value }))
                }
              >
                <Picker.Item label="SYSTEM_LOCKED" value="SYSTEM_LOCKED" />
                <Picker.Item label="UNLOCKED" value="UNLOCKED" />
                <Picker.Item label="USER_LOCKED" value="USER_LOCKED" />
              </Picker>
            </Item>
            {this.state.errors && this.state.errors.locked === true && (
              <Text style={styles.validatorMessage}>Value is required</Text>
            )}
            
            <Item floatingLabel>
              <Label>
                Mime
              </Label>
              <Input
                onChangeText={value =>
                  this.setState(Object.assign(this.state.filesystem, { mime: value }))
                }
                value={this.state.filesystem.mime && this.state.filesystem.mime.toString()}
              />
            </Item>
          
            
            <Item floatingLabel {...(this.state.errors && this.state.errors.permission === true ? { style: styles.validatorItem } : {})}>
              <Label
                {...(this.state.errors && this.state.errors.permission === true ? { style: styles.validatorLabel } : {})}>
                Permission *
              </Label>
              <Input
                onChangeText={value =>
                  this.setState(Object.assign(this.state.filesystem, { permission: value }))
                }
                value={this.state.filesystem.permission && this.state.filesystem.permission.toString()}
              />
            </Item>
            {this.state.errors && this.state.errors.permission === true && (
              <Text style={styles.validatorMessage}>Value is required</Text>
            )}
          
            
            <Item floatingLabel>
              <Label>
                R_user
              </Label>
              <Input
                onChangeText={value =>
                  this.setState(Object.assign(this.state.filesystem, { r_user: value }))
                }
                value={this.state.filesystem.r_user && this.state.filesystem.r_user.toString()}
              />
            </Item>
          

          {/* RELATIONS */}
          
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
              selectedValue={this.state.filesystem.r_owner }
              value={this.state.filesystem.r_owner }
              onValueChange={value =>
                this.setState(Object.assign(this.state.filesystem, { r_owner: value }))
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

          
          {/* External relation with Treedata */}

          
          {/* External relation with Treedata */}

          

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
    actionsTreedata: bindActionCreators(TreedataActions, dispatch),
    actionsStakeholder: bindActionCreators(StakeholderActions, dispatch),
  };
};

// Validate types
FilesystemEdit.propTypes = { 
  actionsFilesystem: PropTypes.object.isRequired,
  actionsTreedata: PropTypes.object.isRequired,
  actionsStakeholder: PropTypes.object.isRequired,
};

// Get props from state
function mapStateToProps(state, ownProps) {
  return {
    filesystem: state.FilesystemEditReducer.filesystem,
    listUser: state.FilesystemEditReducer.listUser,
    listStakeholder: state.FilesystemEditReducer.listStakeholder,
    listTreedata: state.FilesystemEditReducer.listTreedata,
    listTreedata: state.FilesystemEditReducer.listTreedata
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilesystemEdit);

const styles = StyleSheet.create({
  validatorItem: { borderColor: "red" },
  validatorLabel: { color: "red" },
  validatorMessage: { color: "red", marginLeft: 15, marginTop: 5 }
});
