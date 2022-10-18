"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Canvas =
/*#__PURE__*/
function () {
  function Canvas(canvas) {
    _classCallCheck(this, Canvas);

    this.canvas = canvas;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.ctx = this.canvas.getContext('2d');
    this.canvas.style.background = '#333';
    this.numberOfLines = 1;
    this.lineWidth = 25;
    this.lineGutter = 10;
    this.lines = [];
    this.grid = {
      x: 0,
      y: 0
    };
    this.init();
  }

  _createClass(Canvas, [{
    key: "init",
    value: function init() {
      window.mouse = {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2
      };
      this.addEvents();
      this.resizeCanvas();
      this.addLines();
      this.ctx.beginPath();
      this.ctx.rect(0, 0, this.width, this.height);
      this.ctx.closePath();
      this.ctx.clip();
      this.render();
      this.canvas.width = this.width = window.innerWidth;
      this.canvas.height = this.height = window.innerHeight;
    }
  }, {
    key: "resizeCanvas",
    value: function resizeCanvas() {
      this.canvas.width = this.width = window.innerWidth;
      this.canvas.height = this.height = window.innerHeight;
      this.grid.x = Math.round(this.width / (this.lineWidth + this.lineGutter)) + 1;
      this.grid.y = Math.round(this.height / this.lineWidth) + 1;
    }
  }, {
    key: "addEvents",
    value: function addEvents() {
      document.addEventListener('mousemove', this.mousemove.bind(this));
      window.addEventListener('resize', this.resizeCanvas.bind(this));
    }
  }, {
    key: "mousemove",
    value: function mousemove(e) {
      window.mouse.x = e.clientX;
      window.mouse.y = e.clientY;
    }
  }, {
    key: "addLines",
    value: function addLines() {
      for (var x = 0; x < this.grid.x; x++) {
        var posX = this.lineWidth * x + this.lineGutter * x;

        for (var y = 0; y < this.grid.y; y++) {
          var posY = this.lineWidth * y + this.lineGutter * y;
          this.lines.push(new Line(this.ctx, posX, posY, this.lineWidth));
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      this.ctx.clearRect(0, 0, this.width, this.height);

      for (var i = 0; i < this.lines.length; i++) {
        this.lines[i].draw();
      }

      window.requestAnimationFrame(this.render.bind(this));
    }
  }]);

  return Canvas;
}();

var Line =
/*#__PURE__*/
function () {
  function Line(ctx, x, y) {
    var width = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 50;

    _classCallCheck(this, Line);

    this.width = width;
    this.x = x;
    this.y = y;
    this.ctx = ctx;
    this.sine = 0;
    this.draw = this.draw.bind(this);
  }

  _createClass(Line, [{
    key: "draw",
    value: function draw() {
      this.sine++;
      this.ctx.save();
      this.ctx.translate(this.x, this.y);
      this.ctx.rotate(this.getAngle());
      this.ctx.beginPath();
      this.ctx.moveTo(-(this.width / 2), -5);
      this.ctx.lineTo(this.width / 2, -5);
      this.ctx.lineWidth = Math.pow(this.getDistance() / Math.abs(Math.sin(this.sine / 200) * 300), 3.5);
      this.ctx.strokeStyle = "#7D55D7";
      this.ctx.stroke();
      this.ctx.restore();
    }
  }, {
    key: "getAngle",
    value: function getAngle() {
      return Math.atan2(window.mouse.y - this.y, window.mouse.x - this.x);
    }
  }, {
    key: "getDistance",
    value: function getDistance() {
      var a = this.x - window.mouse.x;
      var b = this.y - window.mouse.y;
      return Math.sqrt(a * a + b * b);
    }
  }]);

  return Line;
}();

new Canvas(document.getElementById('canvas'));
//# sourceMappingURL=none.dev.js.map
