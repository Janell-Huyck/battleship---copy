import { connectedRouterRedirect } from "redux-auth-wrapper/history4/redirect";

const userIsAuthenticated = connectedRouterRedirect({
  redirectPath: "/",
  authenticatedSelector: state =>
    state.auth &&
    state.auth.login &&
    state.auth.login.result &&
    state.auth.login.result.token !== undefined,
  wrapperDisplayName: "UserIsAuthenticated"
});

export default userIsAuthenticated;
