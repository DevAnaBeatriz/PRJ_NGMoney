import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddTransactionComponent } from './add-transaction.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TransactionService } from '../../../core/services/transaction.service';
import { of } from 'rxjs';

describe('AddTransactionComponent', () => {
  let component: AddTransactionComponent;
  let fixture: ComponentFixture<AddTransactionComponent>;
  let transactionServiceMock: any;

  beforeEach(async () => {
    transactionServiceMock = {
      addTransaction: jest.fn().mockReturnValue(of({}))
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [AddTransactionComponent],
      providers: [{ provide: TransactionService, useValue: transactionServiceMock }]
    }).compileComponents();

    fixture = TestBed.createComponent(AddTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    expect(component.transactionForm.value).toEqual({
      descricao: '',
      preco: '',
      categoria: '',
      tipoTransacao: 'E'
    });
  });

  it('should mark the form as invalid if required fields are missing', () => {
    component.transactionForm.patchValue({ descricao: '', preco: '', categoria: '' });
    expect(component.transactionForm.valid).toBeFalsy();
  });

  it('should call addTransaction() when the form is valid and submitted', () => {
    const transactionData = {
      descricao: 'Mercado',
      preco: 100,
      categoria: 'Alimentação',
      tipoTransacao: 'S'
    };

    component.transactionForm.patchValue(transactionData);
    component.submit();

    expect(transactionServiceMock.addTransaction).toHaveBeenCalled();
  });

  it('should emit closeModal event when close() is called', () => {
    jest.spyOn(component.closeModal, 'emit');
    component.close();
    expect(component.closeModal.emit).toHaveBeenCalled();
  });

  it('should reset the form after successful transaction submission', () => {
    const transactionData = {
      descricao: 'Mercado',
      preco: 100,
      categoria: 'Alimentação',
      tipoTransacao: 'S'
    };

    component.transactionForm.patchValue(transactionData);
    component.submit();

    expect(component.transactionForm.value).toEqual({
      descricao: null,
      preco: null,
      categoria: null,
      tipoTransacao: 'E'
    });
  });
});
