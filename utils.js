var utils={
    generateReuseConfig:function(obj,config){
        for(var i in config){
            (function(key){
                obj[key] = function(value){
                    if(!arguments.length){
                        return config[key];
                    }
                    config[key] = value;
                    return obj;
                }
            })(i)
        }
    },
    extend:function(obj1,obj2){
        for(var i in obj2){
            obj1[i] = obj2[i]
        }
        return obj1;
    }
}