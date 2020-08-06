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

## Support me

<a href="https://www.buymeacoffee.com/jleblanc" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy Me A Coffee" height="40" ></a>
