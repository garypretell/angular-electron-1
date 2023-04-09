/* eslint-disable @typescript-eslint/naming-convention */
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';

import {
  DGS_STATUS,
  DONOR_TABLE,
  FOLDER_STATUS,
  NUM_THREADS,
} from '../../../../core/constants/constants';
import { PATH_URL_DATA } from '../../../../core/constants/routes';
import { IFilter } from '../../../../core/interfaces/filter.interface';
import { BaseFormUserSearch } from '../../../../core/utils/base-form-user-search';

import { DatePipe } from '@angular/common';
import {
  catchError,
  ignoreElements,
  Observable,
  of,
  Subject,
  takeUntil,
} from 'rxjs';
import { MODAL_ALERT, MODAL_BUTTON_ALERT } from '../../../../core/constants/modal-title';
import { IDonor } from '../../../../core/interfaces/donor.interface';
import { IExtractBody } from '../../../../core/interfaces/extract.interface';
import { IProcessBody } from '../../../../core/interfaces/process.interface';
import { DonorService } from '../../../../core/services/donor.service';
import { EtlService } from '../../../../core/services/etl.service';
import { ModalButtonService } from '../../../../core/services/modal-button.service';
import { ModalService } from '../../../../core/services/modal.service';
import { UserCreateComponent } from '../user-create/user-create.component';

