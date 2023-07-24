export const reportTypes = [
  {
    id: 'METAR',
    name: 'METAR'
  },
  {
    id: 'SIGMET',
    name: 'SIGMET'
  },
  {
    id: 'TAF_LONGTAF',
    name: 'TAF'
  }
]

export const API = {
  OPMET: 'https://ogcie.iblsoft.com/ria/opmetquery'
}

export const AIRPORTS_PATTERN = /^[A-Z]{4}$/g

export const COUNTRIES_PATTERN = /^[A-Z]{2}$/g
