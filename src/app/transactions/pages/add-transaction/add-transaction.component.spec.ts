import { TestBed } from '@angular/core/testing';
import { AddTransactionComponent } from './add-transaction.component';
import { TransactionService } from 'src/app/core/services/transaction.service';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

const mockTransaction = {
  id: 1,
  descricao: 'Compra no mercado',
  preco: 100,
  categoria: 'Alimentação',
  tipoTransacao: 'S',
  dataTransacao: '2024-03-10'
};

describe('AddTransactionComponent', () => {
  let component: AddTransactionComponent;
  let transactionServiceMock: jest.Mocked<TransactionService>;

  beforeEach(() => {
    transactionServiceMock = {
      addTransaction: jest.fn().mockReturnValue(of(mockTransaction))
    } as unknown as jest.Mocked<TransactionService>;

    TestBed.configureTestingModule({
      declarations: [AddTransactionComponent],
      providers: [
        FormBuilder,
        { provide: TransactionService, useValue: transactionServiceMock }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });

    component = TestBed.createComponent(AddTransactionComponent).componentInstance;
  });

  test('should create the component', () => {
    expect(component).toBeTruthy();
  });

  test('should initialize the form with default values', () => {
    expect(component.transactionForm.value).toEqual({
      descricao: '',
      preco: '',
      categoria: '',
      tipoTransacao: ''
    });
  });

  test('should submit a valid transaction', () => {
    component.transactionForm.setValue({
      descricao: 'Compra no mercado',
      preco: 100,
      categoria: 'Alimentação',
      tipoTransacao: 'S'
    });
    
    component.submit();
    
    expect(transactionServiceMock.addTransaction).toHaveBeenCalledWith(
      expect.objectContaining({ descricao: 'Compra no mercado', preco: 100 })
    );
  });

  test('should not submit an invalid transaction', () => {
    component.transactionForm.setValue({
      descricao: '',
      preco: '',
      categoria: '',
      tipoTransacao: ''
    });
    
    component.submit();
    
    expect(transactionServiceMock.addTransaction).not.toHaveBeenCalled();
  });

  test('should close the modal when close() is called', () => {
    jest.spyOn(component.closeModal, 'emit');
    component.close();
    expect(component.closeModal.emit).toHaveBeenCalled();
  });
});
