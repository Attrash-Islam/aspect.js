import { aspectFactory, Aspect } from '../../core/Aspect';

let AsyncAdvices:{
  afterReject:{(classPattern:RegExp, methodPattern:RegExp):void},
  afterResolve:{(classPattern:RegExp, methodPattern:RegExp):void}
} = {
  afterResolve: aspectFactory('afterResolve', function (o, p, className) {
    let bak = o[p];
    let advice = this;
    o[p] = function () {
      let promise = bak.apply(this, arguments);
      return promise.then(advice.exec.bind(this, {
        name: p,
        className: className
      }));
    };
  }),

  afterReject: aspectFactory('afterReject', function (o, p, className) {
    let bak = o[p];
    let advice = this;
    o[p] = function () {
      let promise = bak.apply(this, arguments);
      return promise.catch(advice.exec.bind(this, {
        name: p,
        className: className
      }));
    };
  })
};


export default AsyncAdvices;