import React from "react";
import { Switch, Route } from "react-router-dom";

import Todo from "../containers/Todo";

const Routes = () => {
  return (
    <Switch>
      <Route
        path="/"
        name="Todo"
        render={() => (
          <>
            <main className="main">
              <Switch>
                <Route exact key="Todo" path="/" component={Todo} />
                <Route key="TodoEdit" path="/todos/:id" component={Todo} />
                <Route key="TodoNew" path="/todos/add-new" component={Todo} />
              </Switch>
            </main>
          </>
        )}
      />
    </Switch>
  );
};

export default Routes;
