import 'fabric';

declare var fabric;

fabric.ParkingPlace = fabric.util.createClass(fabric.Group, {
  type: 'ParkingPlace',

  initialize: function(options) {

    const items = [];

    if (options?.objects) {
      if (options.objects[0])
        items.push(new fabric.Rect(options.objects[0]));
      if (options.objects[1])
        items.push(new fabric.Text(options.objects[1].text, options.objects[1]));
    }
    else {
      items.push(new fabric.Rect({
        width: 50,
        height: 50,
        fill: "#808ece"
      }));
    }



    this.callSuper('initialize', items, options);

    this.on('modified', onModified)

    this.on('moving', onMoving);

  },


  toObject: function() {

    return fabric.util.object.extend(this.callSuper('toObject'), {
    });
  }
})

fabric.ParkingPlace.fromObject = function(object, callback) {

  const parkingPlace = new fabric.ParkingPlace(object);

  return callback(parkingPlace);
};

function onModified(options) {
  const group = options.transform.target;
  const parkingPlace = group._objects[0];

  const minWidth = 50;
  const minHeigth = 50;

  const calculatedWidth = (Math.round(group.getScaledWidth() / 10)) * 10;
  const calculatedHeight = (Math.round(group.getScaledHeight() / 10)) * 10;

  const newWidth = calculatedWidth < minWidth ? minWidth : calculatedWidth;
  const newHeight = calculatedHeight < minHeigth ? minHeigth : calculatedHeight;

  let newTop = -newHeight * 0.5;
  let newLeft = -newWidth * 0.5;

  group.set({
    width: newWidth,
    height: newHeight,
    scaleX: 1,
    scaleY: 1
  });

  parkingPlace.set({
    width: newWidth,
    height: newHeight,
    scaleX: 1,
    scaleY: 1,
    top: newTop,
    left: newLeft
  });
}

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
}

