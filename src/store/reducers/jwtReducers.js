import { getJWTdata } from "../../utils/jwt-parser";

import { JWT_PARSE, JWT_REMOVE } from "../actions/actionTypes";

const initialData = getJWTdata();

const jwtReducer = (state = initialData, action) => {
  switch (action.type) {
    case JWT_PARSE:
      return action.data;
    case JWT_REMOVE:
      return {};
    default:
      return state;
  }
};

export { jwtReducer };
