"use strict";

if (typeof (JSIL) === "undefined")
  throw new Error("JSIL.Core required");

var $jsilxna = JSIL.DeclareAssembly("JSIL.XNA");

$jsilxna.imageMultipliedCache = {};

$jsilxna.getImageMultiplied = function (image, color) {
  var key = image.src + color.toCss();
  if ($jsilxna.imageMultipliedCache.hasOwnProperty(key))
    return $jsilxna.imageMultipliedCache[key];

  var canvas = document.createElement("canvas");
  var context = canvas.getContext("2d");

  // Workaround for bug in Firefox's canvas implementation that treats the outside of a canvas as solid white
  canvas.width = image.naturalWidth + 2;
  canvas.height = image.naturalHeight + 2;

  context.save();
  context.clearRect(0, 0, image.naturalWidth + 2, image.naturalHeight + 2);
  context.globalCompositeAlpha = 1.0;
  context.drawImage(image, 1, 1);

  var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  var rmul = color.R / 255;
  var gmul = color.G / 255;
  var bmul = color.B / 255;
  var amul = color.A / 255;
  var bytes = imageData.data;
  var foundPixels = false;

  for (var i = 0, l = image.naturalWidth * image.naturalHeight * 4; i < l; i += 4) {
    bytes[i] *= rmul;
    bytes[i + 1] *= gmul;
    bytes[i + 2] *= bmul;
    if (bytes[i + 3] > 0)
      foundPixels = true;
    bytes[i + 3] *= amul;
  }

  if (foundPixels) {
    context.putImageData(imageData, 0, 0);
    $jsilxna.imageMultipliedCache[key] = canvas;
  } else {
    // Workaround for bug in Chrome 12+ which causes getImageData to return pure black. LAME.
    $jsilxna.imageMultipliedCache[key] = image;
    return image;
  }
  return canvas;
};

Microsoft.Xna.Framework.Content.ContentManager.prototype._ctor$0 = function (serviceProvider) {
}
Microsoft.Xna.Framework.Content.ContentManager.prototype._ctor$1 = function (serviceProvider, rootDirectory) {
}
Microsoft.Xna.Framework.Content.ContentManager.prototype.Load = function (assetName) {
  return JSIL.Host.getAsset(assetName);
};
Microsoft.Xna.Framework.Content.ContentManager.prototype.Unload = function () {
  // Unnecessary since we rely on the host to preload our assets.
};

JSIL.MakeClass("System.Object", "HTML5Asset", true);
HTML5Asset.prototype._ctor = function (assetName) {
  this.name = assetName;
}

JSIL.MakeClass("HTML5Asset", "HTML5ImageAsset", true);
HTML5ImageAsset.prototype._ctor = function (assetName, image) {
  HTML5Asset.prototype._ctor.call(this, assetName);
  this.image = image;
  this.Width = image.naturalWidth;
  this.Height = image.naturalHeight;
}

JSIL.MakeClass("HTML5Asset", "HTML5SoundAsset", true);
HTML5SoundAsset.prototype._ctor = function (assetName, sound) {
  HTML5Asset.prototype._ctor.call(this, assetName);
  this.sound = sound;
}
HTML5SoundAsset.prototype.Play$0 = function () {
  if (this.sound != null) {
    this.sound.play();
  }
}

JSIL.MakeClass("HTML5Asset", "HTML5FontAsset", true);
HTML5FontAsset.prototype._ctor = function (assetName, id, pointSize, lineHeight) {
  HTML5Asset.prototype._ctor.call(this, assetName);
  this.id = id;
  this.pointSize = pointSize;
  this.lineHeight = lineHeight;
  this.canvas = JSIL.Host.getCanvas();
  this.context = this.canvas.getContext("2d");
}
HTML5FontAsset.prototype.toCss = function () {
  return this.pointSize + 'pt "' + this.id + '"';
};
HTML5FontAsset.prototype.MeasureString$0 = function (text) {
  this.context.font = this.toCss();
  var metrics = this.context.measureText(text);
  return new Microsoft.Xna.Framework.Vector2(metrics.width, this.lineHeight);
};

Microsoft.Xna.Framework.Media.MediaPlayer.Play$0 = function (song) {
  if (song !== null)
    song.Play$0();
};

Microsoft.Xna.Framework.MathHelper.Clamp = function (value, min, max) {
  if (value <= min)
    return min;
  else if (value >= max)
    return max;
  else
    return value;
};

