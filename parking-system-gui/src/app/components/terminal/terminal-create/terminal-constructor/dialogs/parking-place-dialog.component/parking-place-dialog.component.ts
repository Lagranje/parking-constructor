import { Component } from "@angular/core";
import { ParkingPlaceConfigurationFormGroup } from "src/app/services/api/parking-system/models/terminal-form.model";

@Component({
  templateUrl: "parking-place-dialog.component.html",
  selector: "parking-place-dialog",
  styleUrls: ["parking-place-dialog.component.scss"]
})

export class ParkingPlaceDialogComponent {

  public form: ParkingPlaceConfigurationFormGroup = new ParkingPlaceConfigurationFormGroup();

  constructor(){

  }





}
