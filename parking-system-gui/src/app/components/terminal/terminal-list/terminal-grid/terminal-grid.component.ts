import { AfterViewInit, Component} from '@angular/core';
import { Terminal } from 'src/app/services/api/parking-system/models/terminals.model';
import { TerminalsService } from 'src/app/services/api/parking-system/services/terminals.service';
import { ChangeDetectorRef } from '@angular/core';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';

import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'terminal-grid',
  templateUrl: './terminal-grid.component.html',
  styleUrls: ['./terminal-grid.component.scss']
})
export class TerminalGridComponent implements AfterViewInit{

  public loading: boolean = true;
  public dataSource: MatTableDataSource<Terminal> = new MatTableDataSource([]);
  public selection = new SelectionModel<Terminal>(true, []);



  public displayedColumns = ["name", "location", "deleteAction"];

  @ViewChild(MatPaginator) paginator: MatPaginator;


  public trashIcon = faTrash;

  constructor(private terminalsService: TerminalsService) {
  }

  ngAfterViewInit() {
    this.terminalsService.getTerminals().subscribe((terminals) => {
      this.dataSource = new MatTableDataSource(terminals);
      this.dataSource.paginator = this.paginator;
      this.loading = false;
    });
  }

  deleteTerminal($event, terminal: Terminal) {
    $event.stopImmediatePropagation();

    this.terminalsService.deleteTerminal(terminal._id).subscribe(res => {
      this.dataSource.data = this.dataSource.data.filter(t => t._id != terminal._id);
    })
  }
}
