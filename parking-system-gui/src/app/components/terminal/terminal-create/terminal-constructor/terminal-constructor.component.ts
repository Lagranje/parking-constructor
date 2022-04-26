import { Component, Input, OnInit } from '@angular/core';
import 'fabric';
import { Canvas } from 'fabric/fabric-impl';
import { Terminal } from 'src/app/services/api/parking-system/models/terminals.model';
import { ParkingPlaceConfigurationFormGroup } from 'src/app/services/api/parking-system/models/terminal-form.model';
import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';

declare const fabric;

@Component({
  selector: 'terminal-constructor',
  templateUrl: './terminal-constructor.component.html',
  styleUrls: ['./terminal-constructor.component.scss']
})
export class TerminalConstructorComponent implements OnInit {

  public canvas;

  public parkingPlaceLabelFormGroup = new ParkingPlaceConfigurationFormGroup();

  @Input('terminal') set terminal(terminal: Terminal) {
    this.initTerminalConstructor(terminal);
  }

  constructor() {}

  public readonly grid = 50;
  public readonly unitScale = 10;



  initTerminalConstructor(terminal: Terminal) {
    this.canvas = new fabric.Canvas('canvas');
    const gridWidth = terminal.width * this.unitScale;
    const gridHeight = terminal.height * this.unitScale;
    this.canvas.setWidth(gridWidth);
    this.canvas.setHeight(gridHeight);

    // this.canvas.loadFromJSON();


    for (var i = 0; i < (gridWidth / this.grid); i++) {
      this.canvas.add(new fabric.Line([ i * this.grid, 0, i * this.grid, gridWidth], { type:'line', stroke: '#ccc', selectable: false }));
      this.canvas.add(new fabric.Line([ 0, i * this.grid, gridHeight, i * this.grid], { type: 'line', stroke: '#ccc', selectable: false }))
    }

  }

  addParkingPlace() {
    const parkingPlace = this.createParkingPlaceRectangle();

    const group = new fabric.Group([parkingPlace], {
      left: 50,
      top: 50,
      hasControls: true
    });

    group.on('modified', this.parkingPlaceOnModified.bind(this));

    group.on('moving', this.parkingPlaceOnMoving.bind(this));

    this.canvas.add(parkingPlace);
  }

  createLabel(text: string, group) {
    return new fabric.Text(text, {
      fontSize: 30,
      originX: 'center',
      originY: 'center',
      fill: '#000000'
    });
  }

  createParkingPlaceRectangle() {
    return new fabric.Rect({
      width: 50,
      height: 50,
      type: 'Rect',
      fill: '#3c96c7'
    });
  }

  parkingPlaceOnModified(options) {
    const group = options.transform.target;
    const parkingPlace = group._objects[0];

    const newWidth = (Math.round(group.getScaledWidth() / this.grid)) * this.grid;
    const newHeight = (Math.round(group.getScaledHeight() / this.grid)) * this.grid;

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
      top: -newHeight * 0.5,
      left: -newWidth * 0.5
    });
  }

  parkingPlaceOnMoving(options) {
    options.transform.target.set({
      left: Math.round(options.transform.target.left / this.grid) * this.grid,
      top: Math.round(options.transform.target.top / this.grid) * this.grid
    });
  }

  removeSelectedParkingPlace() {
    this.canvas.remove(this.canvas.getActiveObject());
  }

  addOrUpdateLabel() {
    if (this.parkingPlaceLabelFormGroup.valid) {
      const text = this.parkingPlaceLabelFormGroup.value.label;
      const parkingPlaceGroup = this.canvas.getActiveObject();
      const labelObject = parkingPlaceGroup._objects[1];

      if (labelObject) {
        labelObject.set({
          text: text
        })
      } else {
        const label = this.createLabel(this.parkingPlaceLabelFormGroup.value.label, parkingPlaceGroup);
        parkingPlaceGroup.add(label);
      }

      debugger
      this.canvas.renderAll();
      this.parkingPlaceLabelFormGroup.reset();
    }
  }

  logCanvas() {
    console.log(JSON.stringify(this.canvas))
  }

  ngOnInit() {
  }
}
