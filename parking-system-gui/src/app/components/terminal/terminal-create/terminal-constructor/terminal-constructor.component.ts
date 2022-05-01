import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import 'fabric';
import { Terminal } from 'src/app/services/api/parking-system/models/terminals.model';
import { ParkingPlaceConfigurationFormGroup } from 'src/app/services/api/parking-system/models/terminal-form.model';
import { faTrash, faParking, faWifi } from '@fortawesome/free-solid-svg-icons';

declare const fabric;

@Component({
  selector: 'terminal-constructor',
  templateUrl: './terminal-constructor.component.html',
  styleUrls: ['./terminal-constructor.component.scss']
})
export class TerminalConstructorComponent {
  private _terminal;

  public trashIcon = faTrash;
  public parkingIcon = faParking;
  public beaconIcon = faWifi;

  public canvas;
  public parkingPlaceLabelFormGroup = new ParkingPlaceConfigurationFormGroup();

  @Output() submitEventEmitter = new EventEmitter();

  @Input('terminal') set terminal(terminal: Terminal) {
    if (terminal) {
      this._terminal = terminal;
      this.initTerminalConstructor();
    }
  }

  get terminal() {
    return this._terminal;
  }

  constructor() {}

  public readonly gridSize = 50;
  public readonly unitScale = 10;



  initTerminalConstructor() {
    this.canvas = new fabric.Canvas('canvas', {
      selection: false,
      borderColor: '#0f0',
      preserveObjectStacking: true
    });

    this.setSize();


    if (this.terminal.terminalScheme) {
      this.canvas.loadFromJSON(this.terminal.terminalScheme);
    }
    else {
      this.setGrid();
    }
  }

  setSize() {
    const gridWidth = this.terminal.width * this.unitScale;
    const gridHeight = this.terminal.height * this.unitScale;
    this.canvas.setWidth(gridWidth);
    this.canvas.setHeight(gridHeight );
  }

  setGrid() {
    const grid = new fabric.Grid({
      width: this.terminal.width,
      height: this.terminal.height,
      gridSize: this.gridSize,
      unitScale: this.unitScale,
      selectable: false
    });
    this.canvas.add(grid);
  }

  addParkingPlace() {
    const parkingPlace = new fabric.ParkingPlace();

    this.canvas.add(parkingPlace);
  }

  createLabel(text: string) {
    return new fabric.Text(text, {
      fontSize: 30,
      originX: 'center',
      originY: 'center',
      fill: '#000000'
    });
  }

  removeActiveObject() {
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
        const label = this.createLabel(this.parkingPlaceLabelFormGroup.value.label);
        parkingPlaceGroup.add(label);
      }

      this.canvas.renderAll();
      this.parkingPlaceLabelFormGroup.reset();
    }
  }

  addBeacon() {

    const beacon = new fabric.Beacon({

    });
    this.canvas.add(beacon);
  }



  submit() {
    this.terminal.terminalScheme = JSON.stringify(this.canvas);
    this.submitEventEmitter.emit();
  }
}
