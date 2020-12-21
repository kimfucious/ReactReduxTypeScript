# React with Redux and Typescript

This is an example of how to integrate Typescript into a React App that uses Redux

## Things to note

This app does not strictly follow the [offical docs](https://redux.js.org/recipes/usage-with-typescript).

### React

#### Props

You can use an interface to define the props that a component will receive, for example:

```js
interface AppProps {
  todos: Todo[];
  getTodos: Function;
  deleteTodo: typeof Function;
}
```

If you're using a class-based component, you can add this as an argument, like this:

```js
class App extends React.Component<AppProps> {...}
```

If you're using a functional component, you can add this as an argument, like this:

```js
const App = (props: AppProps) => {...}
```

#### State

If you're not using hooks, there are two ways to use state in a class-based component.

Option One (w/ constructor):

Create an Interface to represent state:

```js
interface AppState {
  isSpinning: boolean;
}
```

And add this as a second argument to the component, like this:

```js
class App extends React.Component<AppProps, AppState> {
 this.state = {isSpinning: false}
 ...
 }
```

Option Two (w/o constructor):

Add state right into the component, like this:

```js
class App extends React.Component<AppProps> {
  state = { isSpinning: false };
  ...
}
```

Note that you don't add second argument on the component with this option.

### Redux

#### Actions

You can use Typescript `enums` to control Redux action types.

So with something like this:

```js
enum ActionTypes {
  GET_TODOS_START,
  GET_TODOS_SUCCESS,
  GET_TODOS_FAIL
}
```

You can do something like this in your action creators (note the `ActionTypes`):

```js
...
import { ActionTypes } from "./types";

interface GetTodosStart {
  type: ActionTypes.GET_TODOS_START;
}
interface GetTodosSuccess {
  type: ActionTypes.GET_TODOS_SUCCESS;
  payload: Todo[];
}
interface GetTodosFail {
  type: ActionTypes.GET_TODOS_FAIL;
  payload: Error;
}

export const getTodos = () => async (dispatch: Dispatch) => {
  try {
    dispatch<GetTodosStart>({ type: ActionTypes.GET_TODOS_START });
    const { data } = await axios.get<Todo[]>(
      "https://jsonplaceholder.typicode.com/todos"
    );
    dispatch<GetTodosSuccess>({
      type: ActionTypes.GET_TODOS_SUCCESS,
      payload: data
    });
    return Promise.resolve(data);
  } catch (error) {
    console.warn(error);
    dispatch<GetTodosFail>({
      type: ActionTypes.GET_TODOS_FAIL,
      payload: error
    });
    return Promise.reject(error);
  }
};
...
```

In the above, you can see that `dispatch`, a generic function, is being provided with arguments: `GetTodosStart`, `GetTodosSuccess`, and `GetTodosFail`. These are interfaces used to ensure that the signature of the dispatch is correct for the given scenario.

So, for example, if you leave the payload off of the `success` dispatch and/or the payload is of the wrong type, TypeScript will tell you. The same goes for `fail`.

#### Reducers

You can create a union of `action types`, called Action, in the `types.ts` like this:

```js
export type Action = GetTodosSuccess | DeleteTodosSuccess;
```

And then use it with theActionTypes enum in a reducer like this:

```js
import { Action, ActionTypes } from "../actions";

import { Todo } from "../interfaces";

export const todosReducer = (state: Todo[] = [], action: Action) => {
  switch (action.type) {
    case ActionTypes.GET_TODOS_SUCCESS:
      return action.payload;
    case ActionTypes.DELETE_TODO_SUCCESS:
      return state.filter((item: Todo) => item.id !== action.payload);
    default:
      return state;
  }
};
```

The `ActionTypes` in case statements above act as `type guards`.
