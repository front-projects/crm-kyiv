import axios from 'axios';
import { InfoForUpdate } from './types';

const API_URL = 'https://digitalagency.top:6060/api/v1/domain-aggregator';

// function delayedPromise() {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve('Проміс виконано через 2 секунди');
//     }, 1000);
//   });
// }

export const checkDomain = async (domain: string): Promise<boolean> => {
  try {
    const response = await axios.get(
      `${API_URL}/check-domain?domain=${domain}`,
    );
    // console.log(response);
    if (response.data.SearchResponse.SearchResults[0].Available == 'yes') {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }

  // console.log(response.data.SearchResults);
};

export const buyDomain = async (domain: string) => {
  try {
    const response = await axios.post(
      `${API_URL}/buy-domain?domain=${domain}$duration=1`,
    );
    if (response) {
      return true;
    }
  } catch {
    return false;
  }
  // await delayedPromise();
  // return true;
};

export const getDomains = async () => {
  const response = await axios.get(`${API_URL}/get-user-domains`);

  return response.data.ListDomainInfoResponse.MainDomains;
};

export const updateInfo = async (info: InfoForUpdate, domain: string) => {
  try {
    const response = await axios.patch(
      `${API_URL}/set-up-domain-dns?main_records=${info.main1}, ${info.main2}&domain=${domain}&main_record_types=a, a&subdomains=${info.sub1}, ${info.sub2}&sub_record_types=a, a&sub_records=${info.value1}, ${info.value2}`,
    );
    console.log(response);
    if (response.data.SetDnsResponse.Status == 'success') {
      return true;
    } else {
      return false;
    }
  } catch {
    return false;
  }
};