Microsoft.Xna.Framework.Vector2.get_Zero = function () {
  return Object.create(Microsoft.Xna.Framework.Vector2.prototype);
};

Microsoft.Xna.Framework.Vector2.prototype._ctor$0 = function (x, y) {
  this.X = x;
  this.Y = y;
};

Microsoft.Xna.Framework.Vector2.prototype._ctor$1 = function (value) {
  this.X = this.Y = value;
};

Microsoft.Xna.Framework.Vector2.prototype.MemberwiseClone = function () {
  var result = Object.create(Microsoft.Xna.Framework.Vector2.prototype);
  result.X = this.X;
  result.Y = this.Y;
  return result;
}

Microsoft.Xna.Framework.Vector2.op_Addition = function (lhs, rhs) {
  var result = Object.create(Microsoft.Xna.Framework.Vector2.prototype);
  result.X = lhs.X + rhs.X;
  result.Y = lhs.Y + rhs.Y;
  return result;
}

Microsoft.Xna.Framework.Vector2.op_Subtraction = function (lhs, rhs) {
  var result = Object.create(Microsoft.Xna.Framework.Vector2.prototype);
  result.X = lhs.X - rhs.X;
  result.Y = lhs.Y - rhs.Y;
  return result;
}

Microsoft.Xna.Framework.Vector2.op_Division$0 = function (lhs, rhs) {
  var result = Object.create(Microsoft.Xna.Framework.Vector2.prototype);
  result.X = lhs.X / rhs.X;
  result.Y = lhs.Y / rhs.Y;
  return result;
}

Microsoft.Xna.Framework.Vector2.op_Division$1 = function (lhs, rhs) {
  var result = Object.create(Microsoft.Xna.Framework.Vector2.prototype);
  result.X = lhs.X / rhs;
  result.Y = lhs.Y / rhs;
  return result;
}

Microsoft.Xna.Framework.Vector2.op_Multiply$0 = function (lhs, rhs) {
  var result = Object.create(Microsoft.Xna.Framework.Vector2.prototype);
  result.X = lhs.X * rhs.X;
  result.Y = lhs.Y * rhs.Y;
  return result;
}

Microsoft.Xna.Framework.Vector2.op_Multiply$1 = function (lhs, rhs) {
  var result = Object.create(Microsoft.Xna.Framework.Vector2.prototype);
  result.X = lhs.X * rhs;
  result.Y = lhs.Y * rhs;
  return result;
}

Microsoft.Xna.Framework.Vector2.op_Equality = function (lhs, rhs) {
  return (lhs.X === rhs.X) && (lhs.Y === rhs.Y);
}

Microsoft.Xna.Framework.Vector2.op_Inequality = function (lhs, rhs) {
  return (lhs.X !== rhs.X) || (lhs.Y !== rhs.Y);
}

Microsoft.Xna.Framework.Vector2.prototype.LengthSquared = function () {
  return (this.X * this.X) + (this.Y * this.Y);
}

Microsoft.Xna.Framework.Vector3.get_Zero = function () {
  return Object.create(Microsoft.Xna.Framework.Vector3.prototype);
};

Microsoft.Xna.Framework.Vector3.prototype._ctor$0 = function (x, y, z) {
  this.X = x;
  this.Y = y;
  this.Z = z;
};

Microsoft.Xna.Framework.Vector3.prototype._ctor$1 = function (value) {
  this.X = this.Y = this.Z = value;
};

Microsoft.Xna.Framework.Vector3.prototype._ctor$2 = function (xy, z) {
  this.X = xy.X;
  this.Y = xy.Y;
  this.Z = z;
};

Microsoft.Xna.Framework.Vector3.prototype.MemberwiseClone = function () {
  var result = Object.create(Microsoft.Xna.Framework.Vector3.prototype);
  result.X = this.X;
  result.Y = this.Y;
  result.Z = this.Z;
  return result;
}

Microsoft.Xna.Framework.Vector4.get_Zero = function () {
  return Object.create(Microsoft.Xna.Framework.Vector4.prototype);
};

Microsoft.Xna.Framework.Vector4.prototype._ctor$0 = function (x, y, z, w) {
  this.X = x;
  this.Y = y;
  this.Z = z;
  this.W = w;
};

Microsoft.Xna.Framework.Vector4.prototype._ctor$1 = function (xy, z, w) {
  this.X = xy.X;
  this.Y = xy.Y;
  this.Z = z;
  this.W = w;
};

