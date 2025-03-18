import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListTransactionsComponent } from './list-transactions.component';
import { TransactionService } from '../../../core/services/transaction.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatTableModule } from '@angular/material/table';

describe('ListTransactionsComponent', () => {
  let component: ListTransactionsComponent;
  let fixture: ComponentFixture<ListTransactionsComponent>;
  let transactionService: TransactionService;

  const mockTransactions = [
    { descricao: 'Salário', preco: 3000, categoria: 'Receitas', tipoTransacao: 'E', dataTransacao: '2025-03-10' },
    { descricao: 'Supermercado', preco: 250, categoria: 'Despesas', tipoTransacao: 'S', dataTransacao: '2025-03-11' }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatTableModule],
      declarations: [ListTransactionsComponent],
      providers: [
        {
          provide: TransactionService,
          useValue: {
            getTransactions: jest.fn(() => of({ transacao: mockTransactions })) 
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ListTransactionsComponent);
    component = fixture.componentInstance;
    transactionService = TestBed.inject(TransactionService);

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load and display transactions', () => {
    component.loadTransactions(); 
    fixture.detectChanges();

    expect(component.transactions.length).toBe(2);
    expect(component.transactions[0].descricao).toBe('Supermercado');
    expect(component.transactions[1].descricao).toBe('Salário');
  });

  it('should calculate totals correctly', () => {
    component.loadTransactions();
    component.calculateTotals();
    fixture.detectChanges();

    expect(component.totalEntradas).toBe(3000);
    expect(component.totalSaidas).toBe(250);
    expect(component.totalGeral).toBe(2750);
  });

  it('should update transactions when showMore is called', () => {
    component.showMore(); 
    fixture.detectChanges();

    expect(component.showAll).toBeTruthy();
    expect(component.transactions.length).toBe(2);
  });

  it('should call ngOnDestroy and clean up subscriptions', () => {
    const spy = jest.spyOn(component['unsubscribe$'], 'next');
    const spyComplete = jest.spyOn(component['unsubscribe$'], 'complete');

    component.ngOnDestroy();
    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
    expect(spyComplete).toHaveBeenCalled();
  });
});
