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
  Switch,
} from "native-base";
import SecurityService from "../security/SecurityService";

// Redux
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

// Custom Actions


// START IMPORT ACTIONS
import TreedataActions from "../redux/actions/TreedataActions";
import FilesystemActions from "../redux/actions/FilesystemActions";

// END IMPORT ACTIONS

/** APIs

* actionsTreedata.create
*	@description Create new tree structure
*	@param String child
*	@param String class - Class
*	@param String description
*	@param String handle
*	@param Number obj - Object to insert
*	@param Boolean orphan
*	@param String parent
*	@param String subclass
*	@param String twin
*
* actionsTreedata.update
*	@description CRUD ACTION update
*	@param ObjectId id - Id
*
* actionsTreedata.get
*	@description Get by Id
*	@param String id - Id Treedata
*	@returns Treedata
*
* actionsFilesystem.list
*	@description List all files
*	@param String t - Unused
*	@returns ARRAY OF Filesystem
*
* actionsFilesystem.list
*	@description List all files
*	@param String t - Unused
*	@returns ARRAY OF Filesystem
*

**/


class TreedataEdit extends Component {
  
  // Init treedata
  constructor(props) {
    super(props);
    this.state = {
      treedata: {},
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
        this.props.actionsTreedata.loadTreedata(itemId);
      } else {
        this.setState({
          treedata: {}
        });
      }
      
      this.props.actionsFilesystem.loadFilesystemList();
      this.props.actionsFilesystem.loadFilesystemList();
    });
  }

  // Clear reducer
  componentWillUnmount() {
    this.setState({
      treedata: {}
    });
    this.props.actionsTreedata.reset();
  }

  // Insert props treedata in state
  componentWillReceiveProps(props) {
    this.setState({
      treedata: props.treedata
    });
  }

  // Save data
  save() {
    // Validation
    let errors = {};
    
    if (!this.state.treedata.class || this.state.treedata.class.trim() === "") {
      errors.class = true;
    }
    
    if (!this.state.treedata.handle || this.state.treedata.handle.trim() === "") {
      errors.handle = true;
    }
    

    this.setState({ errors: errors });
    if (Object.keys(errors).length > 0) {
      return;
    }

    // Save
    if (this.state.treedata._id) {
      // Edit
      this.props.actionsTreedata.saveTreedata(this.state.treedata).then(data => {
        this.props.navigation.navigate("TreedataList");
      });
    } else {
      // Create
      this.props.actionsTreedata.createTreedata(this.state.treedata).then(data => {
        this.props.navigation.navigate("TreedataList");
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
            <Title>Detail Treedata</Title>
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
                defaultDate={this.state.treedata._created }
                onDateChange={value => 
                  this.setState(Object.assign(this.state.treedata, { _created: value }))
                }
              />
            </Item>
            
            <Item stackedLabel>
              <Label>
                _modified
              </Label>
              <DatePicker
                placeHolderText="Select a date"
                defaultDate={this.state.treedata._modified }
                onDateChange={value => 
                  this.setState(Object.assign(this.state.treedata, { _modified: value }))
                }
              />
            </Item>
            
            
            <Item floatingLabel {...(this.state.errors && this.state.errors.class === true ? { style: styles.validatorItem } : {})}>
              <Label
                {...(this.state.errors && this.state.errors.class === true ? { style: styles.validatorLabel } : {})}>
                Class *
              </Label>
              <Input
                onChangeText={value =>
                  this.setState(Object.assign(this.state.treedata, { class: value }))
                }
                value={this.state.treedata.class && this.state.treedata.class.toString()}
              />
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
                  this.setState(Object.assign(this.state.treedata, { description: value }))
                }
                value={this.state.treedata.description && this.state.treedata.description.toString()}
              />
            </Item>
          
            
            <Item floatingLabel {...(this.state.errors && this.state.errors.handle === true ? { style: styles.validatorItem } : {})}>
              <Label
                {...(this.state.errors && this.state.errors.handle === true ? { style: styles.validatorLabel } : {})}>
                Handle *
              </Label>
              <Input
                onChangeText={value =>
                  this.setState(Object.assign(this.state.treedata, { handle: value }))
                }
                value={this.state.treedata.handle && this.state.treedata.handle.toString()}
              />
            </Item>
            {this.state.errors && this.state.errors.handle === true && (
              <Text style={styles.validatorMessage}>Value is required</Text>
            )}
          
            
            <Item floatingLabel>
              <Label>
                Metadata
              </Label>
              <Input
                onChangeText={value =>
                  this.setState(Object.assign(this.state.treedata, { metadata: value }))
                }
                value={this.state.treedata.metadata && this.state.treedata.metadata.toString()}
              />
            </Item>
          
            <ListItem>
              <Left>
                <Label>Orphan</Label>
              </Left>
              <Right>
                <Switch
                  value={this.state.treedata.orphan }
                  onValueChange={value =>
                    this.setState(Object.assign(this.state.treedata, { orphan: value }))
                  }
                />
              </Right>
            </ListItem>
            
            
            <Item floatingLabel>
              <Label>
                Ref_inlaw
              </Label>
              <Input
                onChangeText={value =>
                  this.setState(Object.assign(this.state.treedata, { ref_inlaw: value }))
                }
                value={this.state.treedata.ref_inlaw && this.state.treedata.ref_inlaw.toString()}
              />
            </Item>
          
            
            <Item floatingLabel>
              <Label>
                Ref_last
              </Label>
              <Input
                onChangeText={value =>
                  this.setState(Object.assign(this.state.treedata, { ref_last: value }))
                }
                value={this.state.treedata.ref_last && this.state.treedata.ref_last.toString()}
              />
            </Item>
          
            
            <Item floatingLabel>
              <Label>
                Ref_parent
              </Label>
              <Input
                onChangeText={value =>
                  this.setState(Object.assign(this.state.treedata, { ref_parent: value }))
                }
                value={this.state.treedata.ref_parent && this.state.treedata.ref_parent.toString()}
              />
            </Item>
          
            
            <Item floatingLabel>
              <Label>
                Ref_twin
              </Label>
              <Input
                onChangeText={value =>
                  this.setState(Object.assign(this.state.treedata, { ref_twin: value }))
                }
                value={this.state.treedata.ref_twin && this.state.treedata.ref_twin.toString()}
              />
            </Item>
          
            <ListItem>
              <Left>
                <Label>Status</Label>
              </Left>
              <Right>
                <Switch
                  value={this.state.treedata.status }
                  onValueChange={value =>
                    this.setState(Object.assign(this.state.treedata, { status: value }))
                  }
                />
              </Right>
            </ListItem>
            

          {/* RELATIONS */}
          
          {/* Relation 1:m s_lastchild with Filesystem */}
          
          <Item stackedLabel>
            <Label >
              S_lastchild
            </Label>
            <Picker
              mode="dropdown"
              iosHeader="Select a value"
              iosIcon={<Icon name="arrow-down" />}
              style={{ width: undefined }}
              selectedValue={this.state.treedata.s_lastchild }
              value={this.state.treedata.s_lastchild }
              onValueChange={value =>
                this.setState(Object.assign(this.state.treedata, { s_lastchild: value }))
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
          
          
          {/* Relation 1:m s_parent with Filesystem */}
          
          <Item stackedLabel>
            <Label >
              S_parent
            </Label>
            <Picker
              mode="dropdown"
              iosHeader="Select a value"
              iosIcon={<Icon name="arrow-down" />}
              style={{ width: undefined }}
              selectedValue={this.state.treedata.s_parent }
              value={this.state.treedata.s_parent }
              onValueChange={value =>
                this.setState(Object.assign(this.state.treedata, { s_parent: value }))
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
          
          

          </Form>
        </Content>
      </Container>
    );
  }
}

// Store actions
const mapDispatchToProps = function(dispatch) {
  return { 
    actionsTreedata: bindActionCreators(TreedataActions, dispatch),
    actionsFilesystem: bindActionCreators(FilesystemActions, dispatch),
  };
};

// Validate types
TreedataEdit.propTypes = { 
  actionsTreedata: PropTypes.object.isRequired,
  actionsFilesystem: PropTypes.object.isRequired,
};

// Get props from state
function mapStateToProps(state, ownProps) {
  return {
    treedata: state.TreedataEditReducer.treedata,
    listFilesystem: state.TreedataEditReducer.listFilesystem,
    listFilesystem: state.TreedataEditReducer.listFilesystem
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TreedataEdit);

const styles = StyleSheet.create({
  validatorItem: { borderColor: "red" },
  validatorLabel: { color: "red" },
  validatorMessage: { color: "red", marginLeft: 15, marginTop: 5 }
});
