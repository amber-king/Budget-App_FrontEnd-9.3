const URL =  "http://localhost:3333/transactions/"

export function createTransaction(transaction) {
    const options = {
      method: "POST",
      body: JSON.stringify(transaction),
      headers: { "Content-Type": "application/json" },
    };
    return fetch(URL, options).then((response) => {
      return response.json();
    });
  }
  
    