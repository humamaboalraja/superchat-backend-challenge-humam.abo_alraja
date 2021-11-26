import fetch from 'node-fetch';

const getBTCData = async () => {
  const jsonResult = await fetch('https://blockchain.info/ticker');
  const parsedData = await jsonResult.json();
  const usdPrice =
    (await parsedData.USD.last.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')) +
    '$';
  return usdPrice;
};

export default getBTCData;
