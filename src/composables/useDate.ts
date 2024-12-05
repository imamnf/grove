export function useDate() {
  function dateShort(date: string | Date, format: string = 'DD/MM/YYYY'): string {
    const formatedDate = useDateFormat(date, format, { locales: 'id-ID' })

    return formatedDate.value
  }

  function dateLong(date: string | Date, format: string = 'DD/MM/YYYY HH:mm:ss'): string {
    const formatedDate = useDateFormat(date, format, { locales: 'id-ID' })

    return formatedDate.value
  }

  return {
    dateShort,
    dateLong,
  }
}
