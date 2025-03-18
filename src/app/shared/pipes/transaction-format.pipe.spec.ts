import { TransactionFormatPipe } from './transaction-format.pipe';

describe('TransactionFormatPipe', () => {
  let pipe: TransactionFormatPipe;

  beforeEach(() => {
    pipe = new TransactionFormatPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should format entrada (E) transactions correctly', () => {
    expect(pipe.transform(100, 'E')).toBe('+ R$ 100,00');
  });

  it('should format saida (S) transactions correctly', () => {
    expect(pipe.transform(50, 'S')).toBe('- R$ 50,00');
  });

  it('should handle decimal values correctly', () => {
    expect(pipe.transform(1234.56, 'E')).toBe('+ R$ 1234,56');
    expect(pipe.transform(789.1, 'S')).toBe('- R$ 789,10');
  });

  it('should handle zero correctly', () => {
    expect(pipe.transform(0, 'E')).toBe('+ R$ 0,00');
    expect(pipe.transform(0, 'S')).toBe('- R$ 0,00');
  });
});
