/*
    Copyright (c) <2012-2015> Ed Angel and Dave Shreiner
    Code sample for CSCI 2408 Computer Graphics Fall 2022 
    (c)2022 by Araz Yusubov 
    DISCLAIMER: All code examples we will look at are quick hacks intended to present working prototypes.
    Hence they do not follow best practice of programming or software engineering.    
*/
"use strict";
// The purpose of "use strict" is to indicate that the code should be executed in "strict mode".
// With strict mode, you can not, for example, use undeclared variables.

var canvas;
var gl;

var angle = 0.0;
var angleLocation;

// Animation parameter
var delay = 100;

window.onload = init;

function init() {
    canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    //
    //  Configure WebGL
    //

    // Sets the viewport, which specifies the affine transformation of x and y 
    // from normalized device coordinates to window coordinates. 
    //gl.viewport( 0, 0, canvas.width, canvas.height );

    // Set the color value used when clearing color buffers.
    gl.clearColor( 0.0, 0.0, 0.0, 1.0 );

    // Activate culling of polygons.
    //gl.enable(gl.CULL_FACE);

    //  Load shaders and initialize attribute buffers
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    // Define homogeneous coordinates for each vertex.
    var vertices = [
        vec4( 0.5,-0.5,-0.5, 1.0),
        vec4(-0.5, 0.5,-0.5, 1.0),
        vec4(-0.5,-0.5,-0.5, 1.0)
    ];

    // Define color attribute for each vertex.
    var colors = [
        vec4( 1.0, 0.0, 0.0, 1.0),
        vec4( 0.0, 1.0, 0.0, 1.0),
        vec4( 0.0, 0.0, 1.0, 1.0)     
    ]
   
    // Load the vertex data into the GPU.

    // Create and initialize a WebGL buffer storing data.
    var bufferVertexId = gl.createBuffer();
    
    // Bind the given WebGL buffer to the ARRAY_BUFFER target as a buffer containing vertex attributes. 
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferVertexId );

    // Initialize and create the buffer object's data store.
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );

    // Associate our shader variables with our data buffer.

    // Get the location of an attribute variable in the WebGL program.
    var vPosition = gl.getAttribLocation( program, "vPosition" );

    // Bind the buffer to a generic vertex attribute of the current vertex buffer object (VBO).
    gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );

    // Turn on the generic vertex attribute array at the specified index into the list of attribute arrays. 
    gl.enableVertexAttribArray( vPosition );

    // Get the location of the uniform variable which is part of the WebGL program.
    angleLocation = gl.getUniformLocation( program, "angle" );

    // Load the color data into the GPU.
    var bufferColorId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferColorId);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);
    
    // Associate our shader variable with our data buffer.
    var vColor = gl.getAttribLocation(program, "vColor");
    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColor);    

    // Tell the browser that you wish to perform an animation 
    // and requests that the browser calls render to update an animation before the next repaint.
    window.requestAnimationFrame(render);
};


function render() {
    // Clear color buffer to preset values.
    gl.clear( gl.COLOR_BUFFER_BIT );

    // Update the rotation angle.
    angle += 0.1;

    // Specify value of uniform variable. 
    gl.uniform1f( angleLocation, angle );

    // Render primitives from array data.
    gl.drawArrays( gl.TRIANGLE_STRIP, 0, 3 );

    // Tell the browser that you wish to perform an animation.
    window.requestAnimationFrame(render);
    /*
    setTimeout(
        function () {
            window.requestAnimationFrame(render)
        }, delay
    );
    */
}
