const rgbToHex = (r, g, b) => '#' + [r, g, b].map(x => {
    const hex = x.toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }).join('')

function hex2rgb(hex) {
    // long version
    r = hex.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
    if (r) {
            return r.slice(1,4).map(function(x) { return parseInt(x, 16); });
    }
    // short version
    r = hex.match(/^#([0-9a-f])([0-9a-f])([0-9a-f])$/i);
    if (r) {
            return r.slice(1,4).map(function(x) { return 0x11 * parseInt(x, 16); });
    }
    return null;
}

AFRAME.registerComponent('pole', {
    tick: function() {
        const hands = document.querySelectorAll('.hand');
        const currentPosition = this.el.object3D.getWorldPosition();

        for (let i = 0; i < hands.length; i+= 1) {
            const hand = hands[i];
            const handPosition = hand.object3D.getWorldPosition();
            distanceX = Math.abs(currentPosition.x - handPosition.x);
            distanceY = Math.abs(currentPosition.y - handPosition.y);
            distanceZ = Math.abs(currentPosition.z - handPosition.z);
            distance = Math.sqrt( distanceX * distanceX + distanceY * distanceY + distanceZ * distanceZ);
            if (distance <= 0.5) {
                const handVelocity = hand.components['hand'].velocity;
                if (!isNaN(handVelocity)) {
                    if (hand.getAttribute('class').indexOf('left-hand') >= 0) {
                        document.querySelector('#text-left').setAttribute('text', {value: handVelocity});
                    } else {
                        document.querySelector('#text-right').setAttribute('text', {value: handVelocity});
                    }
                    const oldColor = hex2rgb(this.el.getAttribute('material').color);
                    const newRed = Math.max(Math.floor(oldColor[0] + handVelocity), 255);
                    const newBlue = Math.max(Math.floor(oldColor[2] - handVelocity), 0);

                    const newColor = rgbToHex(newRed, 0, newBlue);
                    this.el.setAttribute('material', {color: newColor});
                }
            }
        }
    }
});
