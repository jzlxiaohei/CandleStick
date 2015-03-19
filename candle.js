/**
 * Created by zilong on 3/18/15.
 */

var candleChart = function(){

    function isUp(d){
        return _M.c(d)> _M.o(d);
    }
    function isDown(d){
        return _M.c(d)<= _M.o(d);
    }


    var candle =function(selection){

        var series;
        selection.each(function(data){

            series = d3.select(this)
                .selectAll('.candle-series')
                .data([data]);

            series.enter().append('g').classed('candle-series',true);

            var sticks = series.selectAll('.candle-stick')
                .data(data,function(d){
                    return _M.d(d)
                })

            sticks.enter()
                .append('g')
                .classed({
                    'candle-stick':true,
                    up:isUp,
                    down:isDown
                })

            stickLine(sticks)
            stickRect(sticks)


            sticks.exit().remove();
        })
    }


    function stickLine(stick){
        var xScale = config.xScale,
            yScale = config.yScale;
        var line  = stick.selectAll('.stick-line').data(function(d){return [d]})

        line.enter().append('line')

        line.attr({
            x1:function(d){return xScale( _M.d(d)) },
            x2:function(d){return xScale( _M.d(d)) },
            y1:function(d){return yScale( _M.h(d)) },
            y2:function(d){return yScale( _M.l(d)) }
        }).classed('stick-line',true)

        line.exit().remove();
    }
    function stickRect(stick){
        var xScale = config.xScale,
            yScale = config.yScale,
            stickWidth = config.stickWidth,
            stickOffset = config.stickOffset;

        var rect  = stick.selectAll('.stick-rect').data(function(d){return [d]})

        rect.enter().append('rect')

        rect.attr({
            'x': function (d) {return xScale(_M.d(d)) - stickOffset},
            'y': function (d) {
                var y = Math.min(_M.o(d),_M.c(d))
                return yScale(y)
            },
            'width': function (d) {return stickWidth},
            'height': function (d) {
                var h = yScale(_M.o(d)) -yScale(_M.c(d));
                //var o = _M.o(d),c=_M.c(d);
                //var h = yScale(_M.o(d) - _M.c(d));
                h = Math.abs(h);
                return Math.max(h,1)
            }
        }).classed('stick-rect',true)

        rect.exit().remove();
    }

    var config= {
        xScale: d3.time.scale(),
        yScale:d3.scale.linear()
    }

    utils.generateReuseConfig(candle,config);

    utils.extend(config,{
        stickWidth:6,
        stickOffset:3
    })

    candle.stickWidth =function(value){
        if(value!=undefined){
            return config.stickWidth
        }
        config.stickWidth = value;
        config.stickOffset = Math.ceil(value/2);
        return this;
    }

    return candle;
}