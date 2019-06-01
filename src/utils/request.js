import { getAccessToken } from './auth'
const url = 'https://backendapi.turing.com/'
const imageUrl = 'https://backendapi.turing.com/images/products/'
export let parseJSONResponse = null

export function decoratedUrl(params) {
  return url + params
}

export function decoratedImageUrl(params) {
  return imageUrl + params
}
export function decoratedOptions(params) {
  const accessToken = getAccessToken()
  const newOptions = Object.assign(params, {
    headers: {
      'Content-Type': 'application/json',
      'user-key': accessToken
    }
  })

  console.log(accessToken)
  return newOptions
}

function parseJSON(response) {
  parseJSONResponse = response
  return response.json().catch(ex => {
    const error = new Error(ex)
    error.response = response
    error.jsonFailed = true
    throw error
  })
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  }
  const error = new Error(response.statusText)
  error.response = response
  error.error = true
  error.httpErrCode = response.status
  throw error
}

export default async function request(param, options) {
  const urlTofetch = url + param
  const decoratedOptions = Object.assign({}, options)
  decoratedOptions.headers = decoratedOptions.headers || {}
  decoratedOptions.headers['user-key'] = getAccessToken()
  console.log(decoratedOptions)
  const result = await fetch(urlTofetch, decoratedOptions) // eslint-disable-line
    .then(checkStatus)
    .then(parseJSON)
    .then(data => {
      return data
    })
    .catch(err => ({ err }))
  return result
}

export const fetchRequest = async (param, options) => {
  const urlTofetch = url + param
  const newOptions = decoratedOptions(options)
  try {
    const response = checkStatus(await fetch(urlTofetch, newOptions))
    const result = await parseJSON(response)

    return result
  } catch (error) {
    const parseRes = await error.response.json()
    const parsedError = Object.assign(error, parseRes)
    return parsedError
  }
}
export const fetchRequestWithoutResponse = async (param, options) => {
  const urlTofetch = url + param
  const newOptions = decoratedOptions(options)
  try {
    const response = checkStatus(await fetch(urlTofetch, newOptions))

    return response
  } catch (error) {
    error
  }
}
