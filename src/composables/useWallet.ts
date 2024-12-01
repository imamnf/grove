export function useWallet() {
  /**
   * Check wallet status based on active status and balance
   * Returns array of Tailwind CSS classes for styling
   * @param status - Active status of wallet
   * @param balance - Current balance of wallet
   * @returns Array of CSS classes
   */
  function checkStatus(status: boolean, balance: number) {
    if (!status) {
      return ['bg-rose-100', 'dark:bg-rose-400/10', 'text-rose-500']
    }
    if (balance === 0) {
      return ['bg-amber-100', 'dark:bg-amber-400/10', 'text-amber-500']
    }
    return ['bg-emerald-100', 'dark:bg-emerald-400/10', 'text-emerald-500']
  }

  /**
   * Get icon class based on wallet type
   * @param type - Type of wallet ('bank', 'e-wallet', 'wallet' or other string)
   * @returns PrimeVue icon class string
   */
  function checkType(type: 'bank' | 'e-wallet' | 'wallet' | string) {
    const icons = {
      'bank': 'pi pi-building-columns',
      'e-wallet': 'pi pi-wallet',
      'wallet': 'pi pi-money-bill',
    } as const

    return icons[type as keyof typeof icons] || 'pi pi-dollar'
  }

  return {
    checkStatus,
    checkType,
  }
}
