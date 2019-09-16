import keys from './keys'


export default {
    [keys.GET]: { hasBody: false },
    [keys.HEAD]: { hasBody: false },
    [keys.POST]: { hasBody: true },
    [keys.PUT]: { hasBody: true },
    [keys.DELETE]: { hasBody: false },
    [keys.CONNECT]: { hasBody: false },
    [keys.OPTIONS]: { hasBody: false },
    [keys.TRACE]: { hasBody: false },
    [keys.PATCH]: { hasBody: true },
}