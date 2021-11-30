import { combineReducers } from "redux";

// START IMPORT REDUCERS
import Activate accountReducer from "./Activate accountReducer";
import Advanced AdminReducer from "./Advanced AdminReducer";
import CollectiveEditReducer from "./CollectiveEditReducer";
import CollectiveListReducer from "./CollectiveListReducer";
import FilesystemEditReducer from "./FilesystemEditReducer";
import FilesystemListReducer from "./FilesystemListReducer";
import GeocodeEditReducer from "./GeocodeEditReducer";
import GeocodeListReducer from "./GeocodeListReducer";
import HomeReducer from "./HomeReducer";
import LoginReducer from "./LoginReducer";
import LogoutReducer from "./LogoutReducer";
import Show MapReducer from "./Show MapReducer";
import StakeholderEditReducer from "./StakeholderEditReducer";
import StakeholderListReducer from "./StakeholderListReducer";
import TreedataEditReducer from "./TreedataEditReducer";
import TreedataListReducer from "./TreedataListReducer";
import User ClockinsReducer from "./User ClockinsReducer";
import UserEditReducer from "./UserEditReducer";

// END IMPORT REDUCERS


// CUSTOM REDUCERS
import LoginReducer from "./LoginReducer";
import ProfileReducer from "./ProfileReducer";
import UserEditReducer from "./UserEditReducer";
import UserListReducer from "./UserListReducer";

const rootReducer = combineReducers({
  
  // INSERT HERE YOUR CUSTOM REDUCERS
  LoginReducer,
  ProfileReducer,
  UserEditReducer,
  UserListReducer,

  // START COMBINE REDUCERS
	Activate accountReducer,
	Advanced AdminReducer,
	CollectiveEditReducer,
	CollectiveListReducer,
	FilesystemEditReducer,
	FilesystemListReducer,
	GeocodeEditReducer,
	GeocodeListReducer,
	HomeReducer,
	LoginReducer,
	LogoutReducer,
	Show MapReducer,
	StakeholderEditReducer,
	StakeholderListReducer,
	TreedataEditReducer,
	TreedataListReducer,
	User ClockinsReducer,
	UserEditReducer,
 // END COMBINE REDUCERS

});

export default rootReducer;
