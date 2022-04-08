import ResultBox from './ResultBox';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {formatAmountInCurrency} from './../../utils/formatAmountInCurrency';

describe('Component ResultBox', () => {
  it('should render without crashing', () => {
    render(<ResultBox from="PLN" to="USD" amount={100} />);
  });

  const testCasesPLNtoUSD = [
    {amount: 1, result: 0.29},
    {amount: 24, result: 6.86},
    {amount: 100, result: 28.57},
    {amount: 122, result: 34.86},
  ];

  for (const testObj of testCasesPLNtoUSD) {
    it('should render proper info about conversion when PLN -> USD', () => {
      render(<ResultBox from="PLN" to="USD" amount={testObj.amount} />);
      const output = screen.getByTestId('output');
      const fromAmount = formatAmountInCurrency(testObj.amount, 'PLN');
      const toAmount = formatAmountInCurrency(testObj.result, 'USD');
      expect(output).toHaveTextContent(`${fromAmount} = ${toAmount}`.replace(/\u00a0/g, ' '));
    });
  }

  const testCasesUSDtoPLN = [
    {amount: 1, result: 3.5},
    {amount: 24, result: 84},
    {amount: 100, result: 350},
    {amount: 422, result: 1477},
  ];

  for (const testObj of testCasesUSDtoPLN) {
    it('should render proper info about conversion when USD -> PLN', () => {
      render(<ResultBox from="USD" to="PLN" amount={testObj.amount} />);
      const output = screen.getByTestId('output');
      const fromAmount = formatAmountInCurrency(testObj.amount, 'USD');
      const toAmount = formatAmountInCurrency(testObj.result, 'PLN');
      expect(output).toHaveTextContent(`${fromAmount} = ${toAmount}`.replace(/\u00a0/g, ' '));
    });
  }

  const testCasesSameCurrency = [
    {from: 'PLN', to: 'PLN', amount: 1, result: 1},
    {from: 'USD', to: 'USD', amount: 24, result: 24},
    {from: 'PLN', to: 'PLN', amount: 100, result: 100},
    {from: 'USD', to: 'USD', amount: 422, result: 422},
  ];

  for (const testObj of testCasesSameCurrency) {
    it('should render proper info about conversion when converting to the same currency', () => {
      render(<ResultBox from={testObj.from} to={testObj.to} amount={testObj.amount} />);
      const output = screen.getByTestId('output');
      const fromAmount = formatAmountInCurrency(testObj.amount, testObj.from);
      const toAmount = formatAmountInCurrency(testObj.result, testObj.to);
      expect(output).toHaveTextContent(`${fromAmount} = ${toAmount}`.replace(/\u00a0/g, ' '));
    });
  }

  it('should render “Wrong value...” when negative value', () => {
    render(<ResultBox from="USD" to="PLN" amount={-2} />);
    const output = screen.getByTestId('output');
    expect(output).toHaveTextContent(`Wrong value…`);
  });
});
