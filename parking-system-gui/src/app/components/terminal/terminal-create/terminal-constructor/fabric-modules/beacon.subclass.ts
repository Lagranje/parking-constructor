import 'fabric';
import { TargetLocator } from 'selenium-webdriver';

declare var fabric;

fabric.Beacon = fabric.util.createClass(fabric.Circle, {
  type: 'Beacon',

  initialize: function() {
    const options = {
      radius: 10,
      fill: 'green',
      hasControls: false,
      hasBorders: false
    };
    this.callSuper('initialize', options);

    this.on('moving', onMoving);

  },


  toObject: function() {
    return fabric.util.object.extend(this.callSuper('toObject'), {

    });
  }
})

fabric.Beacon.fromObject = function(object, callback) {
  return fabric.Object._fromObject('Beacon', object, callback);
};


function onMoving(options) {
  const canvas = options.transform.target.canvas;

  let newTop = Math.round(options.transform.target.top / 10) * 10;
  let newLeft = Math.round(options.transform.target.left / 10) * 10;

  const minTop = 0;
  const maxTop = canvas.height - options.transform.target.height;

  const minLeft = 0;
  const maxLeft = canvas.width - options.transform.target.width;


  if (newTop < minTop)
    newTop = minTop

  if (newTop > maxTop)
    newTop = maxTop

  if (newLeft < minLeft)
    newLeft = minLeft

  if (newLeft > maxLeft)
    newLeft = maxLeft

  options.transform.target.set({
    left: newLeft,
    top: newTop
  });

  canvas.bringToFront(options.transform.target);
}

