import { Component, OnInit, OnDestroy } from '@angular/core';
import { TransactionService, Transaction } from 'src/app/core/services/transaction.service';
import { Subject, BehaviorSubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-list-transactions',
  templateUrl: './list-transactions.component.html',
  styleUrls: ['./list-transactions.component.scss'],
})
export class ListTransactionsComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['descricao', 'preco', 'categoria', 'dataTransacao'];
  transactions: Transaction[] = [];
  transactions$ = new BehaviorSubject<Transaction[]>([]); 
  private unsubscribe$ = new Subject<void>();

  showAll: boolean = false;
  totalEntradas: number = 0;
  totalSaidas: number = 0;
  totalGeral: number = 0;
  isModalOpen: boolean = false; 

  constructor(private transactionService: TransactionService) {}

  ngOnInit(): void {
    this.loadTransactions();

    this.transactions$.pipe(takeUntil(this.unsubscribe$)).subscribe(transactions => {
      this.transactions = transactions
        .sort((a, b) => new Date(b.dataTransacao).getTime() - new Date(a.dataTransacao).getTime())
        .slice(0, 10);
      
      this.calculateTotals(transactions);
    });
  }

  loadTransactions(): void {
    this.transactionService.getTransactions().pipe(takeUntil(this.unsubscribe$)).subscribe((data: any) => {
      const transactionsArray: Transaction[] = Array.isArray(data.transacao) ? data.transacao : [];
      this.transactions$.next(transactionsArray);
    });
  }


  showMore(): void {
    if (this.showAll) return;

    this.transactionService.getTransactions().pipe(takeUntil(this.unsubscribe$)).subscribe((data: any) => {
      const transactionsArray: Transaction[] = Array.isArray(data.transacao) ? data.transacao : [];
      this.transactions = transactionsArray.sort((a, b) => 
        new Date(b.dataTransacao).getTime() - new Date(a.dataTransacao).getTime()
      );

      this.showAll = true;
      this.calculateTotals(transactionsArray);
    });
  }
  
  calculateTotals(transactions: Transaction[]): void {
    this.totalEntradas = transactions
      .filter(t => t.tipoTransacao === 'E')
      .reduce((sum, t) => sum + t.preco, 0);

    this.totalSaidas = transactions
      .filter(t => t.tipoTransacao === 'S')
      .reduce((sum, t) => sum + t.preco, 0);

    this.totalGeral = this.totalEntradas - this.totalSaidas;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
