import { Injector, Pipe, PipeTransform, Inject } from '@angular/core';
import { AnyMxRecord } from 'dns';

@Pipe({
  name: 'dynamicPipe',
  standalone: true,
})
export class DynamicPipe implements PipeTransform {
  public constructor(private injector: Injector) {
  }

  transform(value: any, pipeToken: AnyMxRecord): any {
      if (!pipeToken) {
          return value;
      }
      else {
          const pipe = this.injector.get(pipeToken);
          return pipe.transform(value);
      }
  }
}
