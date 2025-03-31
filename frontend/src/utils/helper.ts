// utils/helpers.ts
export function validateEmail(email: string): boolean {
    const regex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    return regex.test(email);
  }
  
  export function formatCurrency(amount: number): string {
    return `$${amount.toFixed(2)}`;
  }
  