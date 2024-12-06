export function useDate() {
  function dateShort(date: string | Date, format: string = 'DD/MM/YYYY', locales: string = 'id-ID'): string {
    const formatedDate = useDateFormat(date, format, { locales })

    return formatedDate.value
  }

  function dateLong(date: string | Date, format: string = 'DD/MM/YYYY HH:mm:ss', locales: string = 'id-ID'): string {
    const formatedDate = useDateFormat(date, format, { locales })

    return formatedDate.value
  }

  return {
    dateShort,
    dateLong,
  }
}
