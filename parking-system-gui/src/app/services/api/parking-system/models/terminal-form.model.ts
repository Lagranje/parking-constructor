import { FormControl, FormGroup, Validators } from "@angular/forms";

export class TerminalFormControl extends FormControl {

  label: string;
  modelProperty: string;

  constructor(label:string, modelProperty:string, value:string, validator: any) {
    super(value, validator);
    this.label = label;
    this.modelProperty = modelProperty;
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
      label: new TerminalFormControl("Label", "label", "", [Validators.required, Validators.minLength(2), Validators.maxLength(2)]),
    })
  }

  get parkingPlaceConfigurationControls(): TerminalFormControl[] {
    return Object.keys(this.controls).map(c => this.controls[c] as TerminalFormControl);
  }
}


