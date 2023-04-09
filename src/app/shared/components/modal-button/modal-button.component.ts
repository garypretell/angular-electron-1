import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalButtonService } from '../../../core/services/modal-button.service';
import { MODAL_BUTTON_ALERT } from '../../../core/constants/modal-title';

@Component({
  selector: 'app-modal-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-button.component.html',
  styleUrls: ['./modal-button.component.scss']
})
export class ModalButtonComponent {
  modalService = inject(ModalButtonService);

  showModal() {
    MODAL_BUTTON_ALERT.show = true;
    this.modalService.modalData = MODAL_BUTTON_ALERT;
  }

  hideModal() {
    MODAL_BUTTON_ALERT.show = false;
    this.modalService.modalData = MODAL_BUTTON_ALERT;
  }
}
