import { Component } from "@angular/core";
import { BeaconConfigurationFormGroup } from "src/app/services/api/parking-system/models/terminal-form.model";

@Component({
  templateUrl: "beacon-dialog.component.html",
  styleUrls: ["beacon-dialog.component.scss"],
  selector: "beacon-dialog"
})

export class BeaconDialogComponent {

  public form: BeaconConfigurationFormGroup = new BeaconConfigurationFormGroup();

  constructor() {

  }



}
