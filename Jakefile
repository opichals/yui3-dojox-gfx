// this uses github.com/mde/node-jake

var sys = require('sys');
var fs = require('fs');
var vm = require('vm');

window = {};
dojo = {
    _hasResource: {},
    _extraNames: [],
    _mkscope: function(name) {
      var segments = name.split('.');
      segments.reduce(function(partial, segment) {
          if (partial) {
              partial += "['"+segment+"']";
          } else {
              partial += segment;
          }
          var e = partial + ' = typeof ' + partial + ' == "object" ? ' + partial + ' : {}';
          vm.runInThisContext(e, name);
          return partial;
      }, '');
    },
    config: {
    },
    setObject: function() {
    },
    require: function(name) {
      //sys.puts('require: '+ name);
      dojo._module.requires.push('gallery-'+name);
    },
    requireIf: function(name, cond) {
      //sys.puts('requireIf: '+ name + cond);
    },
    provide: function(name) {
      sys.puts('provide: '+ name);
      this._mkscope(name);
      dojo._module.name = name;
      dojo._modules[name] = dojo._module;
    },
    experimental: function(name) {
        return this.provide(name);
    },
    declare: function(name) {
      //sys.puts('declare: '+ name);
      return this._mkscope(name);
    },
    loadInit: function() {
      //sys.puts('loadInit');
    },
    addOnLoad: function() {
    },
    addOnUnload: function() {
    },
    _mixin: function() {
      //sys.puts('mixin');
    },
    mixin: function() {
      //sys.puts('mixin');
    },
    extend: function() {
      //sys.puts('extend');
    },
    forEach: function() {
    }
};
define = function(requires, fn) {
      var name = dojo._module.path;
      name = name.replace(/vendor\//, '');
      name = name.replace(/.js$/, '');

      var segments = name.split(/\//);
      segments.pop();

      name = name.replace(/\//g, '.');
      dojo.provide(name);


      requires.forEach(function(name) {
          var segs = name.split(/\//);
          segs.pop();

          var relative = false;
          var folder = [].concat(segments);
          segs.forEach(function(seg) {
              if (seg === '.') relative = true;
              if (seg === '..') {
                  relative = true;
                  folder.pop();
              }
          });
          name = name.replace(/\//g,'.');
          name = name.replace(/!/g,'');
          if (relative) {
              folder.push( name.match(/[^\.]+$/)[0] );
          } else {
              folder = [name];
          }

          if (folder[0] === 'require') folder.unshift('dojo');

          sys.puts(dojo._module.path + ' R: '+ folder.join('/') +".js");
          dojo._module.requires.push('gallery-'+folder.join('.'));
      });
};

dojo._modules = {};
function wrap_dojo_module(fname) {
    //sys.puts("FILE: " + fname);
    //dojo._modules = {};
    dojo._module = {
        requires: ['gallery-dojo'],
        path: fname,
        content: fs.readFileSync(fname, 'utf-8')
    };
    dojo.declare = dojo._mkscope;
    dojo._hasResource = {};
    vm.runInThisContext(dojo._module.content, fname);

    return dojo._module;
}

var VENDOR = "vendor";
var DOJOX_GFX_SRC = [
    "dojo/has.js",
    "dojo/_base/lang.js",
    "dojo/dom-construct.js",
    "dojo/_base/array.js",
    "dojo/_base/connect.js",
    "dojo/_base/declare.js",
    "dojo/_base/Color.js",
    "dojo/_base/sniff.js",
    "dojox/gfx.js",
    "dojox/gfx/_base.js",
    "dojox/gfx/arc.js",
    //"dojox/gfx/attach.js",
    "dojox/gfx/decompose.js",
    "dojox/gfx/fx.js",
    "dojox/gfx/gradient.js",
    "dojox/gfx/gradutils.js",
    "dojox/gfx/matrix.js",
    "dojox/gfx/move.js",
    "dojox/gfx/Moveable.js",
    "dojox/gfx/Mover.js",
    "dojox/gfx/shape.js",
    "dojox/gfx/path.js",
    "dojox/gfx/utils.js",
    "dojox/gfx/VectorText.js",
    "dojox/gfx/svg.js",
    "dojox/gfx/svg_attach.js",
    "dojox/gfx/vml.js",
    "dojox/gfx/vml_attach.js",
    "dojox/gfx/silverlight.js",
    "dojox/gfx/silverlight_attach.js",
    "dojox/xml/DomParser.js",
    "dojox/html/metrics.js",
    "dojox/gfx/canvas.js",
    "dojox/gfx/canvas_attach.js"
]

desc('This is the default task.');
task('default', [], function () {
      DOJOX_GFX_SRC.forEach(function(f) {
          var m = wrap_dojo_module(VENDOR+'/'+f);

          var contents = "YUI.add(\'gallery-"+m.name+"\', function(Y) {\nY.dojo._modules[\'"+m.name+"\']=function(Y) { var dojo = Y.dojo, dojox = Y.dojox;\n"+m.content+"\n}\n}, '0.0.1', { requires:\n" + sys.inspect(m.requires) + "\n});";

          var target = 'src/dojox-gfx/gen/' + f.replace(/\//g, '_');
          sys.puts('writing: ' + target);
          fs.writeFileSync(target, contents);
          fs.writeFileSync(target.replace(/\.js$/, '-debug.js'), contents);
      });
      //sys.puts(sys.inspect(dojo._modules));
});
