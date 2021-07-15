import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'uppercaseFirst' })
export class UppercaseFirstPipe implements PipeTransform {

    transform(value: any, ...args: any[]) {
        
        let stringValue = new String(value);

        if(!stringValue)
            return;

        return stringValue[0].toUpperCase() + stringValue.substring(1).toLowerCase();
    } 
}