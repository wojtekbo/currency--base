import PropTypes from 'prop-types';
import {convertUSDToPLN} from './../../utils/convertUSDToPLN';
import {convertPLNToUSD} from './../../utils/convertPLNToUSD';
import {formatAmountInCurrency} from './../../utils/formatAmountInCurrency';
import {useMemo} from 'react';
import styles from './ResultBox.module.scss';

const ResultBox = ({from, to, amount}) => {
  const convertedAmount = useMemo(() => {
    if (from === 'USD' && to === 'PLN') return convertUSDToPLN(amount);
    if (from === 'PLN' && to === 'USD') return convertPLNToUSD(amount);
    return formatAmountInCurrency(amount, from);
  }, [from, to, amount]);

  const formattedAmount = useMemo(() => formatAmountInCurrency(amount, from), [amount, from]);

  return (
    <div className={styles.result} data-testid="output">
      {amount > 0 ? `${formattedAmount} = ${convertedAmount}` : 'Wrong value…'}
    </div>
  );
};

ResultBox.propTypes = {
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
};

export default ResultBox;
