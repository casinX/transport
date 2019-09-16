class Cache {
    constructor(timeout) {
        this._data = {}
        this._timeout = timeout
    }

    getData = (key) => {
        if(!(key in this._data)) return null

        const { time, value } = this._data[key]

        const delta = Date.now() - time

        if(delta < this._timeout){
            return value
        }

        delete this._data[key]
        return  null
    }

    setData = (key, value) => {
        this._data[key] = {
            time: Date.now(),
            value,
        }
    }
}


export default Cache