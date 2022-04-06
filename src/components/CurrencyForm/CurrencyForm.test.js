import {cleanup, render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CurrencyForm from './CurrencyForm';

describe('Component CurrencyForm', () => {
  it('should render without crashing', () => {
    render(<CurrencyForm action={() => {}} />);
  });

  const testCases = [
    {amount: '100', from: 'PLN', to: 'USD'},
    {amount: '32', from: 'PLN', to: 'USD'},
    {amount: '300', from: 'PLN', to: 'USD'},
    {amount: '234', from: 'PLN', to: 'USD'},
  ];

  for (const testObj of testCases) {
    it('should run action callback with proper data on form submit', () => {
      const action = jest.fn();

      // render component
      render(<CurrencyForm action={action} />);

      // find "convert" button
      const submitButton = screen.getByText('Convert');

      // find elements field
      const amountFiled = screen.getByTestId('amount');
      const fromSelect = screen.getByTestId('from-select');
      const toSelect = screen.getByTestId('to-select');

      // set test values to fileds
      userEvent.type(amountFiled, testObj.amount);
      userEvent.selectOptions(fromSelect, testObj.from);
      userEvent.selectOptions(toSelect, testObj.to);

      // simulate user click on "convert" button
      userEvent.click(submitButton);

      // check if action callback was called once
      expect(action).toHaveBeenCalledTimes(1);
      expect(action).toHaveBeenCalledWith({amount: parseInt(testObj.amount), from: testObj.from, to: testObj.to});

      // unmount component
      cleanup();
    });
  }
});
