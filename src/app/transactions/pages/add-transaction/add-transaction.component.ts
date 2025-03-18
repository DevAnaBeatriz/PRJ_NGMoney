import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransactionService, Transaction } from 'src/app/core/services/transaction.service';

@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.scss'],
})
export class AddTransactionComponent {
  @Output() closeModal = new EventEmitter<void>(); 
  @Output() transactionAdded = new EventEmitter<void>();

  transactionForm: FormGroup;
  selectedType: 'E' | 'S' | '' = ''; 

  constructor(private fb: FormBuilder, private transactionService: TransactionService) {
    this.transactionForm = this.fb.group({
      descricao: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/.*\S.*/)]], // Sem espaços vazios
      preco: ['', [Validators.required, Validators.min(0.01)]], 
      categoria: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/.*\S.*/)]],
      tipoTransacao: ['', Validators.required] 
    });
  }

  submit(): void {
    if (this.transactionForm.valid) {
      const newTransaction: Transaction = {
        ...this.transactionForm.value,
        id: Math.floor(Math.random() * 100000), 
        dataTransacao: new Date().toISOString() 
      };

      this.transactionService.addTransaction(newTransaction).subscribe(() => {
        alert('Transação adicionada com sucesso!'); 
        
        this.transactionForm.reset(); 
        this.selectedType = ''; 
        this.transactionForm.patchValue({ tipoTransacao: '' }); 

        this.transactionAdded.emit(); 
        this.close();
        window.location.reload();
      });
    }
  }

  setTransactionType(type: 'E' | 'S') {
    this.selectedType = type; 
    this.transactionForm.patchValue({ tipoTransacao: type });
  }

  close(): void {
    this.closeModal.emit();
  }

  getErrorMessage(controlName: string): string {
    const control = this.transactionForm.get(controlName);

    if (control?.hasError('required')) {
      return 'Este campo é obrigatório';
    }
    if (control?.hasError('minlength')) {
      return 'Mínimo de 3 caracteres';
    }
    if (control?.hasError('min')) {
      return 'O valor deve ser maior que 0';
    }
    if (control?.hasError('pattern')) {
      return 'Não pode conter apenas espaços';
    }
    return '';
  }
}
