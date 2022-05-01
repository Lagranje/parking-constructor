import 'fabric';

declare var fabric;

fabric.Grid = fabric.util.createClass(fabric.Group, {
  type: 'Grid',

  initialize: function(options) {


    const gridArray = [];

    const overriddenOptions = {
      width: options.width,
      height: options.height,
      selectable: options.selectable,
      gridSize: options.gridSize,
      unitScale: options.unitScale
    }

    const gridWidth = options.width * options.unitScale;
    const gridHeight = options.height * options.unitScale;
    const mainLinesColor = "#000";
    const subLinesColor = "#ccc";

    for (let i = 0; i <= (gridWidth / options.gridSize); i++) {
      //main lines

      gridArray.push(new fabric.Line([
                                        i * options.gridSize,
                                        0,
                                        i * options.gridSize,
                                        gridHeight
                                      ],
                                      {
                                        type:'line',
                                        stroke: mainLinesColor,
                                        strokeWidth: 2,
                                        selectable: false
                                      }));
      gridArray.push(new fabric.Line([
                                        0,
                                        i * options.gridSize,
                                        gridWidth,
                                        i * options.gridSize
                                      ],
                                      {
                                        type: 'line',
                                        stroke: mainLinesColor,
                                        strokeWidth: 2,
                                        selectable: false
                                      }));

      if (i == gridWidth/options.gridSize)
        break;

      //sublines

      for (let j = 1; j < options.unitScale/2; j++) {
        gridArray.push(new fabric.Line([
          i * options.gridSize + j * options.unitScale,
          0,
          i * options.gridSize + j * options.unitScale,
          gridHeight
        ],
        {
          type:'line',
          stroke: subLinesColor,
          strokeWidth: 1,
          selectable: false
        }));

        gridArray.push(new fabric.Line([
          0,
          i * options.gridSize + j * options.unitScale,
          gridWidth,
          i * options.gridSize + j * options.unitScale
        ],
        {
          type:'line',
          stroke: subLinesColor,
          strokeWidth: 1,
          selectable: false
        }));
      }
    }

    this.callSuper('initialize', gridArray, overriddenOptions);
  },


  toObject: function() {

    return fabric.util.object.extend(this.callSuper('toObject'), {
      width: this.width,
      height: this.height,
      selectable: this.selectable,
      hasControls: this.hasControls,
      gridSize: this.gridSize,
      unitScale: this.unitScale
    });
  }
})

fabric.Grid.fromObject = function(object, callback) {
  const grid = new fabric.Grid(object);

  return callback(grid);
};
