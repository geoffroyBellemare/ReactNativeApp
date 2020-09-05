import { combineReducers } from "redux";
import { reducer as reduxForm } from "redux-form";
import authReducer from "./auth.js";
import companyReducer from "./company.js";
import orderReducer from "./order.js";
import prestationRecucer from "./prestation.js";
import cartReducer from "./cart.js";

export default combineReducers({
	form: reduxForm,
	auth: authReducer,
	company: companyReducer,
	order: orderReducer,
	prestation: prestationRecucer,
	cart: cartReducer,
});
