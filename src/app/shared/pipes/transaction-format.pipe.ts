import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transactionFormat'
})
export class TransactionFormatPipe implements PipeTransform {
  transform(value: number, tipo: 'E' | 'S'): string {
    const prefix = tipo === 'E' ? '+ R$ ' : '- R$ ';
    return prefix + value.toFixed(2).replace('.', ',');
  }
}
