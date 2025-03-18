import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListTransactionsComponent } from './pages/list-transactions/list-transactions.component';
import { AddTransactionComponent } from './pages/add-transaction/add-transaction.component';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ListTransactionsComponent,
    AddTransactionComponent,
    
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule, 
    SharedModule  
  ],
  exports: [
    ListTransactionsComponent,
    AddTransactionComponent,
    MatTableModule,
    SharedModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TransactionsModule { }