Microsoft.Xna.Framework.Vector4.prototype._ctor$2 = function (xyz, w) {
  this.X = xyz.X;
  this.Y = xyz.Y;
  this.Z = xyz.Z;
  this.W = w;
};

Microsoft.Xna.Framework.Vector4.prototype._ctor$3 = function (value) {
  this.X = this.Y = this.Z = this.W = value;
};

Microsoft.Xna.Framework.Vector4.prototype.MemberwiseClone = function () {
  var result = Object.create(Microsoft.Xna.Framework.Vector4.prototype);
  result.X = this.X;
  result.Y = this.Y;
  result.Z = this.Z;
  result.W = this.W;
  return result;
}

Microsoft.Xna.Framework.GameServiceContainer.prototype._ctor = function () {
};

Microsoft.Xna.Framework.Game._QuitForced = false;
Microsoft.Xna.Framework.Game.ForceQuit = function () {
  Microsoft.Xna.Framework.Game._QuitForced = true;
};

Microsoft.Xna.Framework.Game.prototype._runHandle = null;
Microsoft.Xna.Framework.Game.prototype._ctor = function () {
  this.content = JSIL.New(Microsoft.Xna.Framework.Content.ContentManager, "_ctor$0", []);
  this.gameServices = new Microsoft.Xna.Framework.GameServiceContainer();
  this._frameDelay = 1000 / 60;

  if (typeof (Date.now) === "function")
    this._GetNow = Date.now;

  this._gameTime = JSIL.New(Microsoft.Xna.Framework.GameTime, "_ctor$0", []);
  this._lastFrame = this._nextFrame = this._started = 0;
};
Microsoft.Xna.Framework.Game.prototype.get_Content = function () {
  return this.content;
};
Microsoft.Xna.Framework.Game.prototype.get_Services = function () {
  return this.gameServices;
};
Microsoft.Xna.Framework.Game.prototype.Initialize = function () {
  this.LoadContent();
};
Microsoft.Xna.Framework.Game.prototype.get_GraphicsDevice = function () {
  return this.graphicsDeviceService.GraphicsDevice;
};
Microsoft.Xna.Framework.Game.prototype.LoadContent = function () {
};
Microsoft.Xna.Framework.Game.prototype.UnloadContent = function () {
};
Microsoft.Xna.Framework.Game.prototype.Draw = function (gameTime) {
};
Microsoft.Xna.Framework.Game.prototype.Update = function (gameTime) {
};
Microsoft.Xna.Framework.Game.prototype.Run = function () {
  Microsoft.Xna.Framework.Game._QuitForced = false;
  this.Initialize();
  this._QueueStep();
};
Microsoft.Xna.Framework.Game.prototype._GetNow = function () {
  return (new Date()).getTime();
};
Microsoft.Xna.Framework.Game.prototype._DeferCall = function (callback, lng) {
  setTimeout(callback, 0);
};
Microsoft.Xna.Framework.Game.prototype._QueueStep = function () {
  if (Microsoft.Xna.Framework.Game._QuitForced)
    return;

  var self = this;
  var stepCallback = self._Step.bind(self);

  if (typeof (mozRequestAnimationFrame) !== "undefined") {
    mozRequestAnimationFrame(stepCallback);
  } else if (typeof (webkitRequestAnimationFrame) !== "undefined") {
    webkitRequestAnimationFrame(stepCallback);
  } else {
    var shouldStepCallback = function () {
      var now = self._GetNow();
      var delay = self._nextFrame - now;

      if (delay <= 0)
        stepCallback();
      else
        self._DeferCall(shouldStepCallback, delay >= 5);
    };

    // It's important that we use setTimeout at least once after every frame in order to let the browser pump messages
    this._DeferCall(shouldStepCallback, true);
  }
};
Microsoft.Xna.Framework.Game.prototype._Step = function () {
  var now = this._GetNow();
  if (this._lastFrame === 0) {
    var elapsed = 0;
    var total = 0;
    this._started = now;
  } else {
    var elapsed = now - this._lastFrame;
    var total = now - this._started;
  }

  this._lastFrame = now;
  this._nextFrame = now + this._frameDelay;

  // Some of the XNA samples seem to fall over and die if elapsed is too large. :|
  if (elapsed > this._frameDelay)
    elapsed = this._frameDelay;

  this._gameTime.elapsedRealTime._ticks = this._gameTime.elapsedGameTime._ticks = Math.floor(elapsed * System.TimeSpan.MillisecondInTicks);
  this._gameTime.totalRealTime._ticks = this._gameTime.totalGameTime._ticks = Math.floor(total * System.TimeSpan.MillisecondInTicks);

  var failed = true;
  try {
    this.Update(this._gameTime);
    this.Draw(this._gameTime);
    failed = false;
  } finally {
    if (failed || Microsoft.Xna.Framework.Game._QuitForced)
      this.Exit();
    else
      this._QueueStep();
  }
};
Microsoft.Xna.Framework.Game.prototype.Exit = function () {
  this.Dispose();
}
Microsoft.Xna.Framework.Game.prototype.Dispose = function () {
  if (this._runHandle !== null)
    window.clearInterval(this._runHandle);

  this._runHandle = null;
  this.UnloadContent();
}

