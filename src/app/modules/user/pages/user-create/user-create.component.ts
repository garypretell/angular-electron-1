import { Component, Inject, inject } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MODAL_BUTTON_ALERT } from '../../../../core/constants/modal-title';
import { ModalButtonService } from '../../../../core/services/modal-button.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss'],
})
export class UserCreateComponent  {
  selectedDirectory = '';
  formGroupUploadDocument: FormGroup;
  items: FormArray;

  imageFile: any;
  modalButtonService = inject(ModalButtonService);
  constructor(
    public dialogRef: MatDialogRef<UserCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}


  cancelar(): void {
    MODAL_BUTTON_ALERT.show = false;
    this.modalButtonService.modalData = MODAL_BUTTON_ALERT;
  }

  openModalRubrica() {
    this.selectedDirectory = '';
    const { dialog } = (window as any).require('@electron/remote');
    const options = {
      properties: ['openDirectory'],
    };
    dialog
      .showOpenDialog(options)
      .then((result) => {
        if (!result.canceled) {
          const selectedDirectory = result.filePaths[0];
          this.data.selectedDirectory = selectedDirectory;
          this.selectedDirectory = selectedDirectory;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
