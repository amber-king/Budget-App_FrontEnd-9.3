const URL = process.env.REACT_APP_API_URL

export function createTransaction(transaction) {
    const options = {
      method: "POST",
      body: JSON.stringify(transaction),
      headers: { "Content-Type": "application/json" },
    };
    return fetch(`${URL}/budgets/`, options).then((response) => {
      return response.json();
    });
  }
  
    