Microsoft.Xna.Framework.Input.Keyboard.GetState = function (playerIndex) {
  var keys = JSIL.Host.getHeldKeys();
  return new Microsoft.Xna.Framework.Input.KeyboardState(keys);
};

Microsoft.Xna.Framework.Input.KeyboardState.prototype.keys = [];
Microsoft.Xna.Framework.Input.KeyboardState.prototype._ctor = function (keys) {
  // Note that these keys should be represented as raw integral key codes, not enumeration members
  this.keys = keys;
};

Microsoft.Xna.Framework.Input.KeyboardState.prototype.IsKeyDown = function (key) {
  return Array.prototype.indexOf.call(this.keys, key.value) !== -1;
};

Microsoft.Xna.Framework.Input.KeyboardState.prototype.IsKeyUp = function (key) {
  return Array.prototype.indexOf.call(this.keys, key.value) === -1;
};

Microsoft.Xna.Framework.Input.Mouse.GetState = function (playerIndex) {
  var buttons = JSIL.Host.getHeldButtons();
  var position = JSIL.Host.getMousePosition();
  return new Microsoft.Xna.Framework.Input.MouseState(position, buttons);
};

Microsoft.Xna.Framework.Input.GamePad.GetState = function (playerIndex) {
  return new Microsoft.Xna.Framework.Input.GamePadState();
};

Microsoft.Xna.Framework.Input.GamePadState.prototype._ctor = function () {
  this._buttons = new Microsoft.Xna.Framework.Input.GamePadButtons();
  this._thumbs = new Microsoft.Xna.Framework.Input.GamePadThumbSticks();
  this._triggers = new Microsoft.Xna.Framework.Input.GamePadTriggers();
}

Microsoft.Xna.Framework.Input.GamePadButtons.prototype.get_Back = function () {
  return false;
}

Microsoft.Xna.Framework.Input.GamePadState.prototype.get_Buttons = function () {
  return this._buttons;
}

Microsoft.Xna.Framework.Input.GamePadState.prototype.IsButtonDown = function (button) {
  return false;
}

Microsoft.Xna.Framework.Input.GamePadState.prototype.get_ThumbSticks = function () {
  return this._thumbs;
}

Microsoft.Xna.Framework.Input.GamePadState.prototype.get_Triggers = function () {
  return this._triggers;
}

Microsoft.Xna.Framework.Input.GamePadThumbSticks.prototype.get_Left = function () {
  return this._left;
}

Microsoft.Xna.Framework.Input.GamePadThumbSticks.prototype.get_Right = function () {
  return this._right;
}

Microsoft.Xna.Framework.Input.MouseState.prototype._ctor = function (position, buttons) {
  this.position = position;
  this.buttons = buttons;
};

Microsoft.Xna.Framework.GraphicsDeviceManager.prototype._ctor = function () {
  this.device = new Microsoft.Xna.Framework.Graphics.GraphicsDevice();
};

Microsoft.Xna.Framework.GraphicsDeviceManager.prototype.get_GraphicsDevice = function () {
  return this.device;
};

Microsoft.Xna.Framework.Graphics.Viewport.prototype.get_Width = function () {
  return this._width;
}
Microsoft.Xna.Framework.Graphics.Viewport.prototype.get_Height = function () {
  return this._height;
}
Microsoft.Xna.Framework.Graphics.Viewport.prototype.set_Width = function (value) {
  this._width = value;
}
Microsoft.Xna.Framework.Graphics.Viewport.prototype.set_Height = function (value) {
  this._height = value;
}
Microsoft.Xna.Framework.Graphics.Viewport.prototype.get_TitleSafeArea = function () {
  return new Microsoft.Xna.Framework.Rectangle(0, 0, this._width, this._height);
}

