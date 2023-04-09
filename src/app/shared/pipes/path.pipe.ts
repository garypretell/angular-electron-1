import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pathPipe',
  standalone: true
})
export class PathPipe implements PipeTransform {

  transform(value: string): string {
    const parts = value.split('\\');
    const lastPart = parts[parts.length - 1];
    return lastPart;
  }

}
