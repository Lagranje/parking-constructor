import { Component, ViewChild } from '@angular/core';

import { TerminalConfigurationFormGroup } from 'src/app/services/api/parking-system/models/terminal-form.model';
import { Terminal } from 'src/app/services/api/parking-system/models/terminals.model';
import { TerminalsService } from 'src/app/services/api/parking-system/services/terminals.service';

import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';

@Component({
  selector: 'terminal-create',
  templateUrl: './terminal-create.component.html',
  styleUrls: ['./terminal-create.component.scss']
})
export class TerminalCreateComponent{


  @ViewChild("stepper", { static: false }) stepper: MatStepper;

  public terminal: Terminal = new Terminal();

  public terminalConfigurationForm: TerminalConfigurationFormGroup = new TerminalConfigurationFormGroup();

  constructor(private terminalsService: TerminalsService,
              private router: Router) {
  }

  submit() {
    this.terminalsService.postTerminal(this.terminal)
                          .subscribe(() => {
                            this.router.navigate(['./terminals'])
                          });
  }

  terminalConfigurationNextHandler() {
    if (this.terminalConfigurationForm.valid) {
      this.mapFormsToModel();
    }
  }


  private mapFormsToModel() {
      this.terminal.name = this.terminalConfigurationForm.value.name;
      this.terminal.location = this.terminalConfigurationForm.value.location;
      this.terminal.height = this.terminalConfigurationForm.value.height;
      this.terminal.width = this.terminalConfigurationForm.value.width;
  }
}
