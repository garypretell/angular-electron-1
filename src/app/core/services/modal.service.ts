import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface IModal {
  title: string;
  message: string;
  show: boolean;
  check?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  modalSubject: BehaviorSubject<IModal> = new BehaviorSubject<IModal>({ title: '', message: '', show: false, check: false });

  get modalValue(): IModal {
    return this.modalSubject.value;
  }

  get modalObs() {
    return this.modalSubject.asObservable();
  }

  set modalData(data: IModal) {
    this.modalSubject.next(data);
  }
}

