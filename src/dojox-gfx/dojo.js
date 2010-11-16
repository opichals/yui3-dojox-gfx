YUI.add('gallery-dojo', function(Y) {
    // Y.dojo and Y.dojox initialized
}, '0.0.1', { requires: [
    'gallery-dojo-jeo',
    'gallery-dojo._base.declare',
    'gallery-dojo._base.Color'
] });

// dojo - emulate 'just enough of - JEO'
YUI.add('gallery-dojo-jeo', function(Y) {
    Y.dojox = {
    };
    Y.dojo = {
        // dojo module loader tracking map
        _hasResource: {},

        doc: YUI.config.doc,
        body: function() {
            return YUI.config.doc.body;
        },
        byId: function(id) {
            return Y.Node.getDOMNode(Y.one(id instanceof String ? '#'+id : id));
        },
        config: {
        },
        deprecated: function(name) {
        },
        experimental: function(name) {
        },
        require: function(name) {
            // FIXME: our dojo modules are prefixed with gallery-
            Y.use('gallery-'+name);
        },
        requireIf: function(cond, name) {
            if (cond) this.require(name);
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
                this._mixin(obj, arguments[i]);
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
        connect: function (obj, evtname, context, method, dontFix) {
            // NOTE: perhaps we might need some event canonicalization here..
            return Y.get(obj).on(evtname.replace(/^on/,''),
                                 Y.bind(method, context));
        },
        disconnect: function (handle) {
            // disconnect a handle returned by dojo.connect
            handle.detach();
        },

        // UA emulation
        isSafari: 3, // dojox.gfx doesn't check for anything bug 3+ (fine by me) // FIXME?
        isWebKit: Y.UA.webkit,
        isIE: Y.UA.ie
    };
}, '0.0.1', { requires: [
] });
