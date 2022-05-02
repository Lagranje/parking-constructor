import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Terminal } from 'src/app/services/api/parking-system/models/terminals.model';
import { TerminalsService } from 'src/app/services/api/parking-system/services/terminals.service';

@Component({
  selector: 'terminal-details',
  templateUrl: './terminal-details.component.html',
  styleUrls: ['./terminal-details.component.scss']
})
export class TerminalDetailsComponent implements OnInit {


  public terminal: Terminal;

  constructor(private terminalsService: TerminalsService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.terminalsService.getTerminalById(params.id).subscribe(
                            (terminal) => {
                              this.terminal = terminal;
                            });
    });
  }

  submit() {
    this.terminalsService.patchTerminal(this.terminal)
                         .subscribe(res =>
                            this.router.navigate(['./terminals'])
                         );
  }


}
