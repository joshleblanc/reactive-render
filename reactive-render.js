function makeComponentReactive(render) {
  const baseRender = render.bind(this);
  this.render = reactiveRender;
  function reactiveRender() {
    let rendering = undefined;
    Tracker.nonreactive(() => {
      Tracker.autorun(computation => {
        if(computation.firstRun) {
          rendering = baseRender();
        } else {
          computation.stop();
          Component.prototype.forceUpdate.call(this);
        }
      });
    })
    return rendering;
  }
  return reactiveRender.call(this);
}

export function autorun(componentClass) {
  const target = componentClass.prototype;
  const baseRender = target.render;
  target.render = function() {
    return makeComponentReactive.call(this, baseRender);
  }
  return componentClass;
}