Microsoft.Xna.Framework.GameTime.prototype._ctor$0 = function () {
};

Microsoft.Xna.Framework.GameTime.prototype._ctor$1 = function (totalRealTime, elapsedRealTime, totalGameTime, elapsedGameTime, isRunningSlowly) {
  this.totalRealTime = totalRealTime;
  this.elapsedRealTime = elapsedRealTime;
  this.totalGameTime = totalGameTime;
  this.elapsedGameTime = elapsedGameTime;
  this.isRunningSlowly = isRunningSlowly;
};

Microsoft.Xna.Framework.GameTime.prototype._ctor$2 = function (totalRealTime, elapsedRealTime, totalGameTime, elapsedGameTime) {
  Microsoft.Xna.Framework.GameTime.prototype._ctor$1.call(this, totalRealTime, elapsedRealTime, totalGameTime, elapsedGameTime, false);
};

Microsoft.Xna.Framework.GameTime.prototype.get_TotalRealTime = function () {
  return this.totalRealTime;
}
Microsoft.Xna.Framework.GameTime.prototype.get_TotalGameTime = function () {
  return this.totalGameTime;
}
Microsoft.Xna.Framework.GameTime.prototype.get_ElapsedRealTime = function () {
  return this.elapsedRealTime;
}
Microsoft.Xna.Framework.GameTime.prototype.get_ElapsedGameTime = function () {
  return this.elapsedGameTime;
}

Microsoft.Xna.Framework.Rectangle.prototype._ctor = function (x, y, width, height) {
  this.X = Math.floor(x);
  this.Y = Math.floor(y);
  this.Width = Math.floor(width);
  this.Height = Math.floor(height);
}

Microsoft.Xna.Framework.Rectangle.prototype.get_Left = function () {
  return this.X;
}
Microsoft.Xna.Framework.Rectangle.prototype.get_Top = function () {
  return this.Y;
}
Microsoft.Xna.Framework.Rectangle.prototype.get_Right = function () {
  return this.X + this.Width;
}
Microsoft.Xna.Framework.Rectangle.prototype.get_Bottom = function () {
  return this.Y + this.Height;
}
Microsoft.Xna.Framework.Rectangle.prototype.get_Center = function () {
  return new Microsoft.Xna.Framework.Point(
    Math.floor(this.X + (this.Width / 2)),
    Math.floor(this.Y + (this.Height / 2))
  );
}
Microsoft.Xna.Framework.Rectangle.prototype.Contains$1 = function (value) {
  return this.X <= value.X && value.X < this.X + this.Width && this.Y <= value.Y && value.Y < this.Y + this.Height;
}
Microsoft.Xna.Framework.Rectangle.prototype.Intersects$0 = function (value) {
  return value.X < this.X + this.Width && this.X < value.X + value.Width && value.Y < this.Y + this.Height && this.Y < value.Y + value.Height;
}
Microsoft.Xna.Framework.Rectangle.prototype.MemberwiseClone = function () {
  var result = Object.create(Microsoft.Xna.Framework.Rectangle.prototype);
  result.X = this.X;
  result.Y = this.Y;
  result.Width = this.Width;
  result.Height = this.Height;
  return result;
}


Microsoft.Xna.Framework.Point.prototype._ctor = function (x, y) {
  this.X = Math.floor(x);
  this.Y = Math.floor(y);
}
Microsoft.Xna.Framework.Point._cctor = function () {
  Microsoft.Xna.Framework.Point._zero = new Microsoft.Xna.Framework.Point();
}
Microsoft.Xna.Framework.Point.prototype.Equals$0 = function (rhs) {
  return this.X === rhs.X && this.Y === rhs.Y;
};
Microsoft.Xna.Framework.Point.get_Zero = function () {
  return Microsoft.Xna.Framework.Point._zero;
};
Microsoft.Xna.Framework.Point.op_Equality = function (lhs, rhs) {
  return lhs.Equals$0(rhs);
};
Microsoft.Xna.Framework.Point.op_Inequality = function (lhs, rhs) {
  return lhs.X !== rhs.X || lhs.Y !== rhs.Y;
};

Microsoft.Xna.Framework.Storage.StorageContainer.get_TitleLocation = function () {
  return JSIL.Host.getRootDirectory();
};
