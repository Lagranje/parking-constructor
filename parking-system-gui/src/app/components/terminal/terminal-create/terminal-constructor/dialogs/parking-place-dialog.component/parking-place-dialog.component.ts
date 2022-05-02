import { Component, Inject } from "@angular/core";
import { ParkingPlaceConfigurationFormGroup } from "src/app/services/api/parking-system/models/terminal-form.model";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  templateUrl: "parking-place-dialog.component.html",
  selector: "parking-place-dialog",
  styleUrls: ["parking-place-dialog.component.scss"]
})

export class ParkingPlaceDialogComponent {

  public form: ParkingPlaceConfigurationFormGroup = new ParkingPlaceConfigurationFormGroup();

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.form.patchValue(data);
  }





}
