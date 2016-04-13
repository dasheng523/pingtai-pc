
let encode = encodeURIComponent
let decode = decodeURIComponent
let instance = null;
class Cookie{
  constructor() {
    if (!instance) { instance = this; }
    return instance;
  }

  cookie(name, value, options) {
    if (arguments.length < 2) return this.get(name)
    this.set(name, value, options)
  }

  set(name, value, options = {}) {
    var str = `${encode(name)}=${encode(value)}`

    if (value == null) options.maxage = -1

    if (options.maxage) {
      options.expires = new Date(+new Date() + options.maxage)
    }

    if (options.path) str += '; path=' + options.path
    if (options.domain) str += '; domain=' + options.domain
    if (options.expires) str += '; expires=' + options.expires.toUTCString()
    if (options.secure) str += '; secure'
    document.cookie = str
    console.log(document.cookie);
  }

  get(name) {
    var cookies = this.parse(document.cookie)
    return !!name ? cookies : cookies[name]
  }

  parse(str) {
    var obj = {},
      pairs = str.split(/ *; */)

    if (!pairs[0]) return obj

    for (let pair of pairs) {
      pair = pair.split('=')
      obj[decode(pair[0])] = decode(pair[1])
    }
  }
}

export default Cookie;
