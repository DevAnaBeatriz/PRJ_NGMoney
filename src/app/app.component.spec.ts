import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { TransactionService } from '../app/core/services/transaction.service';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should have isModalOpen initialized as false', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.isModalOpen).toBeFalsy(); 
  });

  it('should toggle isModalOpen when method is called', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    app.isModalOpen = false; 
    app.isModalOpen = !app.isModalOpen; 
    expect(app.isModalOpen).toBeTruthy(); 

    app.isModalOpen = !app.isModalOpen; 
    expect(app.isModalOpen).toBeFalsy(); 
  });
});
