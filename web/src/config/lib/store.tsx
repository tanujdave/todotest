import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { createStore as createStoreRedux, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from "../reducers";

export function createStore() {
  let composedMiddlewares;

  composedMiddlewares = applyMiddleware(thunk);
  const store = createStoreRedux(reducers, composedMiddlewares);
  return store;
}

export function connectWithRouter(
  mapStateToProps: any,
  mapDispatchToProps: any
) {
  return (component: any) =>
    withRouter(connect(mapStateToProps, mapDispatchToProps)(component));
}
