export default (url, method, args) => {
    return JSON.stringify({
        url,
        method,
        args,
    })
}