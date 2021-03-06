import { FormControl, FormGroup, Validators } from "@angular/forms";
import { BeaconStatus } from "./enums/beacon-status.enum";

export class TerminalFormControl extends FormControl {

  label: string;
  modelProperty: string;

  constructor(label:string, modelProperty:string, value:string, validator: any) {
    super(value, validator);
    this.label = label;
    this.modelProperty = modelProperty;
  }
}

export class TerminalSelectFormControl extends TerminalFormControl {
  label: string;
  modelProperty: string;
  options: any[];

  constructor(label:string, options: any[], modelProperty:string, value:string, validator:any) {
    super(label, modelProperty, value, validator);
    this.options = options;
  }

  get values() {
    return this.options;
  }
}

export class TerminalConfigurationFormGroup extends FormGroup {
  constructor() {
    super({
      name: new TerminalFormControl("Name", "name", "", [Validators.required, Validators.minLength(3)]),
      location: new TerminalFormControl("Location", "location", "", [Validators.required, Validators.minLength(3)]),
      width: new TerminalFormControl("Width (m)", "width", "", [Validators.required, Validators.pattern("^[0-9]*$")]),
      height: new TerminalFormControl("Height (m)", "height", "", [Validators.required, Validators.pattern("^[0-9]*$")]),
    })
  }

  get terminalSizeControls(): TerminalFormControl[] {
    return Object.keys(this.controls).map(c => this.controls[c] as TerminalFormControl);
  }
}

export class ParkingPlaceConfigurationFormGroup extends FormGroup {
  constructor() {
    super({
      label: new TerminalFormControl("Parking Place UUID", "label", "", [Validators.required, Validators.minLength(2), Validators.maxLength(3)]),
    })
  }

  get parkingPlaceConfigurationControls(): TerminalFormControl[] {
    return Object.keys(this.controls).map(c => this.controls[c] as TerminalFormControl);
  }
}

export class BeaconConfigurationFormGroup extends FormGroup {
  constructor() {
    const statusValues = Object.keys(BeaconStatus).filter((v) => isNaN(Number(v)));

    super({
      udid: new TerminalFormControl("Beacon UUID", "udid", "", [Validators.required]),
      status: new TerminalSelectFormControl("Status", statusValues, "status", "", [Validators.required])
    })
  }

  get beaconConfigurationControls(): (TerminalFormControl | TerminalSelectFormControl) [] {
    return Object.keys(this.controls).map(c => this.controls[c] as TerminalFormControl);
  }
}


