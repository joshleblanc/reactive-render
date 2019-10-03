### Reactive Render

A simple decorator to make a render method reactive.

Usage:

```jsx
import React, { Component } from 'react';
import { ReactiveVar } from 'meteor/reactive-var';
import { autorun } from 'meteor/cereal:reactive-render';

const Count = new ReactiveVar(0);

@autorun
export default class Hello extends Component {
  increment() {
    Count.set(Count.get() + 1);
  }

  render() {
    return (
      <div>
        <button onClick={this.increment}>Click Me</button>
        <p>You've pressed the button {Count.get()} times.</p>
      </div>
    );
  }
}
```

Hook usages:

```jsx
import React, { Component } from 'react';
import { ReactiveVar } from 'meteor/reactive-var';
import { makeTracker } from 'meteor/cereal:reactive-render';

const Count = new ReactiveVar(0);

const useTracker = makeTracker(() => {
  return {
    count: Count.get()
  }
})

export default () =>{
  const { count } = useTracker();
  return (
    <div>
      <button onClick={() => Count.set(count + 1))}>Click Me</button>
      <p>You've pressed the button {count} times.</p>
    </div>
  );
}
```