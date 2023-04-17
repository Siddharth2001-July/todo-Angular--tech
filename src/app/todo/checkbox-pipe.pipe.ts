import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'checkboxPipe'
})
export class CheckboxPipePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    let out
    if(value == true)
      out ="checked"
    return out;
  }

}
