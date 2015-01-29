/**
 * Multiple inheritance implementation
 * Copyright 2012, Maciej Grabowski
 * 
 * @returns {undefined}
 */
(function(){

var Idle = function(){}, //Basic idle class
    key = {}; //Session key

//Creates a subclass
Idle.fork = function(map)
{
    //map <Object> A map consist of methods and/or properties
    var Init = map && map.Init, //Class constructor function
        Super = map && map.Super, //Returns array of arguments for superior class
        SupClass = this, //Superior class (js contructor function)
        Class = function() //Class (js contructor function)
        {
            //Checking for blind call for prototype
            if(arguments[0] === key) return;

            //Applying superior class and Init function
            SupClass.apply( this, (Super)? Super.apply( this, arguments ): arguments );
            if(Init) Init.apply( this, arguments );
        };

    //Save global reference to class constructor
    if (map && map.Class) {
        Idle[map.Class] = Class;
        delete map.Class;
    }

    //Preparing class prototype
    if(Super) delete map.Super;
    if(Init) delete map.Init;

    //Copying methods & properties
    Class.prototype = new this(key); //Comply with 'instanceof' operator
    Class.prototype.constructor = Class; //Java Script constructor method
    if(map) for( var x in map ) Class.prototype[x] = map[x];

    //Adding fork method
    Class.fork = this.fork;

    return Class;
};

//Expose to the global object.
window.Idle = Idle;

})();