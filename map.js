(function(map) {

    // create variables need to display map
    var buffer, context, controller, draw, loop , map, output, size;

    // for handling resizing we create a buffer then a context to display the contents of buffer
    buffer = document.createElement('canvas').getContext('2d');
    context = document.querySelector('canvas').getContext('2d');
    output = document.querySelector('p');
    
    // block size
    size = 32;

    // define demensions of canvas
    buffer.canvas.width = 16 * size;
    buffer.canvas.height = 9 * size;
    

    // 16 * 9 map
    map = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
           1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
           1,0,0,0,0,1,1,1,0,0,0,0,0,0,0,1,
           1,0,0,0,1,0,2,1,0,0,0,0,0,0,0,1,
           1,0,0,0,1,0,0,1,0,0,0,0,0,0,0,1,
           1,0,0,0,0,1,0,1,0,0,0,0,0,0,0,1,
           1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,
           1,0,0,0,0,0,0,0,0,0,0,0,0,0,3,1,
           1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];

    // get mouse cordinates    
    controller = {

        // mouse x and y 
        mouse_x:0,
        mouse_y:0,


        move:function(event){
            // get on screen location of canvas element
            var rectangle = context.canvas.getBoundingClientRect();
            // store movement position of mouse
            controller.mouse_x = event.clientX - rectangle.left;
            controller.mouse_y = event.clientY - rectangle.top;
        }

    };

    /*
        Function to draw our map and grid.
        Simple loop that goes through our map array
        and searching each index to figure out what
        color will be displayed.
    */
    draw = function(){
        for(var i = 0; i < map.length; i++){
            buffer.fillStyle = (map[i] == 1)?"#000000"
                               :(map[i] == 2)?"#228B22"
                               :(map[i] == 3)?"#FF0000"
                               :"#ffffff";
            buffer.fillRect((i % 16) * size, Math.floor(i / 16) * size, size, size);
        }
        // draw call to display block's
        context.drawImage(buffer.canvas, 0, 0, buffer.canvas.width, buffer.canvas.height, 0 , 0, context.canvas.width , context.canvas.height);
    };

    // mouse loop
    loop = function(time_stamp){
        // cordinates and value of cell
        var x_cord, y_cord, value;

    
        // calcuations for mouse postion
        x_cord = Math.floor(controller.mouse_x / (context.canvas.width/16));
        y_cord = Math.floor(controller.mouse_y / (context.canvas.height/9));
        value = map[y_cord * 16 + x_cord];

        draw();

        buffer.fillStyle = "rgba(128,128,128,.5)";
        buffer.fillRect(x_cord * size, y_cord * size, size, size)

        context.drawImage(buffer.canvas, 0, 0, buffer.canvas.width, buffer.canvas.height, 0, 0, context.canvas.width, context.canvas.height);

        output.innerHTML = "x_cord: " + x_cord + "<br>y_cord: " + y_cord + "<br>value: " + value;

        window.requestAnimationFrame(loop);
    };

    // resize handler
    resize = function(event) {
        context.canvas.width = Math.floor(document.documentElement.clientWidth - 32);
        if (context.canvas.width > document.documentElement.clientHeight) 
        {
            context.canvas.width = Math.floor(document.documentElement.clientHeight);
        }
        context.canvas.height = Math.floor(context.canvas.width * 0.5625);
        draw();
      };

      window.addEventListener("resize", resize, {passive:true});
      context.canvas.addEventListener("mousemove", controller.move);
      context.canvas.addEventListener("touchmove", controller.move, {passive:true});
      context.canvas.addEventListener("touchstart", controller.move, {passive:true});
      resize();
      window.requestAnimationFrame(loop);

})();