enum Action {
  EDIT = 'edit',
  DELETE = 'delete',
  PROCESS = 'process',
  REPROCESS = 'reprocess',
  CARGAR = 'cargar',
}

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit, OnDestroy {
  cols = DONOR_TABLE;
  statusList = FOLDER_STATUS;

  filtros: IFilter[] = [];
  filtroData: any = {};
  donor: any = {};
  length = 10;
  pageSize = 5;
  pageIndex = 0;
  selectedDirectory = '';
  pageEvent!: PageEvent;

  searchUserForm = inject(BaseFormUserSearch);
  searchControl = new FormControl('');

  modalButtonService = inject(ModalButtonService);
  donorService = inject(DonorService);
  etlService = inject(EtlService);
  modalService = inject(ModalService);
  router = inject(Router);
  dialog = inject(MatDialog);
  datePipe = inject(DatePipe);

  donorList$!: Observable<IDonor[]>;
  donorListError$!: Observable<IDonor[]>;
  actionTODO = Action.EDIT;

  showLoading = false;
  private unsubscribe$ = new Subject();

  ngOnDestroy(): void {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {
    this.initData();
  }

  initData() {
    this.donorService
      .getDonorsPagination(this.filtroData)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.length = data.totalElements;
        this.donorList$ = of(data.content);
        this.donorListError$ = this.donorList$.pipe(
          ignoreElements(),
          catchError((err) => of(err))
        );
      });
  }

  getDetail(donor: any) {
    this.router.navigate([`${PATH_URL_DATA.urlUserDetail}/${donor.oidDonor}`]);
  }

  openDialog() {
    const user = {};
    const dialogRef = this.dialog.open(UserCreateComponent, {
      width: '480px',
      data: { user },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.selectedDirectory = result.selectedDirectory;
        this.actionTODO = Action.CARGAR;
        MODAL_BUTTON_ALERT.title = 'Alerta';
        MODAL_BUTTON_ALERT.message = `Esta seguro de realizar la carga  ${result.selectedDirectory}`;
        MODAL_BUTTON_ALERT.show = true;
        this.modalButtonService.modalData = MODAL_BUTTON_ALERT;
      }
    });
  }

  handlePageEvent(e: PageEvent) {
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.filtroData.page = this.pageIndex;
    this.filtroData.size = this.pageSize;
    this.donorService
      .getDonorsPagination(this.filtroData)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.length = data.totalElements;
        this.donorList$ = of(data.content);
        this.donorListError$ = this.donorList$.pipe(
          ignoreElements(),
          catchError((err) => of(err))
        );
      });
  }

  filtrar() {
    this.filtros = [];
    const filtros: any = structuredClone(this.searchUserForm.baseForm.value);
    Object.keys(filtros).forEach((key) => {
      if (filtros[key] == null || filtros[key] === '') {
        delete filtros[key];
      } else {
        if (filtros[key]) {
          switch (key) {
            case 'nombre':
              this.filtros.push({
                id: key,
                name: (this.searchUserForm.baseForm.value as any)[key],
              });
              break;
            case 'estado':
              this.filtros.push({
                id: key,
                name: (this.searchUserForm.baseForm.value as any)[key].display,
              });
              filtros.estado = (this.searchUserForm.baseForm.value as any)[
                key
              ].key;
              break;
            default:
              this.filtros.push({
                id: key,
                name: this.datePipe.transform(
                  (this.searchUserForm.baseForm.value as any)[key],
                  'yyyy/MM/dd'
                ),
              });
          }
        }
      }
    });

    this.filtroData = filtros;
    this.donorService
      .getDonorsPagination(this.filtroData)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.length = data.totalElements;
        this.donorList$ = of(data.content);
        this.donorListError$ = this.donorList$.pipe(
          ignoreElements(),
          catchError((err) => of(err))
        );
        this.pageIndex = 0;
      });
  }

  remove(filtro: any): void {
    this.searchUserForm.baseForm.get(filtro.id)?.setValue('');
    this.filtrar();
  }

  onActionHandler(event: any) {
    this.donor = event.element;
    switch (event.action.title) {
      case 'Editar':
        this.actionTODO = Action.EDIT;
        this.getDetail(event.element);

        break;
      case 'Eliminar':
        this.actionTODO = Action.DELETE;
        MODAL_BUTTON_ALERT.title = 'Alerta';
        MODAL_BUTTON_ALERT.message = 'Esta seguro de eliminar carpeta?';
        MODAL_BUTTON_ALERT.show = true;
        this.modalButtonService.modalData = MODAL_BUTTON_ALERT;
        break;
      case 'Procesar':
        this.actionTODO = Action.PROCESS;
        MODAL_BUTTON_ALERT.title = 'Alerta';
        MODAL_BUTTON_ALERT.message = 'Esta seguro de procesar?';
        MODAL_BUTTON_ALERT.show = true;
        this.modalButtonService.modalData = MODAL_BUTTON_ALERT;
        break;
      case 'Reprocesar':
        this.actionTODO = Action.REPROCESS;
        MODAL_BUTTON_ALERT.title = 'Alerta';
        MODAL_BUTTON_ALERT.message = 'Esta seguro de procesar?';
        MODAL_BUTTON_ALERT.show = true;
        this.modalButtonService.modalData = MODAL_BUTTON_ALERT;
        break;
      default:
        this.actionTODO = Action.CARGAR;
        MODAL_BUTTON_ALERT.title = 'Alerta';
        MODAL_BUTTON_ALERT.message = 'Esta seguro de realizar la carga?';
        MODAL_BUTTON_ALERT.show = true;
        this.modalButtonService.modalData = MODAL_BUTTON_ALERT;
        break;
    }
  }

  cancelar() {
    MODAL_BUTTON_ALERT.show = false;
    this.modalButtonService.modalData = MODAL_BUTTON_ALERT;
  }

  cargar() {
    this.showLoading = true;
    const body: IExtractBody = {
      id: this.selectedDirectory,
      parallel: NUM_THREADS,
    };
    this.etlService
      .extract(body)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (data: any) => {
          this.showLoading = false;
          MODAL_BUTTON_ALERT.show = false;
          this.modalButtonService.modalData = MODAL_BUTTON_ALERT;
          MODAL_ALERT.title = 'Alerta';
          MODAL_ALERT.message = 'La operación se realizó correctamente.';
          MODAL_ALERT.show = true;
          MODAL_ALERT.check = true;
          this.modalService.modalData = MODAL_ALERT;
        },
        error: (error) => {
          this.showLoading = false;
          MODAL_BUTTON_ALERT.show = false;
          this.modalButtonService.modalData = MODAL_BUTTON_ALERT;
          // handle error
        },
        complete: () => {
          console.log('Request complete');
        },
      });
  }

  eliminar() {
    const state = DGS_STATUS.find(f => f.key === 'A');
    const params: any = {
      donorId: +this.donor.oidDonor,
      estado: state.key
    };
    this.donorService
      .updateDonor({}, params)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (data: any) => {
          MODAL_BUTTON_ALERT.show = false;
          this.modalButtonService.modalData = MODAL_BUTTON_ALERT;
        },
        error: (error) => {
          MODAL_BUTTON_ALERT.show = false;
          this.modalButtonService.modalData = MODAL_BUTTON_ALERT;
        },
        complete: () => {
          console.log('Request complete');
          this.filtrar();
        },
      });
  }

  process() {
    const body: IProcessBody = {
      id: +this.donor.oidDonor,
      parallel: NUM_THREADS,
    };
    this.etlService
      .transform(body)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (data: any) => {
          MODAL_BUTTON_ALERT.show = false;
          this.modalButtonService.modalData = MODAL_BUTTON_ALERT;
        },
        error: (error) => {
          MODAL_BUTTON_ALERT.show = false;
          this.modalButtonService.modalData = MODAL_BUTTON_ALERT;
          // handle error
        },
        complete: () => {
          console.log('Request complete');
        },
      });
  }

  reprocess() {
    const body: IProcessBody = {
      id: +this.donor.oidDonor,
      parallel: NUM_THREADS,
    };
    this.etlService
      .retransform(body)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (data: any) => {
          MODAL_BUTTON_ALERT.show = false;
          this.modalButtonService.modalData = MODAL_BUTTON_ALERT;
        },
        error: (error) => {
          MODAL_BUTTON_ALERT.show = false;
          this.modalButtonService.modalData = MODAL_BUTTON_ALERT;
          // handle error
        },
        complete: () => {
          console.log('Request complete');
        },
      });
  }
}
