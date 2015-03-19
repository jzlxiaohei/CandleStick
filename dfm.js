//data-field-map
var dfm = {
    date: 'end',
    high: 'high',
    low: 'low',
    open: 'open',
    close: 'close',
    start: 'start',
    end: 'end',
    price: 'price',
    volume: 'volume'
}

var _M = {
    o: function (d) {return d[dfm.open];},
    c: function (d) {return d[dfm.close];},
    h: function (d) {return d[dfm.high];},
    l: function (d) {return d[dfm.low]},
    s: function (d) {return d[dfm.start]},
    e: function (d) {return d[dfm.end]},
    p: function (d) {return d[dfm.price]},
    v: function (d) {return d[dfm.volume]},
    d: function (d) {return d[dfm.end] *1000}//return date,x axis
}