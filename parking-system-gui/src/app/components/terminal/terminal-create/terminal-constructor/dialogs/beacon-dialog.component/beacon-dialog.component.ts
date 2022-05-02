import { Component, Inject } from "@angular/core";
import { BeaconConfigurationFormGroup } from "src/app/services/api/parking-system/models/terminal-form.model";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  templateUrl: "beacon-dialog.component.html",
  styleUrls: ["beacon-dialog.component.scss"],
  selector: "beacon-dialog"
})

export class BeaconDialogComponent {

  public form: BeaconConfigurationFormGroup = new BeaconConfigurationFormGroup();

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.form.patchValue(data);
  }



}
