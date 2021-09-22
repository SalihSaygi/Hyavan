class Customers {
  constructor() {
    this.customers = [];
  }

  add(store, config) {
    const customer = { store: store, config: config };
    this.customers.push(customer);
  }

  remove(store) {
    this.customers = this.customers.filter(
      customer => customer.store !== store
    );
  }

  update(store, config) {
    const index = this.customers.findIndex(
      customer => customer.store === store
    );

    const updatedCustomer = {
      ...this.customers[index],
      persist: config.persist,
      devtools: config.devtools | true,
    };

    this.customers = [
      ...this.customers.slice(0, index),
      updatedCustomer,
      ...this.customers.slice(index + 1),
    ];
  }
}

export default Customers;
