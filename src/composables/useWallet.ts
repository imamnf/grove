export function useWallet() {
  function checkStatus(status: boolean, balance: number) {
    if (!status) {
      return ['bg-rose-100', 'dark:bg-rose-400/10', 'text-rose-500']
    }
    if (balance === 0) {
      return ['bg-amber-100', 'dark:bg-amber-400/10', 'text-amber-500']
    }
    return ['bg-emerald-100', 'dark:bg-emerald-400/10', 'text-emerald-500']
  }

  function checkType(type: string) {
    switch (type) {
      case 'bank':
        return 'pi pi-building-columns'
      case 'e-wallet':
        return 'pi pi-wallet'
      case 'wallet':
        return 'pi pi-money-bill'
      default:
        return 'pi pi-dollar'
    }
  }

  return {
    checkStatus,
    checkType
  }
}