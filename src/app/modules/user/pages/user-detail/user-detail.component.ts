/* eslint-disable @typescript-eslint/naming-convention */
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PATH_URL_DATA } from '../../../../core/constants/routes';


import { DatePipe } from '@angular/common';
import { PageEvent } from '@angular/material/paginator';
import {
  catchError,
  ignoreElements,
  Observable,
  of,
  Subject,
  takeUntil,
} from 'rxjs';
import { DGS_STATUS, DGS_TABLE } from '../../../../core/constants/constants';
import { MODAL_ALERT, MODAL_BUTTON_ALERT } from '../../../../core/constants/modal-title';
import { IFilter } from '../../../../core/interfaces/filter.interface';
import { DgsService } from '../../../../core/services/dgs.service';
import { DonorService } from '../../../../core/services/donor.service';
import { ModalButtonService } from '../../../../core/services/modal-button.service';
import { ModalService } from '../../../../core/services/modal.service';
import { BaseFormDgsSearch } from '../../../../core/utils/base-form-dgs-search';
import { TabManagerService } from '../../../tab-bar/tab-manager.service';

enum Action {
  EDIT = 'edit',
  DELETE = 'delete',
}

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent implements OnDestroy, OnInit {
  cols = DGS_TABLE;
  statusDgs = DGS_STATUS;
  folderList$!: Observable<any>;
  folderListError$!: Observable<any>;

  filtros: IFilter[] = [];
  length = 10;
  pageSize = 5;
  pageIndex = 0;
  pageEvent!: PageEvent;
  openTab = 1;

  searchDgsForm = inject(BaseFormDgsSearch);
  searchControl = new FormControl('');
  route = inject(ActivatedRoute);
  router = inject(Router);
  fb = inject(FormBuilder);
  donorService = inject(DonorService);
  dgsService = inject(DgsService);
  modalButtonService = inject(ModalButtonService);
  modalService = inject(ModalService);

  tabManager = inject(TabManagerService);
  id = this.route.snapshot.paramMap.get('id');
  filtroData: any = { donorId: +this.id };
  datePipe = inject(DatePipe);
  user = this.route.snapshot.data.userData;
  dgs: any = {};
  dgsData: any = {};

  userCopy!: any;
  form!: FormGroup;
  showModal = false;
  actionTODO = Action.EDIT;

  private destroyNotifier$ = new Subject<void>();
  private unsubscribe$ = new Subject();

  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {
    if (!this.user || this.user.length === 0) {
      this.router.navigate([`${PATH_URL_DATA.urlUserList}`]);
    }
    this.userCopy = { ...this.user };
    this.initForm(this.userCopy);
    this.addOrUpdateSelfTab();
    this.initData();
  }

  toggleModal(status: boolean, dgs?) {
    this.dgs = {};
    this.showModal = !this.showModal;
    if (this.showModal) {
      this.dgsService
      .selectDgsOid({ oidDgs: dgs.oid_dgs })
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data: any) => {
        this.dgs = data;
      });
    }
  }

  initData() {
    this.dgsService
      .getDgsByDonor(this.filtroData)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data: any) => {
        this.length = data.totalElements;
        this.folderList$ = of(data.content);
        this.folderListError$ = this.folderList$.pipe(
          ignoreElements(),
          catchError((err) => of(err))
        );
      });
  }

  toggleTabs($tabNumber: number) {
    this.openTab = $tabNumber;
  }

  onActionHandler(event: any) {
    this.dgsData = event.element;
    switch (event.action.title) {
      case 'Editar':
        this.actionTODO = Action.EDIT;
        this.toggleModal(true, event.element);
        break;
      default:
        this.actionTODO = Action.DELETE;
        MODAL_BUTTON_ALERT.title = 'Alerta';
        MODAL_BUTTON_ALERT.message = 'Esta seguro de eliminar carpeta?';
        MODAL_BUTTON_ALERT.show = true;
        this.modalButtonService.modalData = MODAL_BUTTON_ALERT;
        break;
    }
  }


  eliminar() {
    const state = DGS_STATUS.find(f => f.key === 'A');
    const params: any = {
      oidDgs: this.dgsData.oid_dgs,
      estado: state.key
    };
    this.dgsService
      .updateDgs({}, params)
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

  handlePageEvent(e: PageEvent) {
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.filtroData.page = this.pageIndex;
    this.filtroData.size = this.pageSize;
    this.dgsService
      .getDgsByDonor(this.filtroData)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data: any) => {
        this.length = data.totalElements;
        this.folderList$ = of(data.content);
        this.folderListError$ = this.folderList$.pipe(
          ignoreElements(),
          catchError((err) => of(err))
        );
      });
  }

  filtrar() {
    this.filtros = [];
    const filtros: any = structuredClone(this.searchDgsForm.baseForm.value);
    Object.keys(filtros).forEach((key) => {
      if (filtros[key] == null || filtros[key] === '') {
        delete filtros[key];
      } else {
        if (filtros[key]) {
          switch (key) {
            case 'nombre':
              this.filtros.push({
                id: key,
                name: (this.searchDgsForm.baseForm.value as any)[key],
              });
              break;
            case 'estado':
              this.filtros.push({
                id: key,
                name: (this.searchDgsForm.baseForm.value as any)[key].display,
              });
              filtros.estado = (this.searchDgsForm.baseForm.value as any)[
                key
              ].key;
              break;
            default:
              this.filtros.push({
                id: key,
                name: this.datePipe.transform(
                  (this.searchDgsForm.baseForm.value as any)[key],
                  'yyyy/MM/dd'
                ),
              });
          }
        }
      }
    });
    this.filtroData = filtros;
    this.filtroData.donorId = this.id;
    this.dgsService
      .getDgsByDonor(this.filtroData)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data: any) => {
        this.length = data.totalElements;
        this.folderList$ = of(data.content);
        this.folderListError$ = this.folderList$.pipe(
          ignoreElements(),
          catchError((err) => of(err))
        );
        this.pageIndex = 0;
      });
  }

  remove(filtro: any): void {
    this.searchDgsForm.baseForm.get(filtro.id)?.setValue('');
    this.filtrar();
  }

  cancelar(): void {
    MODAL_BUTTON_ALERT.show = false;
    this.modalButtonService.modalData = MODAL_BUTTON_ALERT;
  }

  updateDgs(dgs: any) {
    const params: any = {
      oidDgs: this.dgsData.oid_dgs,
      carpeta_destino: dgs.archiveFolderName,
      estado: 'X'
    };
    this.dgsService
      .updateDgsbyFolderStatus({}, params)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (data: any) => {
          this.dgs.status = 'X';
          this.showModal = !this.showModal;
          MODAL_ALERT.title = 'Alerta';
          MODAL_ALERT.message = 'La operación se realizó correctamente.';
          MODAL_ALERT.show = true;
          MODAL_ALERT.check = true;
          this.modalService.modalData = MODAL_ALERT;
        },
        error: (error) => {
          this.showModal = !this.showModal;
        },
        complete: () => {
          console.log('Request complete');
          this.filtrar();
        },
      });
  }

  private initForm(initialValue: any): void {}

  private addOrUpdateSelfTab(): void {
    this.tabManager.addOrUpdate({
      url: this.router.url,
      title: `${this.userCopy.donor_name} (${this.userCopy.oid_donor})`,
      dirty$: of(false),
    });
  }

}
