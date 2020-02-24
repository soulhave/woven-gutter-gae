import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'featureSearchFilter'
})
export class FeatureSearch implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    console.log("Value =>",value);
    console.log("Filter by =>",args[0]);

    return value;
  }

}