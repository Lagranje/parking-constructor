import 'fabric';
import { BeaconStatus } from "../../../../../services/api/parking-system/models/enums/beacon-status.enum";

declare var fabric;

fabric.Beacon = fabric.util.createClass(fabric.Circle, {
  type: 'Beacon',

  initialize: function(options) {

    const fill =  BeaconStatus[options.status] == BeaconStatus.DISABLED.toString() ? "red" : "green";

    const overriddenOptions = {
      radius: 10,
      fill: fill,
      hasControls: false,
      hasBorders: false,
      top: options.top ?? 0,
      left: options.left ?? 0,
      rfid: options.rfid,
      status: options.status
    };
    this.callSuper('initialize', overriddenOptions);

    this.on('moving', onMoving);

  },


  toObject: function() {
    return fabric.util.object.extend(this.callSuper('toObject'), {
      rfid: this.rfid,
      status: this.status
    });
  }
})

fabric.Beacon.fromObject = function(object, callback) {
  const beacon = new fabric.Beacon(object);

  return callback(beacon);
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

