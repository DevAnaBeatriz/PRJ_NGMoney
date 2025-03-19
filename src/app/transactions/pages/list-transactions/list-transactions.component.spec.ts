import { TestBed } from '@angular/core/testing';
import { ListTransactionsComponent } from './list-transactions.component';
import { TransactionService } from 'src/app/core/services/transaction.service';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

const mockTransactions = [
  { id: 1, descricao: 'Salário', preco: 5000, categoria: 'Receita', tipoTransacao: 'E', dataTransacao: '2024-03-01' },
  { id: 2, descricao: 'Mercado', preco: 200, categoria: 'Despesas', tipoTransacao: 'S', dataTransacao: '2024-03-02' },
  { id: 3, descricao: 'Aluguel', preco: 1200, categoria: 'Despesas', tipoTransacao: 'S', dataTransacao: '2024-03-03' }
];

describe('ListTransactionsComponent', () => {
  let component: ListTransactionsComponent;
  let transactionServiceMock: jest.Mocked<TransactionService>;

  beforeEach(() => {
    transactionServiceMock = {
      getTransactions: jest.fn().mockReturnValue(of({ transacao: mockTransactions }))
    } as unknown as jest.Mocked<TransactionService>;

    TestBed.configureTestingModule({
      declarations: [ListTransactionsComponent],
      providers: [{ provide: TransactionService, useValue: transactionServiceMock }],
      schemas: [NO_ERRORS_SCHEMA]
    });

    component = TestBed.createComponent(ListTransactionsComponent).componentInstance;
  });

  test('should create the component', () => {
    expect(component).toBeTruthy();
  });

  test('should load transactions on init', () => {
    component.ngOnInit();
    expect(transactionServiceMock.getTransactions).toHaveBeenCalled();
    expect(component.transactions.length).toBe(3);
  });


  test('should show all transactions when showMore is called', () => {
    component.showMore();
    expect(transactionServiceMock.getTransactions).toHaveBeenCalled();
    expect(component.transactions.length).toBe(3);
    expect(component.showAll).toBe(true);
  });

});
