import { Pipe, PipeTransform } from '@angular/core';
import { FOLDER_STATUS } from '../../core/constants/constants';

@Pipe({
  name: 'status',
  standalone: true
})
export class StatusPipe implements PipeTransform {
  status = FOLDER_STATUS;
  transform(value: any): any {
    const state = this.status.find(f => f.key === value);
    return state ? state.display : 'Estado no Encontrado' ;
  }
}
