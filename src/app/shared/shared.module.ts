import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { TransactionFormatPipe } from './pipes/transaction-format.pipe';

@NgModule({
  declarations: [
    NavbarComponent,
    TransactionFormatPipe,
  ],
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    MatToolbarModule, 
    MatButtonModule
    ],
  exports: [
    ReactiveFormsModule,
    NavbarComponent,
    TransactionFormatPipe

  ]
})
export class SharedModule { }







