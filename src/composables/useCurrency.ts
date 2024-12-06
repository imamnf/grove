export function useCurrency(currencyCode: string = 'USD', locale: string = 'en-US') {
  function formatCurr(number: number) {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(number)
  }

  function formatCurrShort(number: number) {
    if (number <= 0) {
      return 0
    }

    const suffixes = ['K', 'M', 'B', 'T']
    const suffixNum = Math.floor(Math.log10(Math.abs(number)) / 3)
    const suffix = suffixes[suffixNum - 1]
    const scaled = number / 10 ** (suffixNum * 3)

    return scaled.toFixed(0) + suffix
  }

  return {
    formatCurr,
    formatCurrShort,
  }
}
