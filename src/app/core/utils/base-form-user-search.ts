/* eslint-disable @typescript-eslint/naming-convention */
import { FormBuilder, Validators } from '@angular/forms';
import { inject, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BaseFormUserSearch {
  fb = inject(FormBuilder);

  baseForm = this.fb.group({
    nombre: [''],
    fecha_carga_desde: [''],
    fecha_carga_hasta: [''],
    fecha_cambio_desde: [''],
    fecha_cambio_hasta: [''],
    estado: ['']
  });
}
