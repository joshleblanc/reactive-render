import { Component, useState } from 'react';
import { Tracker } from 'meteor/tracker';

function makeComponentReactive(render) {
  const baseRender = render.bind(this);
  this.render = reactiveRender;
  let c;
  function reactiveRender() {
    let rendering = undefined;
    Tracker.nonreactive(() => {
      c = Tracker.autorun(computation => {
        if(computation.firstRun) {
          if(c) c.stop();
          rendering = baseRender();
        } else {
          computation.stop();
          Component.prototype.forceUpdate.call(this);
        }
      });
    })
    return rendering;
  }

  const originalComponentWillUnmount = this.componentWillUnmount;
  this.componentWillUnmount = function() {
    if(c) c.stop();
    if(originalComponentWillUnmount) {
      originalComponentWillUnmount.call(this);
    }
  }
  return reactiveRender.call(this);
}

export function autorun(componentClass) {
  const target = componentClass.prototype;
  const baseRender = target.render;
  if(Meteor.isClient) {
    target.render = function() {
      return makeComponentReactive.call(this, baseRender);
    }
  }
  return componentClass;
}

export const makeTracker = fn => {
  let result = {};
  return () => {
    const [ , setResult ] = useState({});
    Tracker.nonreactive(() => {
      Tracker.autorun(computation => {
        if(computation.firstRun) {
          result = fn();
        } else {
          computation.stop();
          setResult(result);
        }
      });
    })

    return result;
  }
}
