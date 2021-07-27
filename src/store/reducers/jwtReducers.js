import { getJWTdata } from "../../utils/jwt-parser";

import { JWT_ADD, JWT_REMOVE } from "../actions/actionTypes";

const initialData = getJWTdata();

const jwtReducer = (state = initialData, action) => {
  switch (action.type) {
    case JWT_ADD:
      return action.data;
    case JWT_REMOVE:
      return {};
    default:
      return state;
  }
};

export { jwtReducer };
