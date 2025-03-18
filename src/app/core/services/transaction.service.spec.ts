import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TransactionService, Transaction } from './transaction.service';

describe('TransactionService', () => {
  let service: TransactionService;
  let httpMock: HttpTestingController;
  const apiUrl = 'https://server-node-transacao.onrender.com/transacao';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TransactionService]
    });

    service = TestBed.inject(TransactionService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch transactions from API and update BehaviorSubject', () => {
    const mockTransactions: Transaction[] = [
      { id: 1, descricao: 'Salário', preco: 5000, categoria: 'Receitas', tipoTransacao: 'E', dataTransacao: '2025-03-12' },
      { id: 2, descricao: 'Supermercado', preco: 2000, categoria: 'Alimentação', tipoTransacao: 'S', dataTransacao: '2025-03-13' }
    ];

    service.getTransactions().subscribe(transactions => {
      expect(transactions.length).toBe(2);
      expect(transactions[0].descricao).toBe('Salário');
      expect(transactions[1].descricao).toBe('Supermercado');
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockTransactions);
  });

  it('should add a new transaction and update the transaction list', () => {
    const newTransaction: Transaction = {
      id: 3,
      descricao: 'Jantar',
      preco: 100,
      categoria: 'Lazer',
      tipoTransacao: 'S',
      dataTransacao: '2025-03-14'
    };

    service.addTransaction(newTransaction).subscribe(transaction => {
      expect(transaction).toEqual(newTransaction);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newTransaction);
    req.flush(newTransaction);
  });

});
