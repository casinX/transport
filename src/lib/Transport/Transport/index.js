import axios from 'axios'

import { keys as methods, entities as methodsEntities } from '../config/methods'
import createCacheKey from '../utils/createCacheKey'
import Cache from '../Cache'


class Transport {
    constructor(){
        this.url = null
        this.method = methods.GET
        this.memoTimeout = null

        this._cancelMethod = null
        this._cache = null
    }

    _createCacheInstanceIfNeed = () => {
        if(this._cache === null && this.memoTimeout !== null){
            this._cache = new Cache(this.memoTimeout)
        }
    }

    call = async (...args) => {
        this._createCacheInstanceIfNeed()

        if(this._cache === null){
            return await this._call(args)
        }

        const key = createCacheKey(this.url, this.method, args)
        const cachedData = this._cache.getData(key)

        if(cachedData !== null) return cachedData

        const data = await this._call(args)
        this._cache.setData(key, data)

        return data
    }

    _call = async (args) => {
        if(this.isRunning) this.cancel()

        const { token, cancel } = axios.CancelToken.source();
        this._cancelMethod = cancel

        const config = this.config(...args)

        config.cancelToken = token
        config.url = this.url
        config.method = this.method
        config.onUploadProgress = this.onUploadProgress
        config.onDownloadProgress = this.onDownloadProgress

        const serializedData = this.serialize(...args)

        const { hasBody } = methodsEntities[this.method]

        if (hasBody) {
            config.data = serializedData
        } else {
            config.params = serializedData
        }

        const result = [null, null]

        try {
            const rawResponse = await axios(config)
            result[0] = this.parse(rawResponse)
        } catch (error) {
            const { isAxiosError } = error;
            const isCancelError = axios.isCancel(error)

            if (!isAxiosError && !isCancelError) throw error

            if(isAxiosError) result[1] = this.parseError(error)
        }

        this._cancelMethod = null
        return result
    }

    get isRunning () {
        return this._cancelMethod !== null
    }

    get cancel () {
        return this._cancelMethod
    }

    // user callbacks
    serialize = data => data
    parse = response => response.data
    parseError = error => error
    config = () => ({})
    onUploadProgress = null
    onDownloadProgress = null
}


export default Transport