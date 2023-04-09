import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { ITableColumn } from '../../../core/interfaces/table.interface';
import { IsBooleanCellPipe } from '../../../shared/pipes/is-boolean-cell.pipe';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatTooltipModule} from '@angular/material/tooltip';
import { FILTER_NOT_FOUND } from '../../../core/constants/constants';
import { DynamicPipe } from '../../../shared/pipes/dynamic-pipe.pipe';
import { StatusPipe } from '../../../shared/pipes/status.pipe';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    IsBooleanCellPipe,
    DynamicPipe,
    StatusPipe,
    DecimalPipe,
    MatPaginatorModule,
    MatTooltipModule
  ],
  providers:[DecimalPipe],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  @Output('onAction') emitter = new EventEmitter();
  @Output() pageAction = new EventEmitter();
  @Input('data') dataSource: any = [];
  @Input('cols') tableCols: ITableColumn[] = [];
  @Input() length = 5;
  @Input() pageSize = 5;
  @Input() pageIndex = 0;
  @Input() isVisiblePagination = true;
  messageNotFound = FILTER_NOT_FOUND;
  myPipeArgs = [];

  get keys() {
    return this.tableCols.map(({ key }) => key);
  }

  handlePageEvent(event: any) {
    this.pageAction.emit(event);
  }
}
