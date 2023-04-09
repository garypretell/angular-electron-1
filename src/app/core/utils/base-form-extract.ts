/* eslint-disable @typescript-eslint/naming-convention */
import { FormBuilder, Validators } from '@angular/forms';
import { inject, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BaseFormExtract {
  fb = inject(FormBuilder);

  baseForm = this.fb.group({
    rutaDirectorio: ['', [Validators.required]]
  });
}
