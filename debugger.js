window.drawObject = function(object)
{
    document.open();
    for(var x in object) document.write( "<br /><b>" + x + "</b>: " + ((typeof object[x] == "function")?"function()":object[x]) );
    document.write("<br /><br />");
    document.close();
}