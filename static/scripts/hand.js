AFRAME.registerComponent('hand', {
    init: function() {
        this.previousX = 0;
        this.previousY = 0;
        this.previousZ = 0;
        this.velocity = 0;
    },
    tick: function(time, timeDelta) {
        const currentPosition = this.el.getAttribute('position');
        this.velocity = Math.abs(currentPosition.z - this.previousZ) + Math.abs(currentPosition.y - this.previousY) + Math.abs(currentPosition.x + this.previousX) / timeDelta;
        this.previousX = currentPosition.x;
        this.previousY = currentPosition.y;
        this.previousZ = currentPosition.z;
    }
});