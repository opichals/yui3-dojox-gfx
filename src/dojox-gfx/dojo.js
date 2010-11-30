YUI.add('gallery-dojo', function(Y) {
    // Y.dojo and Y.dojox initialized
    Y.dojo.require('dojo._base.declare');
    Y.dojo.require('dojo._base.connect');
    Y.dojo.require('dojo._base.Color');
}, '0.0.1', { requires: [
    'gallery-dojo-jeo',
    'gallery-dojo._base.declare',
    'gallery-dojo._base.connect',
    'gallery-dojo._base.Color'
] });

YUI.add('gallery-dojox-gfx', function(Y) {
    // the requireIf arranges the right renderer being added
}, '0.0.1', { requires: [
    'gallery-dojo',
    'gallery-dojox.gfx',
    'gallery-dojox.gfx.svg',
    'gallery-dojox.gfx.silverlight',
    'gallery-dojox.gfx.vml'
] });

// dojo - emulate 'just enough of - JEO'
YUI.add('gallery-dojo-jeo', function(Y) {
    Y.dojox = {
    };
    Y.dojo = {
        _modules: {},
        // dojo module loader tracking map
        _hasResource: {},

        doc: Y.config.doc,
        body: function() {
            return Y.config.doc.body;
        },
        byId: function(id) {
            return Y.Node.getDOMNode(Y.one(typeof id === 'string' ? '#'+id : id));
        },
        config: {
        },
        deprecated: function(name) {
        },
        experimental: function(name) {
        },
        require: function(name) {
            // The dojo generate module files are prefixed with "gallery-"
            Y.use('gallery-'+name, function(Y) {
                // include the module into the Y.dojo|Y.dojox namespace
                Y.dojo._modules[name](Y);
            });
        },
        requireIf: function(cond, name) {
            if (cond) Y.dojo.require(name);
        },
        provide: function(name) {
            Y.namespace(name);
        },

        getObject: function(name, create, context) {
            if (create)
                return Y.namespace.call(context || Y, name);
            return Y.Object.getValue(context, name);
        },
        setObject: function(name, ctor) {
            Y.namespace(name); // contruct the path
            Y.Object.setValue(Y, name.split('.'), ctor); // set the value
        },

        _extraNames: [], // FIXME: check IEs... (Y.mix...)
        _mixin: function(target, source) {
            return Y.mix(target, source, true);
        },
        mixin: function(obj, props) {
            if(!obj){ obj = {}; }
            for(var i=1, l=arguments.length; i<l; i++){
                Y.dojo._mixin(obj, arguments[i]);
            }
            return obj; // Object
        },

        loadInit: function(fn) {
            fn();
        },
        addOnLoad: function() {
            // FIXME: TODO
        },
        addOnUnload: function() {
            // FIXME: TODO
        },
        destroy: function(node) {
            node = Y.dojo.byId(node);
            Y.Event.purgeElement(node, true);
            node.parentNode && node.parentNode.removeChild(node);
        },

        // UA emulation
        isBrowser: Y.UA.ie || Y.UA.chrome || Y.UA.gecko,
        isMozilla: Y.UA.gecko,
        isOpera:   Y.UA.opera,
        isChrome:  Y.UA.chrome,
        isSafari:  Y.UA.webkit <= 420 ? 2 : 5, // FIXME other versions?
        isWebKit:  Y.UA.webkit,
        isIE:  Y.UA.ie,
        isMac: Y.UA.os === 'macintosh'
    };
}, '0.0.1', { requires: [
] });
