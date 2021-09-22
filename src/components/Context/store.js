import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

// import Customers from './Customers';

// const customers = new Customers();

// customers.add(store, config);

//you can use customerConfig to manually change customers
// or use Customers class to programmatically change customers
//currently using customerConfig

import configuredCustomers from './customerConfig';

export const store = configuredCustomers.map(customer => {
  let readyCustomer = customer.store;
  if (process.env.NODE_ENV === 'development') {
    readyCustomer = devtools(readyCustomer);
  }
  if (customer.config.persist.on === true) {
    readyCustomer = persist(readyCustomer, customer.config.persist.name);
  }

  return create(readyCustomer);
});

const useStore = customer => {
  return store[customer];
};

export default useStore;
