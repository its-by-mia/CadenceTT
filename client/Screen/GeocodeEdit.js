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
import CollectiveActions from "../redux/actions/CollectiveActions";
import GeocodeActions from "../redux/actions/GeocodeActions";

// END IMPORT ACTIONS

/** APIs

* actionsUser.list
*	@description CRUD ACTION list
*
* actionsCollective.findByr_members
*	@description CRUD ACTION findByr_members
*	@param Objectid key - Id of model to search for
*
* actionsCollective.findByr_owner
*	@description CRUD ACTION findByr_owner
*	@param Objectid key - Id of model to search for
*
* actionsUser.delete
*	@description CRUD ACTION delete
*	@param ObjectId id - Id
*
* actionsUser.list
*	@description CRUD ACTION list
*
* actionsUser.list
*	@description CRUD ACTION list
*
* actionsGeocode.create
*	@description create point set
*	@param String class
*
* actionsGeocode.get
*	@description CRUD ACTION get
*	@param ObjectId id - Id resource
*
* actionsGeocode.update
*	@description CRUD ACTION update
*	@param ObjectId id - Id
*

**/


class GeocodeEdit extends Component {
  
  // Init geocode
  constructor(props) {
    super(props);
    this.state = {
      geocode: {},
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
        this.props.actionsGeocode.loadGeocode(itemId);
      } else {
        this.setState({
          geocode: {}
        });
      }
      
      this.props.actionsUser.loadUserList();
    });
  }

  // Clear reducer
  componentWillUnmount() {
    this.setState({
      geocode: {}
    });
    this.props.actionsGeocode.reset();
  }

  // Insert props geocode in state
  componentWillReceiveProps(props) {
    this.setState({
      geocode: props.geocode
    });
  }

  // Save data
  save() {
    // Validation
    let errors = {};
    
    if (!this.state.geocode._created || this.state.geocode._created.trim() === "") {
      errors._created = true;
    }
    
    if (!this.state.geocode.class || this.state.geocode.class.trim() === "") {
      errors.class = true;
    }
    
    if (!this.state.geocode.series || this.state.geocode.series.trim() === "") {
      errors.series = true;
    }
    
    if (!this.state.geocode.x || this.state.geocode.x.trim() === "") {
      errors.x = true;
    }
    
    if (!this.state.geocode.y || this.state.geocode.y.trim() === "") {
      errors.y = true;
    }
    
    if (!this.state.geocode.r_owner || this.state.geocode.r_owner.trim() === "") {
      errors.r_owner = true;
    }
    

    this.setState({ errors: errors });
    if (Object.keys(errors).length > 0) {
      return;
    }

    // Save
    if (this.state.geocode._id) {
      // Edit
      this.props.actionsGeocode.saveGeocode(this.state.geocode).then(data => {
        this.props.navigation.navigate("GeocodeList");
      });
    } else {
      // Create
      this.props.actionsGeocode.createGeocode(this.state.geocode).then(data => {
        this.props.navigation.navigate("GeocodeList");
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
            <Title>Detail Geocode</Title>
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
                defaultDate={this.state.geocode._created }
                onDateChange={value => 
                  this.setState(Object.assign(this.state.geocode, { _created: value }))
                }
              />
            </Item>
            {this.state.errors && this.state.errors._created === true && (
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
                selectedValue={this.state.geocode.class }
                value={this.state.geocode.class }
                onValueChange={value =>
                  this.setState(Object.assign(this.state.geocode, { class: value }))
                }
              >
                <Picker.Item label="LINE" value="LINE" />
                <Picker.Item label="MULTILINE" value="MULTILINE" />
                <Picker.Item label="MULTIPOINT" value="MULTIPOINT" />
                <Picker.Item label="POINT" value="POINT" />
                <Picker.Item label="POLYGON" value="POLYGON" />
                <Picker.Item label="_UNDEFINED_" value="_UNDEFINED_" />
              </Picker>
            </Item>
            {this.state.errors && this.state.errors.class === true && (
              <Text style={styles.validatorMessage}>Value is required</Text>
            )}
            
            <Item floatingLabel>
              <Label>
                O
              </Label>
              <Input
                onChangeText={value =>
                  this.setState(Object.assign(this.state.geocode, { o: value }))
                }
                value={this.state.geocode.o && this.state.geocode.o.toString()}
              />
            </Item>
          
            <ListItem>
              <Left>
                <Label>Series *</Label>
              </Left>
              <Right>
                <Switch
                  value={this.state.geocode.series }
                  onValueChange={value =>
                    this.setState(Object.assign(this.state.geocode, { series: value }))
                  }
                />
              </Right>
            </ListItem>
            
            
            <Item floatingLabel {...(this.state.errors && this.state.errors.x === true ? { style: styles.validatorItem } : {})}>
              <Label
                {...(this.state.errors && this.state.errors.x === true ? { style: styles.validatorLabel } : {})}>
                X *
              </Label>
              <Input
                onChangeText={value =>
                  this.setState(Object.assign(this.state.geocode, { x: value }))
                }
                value={this.state.geocode.x && this.state.geocode.x.toString()}
              />
            </Item>
            {this.state.errors && this.state.errors.x === true && (
              <Text style={styles.validatorMessage}>Value is required</Text>
            )}
          
            
            <Item floatingLabel>
              <Label>
                Xy
              </Label>
              <Input
                onChangeText={value =>
                  this.setState(Object.assign(this.state.geocode, { xy: value }))
                }
                value={this.state.geocode.xy && this.state.geocode.xy.toString()}
              />
            </Item>
          
            
            <Item floatingLabel {...(this.state.errors && this.state.errors.y === true ? { style: styles.validatorItem } : {})}>
              <Label
                {...(this.state.errors && this.state.errors.y === true ? { style: styles.validatorLabel } : {})}>
                Y *
              </Label>
              <Input
                onChangeText={value =>
                  this.setState(Object.assign(this.state.geocode, { y: value }))
                }
                value={this.state.geocode.y && this.state.geocode.y.toString()}
              />
            </Item>
            {this.state.errors && this.state.errors.y === true && (
              <Text style={styles.validatorMessage}>Value is required</Text>
            )}
          

          {/* RELATIONS */}
          
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
              selectedValue={this.state.geocode.r_owner }
              value={this.state.geocode.r_owner }
              onValueChange={value =>
                this.setState(Object.assign(this.state.geocode, { r_owner: value }))
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
    actionsCollective: bindActionCreators(CollectiveActions, dispatch),
    actionsGeocode: bindActionCreators(GeocodeActions, dispatch),
  };
};

// Validate types
GeocodeEdit.propTypes = { 
  actionsCollective: PropTypes.object.isRequired,
  actionsGeocode: PropTypes.object.isRequired,
};

// Get props from state
function mapStateToProps(state, ownProps) {
  return {
    geocode: state.GeocodeEditReducer.geocode,
    listUser: state.GeocodeEditReducer.listUser
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GeocodeEdit);

const styles = StyleSheet.create({
  validatorItem: { borderColor: "red" },
  validatorLabel: { color: "red" },
  validatorMessage: { color: "red", marginLeft: 15, marginTop: 5 }
});
