"use strict";
(self.webpackChunktrieClient = self.webpackChunktrieClient || []).push([
    [
        179
    ],
    {
        950: ()=>{
            function re(t) {
                return "function" == typeof t;
            }
            function Zi(t) {
                const n = t((r)=>{
                    Error.call(r), r.stack = (new Error).stack;
                });
                return n.prototype = Object.create(Error.prototype), n.prototype.constructor = n, n;
            }
            const Ji = Zi((t)=>function(n) {
                    t(this), this.message = n ? `${n.length} errors occurred during unsubscription:\n${n.map((r, i)=>`${i + 1}) ${r.toString()}`).join("\n  ")}` : "", this.name = "UnsubscriptionError", this.errors = n;
                });
            function Jr(t, e) {
                if (t) {
                    const n = t.indexOf(e);
                    0 <= n && t.splice(n, 1);
                }
            }
            let xt = class xt {
                unsubscribe() {
                    let e;
                    if (!this.closed) {
                        this.closed = !0;
                        const { _parentage: n  } = this;
                        if (n) if (this._parentage = null, Array.isArray(n)) for (const s of n)s.remove(this);
                        else n.remove(this);
                        const { initialTeardown: r  } = this;
                        if (re(r)) try {
                            r();
                        } catch (s1) {
                            e = s1 instanceof Ji ? s1.errors : [
                                s1
                            ];
                        }
                        const { _finalizers: i  } = this;
                        if (i) {
                            this._finalizers = null;
                            for (const s of i)try {
                                gd(s);
                            } catch (o) {
                                e = null != e ? e : [], o instanceof Ji ? e = [
                                    ...e,
                                    ...o.errors
                                ] : e.push(o);
                            }
                        }
                        if (e) throw new Ji(e);
                    }
                }
                add(e) {
                    var n;
                    if (e && e !== this) if (this.closed) gd(e);
                    else {
                        if (e instanceof xt) {
                            if (e.closed || e._hasParent(this)) return;
                            e._addParent(this);
                        }
                        (this._finalizers = null !== (n = this._finalizers) && void 0 !== n ? n : []).push(e);
                    }
                }
                _hasParent(e) {
                    const { _parentage: n  } = this;
                    return n === e || Array.isArray(n) && n.includes(e);
                }
                _addParent(e) {
                    const { _parentage: n  } = this;
                    this._parentage = Array.isArray(n) ? (n.push(e), n) : n ? [
                        n,
                        e
                    ] : e;
                }
                _removeParent(e) {
                    const { _parentage: n  } = this;
                    n === e ? this._parentage = null : Array.isArray(n) && Jr(n, e);
                }
                remove(e) {
                    const { _finalizers: n  } = this;
                    n && Jr(n, e), e instanceof xt && e._removeParent(this);
                }
                constructor(e){
                    this.initialTeardown = e, this.closed = !1, this._parentage = null, this._finalizers = null;
                }
            };
            xt.EMPTY = (()=>{
                const t = new xt;
                return t.closed = !0, t;
            })();
            const hd = xt.EMPTY;
            function pd(t) {
                return t instanceof xt || t && "closed" in t && re(t.remove) && re(t.add) && re(t.unsubscribe);
            }
            function gd(t) {
                re(t) ? t() : t.unsubscribe();
            }
            const Tn = {
                onUnhandledError: null,
                onStoppedNotification: null,
                Promise: void 0,
                useDeprecatedSynchronousErrorHandling: !1,
                useDeprecatedNextContext: !1
            }, Yi = {
                setTimeout (t, e, ...n) {
                    const { delegate: r  } = Yi;
                    return (null == r ? void 0 : r.setTimeout) ? r.setTimeout(t, e, ...n) : setTimeout(t, e, ...n);
                },
                clearTimeout (t) {
                    const { delegate: e  } = Yi;
                    return ((null == e ? void 0 : e.clearTimeout) || clearTimeout)(t);
                },
                delegate: void 0
            };
            function md(t) {
                Yi.setTimeout(()=>{
                    const { onUnhandledError: e  } = Tn;
                    if (!e) throw t;
                    e(t);
                });
            }
            function yd() {}
            const hD = oa("C", void 0, void 0);
            function oa(t, e, n) {
                return {
                    kind: t,
                    value: e,
                    error: n
                };
            }
            let In = null;
            function Xi(t) {
                if (Tn.useDeprecatedSynchronousErrorHandling) {
                    const e = !In;
                    if (e && (In = {
                        errorThrown: !1,
                        error: null
                    }), t(), e) {
                        const { errorThrown: n , error: r  } = In;
                        if (In = null, n) throw r;
                    }
                } else t();
            }
            let aa = class aa extends xt {
                static create(e, n, r) {
                    return new es(e, n, r);
                }
                next(e) {
                    this.isStopped ? ua(function gD(t) {
                        return oa("N", t, void 0);
                    }(e), this) : this._next(e);
                }
                error(e) {
                    this.isStopped ? ua(function pD(t) {
                        return oa("E", void 0, t);
                    }(e), this) : (this.isStopped = !0, this._error(e));
                }
                complete() {
                    this.isStopped ? ua(hD, this) : (this.isStopped = !0, this._complete());
                }
                unsubscribe() {
                    this.closed || (this.isStopped = !0, super.unsubscribe(), this.destination = null);
                }
                _next(e) {
                    this.destination.next(e);
                }
                _error(e) {
                    try {
                        this.destination.error(e);
                    } finally{
                        this.unsubscribe();
                    }
                }
                _complete() {
                    try {
                        this.destination.complete();
                    } finally{
                        this.unsubscribe();
                    }
                }
                constructor(e){
                    super(), this.isStopped = !1, e ? (this.destination = e, pd(e) && e.add(this)) : this.destination = DD;
                }
            };
            const yD = Function.prototype.bind;
            function la(t, e) {
                return yD.call(t, e);
            }
            let _D = class _D {
                next(e) {
                    const { partialObserver: n  } = this;
                    if (n.next) try {
                        n.next(e);
                    } catch (r) {
                        ts(r);
                    }
                }
                error(e) {
                    const { partialObserver: n  } = this;
                    if (n.error) try {
                        n.error(e);
                    } catch (r) {
                        ts(r);
                    }
                    else ts(e);
                }
                complete() {
                    const { partialObserver: e  } = this;
                    if (e.complete) try {
                        e.complete();
                    } catch (n) {
                        ts(n);
                    }
                }
                constructor(e){
                    this.partialObserver = e;
                }
            };
            let es = class es extends aa {
                constructor(e, n, r){
                    let i;
                    if (super(), re(e) || !e) i = {
                        next: null != e ? e : void 0,
                        error: null != n ? n : void 0,
                        complete: null != r ? r : void 0
                    };
                    else {
                        let s;
                        this && Tn.useDeprecatedNextContext ? (s = Object.create(e), s.unsubscribe = ()=>this.unsubscribe(), i = {
                            next: e.next && la(e.next, s),
                            error: e.error && la(e.error, s),
                            complete: e.complete && la(e.complete, s)
                        }) : i = e;
                    }
                    this.destination = new _D(i);
                }
            };
            function ts(t1) {
                Tn.useDeprecatedSynchronousErrorHandling ? function mD(t) {
                    Tn.useDeprecatedSynchronousErrorHandling && In && (In.errorThrown = !0, In.error = t);
                }(t1) : md(t1);
            }
            function ua(t, e) {
                const { onStoppedNotification: n  } = Tn;
                n && Yi.setTimeout(()=>n(t, e));
            }
            const DD = {
                closed: !0,
                next: yd,
                error: function vD(t) {
                    throw t;
                },
                complete: yd
            }, ca = "function" == typeof Symbol && Symbol.observable || "@@observable";
            function _d(t) {
                return t;
            }
            let Ae = (()=>{
                let t2 = class t {
                    lift(n) {
                        const r = new t;
                        return r.source = this, r.operator = n, r;
                    }
                    subscribe(n, r, i) {
                        const s = function CD(t3) {
                            return t3 && t3 instanceof aa || function ED(t) {
                                return t && re(t.next) && re(t.error) && re(t.complete);
                            }(t3) && pd(t3);
                        }(n) ? n : new es(n, r, i);
                        return Xi(()=>{
                            const { operator: o , source: a  } = this;
                            s.add(o ? o.call(s, a) : a ? this._subscribe(s) : this._trySubscribe(s));
                        }), s;
                    }
                    _trySubscribe(n) {
                        try {
                            return this._subscribe(n);
                        } catch (r) {
                            n.error(r);
                        }
                    }
                    forEach(n, r) {
                        return new (r = Dd(r))((i, s)=>{
                            const o = new es({
                                next: (a)=>{
                                    try {
                                        n(a);
                                    } catch (l) {
                                        s(l), o.unsubscribe();
                                    }
                                },
                                error: s,
                                complete: i
                            });
                            this.subscribe(o);
                        });
                    }
                    _subscribe(n) {
                        var r;
                        return null === (r = this.source) || void 0 === r ? void 0 : r.subscribe(n);
                    }
                    [ca]() {
                        return this;
                    }
                    pipe(...n1) {
                        return (function vd(t) {
                            return 0 === t.length ? _d : 1 === t.length ? t[0] : function(n) {
                                return t.reduce((r, i)=>i(r), n);
                            };
                        })(n1)(this);
                    }
                    toPromise(n) {
                        return new (n = Dd(n))((r, i)=>{
                            let s;
                            this.subscribe((o)=>s = o, (o)=>i(o), ()=>r(s));
                        });
                    }
                    constructor(n){
                        n && (this._subscribe = n);
                    }
                };
                return t2.create = (e)=>new t2(e), t2;
            })();
            function Dd(t) {
                var e;
                return null !== (e = null != t ? t : Tn.Promise) && void 0 !== e ? e : Promise;
            }
            const wD = Zi((t)=>function() {
                    t(this), this.name = "ObjectUnsubscribedError", this.message = "object unsubscribed";
                });
            let da = (()=>{
                let t = class t extends Ae {
                    lift(n) {
                        const r = new Ed(this, this);
                        return r.operator = n, r;
                    }
                    _throwIfClosed() {
                        if (this.closed) throw new wD;
                    }
                    next(n) {
                        Xi(()=>{
                            if (this._throwIfClosed(), !this.isStopped) {
                                this.currentObservers || (this.currentObservers = Array.from(this.observers));
                                for (const r of this.currentObservers)r.next(n);
                            }
                        });
                    }
                    error(n) {
                        Xi(()=>{
                            if (this._throwIfClosed(), !this.isStopped) {
                                this.hasError = this.isStopped = !0, this.thrownError = n;
                                const { observers: r  } = this;
                                for(; r.length;)r.shift().error(n);
                            }
                        });
                    }
                    complete() {
                        Xi(()=>{
                            if (this._throwIfClosed(), !this.isStopped) {
                                this.isStopped = !0;
                                const { observers: n  } = this;
                                for(; n.length;)n.shift().complete();
                            }
                        });
                    }
                    unsubscribe() {
                        this.isStopped = this.closed = !0, this.observers = this.currentObservers = null;
                    }
                    get observed() {
                        var n;
                        return (null === (n = this.observers) || void 0 === n ? void 0 : n.length) > 0;
                    }
                    _trySubscribe(n) {
                        return this._throwIfClosed(), super._trySubscribe(n);
                    }
                    _subscribe(n) {
                        return this._throwIfClosed(), this._checkFinalizedStatuses(n), this._innerSubscribe(n);
                    }
                    _innerSubscribe(n) {
                        const { hasError: r , isStopped: i , observers: s  } = this;
                        return r || i ? hd : (this.currentObservers = null, s.push(n), new xt(()=>{
                            this.currentObservers = null, Jr(s, n);
                        }));
                    }
                    _checkFinalizedStatuses(n) {
                        const { hasError: r , thrownError: i , isStopped: s  } = this;
                        r ? n.error(i) : s && n.complete();
                    }
                    asObservable() {
                        const n = new Ae;
                        return n.source = this, n;
                    }
                    constructor(){
                        super(), this.closed = !1, this.currentObservers = null, this.observers = [], this.isStopped = !1, this.hasError = !1, this.thrownError = null;
                    }
                };
                return t.create = (e, n)=>new Ed(e, n), t;
            })();
            let Ed = class Ed extends da {
                next(e) {
                    var n, r;
                    null === (r = null === (n = this.destination) || void 0 === n ? void 0 : n.next) || void 0 === r || r.call(n, e);
                }
                error(e) {
                    var n, r;
                    null === (r = null === (n = this.destination) || void 0 === n ? void 0 : n.error) || void 0 === r || r.call(n, e);
                }
                complete() {
                    var e, n;
                    null === (n = null === (e = this.destination) || void 0 === e ? void 0 : e.complete) || void 0 === n || n.call(e);
                }
                _subscribe(e) {
                    var n, r;
                    return null !== (r = null === (n = this.source) || void 0 === n ? void 0 : n.subscribe(e)) && void 0 !== r ? r : hd;
                }
                constructor(e, n){
                    super(), this.destination = e, this.source = n;
                }
            };
            function Nn(t4) {
                return (e)=>{
                    if (function bD(t) {
                        return re(null == t ? void 0 : t.lift);
                    }(e)) return e.lift(function(n) {
                        try {
                            return t4(n, this);
                        } catch (r) {
                            this.error(r);
                        }
                    });
                    throw new TypeError("Unable to lift unknown Observable type");
                };
            }
            function Fn(t, e, n, r, i) {
                return new MD(t, e, n, r, i);
            }
            let MD = class MD extends aa {
                unsubscribe() {
                    var e;
                    if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
                        const { closed: n  } = this;
                        super.unsubscribe(), !n && (null === (e = this.onFinalize) || void 0 === e || e.call(this));
                    }
                }
                constructor(e, n, r, i, s, o){
                    super(e), this.onFinalize = s, this.shouldUnsubscribe = o, this._next = n ? function(a) {
                        try {
                            n(a);
                        } catch (l) {
                            e.error(l);
                        }
                    } : super._next, this._error = i ? function(a) {
                        try {
                            i(a);
                        } catch (l) {
                            e.error(l);
                        } finally{
                            this.unsubscribe();
                        }
                    } : super._error, this._complete = r ? function() {
                        try {
                            r();
                        } catch (a) {
                            e.error(a);
                        } finally{
                            this.unsubscribe();
                        }
                    } : super._complete;
                }
            };
            function Pn(t, e) {
                return Nn((n, r)=>{
                    let i = 0;
                    n.subscribe(Fn(r, (s)=>{
                        r.next(t.call(e, s, i++));
                    }));
                });
            }
            function On(t) {
                return this instanceof On ? (this.v = t, this) : new On(t);
            }
            function TD(t, e, n) {
                if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
                var i, r = n.apply(t, e || []), s = [];
                return i = {}, o("next"), o("throw"), o("return"), i[Symbol.asyncIterator] = function() {
                    return this;
                }, i;
                function o(f) {
                    r[f] && (i[f] = function(h) {
                        return new Promise(function(p, g) {
                            s.push([
                                f,
                                h,
                                p,
                                g
                            ]) > 1 || a(f, h);
                        });
                    });
                }
                function a(f1, h) {
                    try {
                        !function l(f) {
                            f.value instanceof On ? Promise.resolve(f.value.v).then(u, c) : d(s[0][2], f);
                        }(r[f1](h));
                    } catch (p) {
                        d(s[0][3], p);
                    }
                }
                function u(f) {
                    a("next", f);
                }
                function c(f) {
                    a("throw", f);
                }
                function d(f, h) {
                    f(h), s.shift(), s.length && a(s[0][0], s[0][1]);
                }
            }
            function ID(t5) {
                if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
                var n2, e1 = t5[Symbol.asyncIterator];
                return e1 ? e1.call(t5) : (t5 = function bd(t) {
                    var e = "function" == typeof Symbol && Symbol.iterator, n = e && t[e], r = 0;
                    if (n) return n.call(t);
                    if (t && "number" == typeof t.length) return {
                        next: function() {
                            return t && r >= t.length && (t = void 0), {
                                value: t && t[r++],
                                done: !t
                            };
                        }
                    };
                    throw new TypeError(e ? "Object is not iterable." : "Symbol.iterator is not defined.");
                }(t5), n2 = {}, r1("next"), r1("throw"), r1("return"), n2[Symbol.asyncIterator] = function() {
                    return this;
                }, n2);
                function r1(s2) {
                    n2[s2] = t5[s2] && function(o1) {
                        return new Promise(function(a1, l1) {
                            !function i(s, o, a, l) {
                                Promise.resolve(l).then(function(u) {
                                    s({
                                        value: u,
                                        done: a
                                    });
                                }, o);
                            }(a1, l1, (o1 = t5[s2](o1)).done, o1.value);
                        });
                    };
                }
            }
            const Md = (t)=>t && "number" == typeof t.length && "function" != typeof t;
            function Sd(t) {
                return re(null == t ? void 0 : t.then);
            }
            function Ad(t) {
                return re(t[ca]);
            }
            function Td(t) {
                return Symbol.asyncIterator && re(null == t ? void 0 : t[Symbol.asyncIterator]);
            }
            function Id(t) {
                return new TypeError(`You provided ${null !== t && "object" == typeof t ? "an invalid object" : `'${t}'`} where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`);
            }
            const Nd = function FD() {
                return "function" == typeof Symbol && Symbol.iterator ? Symbol.iterator : "@@iterator";
            }();
            function Fd(t) {
                return re(null == t ? void 0 : t[Nd]);
            }
            function Pd(t) {
                return TD(this, arguments, function*() {
                    const n = t.getReader();
                    try {
                        for(;;){
                            const { value: r , done: i  } = yield On(n.read());
                            if (i) return yield On(void 0);
                            yield yield On(r);
                        }
                    } finally{
                        n.releaseLock();
                    }
                });
            }
            function Od(t) {
                return re(null == t ? void 0 : t.getReader);
            }
            function xn(t6) {
                if (t6 instanceof Ae) return t6;
                if (null != t6) {
                    if (Ad(t6)) return function PD(t) {
                        return new Ae((e)=>{
                            const n = t[ca]();
                            if (re(n.subscribe)) return n.subscribe(e);
                            throw new TypeError("Provided object does not correctly implement Symbol.observable");
                        });
                    }(t6);
                    if (Md(t6)) return function OD(t) {
                        return new Ae((e)=>{
                            for(let n = 0; n < t.length && !e.closed; n++)e.next(t[n]);
                            e.complete();
                        });
                    }(t6);
                    if (Sd(t6)) return function xD(t) {
                        return new Ae((e)=>{
                            t.then((n)=>{
                                e.closed || (e.next(n), e.complete());
                            }, (n)=>e.error(n)).then(null, md);
                        });
                    }(t6);
                    if (Td(t6)) return xd(t6);
                    if (Fd(t6)) return function RD(t) {
                        return new Ae((e)=>{
                            for (const n of t)if (e.next(n), e.closed) return;
                            e.complete();
                        });
                    }(t6);
                    if (Od(t6)) return function kD(t) {
                        return xd(Pd(t));
                    }(t6);
                }
                throw Id(t6);
            }
            function xd(t7) {
                return new Ae((e2)=>{
                    (function VD(t8, e3) {
                        var n3, r2, i, s3;
                        return function SD(t, e, n, r) {
                            return new (n || (n = Promise))(function(s4, o2) {
                                function a(c) {
                                    try {
                                        u(r.next(c));
                                    } catch (d) {
                                        o2(d);
                                    }
                                }
                                function l(c) {
                                    try {
                                        u(r.throw(c));
                                    } catch (d) {
                                        o2(d);
                                    }
                                }
                                function u(c) {
                                    c.done ? s4(c.value) : (function i(s) {
                                        return s instanceof n ? s : new n(function(o) {
                                            o(s);
                                        });
                                    })(c.value).then(a, l);
                                }
                                u((r = r.apply(t, e || [])).next());
                            });
                        }(this, void 0, void 0, function*() {
                            try {
                                for(n3 = ID(t8); !(r2 = yield n3.next()).done;)if (e3.next(r2.value), e3.closed) return;
                            } catch (o) {
                                i = {
                                    error: o
                                };
                            } finally{
                                try {
                                    r2 && !r2.done && (s3 = n3.return) && (yield s3.call(n3));
                                } finally{
                                    if (i) throw i.error;
                                }
                            }
                            e3.complete();
                        });
                    })(t7, e2).catch((n)=>e2.error(n));
                });
            }
            function ln(t, e, n, r = 0, i = !1) {
                const s = e.schedule(function() {
                    n(), i ? t.add(this.schedule(null, r)) : this.unsubscribe();
                }, r);
                if (t.add(s), !i) return s;
            }
            function ns(t9, e4, n4 = 1 / 0) {
                return re(e4) ? ns((r, i)=>Pn((s, o)=>e4(r, s, i, o))(xn(t9(r, i))), n4) : ("number" == typeof e4 && (n4 = e4), Nn((r3, i1)=>(function LD(t, e, n, r, i, s, o, a) {
                        const l = [];
                        let u = 0, c = 0, d = !1;
                        const f = ()=>{
                            d && !l.length && !u && e.complete();
                        }, h = (g)=>u < r ? p(g) : l.push(g), p = (g)=>{
                            s && e.next(g), u++;
                            let y = !1;
                            xn(n(g, c++)).subscribe(Fn(e, (_)=>{
                                null == i || i(_), s ? h(_) : e.next(_);
                            }, ()=>{
                                y = !0;
                            }, void 0, ()=>{
                                if (y) try {
                                    for(u--; l.length && u < r;){
                                        const _ = l.shift();
                                        o ? ln(e, o, ()=>p(_)) : p(_);
                                    }
                                    f();
                                } catch (_) {
                                    e.error(_);
                                }
                            }));
                        };
                        return t.subscribe(Fn(e, h, ()=>{
                            d = !0, f();
                        })), ()=>{
                            null == a || a();
                        };
                    })(r3, i1, t9, n4)));
            }
            const ha = new Ae((t)=>t.complete());
            function pa(t) {
                return t[t.length - 1];
            }
            function Rd(t10) {
                return function HD(t) {
                    return t && re(t.schedule);
                }(pa(t10)) ? t10.pop() : void 0;
            }
            function kd(t, e = 0) {
                return Nn((n, r)=>{
                    n.subscribe(Fn(r, (i)=>ln(r, t, ()=>r.next(i), e), ()=>ln(r, t, ()=>r.complete(), e), (i)=>ln(r, t, ()=>r.error(i), e)));
                });
            }
            function Vd(t, e = 0) {
                return Nn((n, r)=>{
                    r.add(t.schedule(()=>n.subscribe(r), e));
                });
            }
            function Ld(t, e) {
                if (!t) throw new Error("Iterable cannot be null");
                return new Ae((n)=>{
                    ln(n, e, ()=>{
                        const r = t[Symbol.asyncIterator]();
                        ln(n, e, ()=>{
                            r.next().then((i)=>{
                                i.done ? n.complete() : n.next(i.value);
                            });
                        }, 0, !0);
                    });
                });
            }
            function rs(t11, e5) {
                return e5 ? function KD(t12, e6) {
                    if (null != t12) {
                        if (Ad(t12)) return function GD(t, e) {
                            return xn(t).pipe(Vd(e), kd(e));
                        }(t12, e6);
                        if (Md(t12)) return function zD(t, e) {
                            return new Ae((n)=>{
                                let r = 0;
                                return e.schedule(function() {
                                    r === t.length ? n.complete() : (n.next(t[r++]), n.closed || this.schedule());
                                });
                            });
                        }(t12, e6);
                        if (Sd(t12)) return function qD(t, e) {
                            return xn(t).pipe(Vd(e), kd(e));
                        }(t12, e6);
                        if (Td(t12)) return Ld(t12, e6);
                        if (Fd(t12)) return function WD(t, e) {
                            return new Ae((n)=>{
                                let r;
                                return ln(n, e, ()=>{
                                    r = t[Nd](), ln(n, e, ()=>{
                                        let i, s;
                                        try {
                                            ({ value: i , done: s  } = r.next());
                                        } catch (o) {
                                            return void n.error(o);
                                        }
                                        s ? n.complete() : n.next(i);
                                    }, 0, !0);
                                }), ()=>re(null == r ? void 0 : r.return) && r.return();
                            });
                        }(t12, e6);
                        if (Od(t12)) return function QD(t, e) {
                            return Ld(Pd(t), e);
                        }(t12, e6);
                    }
                    throw Id(t12);
                }(t11, e5) : xn(t11);
            }
            function ga(t13, e7, ...n5) {
                return !0 === e7 ? (t13(), null) : !1 === e7 ? null : e7(...n5).pipe(function JD(t) {
                    return t <= 0 ? ()=>ha : Nn((e, n)=>{
                        let r = 0;
                        e.subscribe(Fn(n, (i)=>{
                            ++r <= t && (n.next(i), t <= r && n.complete());
                        }));
                    });
                }(1)).subscribe(()=>t13());
            }
            function J(t) {
                for(let e in t)if (t[e] === J) return e;
                throw Error("Could not find renamed property on target object.");
            }
            function ma(t, e) {
                for(const n in e)e.hasOwnProperty(n) && !t.hasOwnProperty(n) && (t[n] = e[n]);
            }
            function Q(t) {
                if ("string" == typeof t) return t;
                if (Array.isArray(t)) return "[" + t.map(Q).join(", ") + "]";
                if (null == t) return "" + t;
                if (t.overriddenName) return `${t.overriddenName}`;
                if (t.name) return `${t.name}`;
                const e = t.toString();
                if (null == e) return "" + e;
                const n = e.indexOf("\n");
                return -1 === n ? e : e.substring(0, n);
            }
            function ya(t, e) {
                return null == t || "" === t ? null === e ? "" : e : null == e || "" === e ? t : t + " " + e;
            }
            const XD = J({
                __forward_ref__: J
            });
            function ee(t) {
                return t.__forward_ref__ = ee, t.toString = function() {
                    return Q(this());
                }, t;
            }
            function V(t) {
                return Bd(t) ? t() : t;
            }
            function Bd(t) {
                return "function" == typeof t && t.hasOwnProperty(XD) && t.__forward_ref__ === ee;
            }
            let b = class b extends Error {
                constructor(e8, n){
                    super(function _a(t, e) {
                        return `NG0${Math.abs(t)}${e ? ": " + e : ""}`;
                    }(e8, n)), this.code = e8;
                }
            };
            function Se(t14) {
                return "function" == typeof t14 ? t14.name || t14.toString() : "object" == typeof t14 && null != t14 && "function" == typeof t14.type ? t14.type.name || t14.type.toString() : function P(t) {
                    return "string" == typeof t ? t : null == t ? "" : String(t);
                }(t14);
            }
            function is(t, e) {
                const n = e ? ` in ${e}` : "";
                throw new b(-201, `No provider for ${Se(t)} found${n}`);
            }
            function We(t15, e9) {
                null == t15 && function Y(t, e, n, r) {
                    throw new Error(`ASSERTION ERROR: ${t}` + (null == r ? "" : ` [Expected=> ${n} ${r} ${e} <=Actual]`));
                }(e9, t15, null, "!=");
            }
            function q(t) {
                return {
                    token: t.token,
                    providedIn: t.providedIn || null,
                    factory: t.factory,
                    value: void 0
                };
            }
            function Qe(t) {
                return {
                    providers: t.providers || [],
                    imports: t.imports || []
                };
            }
            function va(t) {
                return jd(t, ss) || jd(t, $d);
            }
            function jd(t, e) {
                return t.hasOwnProperty(e) ? t[e] : null;
            }
            function Hd(t) {
                return t && (t.hasOwnProperty(Da) || t.hasOwnProperty(oE)) ? t[Da] : null;
            }
            const ss = J({
                ɵprov: J
            }), Da = J({
                ɵinj: J
            }), $d = J({
                ngInjectableDef: J
            }), oE = J({
                ngInjectorDef: J
            });
            var k = (()=>((k = k || {})[k.Default = 0] = "Default", k[k.Host = 1] = "Host", k[k.Self = 2] = "Self", k[k.SkipSelf = 4] = "SkipSelf", k[k.Optional = 8] = "Optional", k))();
            let Ea;
            function un(t) {
                const e = Ea;
                return Ea = t, e;
            }
            function Ud(t, e, n) {
                const r = va(t);
                return r && "root" == r.providedIn ? void 0 === r.value ? r.value = r.factory() : r.value : n & k.Optional ? null : void 0 !== e ? e : void is(Q(t), "Injector");
            }
            function cn(t) {
                return ({
                    toString: t
                }).toString();
            }
            var Dt = (()=>((Dt = Dt || {})[Dt.OnPush = 0] = "OnPush", Dt[Dt.Default = 1] = "Default", Dt))(), Et = (()=>{
                return (t = Et || (Et = {}))[t.Emulated = 0] = "Emulated", t[t.None = 2] = "None", t[t.ShadowDom = 3] = "ShadowDom", Et;
                var t;
            })();
            const lE = "undefined" != typeof globalThis && globalThis, uE = "undefined" != typeof window && window, cE = "undefined" != typeof self && "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope && self, Z = lE || "undefined" != typeof global && global || uE || cE, tr = {}, X = [], os = J({
                ɵcmp: J
            }), Ca = J({
                ɵdir: J
            }), wa = J({
                ɵpipe: J
            }), Gd = J({
                ɵmod: J
            }), Kt = J({
                ɵfac: J
            }), Yr = J({
                __NG_ELEMENT_ID__: J
            });
            let dE = 0;
            function as(t) {
                return cn(()=>{
                    const n = {}, r = {
                        type: t.type,
                        providersResolver: null,
                        decls: t.decls,
                        vars: t.vars,
                        factory: null,
                        template: t.template || null,
                        consts: t.consts || null,
                        ngContentSelectors: t.ngContentSelectors,
                        hostBindings: t.hostBindings || null,
                        hostVars: t.hostVars || 0,
                        hostAttrs: t.hostAttrs || null,
                        contentQueries: t.contentQueries || null,
                        declaredInputs: n,
                        inputs: null,
                        outputs: null,
                        exportAs: t.exportAs || null,
                        onPush: t.changeDetection === Dt.OnPush,
                        directiveDefs: null,
                        pipeDefs: null,
                        selectors: t.selectors || X,
                        viewQuery: t.viewQuery || null,
                        features: t.features || null,
                        data: t.data || {},
                        encapsulation: t.encapsulation || Et.Emulated,
                        id: "c",
                        styles: t.styles || X,
                        _: null,
                        setInput: null,
                        schemas: t.schemas || null,
                        tView: null
                    }, i = t.directives, s = t.features, o = t.pipes;
                    return r.id += dE++, r.inputs = Qd(t.inputs, n), r.outputs = Qd(t.outputs), s && s.forEach((a)=>a(r)), r.directiveDefs = i ? ()=>("function" == typeof i ? i() : i).map(qd) : null, r.pipeDefs = o ? ()=>("function" == typeof o ? o() : o).map(zd) : null, r;
                });
            }
            function qd(t16) {
                return Te(t16) || function dn(t) {
                    return t[Ca] || null;
                }(t16);
            }
            function zd(t17) {
                return function Rn(t) {
                    return t[wa] || null;
                }(t17);
            }
            const Wd = {};
            function lt(t) {
                return cn(()=>{
                    const e = {
                        type: t.type,
                        bootstrap: t.bootstrap || X,
                        declarations: t.declarations || X,
                        imports: t.imports || X,
                        exports: t.exports || X,
                        transitiveCompileScopes: null,
                        schemas: t.schemas || null,
                        id: t.id || null
                    };
                    return null != t.id && (Wd[t.id] = t.type), e;
                });
            }
            function Qd(t, e) {
                if (null == t) return tr;
                const n = {};
                for(const r in t)if (t.hasOwnProperty(r)) {
                    let i = t[r], s = i;
                    Array.isArray(i) && (s = i[1], i = i[0]), n[i] = r, e && (e[i] = s);
                }
                return n;
            }
            const O = as;
            function Te(t) {
                return t[os] || null;
            }
            function ut(t, e) {
                const n = t[Gd] || null;
                if (!n && !0 === e) throw new Error(`Type ${Q(t)} does not have '\u0275mod' property.`);
                return n;
            }
            const L = 11;
            function Rt(t) {
                return Array.isArray(t) && "object" == typeof t[1];
            }
            function wt(t) {
                return Array.isArray(t) && !0 === t[1];
            }
            function Sa(t) {
                return 0 != (8 & t.flags);
            }
            function ds(t) {
                return 2 == (2 & t.flags);
            }
            function fs(t) {
                return 1 == (1 & t.flags);
            }
            function bt(t) {
                return null !== t.template;
            }
            function yE(t) {
                return 0 != (512 & t[2]);
            }
            function Bn(t, e) {
                return t.hasOwnProperty(Kt) ? t[Kt] : null;
            }
            let DE = class DE {
                isFirstChange() {
                    return this.firstChange;
                }
                constructor(e, n, r){
                    this.previousValue = e, this.currentValue = n, this.firstChange = r;
                }
            };
            function Zt() {
                return Zd;
            }
            function Zd(t) {
                return t.type.prototype.ngOnChanges && (t.setInput = CE), EE;
            }
            function EE() {
                const t = Yd(this), e = null == t ? void 0 : t.current;
                if (e) {
                    const n = t.previous;
                    if (n === tr) t.previous = e;
                    else for(let r in e)n[r] = e[r];
                    t.current = null, this.ngOnChanges(e);
                }
            }
            function CE(t18, e10, n, r) {
                const i = Yd(t18) || function wE(t, e) {
                    return t[Jd] = e;
                }(t18, {
                    previous: tr,
                    current: null
                }), s = i.current || (i.current = {}), o = i.previous, a = this.declaredInputs[n], l = o[a];
                s[a] = new DE(l && l.currentValue, e10, o === tr), t18[r] = e10;
            }
            Zt.ngInherit = !0;
            const Jd = "__ngSimpleChanges__";
            function Yd(t) {
                return t[Jd] || null;
            }
            let Fa;
            function ce(t) {
                return !!t.listen;
            }
            const Xd = {
                createRenderer: (t, e)=>(function Pa() {
                        return void 0 !== Fa ? Fa : "undefined" != typeof document ? document : void 0;
                    })()
            };
            function ge(t) {
                for(; Array.isArray(t);)t = t[0];
                return t;
            }
            function ft(t, e) {
                return ge(e[t.index]);
            }
            function Oa(t, e) {
                return t.data[e];
            }
            function Ze(t, e) {
                const n = e[t];
                return Rt(n) ? n : n[0];
            }
            function ef(t) {
                return 4 == (4 & t[2]);
            }
            function xa(t) {
                return 128 == (128 & t[2]);
            }
            function fn(t, e) {
                return null == e ? null : t[e];
            }
            function tf(t) {
                t[18] = 0;
            }
            function Ra(t, e) {
                t[5] += e;
                let n = t, r = t[3];
                for(; null !== r && (1 === e && 1 === n[5] || -1 === e && 0 === n[5]);)r[5] += e, n = r, r = r[3];
            }
            const x = {
                lFrame: df(null),
                bindingsEnabled: !0
            };
            function rf() {
                return x.bindingsEnabled;
            }
            function v() {
                return x.lFrame.lView;
            }
            function z() {
                return x.lFrame.tView;
            }
            function De() {
                let t = sf();
                for(; null !== t && 64 === t.type;)t = t.parent;
                return t;
            }
            function sf() {
                return x.lFrame.currentTNode;
            }
            function kt(t, e) {
                const n = x.lFrame;
                n.currentTNode = t, n.isParent = e;
            }
            function ka() {
                return x.lFrame.isParent;
            }
            function HE(t, e) {
                const n = x.lFrame;
                n.bindingIndex = n.bindingRootIndex = t, La(e);
            }
            function La(t) {
                x.lFrame.currentDirectiveIndex = t;
            }
            function lf() {
                return x.lFrame.currentQueryIndex;
            }
            function ja(t) {
                x.lFrame.currentQueryIndex = t;
            }
            function UE(t) {
                const e = t[1];
                return 2 === e.type ? e.declTNode : 1 === e.type ? t[6] : null;
            }
            function uf(t, e, n) {
                if (n & k.SkipSelf) {
                    let i = e, s = t;
                    for(; !(i = i.parent, null !== i || n & k.Host || (i = UE(s), null === i || (s = s[15], 10 & i.type))););
                    if (null === i) return !1;
                    e = i, t = s;
                }
                const r = x.lFrame = cf();
                return r.currentTNode = e, r.lView = t, !0;
            }
            function gs(t) {
                const e = cf(), n = t[1];
                x.lFrame = e, e.currentTNode = n.firstChild, e.lView = t, e.tView = n, e.contextLView = t, e.bindingIndex = n.bindingStartIndex, e.inI18n = !1;
            }
            function cf() {
                const t = x.lFrame, e = null === t ? null : t.child;
                return null === e ? df(t) : e;
            }
            function df(t) {
                const e = {
                    currentTNode: null,
                    isParent: !0,
                    lView: null,
                    tView: null,
                    selectedIndex: -1,
                    contextLView: null,
                    elementDepthCount: 0,
                    currentNamespace: null,
                    currentDirectiveIndex: -1,
                    bindingRootIndex: -1,
                    bindingIndex: -1,
                    currentQueryIndex: 0,
                    parent: t,
                    child: null,
                    inI18n: !1
                };
                return null !== t && (t.child = e), e;
            }
            function ff() {
                const t = x.lFrame;
                return x.lFrame = t.parent, t.currentTNode = null, t.lView = null, t;
            }
            const hf = ff;
            function ms() {
                const t = ff();
                t.isParent = !0, t.tView = null, t.selectedIndex = -1, t.contextLView = null, t.elementDepthCount = 0, t.currentDirectiveIndex = -1, t.currentNamespace = null, t.bindingRootIndex = -1, t.bindingIndex = -1, t.currentQueryIndex = 0;
            }
            function Ve() {
                return x.lFrame.selectedIndex;
            }
            function hn(t) {
                x.lFrame.selectedIndex = t;
            }
            function ys(t, e) {
                for(let n = e.directiveStart, r = e.directiveEnd; n < r; n++){
                    const s = t.data[n].type.prototype, { ngAfterContentInit: o , ngAfterContentChecked: a , ngAfterViewInit: l , ngAfterViewChecked: u , ngOnDestroy: c  } = s;
                    o && (t.contentHooks || (t.contentHooks = [])).push(-n, o), a && ((t.contentHooks || (t.contentHooks = [])).push(n, a), (t.contentCheckHooks || (t.contentCheckHooks = [])).push(n, a)), l && (t.viewHooks || (t.viewHooks = [])).push(-n, l), u && ((t.viewHooks || (t.viewHooks = [])).push(n, u), (t.viewCheckHooks || (t.viewCheckHooks = [])).push(n, u)), null != c && (t.destroyHooks || (t.destroyHooks = [])).push(n, c);
                }
            }
            function _s(t, e, n) {
                pf(t, e, 3, n);
            }
            function vs(t, e, n, r) {
                (3 & t[2]) === n && pf(t, e, n, r);
            }
            function Ha(t, e) {
                let n = t[2];
                (3 & n) === e && (n &= 2047, n += 1, t[2] = n);
            }
            function pf(t, e, n, r) {
                const s = null != r ? r : -1, o = e.length - 1;
                let a = 0;
                for(let l = void 0 !== r ? 65535 & t[18] : 0; l < o; l++)if ("number" == typeof e[l + 1]) {
                    if (a = e[l], null != r && a >= r) break;
                } else e[l] < 0 && (t[18] += 65536), (a < s || -1 == s) && (YE(t, n, e, l), t[18] = (4294901760 & t[18]) + l + 2), l++;
            }
            function YE(t, e, n, r) {
                const i = n[r] < 0, s = n[r + 1], a = t[i ? -n[r] : n[r]];
                if (i) {
                    if (t[2] >> 11 > 16 && (3 & t[2]) === e) {
                        t[2] += 2048;
                        try {
                            s.call(a);
                        } finally{}
                    }
                } else try {
                    s.call(a);
                } finally{}
            }
            let ri = class ri {
                constructor(e, n, r){
                    this.factory = e, this.resolving = !1, this.canSeeViewProviders = n, this.injectImpl = r;
                }
            };
            function Ds(t, e, n) {
                const r = ce(t);
                let i = 0;
                for(; i < n.length;){
                    const s = n[i];
                    if ("number" == typeof s) {
                        if (0 !== s) break;
                        i++;
                        const o = n[i++], a = n[i++], l = n[i++];
                        r ? t.setAttribute(e, a, l, o) : e.setAttributeNS(o, a, l);
                    } else {
                        const o = s, a = n[++i];
                        Ua(o) ? r && t.setProperty(e, o, a) : r ? t.setAttribute(e, o, a) : e.setAttribute(o, a), i++;
                    }
                }
                return i;
            }
            function gf(t) {
                return 3 === t || 4 === t || 6 === t;
            }
            function Ua(t) {
                return 64 === t.charCodeAt(0);
            }
            function Es(t, e) {
                if (null !== e && 0 !== e.length) if (null === t || 0 === t.length) t = e.slice();
                else {
                    let n = -1;
                    for(let r = 0; r < e.length; r++){
                        const i = e[r];
                        "number" == typeof i ? n = i : 0 === n || mf(t, n, i, null, -1 === n || 2 === n ? e[++r] : null);
                    }
                }
                return t;
            }
            function mf(t, e, n, r, i) {
                let s = 0, o = t.length;
                if (-1 === e) o = -1;
                else for(; s < t.length;){
                    const a = t[s++];
                    if ("number" == typeof a) {
                        if (a === e) {
                            o = -1;
                            break;
                        }
                        if (a > e) {
                            o = s - 1;
                            break;
                        }
                    }
                }
                for(; s < t.length;){
                    const a = t[s];
                    if ("number" == typeof a) break;
                    if (a === n) {
                        if (null === r) return void (null !== i && (t[s + 1] = i));
                        if (r === t[s + 1]) return void (t[s + 2] = i);
                    }
                    s++, null !== r && s++, null !== i && s++;
                }
                -1 !== o && (t.splice(o, 0, e), s = o + 1), t.splice(s++, 0, n), null !== r && t.splice(s++, 0, r), null !== i && t.splice(s++, 0, i);
            }
            function yf(t) {
                return -1 !== t;
            }
            function lr(t) {
                return 32767 & t;
            }
            function ur(t19, e) {
                let n = function rC(t) {
                    return t >> 16;
                }(t19), r = e;
                for(; n > 0;)r = r[15], n--;
                return r;
            }
            let Ga = !0;
            function Cs(t) {
                const e = Ga;
                return Ga = t, e;
            }
            let iC = 0;
            function si(t, e) {
                const n = za(t, e);
                if (-1 !== n) return n;
                const r = e[1];
                r.firstCreatePass && (t.injectorIndex = e.length, qa(r.data, t), qa(e, null), qa(r.blueprint, null));
                const i = ws(t, e), s = t.injectorIndex;
                if (yf(i)) {
                    const o = lr(i), a = ur(i, e), l = a[1].data;
                    for(let u = 0; u < 8; u++)e[s + u] = a[o + u] | l[o + u];
                }
                return e[s + 8] = i, s;
            }
            function qa(t, e) {
                t.push(0, 0, 0, 0, 0, 0, 0, 0, e);
            }
            function za(t, e) {
                return -1 === t.injectorIndex || t.parent && t.parent.injectorIndex === t.injectorIndex || null === e[t.injectorIndex + 8] ? -1 : t.injectorIndex;
            }
            function ws(t, e) {
                if (t.parent && -1 !== t.parent.injectorIndex) return t.parent.injectorIndex;
                let n = 0, r = null, i = e;
                for(; null !== i;){
                    const s = i[1], o = s.type;
                    if (r = 2 === o ? s.declTNode : 1 === o ? i[6] : null, null === r) return -1;
                    if (n++, i = i[15], -1 !== r.injectorIndex) return r.injectorIndex | n << 16;
                }
                return -1;
            }
            function bs(t20, e11, n6) {
                !function sC(t, e, n) {
                    let r;
                    "string" == typeof n ? r = n.charCodeAt(0) || 0 : n.hasOwnProperty(Yr) && (r = n[Yr]), null == r && (r = n[Yr] = iC++);
                    const i = 255 & r;
                    e.data[t + (i >> 5)] |= 1 << i;
                }(t20, e11, n6);
            }
            function Df(t, e, n) {
                if (n & k.Optional) return t;
                is(e, "NodeInjector");
            }
            function Ef(t, e, n, r) {
                if (n & k.Optional && void 0 === r && (r = null), 0 == (n & (k.Self | k.Host))) {
                    const i = t[9], s = un(void 0);
                    try {
                        return i ? i.get(e, r, n & k.Optional) : Ud(e, r, n & k.Optional);
                    } finally{
                        un(s);
                    }
                }
                return Df(r, e, n);
            }
            function Cf(t21, e12, n, r = k.Default, i) {
                if (null !== t21) {
                    const s = function uC(t) {
                        if ("string" == typeof t) return t.charCodeAt(0) || 0;
                        const e = t.hasOwnProperty(Yr) ? t[Yr] : void 0;
                        return "number" == typeof e ? e >= 0 ? 255 & e : aC : e;
                    }(n);
                    if ("function" == typeof s) {
                        if (!uf(e12, t21, r)) return r & k.Host ? Df(i, n, r) : Ef(e12, n, r, i);
                        try {
                            const o = s(r);
                            if (null != o || r & k.Optional) return o;
                            is(n);
                        } finally{
                            hf();
                        }
                    } else if ("number" == typeof s) {
                        let o = null, a = za(t21, e12), l = -1, u = r & k.Host ? e12[16][6] : null;
                        for((-1 === a || r & k.SkipSelf) && (l = -1 === a ? ws(t21, e12) : e12[a + 8], -1 !== l && Mf(r, !1) ? (o = e12[1], a = lr(l), e12 = ur(l, e12)) : a = -1); -1 !== a;){
                            const c = e12[1];
                            if (bf(s, a, c.data)) {
                                const d = lC(a, e12, n, o, r, u);
                                if (d !== wf) return d;
                            }
                            l = e12[a + 8], -1 !== l && Mf(r, e12[1].data[a + 8] === u) && bf(s, a, e12) ? (o = c, a = lr(l), e12 = ur(l, e12)) : a = -1;
                        }
                    }
                }
                return Ef(e12, n, r, i);
            }
            const wf = {};
            function aC() {
                return new cr(De(), v());
            }
            function lC(t, e, n, r, i, s) {
                const o = e[1], a = o.data[t + 8], c = Ms(a, o, n, null == r ? ds(a) && Ga : r != o && 0 != (3 & a.type), i & k.Host && s === a);
                return null !== c ? oi(e, o, c, a) : wf;
            }
            function Ms(t, e, n, r, i) {
                const s = t.providerIndexes, o = e.data, a = 1048575 & s, l = t.directiveStart, c = s >> 20, f = i ? a + c : t.directiveEnd;
                for(let h = r ? a : a + c; h < f; h++){
                    const p = o[h];
                    if (h < l && n === p || h >= l && p.type === n) return h;
                }
                if (i) {
                    const h = o[l];
                    if (h && bt(h) && h.type === n) return l;
                }
                return null;
            }
            function oi(t22, e13, n7, r4) {
                let i2 = t22[n7];
                const s5 = e13.data;
                if (function XE(t) {
                    return t instanceof ri;
                }(i2)) {
                    const o3 = i2;
                    o3.resolving && function eE(t, e) {
                        const n = e ? `. Dependency path: ${e.join(" > ")} > ${t}` : "";
                        throw new b(-200, `Circular dependency in DI detected for ${t}${n}`);
                    }(Se(s5[n7]));
                    const a = Cs(o3.canSeeViewProviders);
                    o3.resolving = !0;
                    const l = o3.injectImpl ? un(o3.injectImpl) : null;
                    uf(t22, r4, k.Default);
                    try {
                        i2 = t22[n7] = o3.factory(void 0, s5, t22, r4), e13.firstCreatePass && n7 >= r4.directiveStart && function JE(t, e, n) {
                            const { ngOnChanges: r , ngOnInit: i , ngDoCheck: s  } = e.type.prototype;
                            if (r) {
                                const o = Zd(e);
                                (n.preOrderHooks || (n.preOrderHooks = [])).push(t, o), (n.preOrderCheckHooks || (n.preOrderCheckHooks = [])).push(t, o);
                            }
                            i && (n.preOrderHooks || (n.preOrderHooks = [])).push(0 - t, i), s && ((n.preOrderHooks || (n.preOrderHooks = [])).push(t, s), (n.preOrderCheckHooks || (n.preOrderCheckHooks = [])).push(t, s));
                        }(n7, s5[n7], e13);
                    } finally{
                        null !== l && un(l), Cs(a), o3.resolving = !1, hf();
                    }
                }
                return i2;
            }
            function bf(t, e, n) {
                return !!(n[e + (t >> 5)] & 1 << t);
            }
            function Mf(t, e) {
                return !(t & k.Self || t & k.Host && e);
            }
            let cr = class cr {
                get(e, n, r) {
                    return Cf(this._tNode, this._lView, e, r, n);
                }
                constructor(e, n){
                    this._tNode = e, this._lView = n;
                }
            };
            function Wa(t) {
                return Bd(t) ? ()=>{
                    const e = Wa(V(t));
                    return e && e();
                } : Bn(t);
            }
            let $ = class $ {
                toString() {
                    return `InjectionToken ${this._desc}`;
                }
                constructor(e, n){
                    this._desc = e, this.ngMetadataName = "InjectionToken", this.ɵprov = void 0, "number" == typeof n ? this.__NG_ELEMENT_ID__ = n : void 0 !== n && (this.ɵprov = q({
                        token: this,
                        providedIn: n.providedIn || "root",
                        factory: n.factory
                    }));
                }
            };
            function ht(t, e) {
                void 0 === e && (e = t);
                for(let n = 0; n < t.length; n++){
                    let r = t[n];
                    Array.isArray(r) ? (e === t && (e = t.slice(0, n)), ht(r, e)) : e !== t && e.push(r);
                }
                return e;
            }
            function Vt(t, e) {
                t.forEach((n)=>Array.isArray(n) ? Vt(n, e) : e(n));
            }
            function Af(t, e, n) {
                e >= t.length ? t.push(n) : t.splice(e, 0, n);
            }
            function Ss(t, e) {
                return e >= t.length - 1 ? t.pop() : t.splice(e, 1)[0];
            }
            function Je(t23, e14, n8) {
                let r5 = gr(t23, e14);
                return r5 >= 0 ? t23[1 | r5] = n8 : (r5 = ~r5, function hC(t, e, n, r) {
                    let i = t.length;
                    if (i == e) t.push(n, r);
                    else if (1 === i) t.push(r, t[0]), t[0] = n;
                    else {
                        for(i--, t.push(t[i - 1], t[i]); i > e;)t[i] = t[i - 2], i--;
                        t[e] = n, t[e + 1] = r;
                    }
                }(t23, r5, e14, n8)), r5;
            }
            function Ja(t, e) {
                const n = gr(t, e);
                if (n >= 0) return t[1 | n];
            }
            function gr(t24, e15) {
                return function Nf(t, e, n) {
                    let r = 0, i = t.length >> n;
                    for(; i !== r;){
                        const s = r + (i - r >> 1), o = t[s << n];
                        if (e === o) return s << n;
                        o > e ? i = s : r = s + 1;
                    }
                    return ~(i << n);
                }(t24, e15, 1);
            }
            const ci = {}, Ts = "ngTempTokenPath", DC = /\n/gm, Pf = "__source", CC = J({
                provide: String,
                useValue: J
            });
            let di;
            function Of(t) {
                const e = di;
                return di = t, e;
            }
            function wC(t, e = k.Default) {
                if (void 0 === di) throw new b(203, "");
                return null === di ? Ud(t, void 0, e) : di.get(t, e & k.Optional ? null : void 0, e);
            }
            function F(t, e = k.Default) {
                return ((function aE() {
                    return Ea;
                })() || wC)(V(t), e);
            }
            const bC = F;
            function el(t) {
                const e = [];
                for(let n = 0; n < t.length; n++){
                    const r = V(t[n]);
                    if (Array.isArray(r)) {
                        if (0 === r.length) throw new b(900, "");
                        let i, s = k.Default;
                        for(let o = 0; o < r.length; o++){
                            const a = r[o], l = MC(a);
                            "number" == typeof l ? -1 === l ? i = a.token : s |= l : i = a;
                        }
                        e.push(F(i, s));
                    } else e.push(F(r));
                }
                return e;
            }
            function MC(t) {
                return t.__NG_DI_FLAG__;
            }
            const Xf = "__ngContext__";
            function Fe(t, e) {
                t[Xf] = e;
            }
            function cl(t25) {
                const e = function yi(t) {
                    return t[Xf] || null;
                }(t25);
                return e ? Array.isArray(e) ? e : e.lView : null;
            }
            function fl(t) {
                return t.ngOriginalError;
            }
            function yw(t, ...e) {
                t.error(...e);
            }
            let _i = class _i {
                handleError(e) {
                    const n = this._findOriginalError(e), r = function mw(t) {
                        return t && t.ngErrorLogger || yw;
                    }(e);
                    r(this._console, "ERROR", e), n && r(this._console, "ORIGINAL ERROR", n);
                }
                _findOriginalError(e) {
                    let n = e && fl(e);
                    for(; n && fl(n);)n = fl(n);
                    return n || null;
                }
                constructor(){
                    this._console = console;
                }
            };
            const Aw = (()=>("undefined" != typeof requestAnimationFrame && requestAnimationFrame || setTimeout).bind(Z))();
            function Bt(t) {
                return t instanceof Function ? t() : t;
            }
            var Ye = (()=>((Ye = Ye || {})[Ye.Important = 1] = "Important", Ye[Ye.DashCase = 2] = "DashCase", Ye))();
            function pl(t, e) {
                return undefined(t, e);
            }
            function vi(t) {
                const e = t[3];
                return wt(e) ? e[3] : e;
            }
            function gl(t) {
                return lh(t[13]);
            }
            function ml(t) {
                return lh(t[4]);
            }
            function lh(t) {
                for(; null !== t && !wt(t);)t = t[4];
                return t;
            }
            function vr(t26, e16, n9, r6, i3) {
                if (null != r6) {
                    let s6, o = !1;
                    wt(r6) ? s6 = r6 : Rt(r6) && (o = !0, r6 = r6[0]);
                    const a2 = ge(r6);
                    0 === t26 && null !== n9 ? null == i3 ? ph(e16, n9, a2) : jn(e16, n9, a2, i3 || null, !0) : 1 === t26 && null !== n9 ? jn(e16, n9, a2, i3 || null, !0) : 2 === t26 ? function Eh(t27, e17, n10) {
                        const r7 = ks(t27, e17);
                        r7 && function Hw(t, e, n, r) {
                            ce(t) ? t.removeChild(e, n, r) : e.removeChild(n);
                        }(t27, r7, e17, n10);
                    }(e16, a2, o) : 3 === t26 && e16.destroyNode(a2), null != s6 && function Gw(t, e, n, r, i) {
                        const s = n[7];
                        s !== ge(n) && vr(e, t, r, s, i);
                        for(let a = 10; a < n.length; a++){
                            const l = n[a];
                            Di(l[1], l, t, e, r, s);
                        }
                    }(e16, t26, s6, n9, i3);
                }
            }
            function _l(t28, e18, n) {
                if (ce(t28)) return t28.createElement(e18, n);
                {
                    const r = null !== n ? function AE(t) {
                        const e = t.toLowerCase();
                        return "svg" === e ? "http://www.w3.org/2000/svg" : "math" === e ? "http://www.w3.org/1998/MathML/" : null;
                    }(n) : null;
                    return null === r ? t28.createElement(e18) : t28.createElementNS(r, e18);
                }
            }
            function ch(t, e) {
                const n = t[9], r = n.indexOf(e), i = e[3];
                1024 & e[2] && (e[2] &= -1025, Ra(i, -1)), n.splice(r, 1);
            }
            function vl(t29, e19) {
                if (t29.length <= 10) return;
                const n = 10 + e19, r = t29[n];
                if (r) {
                    const i = r[17];
                    null !== i && i !== t29 && ch(i, r), e19 > 0 && (t29[n - 1][4] = r[4]);
                    const s = Ss(t29, 10 + e19);
                    !function Ow(t, e) {
                        Di(t, e, e[L], 2, null, null), e[0] = null, e[6] = null;
                    }(r[1], r);
                    const o = s[19];
                    null !== o && o.detachView(s[1]), r[3] = null, r[4] = null, r[2] &= -129;
                }
                return r;
            }
            function dh(t30, e20) {
                if (!(256 & e20[2])) {
                    const n11 = e20[L];
                    ce(n11) && n11.destroyNode && Di(t30, e20, n11, 3, null, null), function kw(t) {
                        let e = t[13];
                        if (!e) return Dl(t[1], t);
                        for(; e;){
                            let n = null;
                            if (Rt(e)) n = e[13];
                            else {
                                const r = e[10];
                                r && (n = r);
                            }
                            if (!n) {
                                for(; e && !e[4] && e !== t;)Rt(e) && Dl(e[1], e), e = e[3];
                                null === e && (e = t), Rt(e) && Dl(e[1], e), n = e && e[4];
                            }
                            e = n;
                        }
                    }(e20);
                }
            }
            function Dl(t31, e21) {
                if (!(256 & e21[2])) {
                    e21[2] &= -129, e21[2] |= 256, function jw(t, e) {
                        let n;
                        if (null != t && null != (n = t.destroyHooks)) for(let r = 0; r < n.length; r += 2){
                            const i = e[n[r]];
                            if (!(i instanceof ri)) {
                                const s = n[r + 1];
                                if (Array.isArray(s)) for(let o = 0; o < s.length; o += 2){
                                    const a = i[s[o]], l = s[o + 1];
                                    try {
                                        l.call(a);
                                    } finally{}
                                }
                                else try {
                                    s.call(i);
                                } finally{}
                            }
                        }
                    }(t31, e21), function Bw(t, e) {
                        const n = t.cleanup, r = e[7];
                        let i = -1;
                        if (null !== n) for(let s = 0; s < n.length - 1; s += 2)if ("string" == typeof n[s]) {
                            const o = n[s + 1], a = "function" == typeof o ? o(e) : ge(e[o]), l = r[i = n[s + 2]], u = n[s + 3];
                            "boolean" == typeof u ? a.removeEventListener(n[s], l, u) : u >= 0 ? r[i = u]() : r[i = -u].unsubscribe(), s += 2;
                        } else {
                            const o = r[i = n[s + 1]];
                            n[s].call(o);
                        }
                        if (null !== r) {
                            for(let s = i + 1; s < r.length; s++)r[s]();
                            e[7] = null;
                        }
                    }(t31, e21), 1 === e21[1].type && ce(e21[L]) && e21[L].destroy();
                    const n13 = e21[17];
                    if (null !== n13 && wt(e21[3])) {
                        n13 !== e21[3] && ch(n13, e21);
                        const r = e21[19];
                        null !== r && r.detachView(t31);
                    }
                }
            }
            function fh(t32, e22, n15) {
                return function hh(t, e, n) {
                    let r = e;
                    for(; null !== r && 40 & r.type;)r = (e = r).parent;
                    if (null === r) return n[0];
                    if (2 & r.flags) {
                        const i = t.data[r.directiveStart].encapsulation;
                        if (i === Et.None || i === Et.Emulated) return null;
                    }
                    return ft(r, n);
                }(t32, e22.parent, n15);
            }
            function jn(t, e, n, r, i) {
                ce(t) ? t.insertBefore(e, n, r, i) : e.insertBefore(n, r, i);
            }
            function ph(t, e, n) {
                ce(t) ? t.appendChild(e, n) : e.appendChild(n);
            }
            function gh(t, e, n, r, i) {
                null !== r ? jn(t, e, n, r, i) : ph(t, e, n);
            }
            function ks(t, e) {
                return ce(t) ? t.parentNode(e) : e.parentNode;
            }
            let _h = function yh(t, e, n) {
                return 40 & t.type ? ft(t, n) : null;
            };
            function Vs(t33, e23, n16, r) {
                const i = fh(t33, r, e23), s = e23[L], a = function mh(t, e, n) {
                    return _h(t, e, n);
                }(r.parent || e23[6], r, e23);
                if (null != i) if (Array.isArray(n16)) for(let l = 0; l < n16.length; l++)gh(s, i, n16[l], a, !1);
                else gh(s, i, n16, a, !1);
            }
            function Ls(t, e) {
                if (null !== e) {
                    const n = e.type;
                    if (3 & n) return ft(e, t);
                    if (4 & n) return Cl(-1, t[e.index]);
                    if (8 & n) {
                        const r = e.child;
                        if (null !== r) return Ls(t, r);
                        {
                            const i = t[e.index];
                            return wt(i) ? Cl(-1, i) : ge(i);
                        }
                    }
                    if (32 & n) return pl(e, t)() || ge(t[e.index]);
                    {
                        const r = Dh(t, e);
                        return null !== r ? Array.isArray(r) ? r[0] : Ls(vi(t[16]), r) : Ls(t, e.next);
                    }
                }
                return null;
            }
            function Dh(t, e) {
                return null !== e ? t[16][6].projection[e.projection] : null;
            }
            function Cl(t, e) {
                const n = 10 + t + 1;
                if (n < e.length) {
                    const r = e[n], i = r[1].firstChild;
                    if (null !== i) return Ls(r, i);
                }
                return e[7];
            }
            function wl(t, e, n, r, i, s, o) {
                for(; null != n;){
                    const a = r[n.index], l = n.type;
                    if (o && 0 === e && (a && Fe(ge(a), r), n.flags |= 4), 64 != (64 & n.flags)) if (8 & l) wl(t, e, n.child, r, i, s, !1), vr(e, t, i, a, s);
                    else if (32 & l) {
                        const u = pl(n, r);
                        let c;
                        for(; c = u();)vr(e, t, i, c, s);
                        vr(e, t, i, a, s);
                    } else 16 & l ? Ch(t, e, r, n, i, s) : vr(e, t, i, a, s);
                    n = o ? n.projectionNext : n.next;
                }
            }
            function Di(t, e, n, r, i, s) {
                wl(n, r, t.firstChild, e, i, s, !1);
            }
            function Ch(t, e, n, r, i, s) {
                const o = n[16], l = o[6].projection[r.projection];
                if (Array.isArray(l)) for(let u = 0; u < l.length; u++)vr(e, t, i, l[u], s);
                else wl(t, e, l, o[3], i, s, !0);
            }
            function wh(t, e, n) {
                ce(t) ? t.setAttribute(e, "style", n) : e.style.cssText = n;
            }
            function bl(t, e, n) {
                ce(t) ? "" === n ? t.removeAttribute(e, "class") : t.setAttribute(e, "class", n) : e.className = n;
            }
            function bh(t, e, n) {
                let r = t.length;
                for(;;){
                    const i = t.indexOf(e, n);
                    if (-1 === i) return i;
                    if (0 === i || t.charCodeAt(i - 1) <= 32) {
                        const s = e.length;
                        if (i + s === r || t.charCodeAt(i + s) <= 32) return i;
                    }
                    n = i + 1;
                }
            }
            const Mh = "ng-template";
            function zw(t, e, n) {
                let r = 0;
                for(; r < t.length;){
                    let i = t[r++];
                    if (n && "class" === i) {
                        if (i = t[r], -1 !== bh(i.toLowerCase(), e, 0)) return !0;
                    } else if (1 === i) {
                        for(; r < t.length && "string" == typeof (i = t[r++]);)if (i.toLowerCase() === e) return !0;
                        return !1;
                    }
                }
                return !1;
            }
            function Sh(t) {
                return 4 === t.type && t.value !== Mh;
            }
            function Ww(t, e, n) {
                return e === (4 !== t.type || n ? t.value : Mh);
            }
            function Qw(t34, e24, n) {
                let r = 4;
                const i = t34.attrs || [], s = function Jw(t) {
                    for(let e = 0; e < t.length; e++)if (gf(t[e])) return e;
                    return t.length;
                }(i);
                let o = !1;
                for(let a = 0; a < e24.length; a++){
                    const l = e24[a];
                    if ("number" != typeof l) {
                        if (!o) if (4 & r) {
                            if (r = 2 | 1 & r, "" !== l && !Ww(t34, l, n) || "" === l && 1 === e24.length) {
                                if (Mt(r)) return !1;
                                o = !0;
                            }
                        } else {
                            const u = 8 & r ? l : e24[++a];
                            if (8 & r && null !== t34.attrs) {
                                if (!zw(t34.attrs, u, n)) {
                                    if (Mt(r)) return !1;
                                    o = !0;
                                }
                                continue;
                            }
                            const d = Kw(8 & r ? "class" : l, i, Sh(t34), n);
                            if (-1 === d) {
                                if (Mt(r)) return !1;
                                o = !0;
                                continue;
                            }
                            if ("" !== u) {
                                let f;
                                f = d > s ? "" : i[d + 1].toLowerCase();
                                const h = 8 & r ? f : null;
                                if (h && -1 !== bh(h, u, 0) || 2 & r && u !== f) {
                                    if (Mt(r)) return !1;
                                    o = !0;
                                }
                            }
                        }
                    } else {
                        if (!o && !Mt(r) && !Mt(l)) return !1;
                        if (o && Mt(l)) continue;
                        o = !1, r = l | 1 & r;
                    }
                }
                return Mt(r) || o;
            }
            function Mt(t) {
                return 0 == (1 & t);
            }
            function Kw(t35, e25, n17, r8) {
                if (null === e25) return -1;
                let i = 0;
                if (r8 || !n17) {
                    let s = !1;
                    for(; i < e25.length;){
                        const o = e25[i];
                        if (o === t35) return i;
                        if (3 === o || 6 === o) s = !0;
                        else {
                            if (1 === o || 2 === o) {
                                let a = e25[++i];
                                for(; "string" == typeof a;)a = e25[++i];
                                continue;
                            }
                            if (4 === o) break;
                            if (0 === o) {
                                i += 4;
                                continue;
                            }
                        }
                        i += s ? 1 : 2;
                    }
                    return -1;
                }
                return function Yw(t, e) {
                    let n = t.indexOf(4);
                    if (n > -1) for(n++; n < t.length;){
                        const r = t[n];
                        if ("number" == typeof r) return -1;
                        if (r === e) return n;
                        n++;
                    }
                    return -1;
                }(e25, t35);
            }
            function Ah(t, e, n = !1) {
                for(let r = 0; r < e.length; r++)if (Qw(t, e[r], n)) return !0;
                return !1;
            }
            function Th(t, e) {
                return t ? ":not(" + e.trim() + ")" : e;
            }
            function eb(t) {
                let e = t[0], n = 1, r = 2, i = "", s = !1;
                for(; n < t.length;){
                    let o = t[n];
                    if ("string" == typeof o) if (2 & r) {
                        const a = t[++n];
                        i += "[" + o + (a.length > 0 ? '="' + a + '"' : "") + "]";
                    } else 8 & r ? i += "." + o : 4 & r && (i += " " + o);
                    else "" !== i && !Mt(o) && (e += Th(s, i), i = ""), r = o, s = s || !Mt(r);
                    n++;
                }
                return "" !== i && (e += Th(s, i)), e;
            }
            const R = {};
            function Nh(t, e, n, r) {
                if (!r) if (3 == (3 & e[2])) {
                    const s = t.preOrderCheckHooks;
                    null !== s && _s(e, s, n);
                } else {
                    const s = t.preOrderHooks;
                    null !== s && vs(e, s, 0, n);
                }
                hn(n);
            }
            function Bs(t, e) {
                return t << 17 | e << 2;
            }
            function St(t) {
                return t >> 17 & 32767;
            }
            function Ml(t) {
                return 2 | t;
            }
            function Xt(t) {
                return (131068 & t) >> 2;
            }
            function Sl(t, e) {
                return -131069 & t | e << 2;
            }
            function Al(t) {
                return 1 | t;
            }
            function Hh(t, e) {
                const n = t.contentQueries;
                if (null !== n) for(let r = 0; r < n.length; r += 2){
                    const i = n[r], s = n[r + 1];
                    if (-1 !== s) {
                        const o = t.data[s];
                        ja(i), o.contentQueries(2, e[s], s);
                    }
                }
            }
            function Ei(t, e, n, r, i, s, o, a, l, u) {
                const c = e.blueprint.slice();
                return c[0] = i, c[2] = 140 | r, tf(c), c[3] = c[15] = t, c[8] = n, c[10] = o || t && t[10], c[L] = a || t && t[L], c[12] = l || t && t[12] || null, c[9] = u || t && t[9] || null, c[6] = s, c[16] = 2 == e.type ? t[16] : c, c;
            }
            function Dr(t36, e26, n18, r9, i4) {
                let s8 = t36.data[e26];
                if (null === s8) s8 = function kl(t, e27, n19, r10, i5) {
                    const s9 = sf(), o = ka(), l = t.data[e27] = function _b(t, e, n, r, i, s) {
                        return {
                            type: n,
                            index: r,
                            insertBeforeIndex: null,
                            injectorIndex: e ? e.injectorIndex : -1,
                            directiveStart: -1,
                            directiveEnd: -1,
                            directiveStylingLast: -1,
                            propertyBindings: null,
                            flags: 0,
                            providerIndexes: 0,
                            value: i,
                            attrs: s,
                            mergedAttrs: null,
                            localNames: null,
                            initialInputs: void 0,
                            inputs: null,
                            outputs: null,
                            tViews: null,
                            next: null,
                            projectionNext: null,
                            child: null,
                            parent: e,
                            projection: null,
                            styles: null,
                            stylesWithoutHost: null,
                            residualStyles: void 0,
                            classes: null,
                            classesWithoutHost: null,
                            residualClasses: void 0,
                            classBindings: 0,
                            styleBindings: 0
                        };
                    }(0, o ? s9 : s9 && s9.parent, n19, e27, r10, i5);
                    return null === t.firstChild && (t.firstChild = l), null !== s9 && (o ? null == s9.child && null !== l.parent && (s9.child = l) : null === s9.next && (s9.next = l)), l;
                }(t36, e26, n18, r9, i4), function jE() {
                    return x.lFrame.inI18n;
                }() && (s8.flags |= 64);
                else if (64 & s8.type) {
                    s8.type = n18, s8.value = r9, s8.attrs = i4;
                    const o = function ni() {
                        const t = x.lFrame, e = t.currentTNode;
                        return t.isParent ? e : e.parent;
                    }();
                    s8.injectorIndex = null === o ? -1 : o.injectorIndex;
                }
                return kt(s8, !0), s8;
            }
            function Er(t, e, n, r) {
                if (0 === n) return -1;
                const i = e.length;
                for(let s = 0; s < n; s++)e.push(r), t.blueprint.push(r), t.data.push(null);
                return i;
            }
            function Ci(t37, e28, n20) {
                gs(e28);
                try {
                    const r = t37.viewQuery;
                    null !== r && ql(1, r, n20);
                    const i = t37.template;
                    null !== i && $h(t37, e28, i, 1, n20), t37.firstCreatePass && (t37.firstCreatePass = !1), t37.staticContentQueries && Hh(t37, e28), t37.staticViewQueries && ql(2, t37.viewQuery, n20);
                    const s = t37.components;
                    null !== s && function gb(t, e) {
                        for(let n = 0; n < e.length; n++)kb(t, e[n]);
                    }(e28, s);
                } catch (r) {
                    throw t37.firstCreatePass && (t37.incompleteFirstPass = !0, t37.firstCreatePass = !1), r;
                } finally{
                    e28[2] &= -5, ms();
                }
            }
            function Cr(t38, e29, n21, r11) {
                const i6 = e29[2];
                if (256 != (256 & i6)) {
                    gs(e29);
                    try {
                        tf(e29), function of(t) {
                            return x.lFrame.bindingIndex = t;
                        }(t38.bindingStartIndex), null !== n21 && $h(t38, e29, n21, 2, r11);
                        const o5 = 3 == (3 & i6);
                        if (o5) {
                            const u = t38.preOrderCheckHooks;
                            null !== u && _s(e29, u, null);
                        } else {
                            const u = t38.preOrderHooks;
                            null !== u && vs(e29, u, 0, null), Ha(e29, 0);
                        }
                        if (function xb(t) {
                            for(let e = gl(t); null !== e; e = ml(e)){
                                if (!e[2]) continue;
                                const n = e[9];
                                for(let r = 0; r < n.length; r++){
                                    const i = n[r], s = i[3];
                                    0 == (1024 & i[2]) && Ra(s, 1), i[2] |= 1024;
                                }
                            }
                        }(e29), function Ob(t) {
                            for(let e = gl(t); null !== e; e = ml(e))for(let n = 10; n < e.length; n++){
                                const r = e[n], i = r[1];
                                xa(r) && Cr(i, r, i.template, r[8]);
                            }
                        }(e29), null !== t38.contentQueries && Hh(t38, e29), o5) {
                            const u = t38.contentCheckHooks;
                            null !== u && _s(e29, u);
                        } else {
                            const u = t38.contentHooks;
                            null !== u && vs(e29, u, 1), Ha(e29, 1);
                        }
                        !function hb(t, e) {
                            const n = t.hostBindingOpCodes;
                            if (null !== n) try {
                                for(let r = 0; r < n.length; r++){
                                    const i = n[r];
                                    if (i < 0) hn(~i);
                                    else {
                                        const s = i, o = n[++r], a = n[++r];
                                        HE(o, s), a(2, e[s]);
                                    }
                                }
                            } finally{
                                hn(-1);
                            }
                        }(t38, e29);
                        const a4 = t38.components;
                        null !== a4 && function pb(t, e) {
                            for(let n = 0; n < e.length; n++)Rb(t, e[n]);
                        }(e29, a4);
                        const l = t38.viewQuery;
                        if (null !== l && ql(2, l, r11), o5) {
                            const u = t38.viewCheckHooks;
                            null !== u && _s(e29, u);
                        } else {
                            const u = t38.viewHooks;
                            null !== u && vs(e29, u, 2), Ha(e29, 2);
                        }
                        !0 === t38.firstUpdatePass && (t38.firstUpdatePass = !1), e29[2] &= -73, 1024 & e29[2] && (e29[2] &= -1025, Ra(e29[3], -1));
                    } finally{
                        ms();
                    }
                }
            }
            function mb(t, e, n, r) {
                const i = e[10], o = ef(e);
                try {
                    !o && i.begin && i.begin(), o && Ci(t, e, r), Cr(t, e, n, r);
                } finally{
                    !o && i.end && i.end();
                }
            }
            function $h(t, e, n, r, i) {
                const s = Ve(), o = 2 & r;
                try {
                    hn(-1), o && e.length > 20 && Nh(t, e, 20, !1), n(r, i);
                } finally{
                    hn(s);
                }
            }
            function Gh(t) {
                const e = t.tView;
                return null === e || e.incompleteFirstPass ? t.tView = $s(1, null, t.template, t.decls, t.vars, t.directiveDefs, t.pipeDefs, t.viewQuery, t.schemas, t.consts) : e;
            }
            function $s(t39, e30, n22, r12, i, s, o, a, l, u) {
                const c = 20 + r12, d = c + i, f = function yb(t, e) {
                    const n = [];
                    for(let r = 0; r < e; r++)n.push(r < t ? null : R);
                    return n;
                }(c, d), h = "function" == typeof u ? u() : u;
                return f[1] = {
                    type: t39,
                    blueprint: f,
                    template: n22,
                    queries: null,
                    viewQuery: a,
                    declTNode: e30,
                    data: f.slice().fill(null, c),
                    bindingStartIndex: c,
                    expandoStartIndex: d,
                    hostBindingOpCodes: null,
                    firstCreatePass: !0,
                    firstUpdatePass: !0,
                    staticViewQueries: !1,
                    staticContentQueries: !1,
                    preOrderHooks: null,
                    preOrderCheckHooks: null,
                    contentHooks: null,
                    contentCheckHooks: null,
                    viewHooks: null,
                    viewCheckHooks: null,
                    destroyHooks: null,
                    cleanup: null,
                    contentQueries: null,
                    components: null,
                    directiveRegistry: "function" == typeof s ? s() : s,
                    pipeRegistry: "function" == typeof o ? o() : o,
                    firstChild: null,
                    schemas: l,
                    consts: h,
                    incompleteFirstPass: !1
                };
            }
            function Wh(t, e, n, r) {
                const i = rp(e);
                null === n ? i.push(r) : (i.push(n), t.firstCreatePass && ip(t).push(r, i.length - 1));
            }
            function Qh(t, e, n) {
                for(let r in t)if (t.hasOwnProperty(r)) {
                    const i = t[r];
                    (n = null === n ? {} : n).hasOwnProperty(r) ? n[r].push(e, i) : n[r] = [
                        e,
                        i
                    ];
                }
                return n;
            }
            function Zh(t40, e31, n23, r, i, s) {
                const o = s.hostBindings;
                if (o) {
                    let a = t40.hostBindingOpCodes;
                    null === a && (a = t40.hostBindingOpCodes = []);
                    const l = ~e31.index;
                    (function bb(t) {
                        let e = t.length;
                        for(; e > 0;){
                            const n = t[--e];
                            if ("number" == typeof n && n < 0) return n;
                        }
                        return 0;
                    })(a) != l && a.push(l), a.push(r, i, o);
                }
            }
            function Jh(t, e) {
                null !== t.hostBindings && t.hostBindings(1, e);
            }
            function Yh(t, e) {
                e.flags |= 2, (t.components || (t.components = [])).push(e.index);
            }
            function Ib(t, e, n) {
                if (n) {
                    if (e.exportAs) for(let r = 0; r < e.exportAs.length; r++)n[e.exportAs[r]] = t;
                    bt(e) && (n[""] = t);
                }
            }
            function Xh(t, e, n) {
                t.flags |= 1, t.directiveStart = e, t.directiveEnd = e + n, t.providerIndexes = e;
            }
            function ep(t, e, n, r, i) {
                t.data[r] = i;
                const s = i.factory || (i.factory = Bn(i.type)), o = new ri(s, bt(i), null);
                t.blueprint[r] = o, n[r] = o, Zh(t, e, 0, r, Er(t, n, i.hostVars, R), i);
            }
            function Nb(t, e, n) {
                const r = ft(e, t), i = Gh(n), s = t[10], o = Us(t, Ei(t, i, null, n.onPush ? 64 : 16, r, e, s, s.createRenderer(r, n), null, null));
                t[e.index] = o;
            }
            function Fb(t, e, n, r, i, s) {
                const o = s[e];
                if (null !== o) {
                    const a = r.setInput;
                    for(let l = 0; l < o.length;){
                        const u = o[l++], c = o[l++], d = o[l++];
                        null !== a ? r.setInput(n, d, u, c) : n[c] = d;
                    }
                }
            }
            function Pb(t, e) {
                let n = null, r = 0;
                for(; r < e.length;){
                    const i = e[r];
                    if (0 !== i) if (5 !== i) {
                        if ("number" == typeof i) break;
                        t.hasOwnProperty(i) && (null === n && (n = []), n.push(i, t[i], e[r + 1])), r += 2;
                    } else r += 2;
                    else r += 4;
                }
                return n;
            }
            function Rb(t, e) {
                const n = Ze(e, t);
                if (xa(n)) {
                    const r = n[1];
                    80 & n[2] ? Cr(r, n, r.template, n[8]) : n[5] > 0 && Hl(n);
                }
            }
            function Hl(t) {
                for(let r = gl(t); null !== r; r = ml(r))for(let i = 10; i < r.length; i++){
                    const s = r[i];
                    if (1024 & s[2]) {
                        const o = s[1];
                        Cr(o, s, o.template, s[8]);
                    } else s[5] > 0 && Hl(s);
                }
                const n = t[1].components;
                if (null !== n) for(let r13 = 0; r13 < n.length; r13++){
                    const i = Ze(n[r13], t);
                    xa(i) && i[5] > 0 && Hl(i);
                }
            }
            function kb(t41, e32) {
                const n24 = Ze(e32, t41), r = n24[1];
                (function Vb(t, e) {
                    for(let n = e.length; n < t.blueprint.length; n++)e.push(t.blueprint[n]);
                })(r, n24), Ci(r, n24, n24[8]);
            }
            function Us(t, e) {
                return t[13] ? t[14][4] = e : t[13] = e, t[14] = e, e;
            }
            function $l(t) {
                for(; t;){
                    t[2] |= 64;
                    const e = vi(t);
                    if (yE(t) && !e) return t;
                    t = e;
                }
                return null;
            }
            function np(t42) {
                !function Ul(t) {
                    for(let e = 0; e < t.components.length; e++){
                        const n = t.components[e], r = cl(n), i = r[1];
                        mb(i, r, i.template, n);
                    }
                }(t42[8]);
            }
            function ql(t, e, n) {
                ja(0), e(t, n);
            }
            const Bb = (()=>Promise.resolve(null))();
            function rp(t) {
                return t[7] || (t[7] = []);
            }
            function ip(t) {
                return t.cleanup || (t.cleanup = []);
            }
            function op(t, e) {
                const n = t[9], r = n ? n.get(_i, null) : null;
                r && r.handleError(e);
            }
            function ap(t, e, n, r, i) {
                for(let s = 0; s < n.length;){
                    const o = n[s++], a = n[s++], l = e[o], u = t.data[o];
                    null !== u.setInput ? u.setInput(l, i, r, a) : l[a] = i;
                }
            }
            function Gs(t, e, n) {
                let r = n ? t.styles : null, i = n ? t.classes : null, s = 0;
                if (null !== e) for(let o = 0; o < e.length; o++){
                    const a = e[o];
                    "number" == typeof a ? s = a : 1 == s ? i = ya(i, a) : 2 == s && (r = ya(r, a + ": " + e[++o] + ";"));
                }
                n ? t.styles = r : t.stylesWithoutHost = r, n ? t.classes = i : t.classesWithoutHost = i;
            }
            const zl = new $("INJECTOR", -1);
            let lp = class lp {
                get(e, n = ci) {
                    if (n === ci) {
                        const r = new Error(`NullInjectorError: No provider for ${Q(e)}!`);
                        throw r.name = "NullInjectorError", r;
                    }
                    return n;
                }
            };
            const Wl = new $("Set Injector scope."), wi = {}, $b = {};
            let Ql;
            function up() {
                return void 0 === Ql && (Ql = new lp), Ql;
            }
            function cp(t, e = null, n = null, r) {
                const i = dp(t, e, n, r);
                return i._resolveInjectorDefTypes(), i;
            }
            function dp(t, e = null, n = null, r) {
                return new Ub(t, n, e || up(), r);
            }
            let Ub = class Ub {
                get destroyed() {
                    return this._destroyed;
                }
                destroy() {
                    this.assertNotDestroyed(), this._destroyed = !0;
                    try {
                        this.onDestroy.forEach((e)=>e.ngOnDestroy());
                    } finally{
                        this.records.clear(), this.onDestroy.clear(), this.injectorDefTypes.clear();
                    }
                }
                get(e33, n25 = ci, r14 = k.Default) {
                    this.assertNotDestroyed();
                    const i7 = Of(this), s10 = un(void 0);
                    try {
                        if (!(r14 & k.SkipSelf)) {
                            let a = this.records.get(e33);
                            if (void 0 === a) {
                                const l = function Jb(t) {
                                    return "function" == typeof t || "object" == typeof t && t instanceof $;
                                }(e33) && va(e33);
                                a = l && this.injectableDefInScope(l) ? wr(Kl(e33), wi) : null, this.records.set(e33, a);
                            }
                            if (null != a) return this.hydrate(e33, a);
                        }
                        return (r14 & k.Self ? up() : this.parent).get(e33, n25 = r14 & k.Optional && n25 === ci ? null : n25);
                    } catch (o8) {
                        if ("NullInjectorError" === o8.name) {
                            if ((o8[Ts] = o8[Ts] || []).unshift(Q(e33)), i7) throw o8;
                            return function SC(t43, e34, n26, r15) {
                                const i8 = t43[Ts];
                                throw e34[Pf] && i8.unshift(e34[Pf]), t43.message = function AC(t, e, n, r = null) {
                                    t = t && "\n" === t.charAt(0) && "\u0275" == t.charAt(1) ? t.substr(2) : t;
                                    let i = Q(e);
                                    if (Array.isArray(e)) i = e.map(Q).join(" -> ");
                                    else if ("object" == typeof e) {
                                        let s = [];
                                        for(let o in e)if (e.hasOwnProperty(o)) {
                                            let a = e[o];
                                            s.push(o + ":" + ("string" == typeof a ? JSON.stringify(a) : Q(a)));
                                        }
                                        i = `{${s.join(", ")}}`;
                                    }
                                    return `${n}${r ? "(" + r + ")" : ""}[${i}]: ${t.replace(DC, "\n  ")}`;
                                }("\n" + t43.message, i8, n26, r15), t43.ngTokenPath = i8, t43[Ts] = null, t43;
                            }(o8, e33, "R3InjectorError", this.source);
                        }
                        throw o8;
                    } finally{
                        un(s10), Of(i7);
                    }
                }
                _resolveInjectorDefTypes() {
                    this.injectorDefTypes.forEach((e)=>this.get(e));
                }
                toString() {
                    const e = [];
                    return this.records.forEach((r, i)=>e.push(Q(i))), `R3Injector[${e.join(", ")}]`;
                }
                assertNotDestroyed() {
                    if (this._destroyed) throw new b(205, !1);
                }
                processInjectorType(e, n, r) {
                    if (!(e = V(e))) return !1;
                    let i = Hd(e);
                    const s = null == i && e.ngModule || void 0, o = void 0 === s ? e : s, a = -1 !== r.indexOf(o);
                    if (void 0 !== s && (i = Hd(s)), null == i) return !1;
                    if (null != i.imports && !a) {
                        let c;
                        r.push(o);
                        try {
                            Vt(i.imports, (d)=>{
                                this.processInjectorType(d, n, r) && (void 0 === c && (c = []), c.push(d));
                            });
                        } finally{}
                        if (void 0 !== c) for(let d1 = 0; d1 < c.length; d1++){
                            const { ngModule: f , providers: h  } = c[d1];
                            Vt(h, (p)=>this.processProvider(p, f, h || X));
                        }
                    }
                    this.injectorDefTypes.add(o);
                    const l = Bn(o) || (()=>new o);
                    this.records.set(o, wr(l, wi));
                    const u = i.providers;
                    if (null != u && !a) {
                        const c = e;
                        Vt(u, (d)=>this.processProvider(d, c, u));
                    }
                    return void 0 !== s && void 0 !== e.providers;
                }
                processProvider(e, n, r) {
                    let i = br(e = V(e)) ? e : V(e && e.provide);
                    const s = function qb(t, e, n) {
                        return hp(t) ? wr(void 0, t.useValue) : wr(fp(t), wi);
                    }(e);
                    if (br(e) || !0 !== e.multi) this.records.get(i);
                    else {
                        let o = this.records.get(i);
                        o || (o = wr(void 0, wi, !0), o.factory = ()=>el(o.multi), this.records.set(i, o)), i = e, o.multi.push(e);
                    }
                    this.records.set(i, s);
                }
                hydrate(e, n) {
                    return n.value === wi && (n.value = $b, n.value = n.factory()), "object" == typeof n.value && n.value && function Zb(t) {
                        return null !== t && "object" == typeof t && "function" == typeof t.ngOnDestroy;
                    }(n.value) && this.onDestroy.add(n.value), n.value;
                }
                injectableDefInScope(e) {
                    if (!e.providedIn) return !1;
                    const n = V(e.providedIn);
                    return "string" == typeof n ? "any" === n || n === this.scope : this.injectorDefTypes.has(n);
                }
                constructor(e, n, r, i = null){
                    this.parent = r, this.records = new Map, this.injectorDefTypes = new Set, this.onDestroy = new Set, this._destroyed = !1;
                    const s = [];
                    n && Vt(n, (a)=>this.processProvider(a, e, n)), Vt([
                        e
                    ], (a)=>this.processInjectorType(a, [], s)), this.records.set(zl, wr(void 0, this));
                    const o = this.records.get(Wl);
                    this.scope = null != o ? o.value : null, this.source = i || ("object" == typeof e ? null : Q(e));
                }
            };
            function Kl(t44) {
                const e35 = va(t44), n27 = null !== e35 ? e35.factory : Bn(t44);
                if (null !== n27) return n27;
                if (t44 instanceof $) throw new b(204, !1);
                if (t44 instanceof Function) return function Gb(t45) {
                    const e36 = t45.length;
                    if (e36 > 0) throw function ui(t, e) {
                        const n = [];
                        for(let r = 0; r < t; r++)n.push(e);
                        return n;
                    }(e36, "?"), new b(204, !1);
                    const n28 = function iE(t46) {
                        const e37 = t46 && (t46[ss] || t46[$d]);
                        if (e37) {
                            const n = function sE(t) {
                                if (t.hasOwnProperty("name")) return t.name;
                                const e = ("" + t).match(/^function\s*([^\s(]+)/);
                                return null === e ? "" : e[1];
                            }(t46);
                            return console.warn(`DEPRECATED: DI is instantiating a token "${n}" that inherits its @Injectable decorator but does not provide one itself.\nThis will become an error in a future version of Angular. Please add @Injectable() to the "${n}" class.`), e37;
                        }
                        return null;
                    }(t45);
                    return null !== n28 ? ()=>n28.factory(t45) : ()=>new t45;
                }(t44);
                throw new b(204, !1);
            }
            function fp(t47, e, n) {
                let r;
                if (br(t47)) {
                    const i = V(t47);
                    return Bn(i) || Kl(i);
                }
                if (hp(t47)) r = ()=>V(t47.useValue);
                else if (function Wb(t) {
                    return !(!t || !t.useFactory);
                }(t47)) r = ()=>t47.useFactory(...el(t47.deps || []));
                else if (function zb(t) {
                    return !(!t || !t.useExisting);
                }(t47)) r = ()=>F(V(t47.useExisting));
                else {
                    const i = V(t47 && (t47.useClass || t47.provide));
                    if (!function Kb(t) {
                        return !!t.deps;
                    }(t47)) return Bn(i) || Kl(i);
                    r = ()=>new i(...el(t47.deps));
                }
                return r;
            }
            function wr(t, e, n = !1) {
                return {
                    factory: t,
                    value: e,
                    multi: n ? [] : void 0
                };
            }
            function hp(t) {
                return null !== t && "object" == typeof t && CC in t;
            }
            function br(t) {
                return "function" == typeof t;
            }
            let pt = (()=>{
                let t = class t {
                    static create(n, r) {
                        var i;
                        if (Array.isArray(n)) return cp({
                            name: ""
                        }, r, n, "");
                        {
                            const s = null !== (i = n.name) && void 0 !== i ? i : "";
                            return cp({
                                name: s
                            }, n.parent, n.providers, s);
                        }
                    }
                };
                return t.THROW_IF_NOT_FOUND = ci, t.NULL = new lp, t.ɵprov = q({
                    token: t,
                    providedIn: "any",
                    factory: ()=>F(zl)
                }), t.__NG_ELEMENT_ID__ = -1, t;
            })();
            function o0(t, e) {
                ys(cl(t)[1], De());
            }
            function K(t48) {
                let e38 = function Mp(t) {
                    return Object.getPrototypeOf(t.prototype).constructor;
                }(t48.type), n29 = !0;
                const r16 = [
                    t48
                ];
                for(; e38;){
                    let i;
                    if (bt(t48)) i = e38.ɵcmp || e38.ɵdir;
                    else {
                        if (e38.ɵcmp) throw new b(903, "");
                        i = e38.ɵdir;
                    }
                    if (i) {
                        if (n29) {
                            r16.push(i);
                            const o = t48;
                            o.inputs = Yl(t48.inputs), o.declaredInputs = Yl(t48.declaredInputs), o.outputs = Yl(t48.outputs);
                            const a = i.hostBindings;
                            a && c0(t48, a);
                            const l = i.viewQuery, u = i.contentQueries;
                            if (l && l0(t48, l), u && u0(t48, u), ma(t48.inputs, i.inputs), ma(t48.declaredInputs, i.declaredInputs), ma(t48.outputs, i.outputs), bt(i) && i.data.animation) {
                                const c = t48.data;
                                c.animation = (c.animation || []).concat(i.data.animation);
                            }
                        }
                        const s = i.features;
                        if (s) for(let o = 0; o < s.length; o++){
                            const a = s[o];
                            a && a.ngInherit && a(t48), a === K && (n29 = !1);
                        }
                    }
                    e38 = Object.getPrototypeOf(e38);
                }
                !function a0(t) {
                    let e = 0, n = null;
                    for(let r = t.length - 1; r >= 0; r--){
                        const i = t[r];
                        i.hostVars = e += i.hostVars, i.hostAttrs = Es(i.hostAttrs, n = Es(n, i.hostAttrs));
                    }
                }(r16);
            }
            function Yl(t) {
                return t === tr ? {} : t === X ? [] : t;
            }
            function l0(t, e) {
                const n = t.viewQuery;
                t.viewQuery = n ? (r, i)=>{
                    e(r, i), n(r, i);
                } : e;
            }
            function u0(t, e) {
                const n = t.contentQueries;
                t.contentQueries = n ? (r, i, s)=>{
                    e(r, i, s), n(r, i, s);
                } : e;
            }
            function c0(t, e) {
                const n = t.hostBindings;
                t.hostBindings = n ? (r, i)=>{
                    e(r, i), n(r, i);
                } : e;
            }
            let qs = null;
            function Mr() {
                if (!qs) {
                    const t = Z.Symbol;
                    if (t && t.iterator) qs = t.iterator;
                    else {
                        const e = Object.getOwnPropertyNames(Map.prototype);
                        for(let n = 0; n < e.length; ++n){
                            const r = e[n];
                            "entries" !== r && "size" !== r && Map.prototype[r] === Map.prototype.entries && (qs = r);
                        }
                    }
                }
                return qs;
            }
            function Pe(t, e, n) {
                return !Object.is(t[e], n) && (t[e] = n, !0);
            }
            function D(t, e = k.Default) {
                const n = v();
                return null === n ? F(t, e) : Cf(De(), n, V(t), e);
            }
            function Qs(t49, e39, n30) {
                const r17 = v();
                return Pe(r17, function ar() {
                    return x.lFrame.bindingIndex++;
                }(), e39) && function Xe(t50, e40, n31, r, i, s, o, a) {
                    const l = ft(e40, n31);
                    let c, u = e40.inputs;
                    !a && null != u && (c = u[r]) ? (ap(t50, n31, c, r, i), ds(e40) && function Eb(t, e) {
                        const n = Ze(e, t);
                        16 & n[2] || (n[2] |= 64);
                    }(n31, e40.index)) : 3 & e40.type && (r = function Db(t) {
                        return "class" === t ? "className" : "for" === t ? "htmlFor" : "formaction" === t ? "formAction" : "innerHtml" === t ? "innerHTML" : "readonly" === t ? "readOnly" : "tabindex" === t ? "tabIndex" : t;
                    }(r), i = null != o ? o(i, e40.value || "", r) : i, ce(s) ? s.setProperty(l, r, i) : Ua(r) || (l.setProperty ? l.setProperty(r, i) : l[r] = i));
                }(z(), function de() {
                    const t = x.lFrame;
                    return Oa(t.tView, t.selectedIndex);
                }(), r17, t49, e39, r17[L], n30, !1), Qs;
            }
            function iu(t, e, n, r, i) {
                const o = i ? "class" : "style";
                ap(t, n, e.inputs[o], o, r);
            }
            function kr(t51, e41, n32, r18) {
                const i9 = v(), s11 = z(), o9 = 20 + t51, a7 = i9[L], l2 = i9[o9] = _l(a7, e41, function ZE() {
                    return x.lFrame.currentNamespace;
                }()), u1 = s11.firstCreatePass ? function H0(t52, e42, n33, r19, i10, s12, o10) {
                    const a8 = e42.consts, u2 = Dr(e42, t52, 2, i10, fn(a8, s12));
                    return function Bl(t53, e43, n34, r20) {
                        let i11 = !1;
                        if (rf()) {
                            const s13 = function Ab(t, e, n) {
                                const r = t.directiveRegistry;
                                let i = null;
                                if (r) for(let s = 0; s < r.length; s++){
                                    const o = r[s];
                                    Ah(n, o.selectors, !1) && (i || (i = []), bs(si(n, e), t, o.type), bt(o) ? (Yh(t, n), i.unshift(o)) : i.push(o));
                                }
                                return i;
                            }(t53, e43, n34), o11 = null === r20 ? null : {
                                "": -1
                            };
                            if (null !== s13) {
                                i11 = !0, Xh(n34, t53.data.length, s13.length);
                                for(let c3 = 0; c3 < s13.length; c3++){
                                    const d = s13[c3];
                                    d.providersResolver && d.providersResolver(d);
                                }
                                let a9 = !1, l3 = !1, u3 = Er(t53, e43, s13.length, null);
                                for(let c1 = 0; c1 < s13.length; c1++){
                                    const d = s13[c1];
                                    n34.mergedAttrs = Es(n34.mergedAttrs, d.hostAttrs), ep(t53, n34, e43, u3, d), Ib(u3, d, o11), null !== d.contentQueries && (n34.flags |= 8), (null !== d.hostBindings || null !== d.hostAttrs || 0 !== d.hostVars) && (n34.flags |= 128);
                                    const f = d.type.prototype;
                                    !a9 && (f.ngOnChanges || f.ngOnInit || f.ngDoCheck) && ((t53.preOrderHooks || (t53.preOrderHooks = [])).push(n34.index), a9 = !0), !l3 && (f.ngOnChanges || f.ngDoCheck) && ((t53.preOrderCheckHooks || (t53.preOrderCheckHooks = [])).push(n34.index), l3 = !0), u3++;
                                }
                                !function vb(t, e) {
                                    const r = e.directiveEnd, i = t.data, s = e.attrs, o = [];
                                    let a = null, l = null;
                                    for(let u = e.directiveStart; u < r; u++){
                                        const c = i[u], d = c.inputs, f = null === s || Sh(e) ? null : Pb(d, s);
                                        o.push(f), a = Qh(d, u, a), l = Qh(c.outputs, u, l);
                                    }
                                    null !== a && (a.hasOwnProperty("class") && (e.flags |= 16), a.hasOwnProperty("style") && (e.flags |= 32)), e.initialInputs = o, e.inputs = a, e.outputs = l;
                                }(t53, n34);
                            }
                            o11 && function Tb(t, e, n) {
                                if (e) {
                                    const r = t.localNames = [];
                                    for(let i = 0; i < e.length; i += 2){
                                        const s = n[e[i + 1]];
                                        if (null == s) throw new b(-301, !1);
                                        r.push(e[i], s);
                                    }
                                }
                            }(n34, r20, o11);
                        }
                        return n34.mergedAttrs = Es(n34.mergedAttrs, n34.attrs), i11;
                    }(e42, n33, u2, fn(a8, o10)), null !== u2.attrs && Gs(u2, u2.attrs, !1), null !== u2.mergedAttrs && Gs(u2, u2.mergedAttrs, !0), null !== e42.queries && e42.queries.elementStart(e42, u2), u2;
                }(o9, s11, i9, 0, e41, n32, r18) : s11.data[o9];
                kt(u1, !0);
                const c2 = u1.mergedAttrs;
                null !== c2 && Ds(a7, l2, c2);
                const d3 = u1.classes;
                null !== d3 && bl(a7, l2, d3);
                const f2 = u1.styles;
                return null !== f2 && wh(a7, l2, f2), 64 != (64 & u1.flags) && Vs(s11, i9, l2, u1), 0 === function OE() {
                    return x.lFrame.elementDepthCount;
                }() && Fe(l2, i9), function xE() {
                    x.lFrame.elementDepthCount++;
                }(), fs(u1) && (function Vl(t54, e44, n35) {
                    !rf() || (function Mb(t, e, n, r) {
                        const i = n.directiveStart, s = n.directiveEnd;
                        t.firstCreatePass || si(n, e), Fe(r, e);
                        const o = n.initialInputs;
                        for(let a = i; a < s; a++){
                            const l = t.data[a], u = bt(l);
                            u && Nb(e, n, l);
                            const c = oi(e, t, a, n);
                            Fe(c, e), null !== o && Fb(0, a - i, c, l, 0, o), u && (Ze(n.index, e)[8] = c);
                        }
                    }(t54, e44, n35, ft(n35, e44)), 128 == (128 & n35.flags) && function Sb(t, e, n) {
                        const r = n.directiveStart, i = n.directiveEnd, o = n.index, a = function $E() {
                            return x.lFrame.currentDirectiveIndex;
                        }();
                        try {
                            hn(o);
                            for(let l = r; l < i; l++){
                                const u = t.data[l], c = e[l];
                                La(l), (null !== u.hostBindings || 0 !== u.hostVars || null !== u.hostAttrs) && Jh(u, c);
                            }
                        } finally{
                            hn(-1), La(a);
                        }
                    }(t54, e44, n35));
                }(s11, i9, u1), function Uh(t, e, n) {
                    if (Sa(e)) {
                        const i = e.directiveEnd;
                        for(let s = e.directiveStart; s < i; s++){
                            const o = t.data[s];
                            o.contentQueries && o.contentQueries(1, n[s], s);
                        }
                    }
                }(s11, u1, i9)), null !== r18 && function Ll(t, e, n = ft) {
                    const r = e.localNames;
                    if (null !== r) {
                        let i = e.index + 1;
                        for(let s = 0; s < r.length; s += 2){
                            const o = r[s + 1], a = -1 === o ? n(e, t) : t[o];
                            t[i++] = a;
                        }
                    }
                }(i9, u1), kr;
            }
            function Vr() {
                let t55 = De();
                ka() ? function Va() {
                    x.lFrame.isParent = !1;
                }() : (t55 = t55.parent, kt(t55, !1));
                const e = t55;
                !function RE() {
                    x.lFrame.elementDepthCount--;
                }();
                const n = z();
                return n.firstCreatePass && (ys(n, t55), Sa(t55) && n.queries.elementEnd(t55)), null != e.classesWithoutHost && function tC(t) {
                    return 0 != (16 & t.flags);
                }(e) && iu(n, e, v(), e.classesWithoutHost, !0), null != e.stylesWithoutHost && function nC(t) {
                    return 0 != (32 & t.flags);
                }(e) && iu(n, e, v(), e.stylesWithoutHost, !1), Vr;
            }
            function Ks(t, e, n, r) {
                return kr(t, e, n, r), Vr(), Ks;
            }
            function Zs(t) {
                return !!t && "function" == typeof t.then;
            }
            const Wp = function zp(t) {
                return !!t && "function" == typeof t.subscribe;
            };
            function et(t56, e45, n36, r21) {
                const i12 = v(), s15 = z(), o13 = De();
                return function Kp(t57, e46, n37, r22, i13, s16, o14, a12) {
                    const l6 = fs(r22), c = t57.firstCreatePass && ip(t57), d = e46[8], f = rp(e46);
                    let h = !0;
                    if (3 & r22.type || a12) {
                        const y = ft(r22, e46), _ = a12 ? a12(y) : y, m = f.length, E = a12 ? (S)=>a12(ge(S[r22.index])) : r22.index;
                        if (ce(n37)) {
                            let S = null;
                            if (!a12 && l6 && (S = function G0(t, e, n, r) {
                                const i = t.cleanup;
                                if (null != i) for(let s = 0; s < i.length - 1; s += 2){
                                    const o = i[s];
                                    if (o === n && i[s + 1] === r) {
                                        const a = e[7], l = i[s + 2];
                                        return a.length > l ? a[l] : null;
                                    }
                                    "string" == typeof o && (s += 2);
                                }
                                return null;
                            }(t57, e46, i13, r22.index)), null !== S) (S.__ngLastListenerFn__ || S).__ngNextListenerFn__ = s16, S.__ngLastListenerFn__ = s16, h = !1;
                            else {
                                s16 = au(r22, e46, d, s16, !1);
                                const j = n37.listen(_, i13, s16);
                                f.push(s16, j), c && c.push(i13, E, m, m + 1);
                            }
                        } else s16 = au(r22, e46, d, s16, !0), _.addEventListener(i13, s16, o14), f.push(s16), c && c.push(i13, E, m, o14);
                    } else s16 = au(r22, e46, d, s16, !1);
                    const p = r22.outputs;
                    let g;
                    if (h && null !== p && (g = p[i13])) {
                        const y = g.length;
                        if (y) for(let _ = 0; _ < y; _ += 2){
                            const oe = e46[g[_]][g[_ + 1]].subscribe(s16), le = f.length;
                            f.push(s16, oe), c && c.push(i13, r22.index, le, -(le + 1));
                        }
                    }
                }(s15, i12, i12[L], o13, t56, e45, !!n36, r21), et;
            }
            function Zp(t, e, n, r) {
                try {
                    return !1 !== n(r);
                } catch (i) {
                    return op(t, i), !1;
                }
            }
            function au(t, e, n, r, i) {
                return function s(o) {
                    if (o === Function) return r;
                    const a = 2 & t.flags ? Ze(t.index, e) : e;
                    0 == (32 & e[2]) && $l(a);
                    let l = Zp(e, 0, r, o), u = s.__ngNextListenerFn__;
                    for(; u;)l = Zp(e, 0, u, o) && l, u = u.__ngNextListenerFn__;
                    return i && !1 === l && (o.preventDefault(), o.returnValue = !1), l;
                };
            }
            function og(t, e, n, r, i) {
                const s = t[n + 1], o = null === e;
                let a = r ? St(s) : Xt(s), l = !1;
                for(; 0 !== a && (!1 === l || o);){
                    const c = t[a + 1];
                    J0(t[a], e) && (l = !0, t[a + 1] = r ? Al(c) : Ml(c)), a = r ? St(c) : Xt(c);
                }
                l && (t[n + 1] = r ? Ml(s) : Al(s));
            }
            function J0(t, e) {
                return null === t || null == e || (Array.isArray(t) ? t[1] : t) === e || !(!Array.isArray(t) || "string" != typeof e) && gr(t, e) >= 0;
            }
            function Js(t58, e47) {
                return function Tt(t59, e48, n38, r23) {
                    const i14 = v(), s17 = z(), o15 = function Yt(t) {
                        const e = x.lFrame, n = e.bindingIndex;
                        return e.bindingIndex = e.bindingIndex + t, n;
                    }(2);
                    s17.firstUpdatePass && function gg(t60, e49, n39, r24) {
                        const i15 = t60.data;
                        if (null === i15[n39 + 1]) {
                            const s18 = i15[Ve()], o16 = function pg(t, e) {
                                return e >= t.expandoStartIndex;
                            }(t60, n39);
                            (function vg(t, e) {
                                return 0 != (t.flags & (e ? 16 : 32));
                            })(s18, r24) && null === e49 && !o16 && (e49 = !1), e49 = function oM(t61, e50, n40, r25) {
                                const i16 = function Ba(t) {
                                    const e = x.lFrame.currentDirectiveIndex;
                                    return -1 === e ? null : t[e];
                                }(t61);
                                let s20 = r25 ? e50.residualClasses : e50.residualStyles;
                                if (null === i16) 0 === (r25 ? e50.classBindings : e50.styleBindings) && (n40 = Si(n40 = uu(null, t61, e50, n40, r25), e50.attrs, r25), s20 = null);
                                else {
                                    const o = e50.directiveStylingLast;
                                    if (-1 === o || t61[o] !== i16) if (n40 = uu(i16, t61, e50, n40, r25), null === s20) {
                                        let l = function aM(t, e, n) {
                                            const r = n ? e.classBindings : e.styleBindings;
                                            if (0 !== Xt(r)) return t[St(r)];
                                        }(t61, e50, r25);
                                        void 0 !== l && Array.isArray(l) && (l = uu(null, t61, e50, l[1], r25), l = Si(l, e50.attrs, r25), function lM(t, e, n, r) {
                                            t[St(n ? e.classBindings : e.styleBindings)] = r;
                                        }(t61, e50, r25, l));
                                    } else s20 = function uM(t, e, n) {
                                        let r;
                                        const i = e.directiveEnd;
                                        for(let s = 1 + e.directiveStylingLast; s < i; s++)r = Si(r, t[s].hostAttrs, n);
                                        return Si(r, e.attrs, n);
                                    }(t61, e50, r25);
                                }
                                return void 0 !== s20 && (r25 ? e50.residualClasses = s20 : e50.residualStyles = s20), n40;
                            }(i15, s18, e49, r24), function K0(t62, e51, n41, r26, i17, s21) {
                                let o = s21 ? e51.classBindings : e51.styleBindings, a = St(o), l = Xt(o);
                                t62[r26] = n41;
                                let c, u = !1;
                                if (Array.isArray(n41)) {
                                    const d = n41;
                                    c = d[1], (null === c || gr(d, c) > 0) && (u = !0);
                                } else c = n41;
                                if (i17) if (0 !== l) {
                                    const f = St(t62[a + 1]);
                                    t62[r26 + 1] = Bs(f, a), 0 !== f && (t62[f + 1] = Sl(t62[f + 1], r26)), t62[a + 1] = function rb(t, e) {
                                        return 131071 & t | e << 17;
                                    }(t62[a + 1], r26);
                                } else t62[r26 + 1] = Bs(a, 0), 0 !== a && (t62[a + 1] = Sl(t62[a + 1], r26)), a = r26;
                                else t62[r26 + 1] = Bs(l, 0), 0 === a ? a = r26 : t62[l + 1] = Sl(t62[l + 1], r26), l = r26;
                                u && (t62[r26 + 1] = Ml(t62[r26 + 1])), og(t62, c, r26, !0), og(t62, c, r26, !1), function Z0(t, e, n, r, i) {
                                    const s = i ? t.residualClasses : t.residualStyles;
                                    null != s && "string" == typeof e && gr(s, e) >= 0 && (n[r + 1] = Al(n[r + 1]));
                                }(e51, c, t62, r26, s21), o = Bs(a, l), s21 ? e51.classBindings = o : e51.styleBindings = o;
                            }(i15, s18, e49, n39, o16, r24);
                        }
                    }(s17, t59, o15, r23), e48 !== R && Pe(i14, o15, e48) && function yg(t63, e52, n42, r27, i18, s22, o18, a13) {
                        if (!(3 & e52.type)) return;
                        const l = t63.data, u = l[a13 + 1];
                        Ys(function Oh(t) {
                            return 1 == (1 & t);
                        }(u) ? _g(l, e52, n42, i18, Xt(u), o18) : void 0) || (Ys(s22) || function Ph(t) {
                            return 2 == (2 & t);
                        }(u) && (s22 = _g(l, null, n42, i18, a13, o18)), function qw(t, e, n, r, i) {
                            const s = ce(t);
                            if (e) i ? s ? t.addClass(n, r) : n.classList.add(r) : s ? t.removeClass(n, r) : n.classList.remove(r);
                            else {
                                let o = -1 === r.indexOf("-") ? void 0 : Ye.DashCase;
                                if (null == i) s ? t.removeStyle(n, r, o) : n.style.removeProperty(r);
                                else {
                                    const a = "string" == typeof i && i.endsWith("!important");
                                    a && (i = i.slice(0, -10), o |= Ye.Important), s ? t.setStyle(n, r, i, o) : n.style.setProperty(r, i, a ? "important" : "");
                                }
                            }
                        }(r27, o18, function hs(t, e) {
                            return ge(e[t]);
                        }(Ve(), n42), i18, s22));
                    }(s17, s17.data[Ve()], i14, i14[L], t59, i14[o15 + 1] = function fM(t64, e53) {
                        return null == t64 || ("string" == typeof e53 ? t64 += e53 : "object" == typeof t64 && (t64 = Q(function gn(t) {
                            return t instanceof class $f {
                                toString() {
                                    return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see https://g.co/ng/security#xss)`;
                                }
                                constructor(e){
                                    this.changingThisBreaksApplicationSecurity = e;
                                }
                            } ? t.changingThisBreaksApplicationSecurity : t;
                        }(t64)))), t64;
                    }(e48, n38), r23, o15);
                }(t58, e47, null, !0), Js;
            }
            function uu(t, e, n, r, i) {
                let s = null;
                const o = n.directiveEnd;
                let a = n.directiveStylingLast;
                for(-1 === a ? a = n.directiveStart : a++; a < o && (s = e[a], r = Si(r, s.hostAttrs, i), s !== t);)a++;
                return null !== t && (n.directiveStylingLast = a), r;
            }
            function Si(t, e, n) {
                const r = n ? 1 : 2;
                let i = -1;
                if (null !== e) for(let s = 0; s < e.length; s++){
                    const o = e[s];
                    "number" == typeof o ? i = o : i === r && (Array.isArray(t) || (t = void 0 === t ? [] : [
                        "",
                        t
                    ]), Je(t, o, !!n || e[++s]));
                }
                return void 0 === t ? null : t;
            }
            function _g(t, e, n, r, i, s) {
                const o = null === e;
                let a;
                for(; i > 0;){
                    const l = t[i], u = Array.isArray(l), c = u ? l[1] : l, d = null === c;
                    let f = n[i + 1];
                    f === R && (f = d ? X : void 0);
                    let h = d ? Ja(f, r) : c === r ? f : void 0;
                    if (u && !Ys(h) && (h = Ja(l, r)), Ys(h) && (a = h, o)) return a;
                    const p = t[i + 1];
                    i = o ? St(p) : Xt(p);
                }
                if (null !== e) {
                    let l = s ? e.residualClasses : e.residualStyles;
                    null != l && (a = Ja(l, r));
                }
                return a;
            }
            function Ys(t) {
                return void 0 !== t;
            }
            function Dg(t65, e54 = "") {
                const n = v(), r = z(), i = t65 + 20, s = r.firstCreatePass ? Dr(r, i, 1, e54, null) : r.data[i], o = n[i] = function yl(t, e) {
                    return ce(t) ? t.createText(e) : t.createTextNode(e);
                }(n[L], e54);
                Vs(r, n, o, s), kt(s, !1);
            }
            const Xs = "en-US";
            let Ug = Xs;
            function hu(t66, e55, n43, r28, i19) {
                if (t66 = V(t66), Array.isArray(t66)) for(let s24 = 0; s24 < t66.length; s24++)hu(t66[s24], e55, n43, r28, i19);
                else {
                    const s23 = z(), o = v();
                    let a = br(t66) ? t66 : V(t66.provide), l = fp(t66);
                    const u = De(), c = 1048575 & u.providerIndexes, d = u.directiveStart, f = u.providerIndexes >> 20;
                    if (br(t66) || !t66.multi) {
                        const h = new ri(l, i19, D), p = gu(a, e55, i19 ? c : c + f, d);
                        -1 === p ? (bs(si(u, o), s23, a), pu(s23, t66, e55.length), e55.push(a), u.directiveStart++, u.directiveEnd++, i19 && (u.providerIndexes += 1048576), n43.push(h), o.push(h)) : (n43[p] = h, o[p] = h);
                    } else {
                        const h = gu(a, e55, c + f, d), p = gu(a, e55, c, c + f), g = h >= 0 && n43[h], y = p >= 0 && n43[p];
                        if (i19 && !y || !i19 && !g) {
                            bs(si(u, o), s23, a);
                            const _ = function FS(t, e, n, r, i) {
                                const s = new ri(t, n, D);
                                return s.multi = [], s.index = e, s.componentProviders = 0, hm(s, i, r && !n), s;
                            }(i19 ? NS : IS, n43.length, i19, r28, l);
                            !i19 && y && (n43[p].providerFactory = _), pu(s23, t66, e55.length, 0), e55.push(a), u.directiveStart++, u.directiveEnd++, i19 && (u.providerIndexes += 1048576), n43.push(_), o.push(_);
                        } else pu(s23, t66, h > -1 ? h : p, hm(n43[i19 ? p : h], l, !i19 && r28));
                        !i19 && r28 && y && n43[p].componentProviders++;
                    }
                }
            }
            function pu(t67, e, n, r) {
                const i = br(e), s = function Qb(t) {
                    return !!t.useClass;
                }(e);
                if (i || s) {
                    const l = (s ? V(e.useClass) : e).prototype.ngOnDestroy;
                    if (l) {
                        const u = t67.destroyHooks || (t67.destroyHooks = []);
                        if (!i && e.multi) {
                            const c = u.indexOf(n);
                            -1 === c ? u.push(n, [
                                r,
                                l
                            ]) : u[c + 1].push(r, l);
                        } else u.push(n, l);
                    }
                }
            }
            function hm(t, e, n) {
                return n && t.componentProviders++, t.multi.push(e) - 1;
            }
            function gu(t, e, n, r) {
                for(let i = n; i < r; i++)if (e[i] === t) return i;
                return -1;
            }
            function IS(t, e, n, r) {
                return mu(this.multi, []);
            }
            function NS(t, e, n, r) {
                const i = this.multi;
                let s;
                if (this.providerFactory) {
                    const o = this.providerFactory.componentProviders, a = oi(n, n[1], this.providerFactory.index, r);
                    s = a.slice(0, o), mu(i, s);
                    for(let l = o; l < a.length; l++)s.push(a[l]);
                } else s = [], mu(i, s);
                return s;
            }
            function mu(t, e) {
                for(let n = 0; n < t.length; n++)e.push((0, t[n])());
                return e;
            }
            function se(t68, e56 = []) {
                return (n44)=>{
                    n44.providersResolver = (r29, i20)=>(function TS(t, e, n) {
                            const r = z();
                            if (r.firstCreatePass) {
                                const i = bt(t);
                                hu(n, r.data, r.blueprint, i, !0), hu(e, r.data, r.blueprint, i, !1);
                            }
                        })(r29, i20 ? i20(t68) : t68, e56);
                };
            }
            let pm = class pm {
            };
            let xS = class xS {
                resolveComponentFactory(e57) {
                    throw function OS(t) {
                        const e = Error(`No component factory found for ${Q(t)}. Did you add it to @NgModule.entryComponents?`);
                        return e.ngComponent = t, e;
                    }(e57);
                }
            };
            let io = (()=>{
                let t = class t {
                };
                return t.NULL = new xS, t;
            })();
            function RS() {
                return Hr(De(), v());
            }
            function Hr(t, e) {
                return new Nt(ft(t, e));
            }
            let Nt = (()=>{
                let t = class t {
                    constructor(n){
                        this.nativeElement = n;
                    }
                };
                return t.__NG_ELEMENT_ID__ = RS, t;
            })();
            function kS(t) {
                return t instanceof Nt ? t.nativeElement : t;
            }
            let Fi = class Fi {
            };
            let Un = (()=>{
                let t69 = class t {
                };
                return t69.__NG_ELEMENT_ID__ = ()=>(function LS() {
                        const t70 = v(), n = Ze(De().index, t70);
                        return function VS(t) {
                            return t[L];
                        }(Rt(n) ? n : t70);
                    })(), t69;
            })(), BS = (()=>{
                let t = class t {
                };
                return t.ɵprov = q({
                    token: t,
                    providedIn: "root",
                    factory: ()=>null
                }), t;
            })();
            let so = class so {
                constructor(e){
                    this.full = e, this.major = e.split(".")[0], this.minor = e.split(".")[1], this.patch = e.split(".").slice(2).join(".");
                }
            };
            const jS = new so("13.3.11"), yu = {};
            function oo(t, e, n, r, i = !1) {
                for(; null !== n;){
                    const s = e[n.index];
                    if (null !== s && r.push(ge(s)), wt(s)) for(let a = 10; a < s.length; a++){
                        const l = s[a], u = l[1].firstChild;
                        null !== u && oo(l[1], l, u, r);
                    }
                    const o = n.type;
                    if (8 & o) oo(t, e, n.child, r);
                    else if (32 & o) {
                        const a = pl(n, e);
                        let l;
                        for(; l = a();)r.push(l);
                    } else if (16 & o) {
                        const a = Dh(e, n);
                        if (Array.isArray(a)) r.push(...a);
                        else {
                            const l = vi(e[16]);
                            oo(l[1], l, a, r, !0);
                        }
                    }
                    n = i ? n.projectionNext : n.next;
                }
                return r;
            }
            let Pi = class Pi {
                get rootNodes() {
                    const e = this._lView, n = e[1];
                    return oo(n, e, n.firstChild, []);
                }
                get context() {
                    return this._lView[8];
                }
                set context(e) {
                    this._lView[8] = e;
                }
                get destroyed() {
                    return 256 == (256 & this._lView[2]);
                }
                destroy() {
                    if (this._appRef) this._appRef.detachView(this);
                    else if (this._attachedToViewContainer) {
                        const e = this._lView[3];
                        if (wt(e)) {
                            const n = e[8], r = n ? n.indexOf(this) : -1;
                            r > -1 && (vl(e, r), Ss(n, r));
                        }
                        this._attachedToViewContainer = !1;
                    }
                    dh(this._lView[1], this._lView);
                }
                onDestroy(e) {
                    Wh(this._lView[1], this._lView, null, e);
                }
                markForCheck() {
                    $l(this._cdRefInjectingView || this._lView);
                }
                detach() {
                    this._lView[2] &= -129;
                }
                reattach() {
                    this._lView[2] |= 128;
                }
                detectChanges() {
                    !function Gl(t, e, n) {
                        const r = e[10];
                        r.begin && r.begin();
                        try {
                            Cr(t, e, t.template, n);
                        } catch (i) {
                            throw op(e, i), i;
                        } finally{
                            r.end && r.end();
                        }
                    }(this._lView[1], this._lView, this.context);
                }
                checkNoChanges() {}
                attachToViewContainerRef() {
                    if (this._appRef) throw new b(902, "");
                    this._attachedToViewContainer = !0;
                }
                detachFromAppRef() {
                    this._appRef = null, function Rw(t, e) {
                        Di(t, e, e[L], 2, null, null);
                    }(this._lView[1], this._lView);
                }
                attachToAppRef(e) {
                    if (this._attachedToViewContainer) throw new b(902, "");
                    this._appRef = e;
                }
                constructor(e, n){
                    this._lView = e, this._cdRefInjectingView = n, this._appRef = null, this._attachedToViewContainer = !1;
                }
            };
            let HS = class HS extends Pi {
                detectChanges() {
                    np(this._view);
                }
                checkNoChanges() {}
                get context() {
                    return null;
                }
                constructor(e){
                    super(e), this._view = e;
                }
            };
            let mm = class mm extends io {
                resolveComponentFactory(e) {
                    const n = Te(e);
                    return new _u(n, this.ngModule);
                }
                constructor(e){
                    super(), this.ngModule = e;
                }
            };
            function ym(t) {
                const e = [];
                for(let n in t)t.hasOwnProperty(n) && e.push({
                    propName: t[n],
                    templateName: n
                });
                return e;
            }
            let _u = class _u extends pm {
                get inputs() {
                    return ym(this.componentDef.inputs);
                }
                get outputs() {
                    return ym(this.componentDef.outputs);
                }
                create(e58, n45, r30, i21) {
                    const s25 = (i21 = i21 || this.ngModule) ? function US(t, e) {
                        return {
                            get: (n, r, i)=>{
                                const s = t.get(n, yu, i);
                                return s !== yu || r === yu ? s : e.get(n, r, i);
                            }
                        };
                    }(e58, i21.injector) : e58, o19 = s25.get(Fi, Xd), a14 = s25.get(BS, null), l7 = o19.createRenderer(null, this.componentDef), u6 = this.componentDef.selectors[0][0] || "div", c6 = r30 ? function zh(t, e, n) {
                        if (ce(t)) return t.selectRootElement(e, n === Et.ShadowDom);
                        let r = "string" == typeof e ? t.querySelector(e) : e;
                        return r.textContent = "", r;
                    }(l7, r30, this.componentDef.encapsulation) : _l(o19.createRenderer(null, this.componentDef), u6, function $S(t) {
                        const e = t.toLowerCase();
                        return "svg" === e ? "svg" : "math" === e ? "math" : null;
                    }(u6)), d4 = this.componentDef.onPush ? 576 : 528, f = function bp(t, e) {
                        return {
                            components: [],
                            scheduler: t || Aw,
                            clean: Bb,
                            playerHandler: e || null,
                            flags: 0
                        };
                    }(), h = $s(0, null, null, 1, 0, null, null, null, null, null), p = Ei(null, h, f, d4, null, null, o19, l7, a14, s25);
                    let g, y;
                    gs(p);
                    try {
                        const _ = function Cp(t, e, n, r, i, s) {
                            const o = n[1];
                            n[20] = t;
                            const l = Dr(o, 20, 2, "#host", null), u = l.mergedAttrs = e.hostAttrs;
                            null !== u && (Gs(l, u, !0), null !== t && (Ds(i, t, u), null !== l.classes && bl(i, t, l.classes), null !== l.styles && wh(i, t, l.styles)));
                            const c = r.createRenderer(t, e), d = Ei(n, Gh(e), null, e.onPush ? 64 : 16, n[20], l, r, c, s || null, null);
                            return o.firstCreatePass && (bs(si(l, n), o, e.type), Yh(o, l), Xh(l, n.length, 1)), Us(n, d), n[20] = d;
                        }(c6, this.componentDef, p, o19, l7);
                        if (c6) if (r30) Ds(l7, c6, [
                            "ng-version",
                            jS.full
                        ]);
                        else {
                            const { attrs: m , classes: E  } = function nb(t) {
                                const e = [], n = [];
                                let r = 1, i = 2;
                                for(; r < t.length;){
                                    let s = t[r];
                                    if ("string" == typeof s) 2 === i ? "" !== s && e.push(s, t[++r]) : 8 === i && n.push(s);
                                    else {
                                        if (!Mt(i)) break;
                                        i = s;
                                    }
                                    r++;
                                }
                                return {
                                    attrs: e,
                                    classes: n
                                };
                            }(this.componentDef.selectors[0]);
                            m && Ds(l7, c6, m), E && E.length > 0 && bl(l7, c6, E.join(" "));
                        }
                        if (y = Oa(h, 20), void 0 !== n45) {
                            const m = y.projection = [];
                            for(let E = 0; E < this.ngContentSelectors.length; E++){
                                const S = n45[E];
                                m.push(null != S ? Array.from(S) : null);
                            }
                        }
                        g = function wp(t71, e59, n46, r31, i22) {
                            const s26 = n46[1], o = function wb(t, e, n) {
                                const r = De();
                                t.firstCreatePass && (n.providersResolver && n.providersResolver(n), ep(t, r, e, Er(t, e, 1, null), n));
                                const i = oi(e, t, r.directiveStart, r);
                                Fe(i, e);
                                const s = ft(r, e);
                                return s && Fe(s, e), i;
                            }(s26, n46, e59);
                            if (r31.components.push(o), t71[8] = o, i22 && i22.forEach((l)=>l(o, e59)), e59.contentQueries) {
                                const l = De();
                                e59.contentQueries(1, o, l.directiveStart);
                            }
                            const a = De();
                            return !s26.firstCreatePass || null === e59.hostBindings && null === e59.hostAttrs || (hn(a.index), Zh(n46[1], a, 0, a.directiveStart, a.directiveEnd, e59), Jh(e59, o)), o;
                        }(_, this.componentDef, p, f, [
                            o0
                        ]), Ci(h, p, null);
                    } finally{
                        ms();
                    }
                    return new qS(this.componentType, g, Hr(y, p), p, y);
                }
                constructor(e, n){
                    super(), this.componentDef = e, this.ngModule = n, this.componentType = e.type, this.selector = function tb(t) {
                        return t.map(eb).join(",");
                    }(e.selectors), this.ngContentSelectors = e.ngContentSelectors ? e.ngContentSelectors : [], this.isBoundToModule = !!n;
                }
            };
            let qS = class qS extends class PS {
            } {
                get injector() {
                    return new cr(this._tNode, this._rootLView);
                }
                destroy() {
                    this.hostView.destroy();
                }
                onDestroy(e) {
                    this.hostView.onDestroy(e);
                }
                constructor(e, n, r, i, s){
                    super(), this.location = r, this._rootLView = i, this._tNode = s, this.instance = n, this.hostView = this.changeDetectorRef = new HS(i), this.componentType = e;
                }
            };
            let $r = class $r {
            };
            const Ur = new Map;
            let Dm = class Dm extends $r {
                get(e, n = pt.THROW_IF_NOT_FOUND, r = k.Default) {
                    return e === pt || e === $r || e === zl ? this : this._r3Injector.get(e, n, r);
                }
                destroy() {
                    const e = this._r3Injector;
                    !e.destroyed && e.destroy(), this.destroyCbs.forEach((n)=>n()), this.destroyCbs = null;
                }
                onDestroy(e) {
                    this.destroyCbs.push(e);
                }
                constructor(e, n){
                    super(), this._parent = n, this._bootstrapComponents = [], this.injector = this, this.destroyCbs = [], this.componentFactoryResolver = new mm(this);
                    const r = ut(e);
                    this._bootstrapComponents = Bt(r.bootstrap), this._r3Injector = dp(e, n, [
                        {
                            provide: $r,
                            useValue: this
                        },
                        {
                            provide: io,
                            useValue: this.componentFactoryResolver
                        }
                    ], Q(e)), this._r3Injector._resolveInjectorDefTypes(), this.instance = this.get(e);
                }
            };
            let vu = class vu extends class WS {
            } {
                create(e) {
                    return new Dm(this.moduleType, e);
                }
                constructor(e60){
                    super(), this.moduleType = e60, null !== ut(e60) && function QS(t72) {
                        const e61 = new Set;
                        !function n47(r) {
                            const i = ut(r, !0), s = i.id;
                            null !== s && (function _m(t, e, n) {
                                if (e && e !== n) throw new Error(`Duplicate module registered for ${t} - ${Q(e)} vs ${Q(e.name)}`);
                            }(s, Ur.get(s), r), Ur.set(s, r));
                            const o = Bt(i.imports);
                            for (const a of o)e61.has(a) || (e61.add(a), n47(a));
                        }(t72);
                    }(e60);
                }
            };
            function Du(t) {
                return (e)=>{
                    setTimeout(t, void 0, e);
                };
            }
            const Oe = class fA extends da {
                emit(e) {
                    super.next(e);
                }
                subscribe(e, n, r) {
                    var i, s, o;
                    let a = e, l = n || (()=>null), u = r;
                    if (e && "object" == typeof e) {
                        const d = e;
                        a = null === (i = d.next) || void 0 === i ? void 0 : i.bind(d), l = null === (s = d.error) || void 0 === s ? void 0 : s.bind(d), u = null === (o = d.complete) || void 0 === o ? void 0 : o.bind(d);
                    }
                    this.__isAsync && (l = Du(l), a && (a = Du(a)), u && (u = Du(u)));
                    const c = super.subscribe({
                        next: a,
                        error: l,
                        complete: u
                    });
                    return e instanceof xt && e.add(c), c;
                }
                constructor(e = !1){
                    super(), this.__isAsync = e;
                }
            };
            function hA() {
                return this._results[Mr()]();
            }
            let Eu = class Eu {
                get changes() {
                    return this._changes || (this._changes = new Oe);
                }
                get(e) {
                    return this._results[e];
                }
                map(e) {
                    return this._results.map(e);
                }
                filter(e) {
                    return this._results.filter(e);
                }
                find(e) {
                    return this._results.find(e);
                }
                reduce(e, n) {
                    return this._results.reduce(e, n);
                }
                forEach(e) {
                    this._results.forEach(e);
                }
                some(e) {
                    return this._results.some(e);
                }
                toArray() {
                    return this._results.slice();
                }
                toString() {
                    return this._results.toString();
                }
                reset(e62, n48) {
                    const r32 = this;
                    r32.dirty = !1;
                    const i23 = ht(e62);
                    (this._changesDetected = !function dC(t, e, n) {
                        if (t.length !== e.length) return !1;
                        for(let r = 0; r < t.length; r++){
                            let i = t[r], s = e[r];
                            if (n && (i = n(i), s = n(s)), s !== i) return !1;
                        }
                        return !0;
                    }(r32._results, i23, n48)) && (r32._results = i23, r32.length = i23.length, r32.last = i23[this.length - 1], r32.first = i23[0]);
                }
                notifyOnChanges() {
                    this._changes && (this._changesDetected || !this._emitDistinctChangesOnly) && this._changes.emit(this);
                }
                setDirty() {
                    this.dirty = !0;
                }
                destroy() {
                    this.changes.complete(), this.changes.unsubscribe();
                }
                constructor(e = !1){
                    this._emitDistinctChangesOnly = e, this.dirty = !0, this._results = [], this._changesDetected = !1, this._changes = null, this.length = 0, this.first = void 0, this.last = void 0;
                    const n = Mr(), r = Eu.prototype;
                    r[n] || (r[n] = hA);
                }
            };
            Symbol;
            let nn = (()=>{
                let t = class t {
                };
                return t.__NG_ELEMENT_ID__ = mA, t;
            })();
            const pA = nn, gA = class extends pA {
                createEmbeddedView(e) {
                    const n = this._declarationTContainer.tViews, r = Ei(this._declarationLView, n, e, 16, null, n.declTNode, null, null, null, null);
                    r[17] = this._declarationLView[this._declarationTContainer.index];
                    const s = this._declarationLView[19];
                    return null !== s && (r[19] = s.createEmbeddedView(n)), Ci(n, r, e), new Pi(r);
                }
                constructor(e, n, r){
                    super(), this._declarationLView = e, this._declarationTContainer = n, this.elementRef = r;
                }
            };
            function mA() {
                return ao(De(), v());
            }
            function ao(t, e) {
                return 4 & t.type ? new gA(e, t, Hr(t, e)) : null;
            }
            let Gt = (()=>{
                let t = class t {
                };
                return t.__NG_ELEMENT_ID__ = yA, t;
            })();
            function yA() {
                return Tm(De(), v());
            }
            const _A = Gt, Sm = class extends _A {
                get element() {
                    return Hr(this._hostTNode, this._hostLView);
                }
                get injector() {
                    return new cr(this._hostTNode, this._hostLView);
                }
                get parentInjector() {
                    const e = ws(this._hostTNode, this._hostLView);
                    if (yf(e)) {
                        const n = ur(e, this._hostLView), r = lr(e);
                        return new cr(n[1].data[r + 8], n);
                    }
                    return new cr(null, this._hostLView);
                }
                clear() {
                    for(; this.length > 0;)this.remove(this.length - 1);
                }
                get(e) {
                    const n = Am(this._lContainer);
                    return null !== n && n[e] || null;
                }
                get length() {
                    return this._lContainer.length - 10;
                }
                createEmbeddedView(e, n, r) {
                    const i = e.createEmbeddedView(n || {});
                    return this.insert(i, r), i;
                }
                createComponent(e, n, r, i, s) {
                    const o = e && !function li(t) {
                        return "function" == typeof t;
                    }(e);
                    let a;
                    if (o) a = n;
                    else {
                        const d = n || {};
                        a = d.index, r = d.injector, i = d.projectableNodes, s = d.ngModuleRef;
                    }
                    const l = o ? e : new _u(Te(e)), u = r || this.parentInjector;
                    if (!s && null == l.ngModule) {
                        const f = (o ? u : this.parentInjector).get($r, null);
                        f && (s = f);
                    }
                    const c = l.create(u, i, void 0, s);
                    return this.insert(c.hostView, a), c;
                }
                insert(e63, n49) {
                    const r33 = e63._lView, i24 = r33[1];
                    if (function PE(t) {
                        return wt(t[3]);
                    }(r33)) {
                        const c = this.indexOf(e63);
                        if (-1 !== c) this.detach(c);
                        else {
                            const d = r33[3], f = new Sm(d, d[6], d[3]);
                            f.detach(f.indexOf(e63));
                        }
                    }
                    const s27 = this._adjustIndex(n49), o20 = this._lContainer;
                    !function Vw(t73, e64, n50, r) {
                        const i = 10 + r, s = n50.length;
                        r > 0 && (n50[i - 1][4] = e64), r < s - 10 ? (e64[4] = n50[i], Af(n50, 10 + r, e64)) : (n50.push(e64), e64[4] = null), e64[3] = n50;
                        const o = e64[17];
                        null !== o && n50 !== o && function Lw(t, e) {
                            const n = t[9];
                            e[16] !== e[3][3][16] && (t[2] = !0), null === n ? t[9] = [
                                e
                            ] : n.push(e);
                        }(o, e64);
                        const a = e64[19];
                        null !== a && a.insertView(t73), e64[2] |= 128;
                    }(i24, r33, o20, s27);
                    const a15 = Cl(s27, o20), l = r33[L], u = ks(l, o20[7]);
                    return null !== u && function xw(t, e, n, r, i, s) {
                        r[0] = i, r[6] = e, Di(t, r, n, 1, i, s);
                    }(i24, o20[6], l, r33, u, a15), e63.attachToViewContainerRef(), Af(Cu(o20), s27, e63), e63;
                }
                move(e, n) {
                    return this.insert(e, n);
                }
                indexOf(e) {
                    const n = Am(this._lContainer);
                    return null !== n ? n.indexOf(e) : -1;
                }
                remove(e) {
                    const n = this._adjustIndex(e, -1), r = vl(this._lContainer, n);
                    r && (Ss(Cu(this._lContainer), n), dh(r[1], r));
                }
                detach(e) {
                    const n = this._adjustIndex(e, -1), r = vl(this._lContainer, n);
                    return r && null != Ss(Cu(this._lContainer), n) ? new Pi(r) : null;
                }
                _adjustIndex(e, n = 0) {
                    return null == e ? this.length + n : e;
                }
                constructor(e, n, r){
                    super(), this._lContainer = e, this._hostTNode = n, this._hostLView = r;
                }
            };
            function Am(t) {
                return t[8];
            }
            function Cu(t) {
                return t[8] || (t[8] = []);
            }
            function Tm(t74, e65) {
                let n51;
                const r34 = e65[t74.index];
                if (wt(r34)) n51 = r34;
                else {
                    let i;
                    if (8 & t74.type) i = ge(r34);
                    else {
                        const s = e65[L];
                        i = s.createComment("");
                        const o = ft(t74, e65);
                        jn(s, ks(s, o), i, function $w(t, e) {
                            return ce(t) ? t.nextSibling(e) : e.nextSibling;
                        }(s, o), !1);
                    }
                    e65[t74.index] = n51 = function tp(t, e, n, r) {
                        return new Array(t, !0, !1, e, null, 0, r, n, null, null);
                    }(r34, e65, i, t74), Us(e65, n51);
                }
                return new Sm(n51, t74, e65);
            }
            let wu = class wu {
                clone() {
                    return new wu(this.queryList);
                }
                setDirty() {
                    this.queryList.setDirty();
                }
                constructor(e){
                    this.queryList = e, this.matches = null;
                }
            };
            let bu = class bu {
                createEmbeddedView(e) {
                    const n = e.queries;
                    if (null !== n) {
                        const r = null !== e.contentQueries ? e.contentQueries[0] : n.length, i = [];
                        for(let s = 0; s < r; s++){
                            const o = n.getByIndex(s);
                            i.push(this.queries[o.indexInDeclarationView].clone());
                        }
                        return new bu(i);
                    }
                    return null;
                }
                insertView(e) {
                    this.dirtyQueriesWithMatches(e);
                }
                detachView(e) {
                    this.dirtyQueriesWithMatches(e);
                }
                dirtyQueriesWithMatches(e) {
                    for(let n = 0; n < this.queries.length; n++)null !== km(e, n).matches && this.queries[n].setDirty();
                }
                constructor(e = []){
                    this.queries = e;
                }
            };
            let Im = class Im {
                constructor(e, n, r = null){
                    this.predicate = e, this.flags = n, this.read = r;
                }
            };
            let Mu = class Mu {
                elementStart(e, n) {
                    for(let r = 0; r < this.queries.length; r++)this.queries[r].elementStart(e, n);
                }
                elementEnd(e) {
                    for(let n = 0; n < this.queries.length; n++)this.queries[n].elementEnd(e);
                }
                embeddedTView(e) {
                    let n = null;
                    for(let r = 0; r < this.length; r++){
                        const i = null !== n ? n.length : 0, s = this.getByIndex(r).embeddedTView(e, i);
                        s && (s.indexInDeclarationView = r, null !== n ? n.push(s) : n = [
                            s
                        ]);
                    }
                    return null !== n ? new Mu(n) : null;
                }
                template(e, n) {
                    for(let r = 0; r < this.queries.length; r++)this.queries[r].template(e, n);
                }
                getByIndex(e) {
                    return this.queries[e];
                }
                get length() {
                    return this.queries.length;
                }
                track(e) {
                    this.queries.push(e);
                }
                constructor(e = []){
                    this.queries = e;
                }
            };
            let Su = class Su {
                elementStart(e, n) {
                    this.isApplyingToNode(n) && this.matchTNode(e, n);
                }
                elementEnd(e) {
                    this._declarationNodeIndex === e.index && (this._appliesToNextNode = !1);
                }
                template(e, n) {
                    this.elementStart(e, n);
                }
                embeddedTView(e, n) {
                    return this.isApplyingToNode(e) ? (this.crossesNgTemplate = !0, this.addMatch(-e.index, n), new Su(this.metadata)) : null;
                }
                isApplyingToNode(e) {
                    if (this._appliesToNextNode && 1 != (1 & this.metadata.flags)) {
                        const n = this._declarationNodeIndex;
                        let r = e.parent;
                        for(; null !== r && 8 & r.type && r.index !== n;)r = r.parent;
                        return n === (null !== r ? r.index : -1);
                    }
                    return this._appliesToNextNode;
                }
                matchTNode(e, n) {
                    const r = this.metadata.predicate;
                    if (Array.isArray(r)) for(let i = 0; i < r.length; i++){
                        const s = r[i];
                        this.matchTNodeWithReadOption(e, n, EA(n, s)), this.matchTNodeWithReadOption(e, n, Ms(n, e, s, !1, !1));
                    }
                    else r === nn ? 4 & n.type && this.matchTNodeWithReadOption(e, n, -1) : this.matchTNodeWithReadOption(e, n, Ms(n, e, r, !1, !1));
                }
                matchTNodeWithReadOption(e, n, r) {
                    if (null !== r) {
                        const i = this.metadata.read;
                        if (null !== i) if (i === Nt || i === Gt || i === nn && 4 & n.type) this.addMatch(n.index, -2);
                        else {
                            const s = Ms(n, e, i, !1, !1);
                            null !== s && this.addMatch(n.index, s);
                        }
                        else this.addMatch(n.index, r);
                    }
                }
                addMatch(e, n) {
                    null === this.matches ? this.matches = [
                        e,
                        n
                    ] : this.matches.push(e, n);
                }
                constructor(e, n = -1){
                    this.metadata = e, this.matches = null, this.indexInDeclarationView = -1, this.crossesNgTemplate = !1, this._appliesToNextNode = !0, this._declarationNodeIndex = n;
                }
            };
            function EA(t, e) {
                const n = t.localNames;
                if (null !== n) {
                    for(let r = 0; r < n.length; r += 2)if (n[r] === e) return n[r + 1];
                }
                return null;
            }
            function wA(t75, e66, n52, r) {
                return -1 === n52 ? function CA(t, e) {
                    return 11 & t.type ? Hr(t, e) : 4 & t.type ? ao(t, e) : null;
                }(e66, t75) : -2 === n52 ? function bA(t, e, n) {
                    return n === Nt ? Hr(e, t) : n === nn ? ao(e, t) : n === Gt ? Tm(e, t) : void 0;
                }(t75, e66, r) : oi(t75, t75[1], n52, e66);
            }
            function Nm(t, e, n, r) {
                const i = e[19].queries[r];
                if (null === i.matches) {
                    const s = t.data, o = n.matches, a = [];
                    for(let l = 0; l < o.length; l += 2){
                        const u = o[l];
                        a.push(u < 0 ? null : wA(e, s[u], o[l + 1], n.metadata.read));
                    }
                    i.matches = a;
                }
                return i.matches;
            }
            function Au(t, e, n, r) {
                const i = t.queries.getByIndex(n), s = i.matches;
                if (null !== s) {
                    const o = Nm(t, e, i, n);
                    for(let a = 0; a < s.length; a += 2){
                        const l = s[a];
                        if (l > 0) r.push(o[a / 2]);
                        else {
                            const u = s[a + 1], c = e[-l];
                            for(let d = 10; d < c.length; d++){
                                const f = c[d];
                                f[17] === f[3] && Au(f[1], f, u, r);
                            }
                            if (null !== c[9]) {
                                const d = c[9];
                                for(let f = 0; f < d.length; f++){
                                    const h = d[f];
                                    Au(h[1], h, u, r);
                                }
                            }
                        }
                    }
                }
                return r;
            }
            function Fm(t) {
                const e = v(), n = z(), r = lf();
                ja(r + 1);
                const i = km(n, r);
                if (t.dirty && ef(e) === (2 == (2 & i.metadata.flags))) {
                    if (null === i.matches) t.reset([]);
                    else {
                        const s = i.crossesNgTemplate ? Au(n, e, r, []) : Nm(n, e, i, r);
                        t.reset(s, kS), t.notifyOnChanges();
                    }
                    return !0;
                }
                return !1;
            }
            function Pm(t76, e67, n53) {
                const r35 = z();
                r35.firstCreatePass && (function Rm(t, e, n) {
                    null === t.queries && (t.queries = new Mu), t.queries.track(new Su(e, n));
                }(r35, new Im(t76, e67, n53), -1), 2 == (2 & e67) && (r35.staticViewQueries = !0)), function xm(t, e, n) {
                    const r = new Eu(4 == (4 & n));
                    Wh(t, e, r, r.destroy), null === e[19] && (e[19] = new bu), e[19].queries.push(new wu(r));
                }(r35, v(), e67);
            }
            function km(t, e) {
                return t.queries.getByIndex(e);
            }
            function co(...t) {}
            const Xm = new $("Application Initializer");
            let Ou = (()=>{
                let t = class t {
                    runInitializers() {
                        if (this.initialized) return;
                        const n = [], r = ()=>{
                            this.done = !0, this.resolve();
                        };
                        if (this.appInits) for(let i25 = 0; i25 < this.appInits.length; i25++){
                            const s = this.appInits[i25]();
                            if (Zs(s)) n.push(s);
                            else if (Wp(s)) {
                                const o = new Promise((a, l)=>{
                                    s.subscribe({
                                        complete: a,
                                        error: l
                                    });
                                });
                                n.push(o);
                            }
                        }
                        Promise.all(n).then(()=>{
                            r();
                        }).catch((i)=>{
                            this.reject(i);
                        }), 0 === n.length && r(), this.initialized = !0;
                    }
                    constructor(n){
                        this.appInits = n, this.resolve = co, this.reject = co, this.initialized = !1, this.done = !1, this.donePromise = new Promise((r, i)=>{
                            this.resolve = r, this.reject = i;
                        });
                    }
                };
                return t.ɵfac = function(n) {
                    return new (n || t)(F(Xm, 8));
                }, t.ɵprov = q({
                    token: t,
                    factory: t.ɵfac,
                    providedIn: "root"
                }), t;
            })();
            const ki = new $("AppId", {
                providedIn: "root",
                factory: function ey() {
                    return `${xu()}${xu()}${xu()}`;
                }
            });
            function xu() {
                return String.fromCharCode(97 + Math.floor(25 * Math.random()));
            }
            const ty = new $("Platform Initializer"), Ru = new $("Platform ID", {
                providedIn: "platform",
                factory: ()=>"unknown"
            }), qA = new $("appBootstrapListener"), _n = new $("LocaleId", {
                providedIn: "root",
                factory: ()=>bC(_n, k.Optional | k.SkipSelf) || function zA() {
                        return "undefined" != typeof $localize && $localize.locale || Xs;
                    }()
            }), ZA = (()=>Promise.resolve(0))();
            function ku(t) {
                "undefined" == typeof Zone ? ZA.then(()=>{
                    t && t.apply(null, null);
                }) : Zone.current.scheduleMicroTask("scheduleMicrotask", t);
            }
            let xe = class xe {
                static isInAngularZone() {
                    return "undefined" != typeof Zone && !0 === Zone.current.get("isAngularZone");
                }
                static assertInAngularZone() {
                    if (!xe.isInAngularZone()) throw new Error("Expected to be in Angular Zone, but it is not!");
                }
                static assertNotInAngularZone() {
                    if (xe.isInAngularZone()) throw new Error("Expected to not be in Angular Zone, but it is!");
                }
                run(e, n, r) {
                    return this._inner.run(e, n, r);
                }
                runTask(e, n, r, i) {
                    const s = this._inner, o = s.scheduleEventTask("NgZoneEvent: " + i, e, YA, co, co);
                    try {
                        return s.runTask(o, n, r);
                    } finally{
                        s.cancelTask(o);
                    }
                }
                runGuarded(e, n, r) {
                    return this._inner.runGuarded(e, n, r);
                }
                runOutsideAngular(e) {
                    return this._outer.run(e);
                }
                constructor({ enableLongStackTrace: e68 = !1 , shouldCoalesceEventChangeDetection: n54 = !1 , shouldCoalesceRunChangeDetection: r36 = !1  }){
                    if (this.hasPendingMacrotasks = !1, this.hasPendingMicrotasks = !1, this.isStable = !0, this.onUnstable = new Oe(!1), this.onMicrotaskEmpty = new Oe(!1), this.onStable = new Oe(!1), this.onError = new Oe(!1), "undefined" == typeof Zone) throw new Error("In this configuration Angular requires Zone.js");
                    Zone.assertZonePatched();
                    const i26 = this;
                    i26._nesting = 0, i26._outer = i26._inner = Zone.current, Zone.TaskTrackingZoneSpec && (i26._inner = i26._inner.fork(new Zone.TaskTrackingZoneSpec)), e68 && Zone.longStackTraceZoneSpec && (i26._inner = i26._inner.fork(Zone.longStackTraceZoneSpec)), i26.shouldCoalesceEventChangeDetection = !r36 && n54, i26.shouldCoalesceRunChangeDetection = r36, i26.lastRequestAnimationFrameId = -1, i26.nativeRequestAnimationFrame = function JA() {
                        let t = Z.requestAnimationFrame, e = Z.cancelAnimationFrame;
                        if ("undefined" != typeof Zone && t && e) {
                            const n = t[Zone.__symbol__("OriginalDelegate")];
                            n && (t = n);
                            const r = e[Zone.__symbol__("OriginalDelegate")];
                            r && (e = r);
                        }
                        return {
                            nativeRequestAnimationFrame: t,
                            nativeCancelAnimationFrame: e
                        };
                    }().nativeRequestAnimationFrame, function eT(t77) {
                        const e = ()=>{
                            !function XA(t) {
                                t.isCheckStableRunning || -1 !== t.lastRequestAnimationFrameId || (t.lastRequestAnimationFrameId = t.nativeRequestAnimationFrame.call(Z, ()=>{
                                    t.fakeTopEventTask || (t.fakeTopEventTask = Zone.root.scheduleEventTask("fakeTopEventTask", ()=>{
                                        t.lastRequestAnimationFrameId = -1, Lu(t), t.isCheckStableRunning = !0, Vu(t), t.isCheckStableRunning = !1;
                                    }, void 0, ()=>{}, ()=>{})), t.fakeTopEventTask.invoke();
                                }), Lu(t));
                            }(t77);
                        };
                        t77._inner = t77._inner.fork({
                            name: "angular",
                            properties: {
                                isAngularZone: !0
                            },
                            onInvokeTask: (n, r, i, s, o, a)=>{
                                try {
                                    return ny(t77), n.invokeTask(i, s, o, a);
                                } finally{
                                    (t77.shouldCoalesceEventChangeDetection && "eventTask" === s.type || t77.shouldCoalesceRunChangeDetection) && e(), ry(t77);
                                }
                            },
                            onInvoke: (n, r, i, s, o, a, l)=>{
                                try {
                                    return ny(t77), n.invoke(i, s, o, a, l);
                                } finally{
                                    t77.shouldCoalesceRunChangeDetection && e(), ry(t77);
                                }
                            },
                            onHasTask: (n, r, i, s)=>{
                                n.hasTask(i, s), r === i && ("microTask" == s.change ? (t77._hasPendingMicrotasks = s.microTask, Lu(t77), Vu(t77)) : "macroTask" == s.change && (t77.hasPendingMacrotasks = s.macroTask));
                            },
                            onHandleError: (n, r, i, s)=>(n.handleError(i, s), t77.runOutsideAngular(()=>t77.onError.emit(s)), !1)
                        });
                    }(i26);
                }
            };
            const YA = {};
            function Vu(t) {
                if (0 == t._nesting && !t.hasPendingMicrotasks && !t.isStable) try {
                    t._nesting++, t.onMicrotaskEmpty.emit(null);
                } finally{
                    if (t._nesting--, !t.hasPendingMicrotasks) try {
                        t.runOutsideAngular(()=>t.onStable.emit(null));
                    } finally{
                        t.isStable = !0;
                    }
                }
            }
            function Lu(t) {
                t.hasPendingMicrotasks = !!(t._hasPendingMicrotasks || (t.shouldCoalesceEventChangeDetection || t.shouldCoalesceRunChangeDetection) && -1 !== t.lastRequestAnimationFrameId);
            }
            function ny(t) {
                t._nesting++, t.isStable && (t.isStable = !1, t.onUnstable.emit(null));
            }
            function ry(t) {
                t._nesting--, Vu(t);
            }
            let tT = class tT {
                run(e, n, r) {
                    return e.apply(n, r);
                }
                runGuarded(e, n, r) {
                    return e.apply(n, r);
                }
                runOutsideAngular(e) {
                    return e();
                }
                runTask(e, n, r, i) {
                    return e.apply(n, r);
                }
                constructor(){
                    this.hasPendingMicrotasks = !1, this.hasPendingMacrotasks = !1, this.isStable = !0, this.onUnstable = new Oe, this.onMicrotaskEmpty = new Oe, this.onStable = new Oe, this.onError = new Oe;
                }
            };
            let Bu = (()=>{
                let t = class t {
                    _watchAngularEvents() {
                        this._ngZone.onUnstable.subscribe({
                            next: ()=>{
                                this._didWork = !0, this._isZoneStable = !1;
                            }
                        }), this._ngZone.runOutsideAngular(()=>{
                            this._ngZone.onStable.subscribe({
                                next: ()=>{
                                    xe.assertNotInAngularZone(), ku(()=>{
                                        this._isZoneStable = !0, this._runCallbacksIfReady();
                                    });
                                }
                            });
                        });
                    }
                    increasePendingRequestCount() {
                        return this._pendingCount += 1, this._didWork = !0, this._pendingCount;
                    }
                    decreasePendingRequestCount() {
                        if (this._pendingCount -= 1, this._pendingCount < 0) throw new Error("pending async requests below zero");
                        return this._runCallbacksIfReady(), this._pendingCount;
                    }
                    isStable() {
                        return this._isZoneStable && 0 === this._pendingCount && !this._ngZone.hasPendingMacrotasks;
                    }
                    _runCallbacksIfReady() {
                        if (this.isStable()) ku(()=>{
                            for(; 0 !== this._callbacks.length;){
                                let n = this._callbacks.pop();
                                clearTimeout(n.timeoutId), n.doneCb(this._didWork);
                            }
                            this._didWork = !1;
                        });
                        else {
                            let n = this.getPendingTasks();
                            this._callbacks = this._callbacks.filter((r)=>!r.updateCb || !r.updateCb(n) || (clearTimeout(r.timeoutId), !1)), this._didWork = !0;
                        }
                    }
                    getPendingTasks() {
                        return this.taskTrackingZone ? this.taskTrackingZone.macroTasks.map((n)=>({
                                source: n.source,
                                creationLocation: n.creationLocation,
                                data: n.data
                            })) : [];
                    }
                    addCallback(n, r, i) {
                        let s = -1;
                        r && r > 0 && (s = setTimeout(()=>{
                            this._callbacks = this._callbacks.filter((o)=>o.timeoutId !== s), n(this._didWork, this.getPendingTasks());
                        }, r)), this._callbacks.push({
                            doneCb: n,
                            timeoutId: s,
                            updateCb: i
                        });
                    }
                    whenStable(n, r, i) {
                        if (i && !this.taskTrackingZone) throw new Error('Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/plugins/task-tracking" loaded?');
                        this.addCallback(n, r, i), this._runCallbacksIfReady();
                    }
                    getPendingRequestCount() {
                        return this._pendingCount;
                    }
                    findProviders(n, r, i) {
                        return [];
                    }
                    constructor(n){
                        this._ngZone = n, this._pendingCount = 0, this._isZoneStable = !0, this._didWork = !1, this._callbacks = [], this.taskTrackingZone = null, this._watchAngularEvents(), n.run(()=>{
                            this.taskTrackingZone = "undefined" == typeof Zone ? null : Zone.current.get("TaskTrackingZone");
                        });
                    }
                };
                return t.ɵfac = function(n) {
                    return new (n || t)(F(xe));
                }, t.ɵprov = q({
                    token: t,
                    factory: t.ɵfac
                }), t;
            })(), nT = (()=>{
                let t = class t {
                    registerApplication(n, r) {
                        this._applications.set(n, r);
                    }
                    unregisterApplication(n) {
                        this._applications.delete(n);
                    }
                    unregisterAllApplications() {
                        this._applications.clear();
                    }
                    getTestability(n) {
                        return this._applications.get(n) || null;
                    }
                    getAllTestabilities() {
                        return Array.from(this._applications.values());
                    }
                    getAllRootElements() {
                        return Array.from(this._applications.keys());
                    }
                    findTestabilityInTree(n, r = !0) {
                        return ju.findTestabilityInTree(this, n, r);
                    }
                    constructor(){
                        this._applications = new Map, ju.addToWindow(this);
                    }
                };
                return t.ɵfac = function(n) {
                    return new (n || t);
                }, t.ɵprov = q({
                    token: t,
                    factory: t.ɵfac,
                    providedIn: "platform"
                }), t;
            })();
            let rT = class rT {
                addToWindow(e) {}
                findTestabilityInTree(e, n, r) {
                    return null;
                }
            };
            let ju = new rT, Gn = null;
            const iy = new $("AllowMultipleToken"), sy = new $("PlatformOnDestroy");
            function oy(t78, e69, n55 = []) {
                const r37 = `Platform: ${e69}`, i = new $(r37);
                return (s = [])=>{
                    let o = Hu();
                    if (!o || o.injector.get(iy, !1)) {
                        const a = [
                            ...n55,
                            ...s,
                            {
                                provide: i,
                                useValue: !0
                            }
                        ];
                        t78 ? t78(a) : function aT(t) {
                            if (Gn && !Gn.get(iy, !1)) throw new b(400, "");
                            Gn = t;
                            const e = t.get(ay), n = t.get(ty, null);
                            n && n.forEach((r)=>r());
                        }(function uT(t = [], e) {
                            return pt.create({
                                name: e,
                                providers: [
                                    {
                                        provide: Wl,
                                        useValue: "platform"
                                    },
                                    {
                                        provide: sy,
                                        useValue: ()=>Gn = null
                                    },
                                    ...t
                                ]
                            });
                        }(a, r37));
                    }
                    return function lT(t) {
                        const e = Hu();
                        if (!e) throw new b(401, "");
                        return e;
                    }();
                };
            }
            function Hu() {
                var t;
                return null !== (t = null == Gn ? void 0 : Gn.get(ay)) && void 0 !== t ? t : null;
            }
            let ay = (()=>{
                let t79 = class t {
                    bootstrapModuleFactory(n56, r38) {
                        const a = function cT(t, e) {
                            let n;
                            return n = "noop" === t ? new tT : ("zone.js" === t ? void 0 : t) || new xe({
                                enableLongStackTrace: !1,
                                shouldCoalesceEventChangeDetection: !!(null == e ? void 0 : e.ngZoneEventCoalescing),
                                shouldCoalesceRunChangeDetection: !!(null == e ? void 0 : e.ngZoneRunCoalescing)
                            }), n;
                        }(r38 ? r38.ngZone : void 0, {
                            ngZoneEventCoalescing: r38 && r38.ngZoneEventCoalescing || !1,
                            ngZoneRunCoalescing: r38 && r38.ngZoneRunCoalescing || !1
                        }), l = [
                            {
                                provide: xe,
                                useValue: a
                            }
                        ];
                        return a.run(()=>{
                            const u = pt.create({
                                providers: l,
                                parent: this.injector,
                                name: n56.moduleType.name
                            }), c = n56.create(u), d = c.injector.get(_i, null);
                            if (!d) throw new b(402, "");
                            return a.runOutsideAngular(()=>{
                                const f = a.onError.subscribe({
                                    next: (h)=>{
                                        d.handleError(h);
                                    }
                                });
                                c.onDestroy(()=>{
                                    $u(this._modules, c), f.unsubscribe();
                                });
                            }), function dT(t, e, n) {
                                try {
                                    const r = n();
                                    return Zs(r) ? r.catch((i)=>{
                                        throw e.runOutsideAngular(()=>t.handleError(i)), i;
                                    }) : r;
                                } catch (r) {
                                    throw e.runOutsideAngular(()=>t.handleError(r)), r;
                                }
                            }(d, a, ()=>{
                                const f = c.injector.get(Ou);
                                return f.runInitializers(), f.donePromise.then(()=>(function VM(t) {
                                        We(t, "Expected localeId to be defined"), "string" == typeof t && (Ug = t.toLowerCase().replace(/_/g, "-"));
                                    }(c.injector.get(_n, Xs) || Xs), this._moduleDoBootstrap(c), c));
                            });
                        });
                    }
                    bootstrapModule(n57, r39 = []) {
                        const i = ly({}, r39);
                        return (function sT(t, e, n) {
                            const r = new vu(n);
                            return Promise.resolve(r);
                        })(0, 0, n57).then((s)=>this.bootstrapModuleFactory(s, i));
                    }
                    _moduleDoBootstrap(n) {
                        const r = n.injector.get(uy);
                        if (n._bootstrapComponents.length > 0) n._bootstrapComponents.forEach((i)=>r.bootstrap(i));
                        else {
                            if (!n.instance.ngDoBootstrap) throw new b(403, "");
                            n.instance.ngDoBootstrap(r);
                        }
                        this._modules.push(n);
                    }
                    onDestroy(n) {
                        this._destroyListeners.push(n);
                    }
                    get injector() {
                        return this._injector;
                    }
                    destroy() {
                        if (this._destroyed) throw new b(404, "");
                        this._modules.slice().forEach((r)=>r.destroy()), this._destroyListeners.forEach((r)=>r());
                        const n = this._injector.get(sy, null);
                        null == n || n(), this._destroyed = !0;
                    }
                    get destroyed() {
                        return this._destroyed;
                    }
                    constructor(n){
                        this._injector = n, this._modules = [], this._destroyListeners = [], this._destroyed = !1;
                    }
                };
                return t79.ɵfac = function(n) {
                    return new (n || t79)(F(pt));
                }, t79.ɵprov = q({
                    token: t79,
                    factory: t79.ɵfac,
                    providedIn: "platform"
                }), t79;
            })();
            function ly(t, e) {
                return Array.isArray(e) ? e.reduce(ly, t) : Object.assign(Object.assign({}, t), e);
            }
            let uy = (()=>{
                let t80 = class t {
                    bootstrap(n, r) {
                        if (!this._initStatus.done) throw new b(405, "");
                        let i;
                        i = n instanceof pm ? n : this._injector.get(io).resolveComponentFactory(n), this.componentTypes.push(i.componentType);
                        const s = function oT(t) {
                            return t.isBoundToModule;
                        }(i) ? void 0 : this._injector.get($r), a = i.create(pt.NULL, [], r || i.selector, s), l = a.location.nativeElement, u = a.injector.get(Bu, null), c = u && a.injector.get(nT);
                        return u && c && c.registerApplication(l, u), a.onDestroy(()=>{
                            this.detachView(a.hostView), $u(this.components, a), c && c.unregisterApplication(l);
                        }), this._loadComponent(a), a;
                    }
                    tick() {
                        if (this._runningTick) throw new b(101, "");
                        try {
                            this._runningTick = !0;
                            for (let n of this._views)n.detectChanges();
                        } catch (n) {
                            this._zone.runOutsideAngular(()=>this._exceptionHandler.handleError(n));
                        } finally{
                            this._runningTick = !1;
                        }
                    }
                    attachView(n) {
                        const r = n;
                        this._views.push(r), r.attachToAppRef(this);
                    }
                    detachView(n) {
                        const r = n;
                        $u(this._views, r), r.detachFromAppRef();
                    }
                    _loadComponent(n) {
                        this.attachView(n.hostView), this.tick(), this.components.push(n), this._injector.get(qA, []).concat(this._bootstrapListeners).forEach((i)=>i(n));
                    }
                    ngOnDestroy() {
                        this._views.slice().forEach((n)=>n.destroy()), this._onMicrotaskEmptySubscription.unsubscribe();
                    }
                    get viewCount() {
                        return this._views.length;
                    }
                    constructor(n58, r40, i27, s28){
                        this._zone = n58, this._injector = r40, this._exceptionHandler = i27, this._initStatus = s28, this._bootstrapListeners = [], this._views = [], this._runningTick = !1, this._stable = !0, this.componentTypes = [], this.components = [], this._onMicrotaskEmptySubscription = this._zone.onMicrotaskEmpty.subscribe({
                            next: ()=>{
                                this._zone.run(()=>{
                                    this.tick();
                                });
                            }
                        });
                        const o21 = new Ae((l)=>{
                            this._stable = this._zone.isStable && !this._zone.hasPendingMacrotasks && !this._zone.hasPendingMicrotasks, this._zone.runOutsideAngular(()=>{
                                l.next(this._stable), l.complete();
                            });
                        }), a16 = new Ae((l)=>{
                            let u;
                            this._zone.runOutsideAngular(()=>{
                                u = this._zone.onStable.subscribe(()=>{
                                    xe.assertNotInAngularZone(), ku(()=>{
                                        !this._stable && !this._zone.hasPendingMacrotasks && !this._zone.hasPendingMicrotasks && (this._stable = !0, l.next(!0));
                                    });
                                });
                            });
                            const c = this._zone.onUnstable.subscribe(()=>{
                                xe.assertInAngularZone(), this._stable && (this._stable = !1, this._zone.runOutsideAngular(()=>{
                                    l.next(!1);
                                }));
                            });
                            return ()=>{
                                u.unsubscribe(), c.unsubscribe();
                            };
                        });
                        this.isStable = function ZD(...t81) {
                            const e70 = Rd(t81), n = function UD(t, e) {
                                return "number" == typeof pa(t) ? t.pop() : e;
                            }(t81, 1 / 0), r = t81;
                            return r.length ? 1 === r.length ? xn(r[0]) : (function BD(t = 1 / 0) {
                                return ns(_d, t);
                            })(n)(rs(r, e70)) : ha;
                        }(o21, a16.pipe(function YD(t = {}) {
                            const { connector: e = ()=>new da , resetOnError: n = !0 , resetOnComplete: r = !0 , resetOnRefCountZero: i = !0  } = t;
                            return (s)=>{
                                let o = null, a = null, l = null, u = 0, c = !1, d = !1;
                                const f = ()=>{
                                    null == a || a.unsubscribe(), a = null;
                                }, h = ()=>{
                                    f(), o = l = null, c = d = !1;
                                }, p = ()=>{
                                    const g = o;
                                    h(), null == g || g.unsubscribe();
                                };
                                return Nn((g, y)=>{
                                    u++, !d && !c && f();
                                    const _ = l = null != l ? l : e();
                                    y.add(()=>{
                                        u--, 0 === u && !d && !c && (a = ga(p, i));
                                    }), _.subscribe(y), o || (o = new es({
                                        next: (m)=>_.next(m),
                                        error: (m)=>{
                                            d = !0, f(), a = ga(h, n, m), _.error(m);
                                        },
                                        complete: ()=>{
                                            c = !0, f(), a = ga(h, r), _.complete();
                                        }
                                    }), rs(g).subscribe(o));
                                })(s);
                            };
                        }()));
                    }
                };
                return t80.ɵfac = function(n) {
                    return new (n || t80)(F(xe), F(pt), F(_i), F(Ou));
                }, t80.ɵprov = q({
                    token: t80,
                    factory: t80.ɵfac,
                    providedIn: "root"
                }), t80;
            })();
            function $u(t, e) {
                const n = t.indexOf(e);
                n > -1 && t.splice(n, 1);
            }
            let dy = !0, py = (()=>{
                let t = class t {
                };
                return t.__NG_ELEMENT_ID__ = pT, t;
            })();
            function pT(t82) {
                return function gT(t, e, n) {
                    if (ds(t) && !n) {
                        const r = Ze(t.index, e);
                        return new Pi(r, r);
                    }
                    return 47 & t.type ? new Pi(e[16], e) : null;
                }(De(), v(), 16 == (16 & t82));
            }
            const TT = oy(null, "core", []);
            let IT = (()=>{
                let t = class t {
                    constructor(n){}
                };
                return t.ɵfac = function(n) {
                    return new (n || t)(F(uy));
                }, t.ɵmod = lt({
                    type: t
                }), t.ɵinj = Qe({}), t;
            })(), go = null;
            function zn() {
                return go;
            }
            const tt = new $("DocumentToken");
            function Oy(t, e) {
                e = encodeURIComponent(e);
                for (const n of t.split(";")){
                    const r = n.indexOf("="), [i, s] = -1 == r ? [
                        n,
                        ""
                    ] : [
                        n.slice(0, r),
                        n.slice(r + 1)
                    ];
                    if (i.trim() === e) return decodeURIComponent(s);
                }
                return null;
            }
            let Ly = (()=>{
                let t = class t {
                };
                return t.ɵfac = function(n) {
                    return new (n || t);
                }, t.ɵmod = lt({
                    type: t
                }), t.ɵinj = Qe({}), t;
            })();
            let Hy = class Hy {
            };
            let oc = class oc extends class eN extends class PT {
            } {
                constructor(){
                    super(...arguments), this.supportsDOMEvents = !0;
                }
            } {
                static makeCurrent() {
                    !function FT(t) {
                        go || (go = t);
                    }(new oc);
                }
                onAndCancel(e, n, r) {
                    return e.addEventListener(n, r, !1), ()=>{
                        e.removeEventListener(n, r, !1);
                    };
                }
                dispatchEvent(e, n) {
                    e.dispatchEvent(n);
                }
                remove(e) {
                    e.parentNode && e.parentNode.removeChild(e);
                }
                createElement(e, n) {
                    return (n = n || this.getDefaultDocument()).createElement(e);
                }
                createHtmlDocument() {
                    return document.implementation.createHTMLDocument("fakeTitle");
                }
                getDefaultDocument() {
                    return document;
                }
                isElementNode(e) {
                    return e.nodeType === Node.ELEMENT_NODE;
                }
                isShadowRoot(e) {
                    return e instanceof DocumentFragment;
                }
                getGlobalEventTarget(e, n) {
                    return "window" === n ? window : "document" === n ? e : "body" === n ? e.body : null;
                }
                getBaseHref(e71) {
                    const n = function tN() {
                        return ji = ji || document.querySelector("base"), ji ? ji.getAttribute("href") : null;
                    }();
                    return null == n ? null : function nN(t) {
                        Mo = Mo || document.createElement("a"), Mo.setAttribute("href", t);
                        const e = Mo.pathname;
                        return "/" === e.charAt(0) ? e : `/${e}`;
                    }(n);
                }
                resetBaseElement() {
                    ji = null;
                }
                getUserAgent() {
                    return window.navigator.userAgent;
                }
                getCookie(e) {
                    return Oy(document.cookie, e);
                }
            };
            let Mo, ji = null;
            const $y = new $("TRANSITION_ID"), iN = [
                {
                    provide: Xm,
                    useFactory: function rN(t, e, n) {
                        return ()=>{
                            n.get(Ou).donePromise.then(()=>{
                                const r = zn(), i = e.querySelectorAll(`style[ng-transition="${t}"]`);
                                for(let s = 0; s < i.length; s++)r.remove(i[s]);
                            });
                        };
                    },
                    deps: [
                        $y,
                        tt,
                        pt
                    ],
                    multi: !0
                }
            ];
            let ac = class ac {
                static init() {
                    !function iT(t) {
                        ju = t;
                    }(new ac);
                }
                addToWindow(e) {
                    Z.getAngularTestability = (r, i = !0)=>{
                        const s = e.findTestabilityInTree(r, i);
                        if (null == s) throw new Error("Could not find testability for element.");
                        return s;
                    }, Z.getAllAngularTestabilities = ()=>e.getAllTestabilities(), Z.getAllAngularRootElements = ()=>e.getAllRootElements(), Z.frameworkStabilizers || (Z.frameworkStabilizers = []), Z.frameworkStabilizers.push((r)=>{
                        const i = Z.getAllAngularTestabilities();
                        let s = i.length, o = !1;
                        const a = function(l) {
                            o = o || l, s--, 0 == s && r(o);
                        };
                        i.forEach(function(l) {
                            l.whenStable(a);
                        });
                    });
                }
                findTestabilityInTree(e, n, r) {
                    if (null == n) return null;
                    const i = e.getTestability(n);
                    return null != i ? i : r ? zn().isShadowRoot(n) ? this.findTestabilityInTree(e, n.host, !0) : this.findTestabilityInTree(e, n.parentElement, !0) : null;
                }
            };
            let sN = (()=>{
                let t = class t {
                    build() {
                        return new XMLHttpRequest;
                    }
                };
                return t.ɵfac = function(n) {
                    return new (n || t);
                }, t.ɵprov = q({
                    token: t,
                    factory: t.ɵfac
                }), t;
            })();
            const So = new $("EventManagerPlugins");
            let Ao = (()=>{
                let t = class t {
                    addEventListener(n, r, i) {
                        return this._findPluginFor(r).addEventListener(n, r, i);
                    }
                    addGlobalEventListener(n, r, i) {
                        return this._findPluginFor(r).addGlobalEventListener(n, r, i);
                    }
                    getZone() {
                        return this._zone;
                    }
                    _findPluginFor(n) {
                        const r = this._eventNameToPlugin.get(n);
                        if (r) return r;
                        const i = this._plugins;
                        for(let s = 0; s < i.length; s++){
                            const o = i[s];
                            if (o.supports(n)) return this._eventNameToPlugin.set(n, o), o;
                        }
                        throw new Error(`No event manager plugin found for event ${n}`);
                    }
                    constructor(n, r){
                        this._zone = r, this._eventNameToPlugin = new Map, n.forEach((i)=>i.manager = this), this._plugins = n.slice().reverse();
                    }
                };
                return t.ɵfac = function(n) {
                    return new (n || t)(F(So), F(xe));
                }, t.ɵprov = q({
                    token: t,
                    factory: t.ɵfac
                }), t;
            })();
            let Uy = class Uy {
                addGlobalEventListener(e, n, r) {
                    const i = zn().getGlobalEventTarget(this._doc, e);
                    if (!i) throw new Error(`Unsupported event target ${i} for event ${n}`);
                    return this.addEventListener(i, n, r);
                }
                constructor(e){
                    this._doc = e;
                }
            };
            let Gy = (()=>{
                let t = class t {
                    addStyles(n) {
                        const r = new Set;
                        n.forEach((i)=>{
                            this._stylesSet.has(i) || (this._stylesSet.add(i), r.add(i));
                        }), this.onStylesAdded(r);
                    }
                    onStylesAdded(n) {}
                    getAllStyles() {
                        return Array.from(this._stylesSet);
                    }
                    constructor(){
                        this._stylesSet = new Set;
                    }
                };
                return t.ɵfac = function(n) {
                    return new (n || t);
                }, t.ɵprov = q({
                    token: t,
                    factory: t.ɵfac
                }), t;
            })(), Hi = (()=>{
                let t = class t extends Gy {
                    _addStylesToHost(n, r, i) {
                        n.forEach((s)=>{
                            const o = this._doc.createElement("style");
                            o.textContent = s, i.push(r.appendChild(o));
                        });
                    }
                    addHost(n) {
                        const r = [];
                        this._addStylesToHost(this._stylesSet, n, r), this._hostNodes.set(n, r);
                    }
                    removeHost(n) {
                        const r = this._hostNodes.get(n);
                        r && r.forEach(qy), this._hostNodes.delete(n);
                    }
                    onStylesAdded(n) {
                        this._hostNodes.forEach((r, i)=>{
                            this._addStylesToHost(n, i, r);
                        });
                    }
                    ngOnDestroy() {
                        this._hostNodes.forEach((n)=>n.forEach(qy));
                    }
                    constructor(n){
                        super(), this._doc = n, this._hostNodes = new Map, this._hostNodes.set(n.head, []);
                    }
                };
                return t.ɵfac = function(n) {
                    return new (n || t)(F(tt));
                }, t.ɵprov = q({
                    token: t,
                    factory: t.ɵfac
                }), t;
            })();
            function qy(t) {
                zn().remove(t);
            }
            const lc = {
                svg: "http://www.w3.org/2000/svg",
                xhtml: "http://www.w3.org/1999/xhtml",
                xlink: "http://www.w3.org/1999/xlink",
                xml: "http://www.w3.org/XML/1998/namespace",
                xmlns: "http://www.w3.org/2000/xmlns/",
                math: "http://www.w3.org/1998/MathML/"
            }, uc = /%COMP%/g;
            function To(t, e, n) {
                for(let r = 0; r < e.length; r++){
                    let i = e[r];
                    Array.isArray(i) ? To(t, i, n) : (i = i.replace(uc, t), n.push(i));
                }
                return n;
            }
            function Qy(t) {
                return (e)=>{
                    if ("__ngUnwrap__" === e) return t;
                    !1 === t(e) && (e.preventDefault(), e.returnValue = !1);
                };
            }
            let Io = (()=>{
                let t = class t {
                    createRenderer(n, r) {
                        if (!n || !r) return this.defaultRenderer;
                        switch(r.encapsulation){
                            case Et.Emulated:
                                {
                                    let i = this.rendererByCompId.get(r.id);
                                    return i || (i = new dN(this.eventManager, this.sharedStylesHost, r, this.appId), this.rendererByCompId.set(r.id, i)), i.applyToHost(n), i;
                                }
                            case 1:
                            case Et.ShadowDom:
                                return new fN(this.eventManager, this.sharedStylesHost, n, r);
                            default:
                                if (!this.rendererByCompId.has(r.id)) {
                                    const i = To(r.id, r.styles, []);
                                    this.sharedStylesHost.addStyles(i), this.rendererByCompId.set(r.id, this.defaultRenderer);
                                }
                                return this.defaultRenderer;
                        }
                    }
                    begin() {}
                    end() {}
                    constructor(n, r, i){
                        this.eventManager = n, this.sharedStylesHost = r, this.appId = i, this.rendererByCompId = new Map, this.defaultRenderer = new cc(n);
                    }
                };
                return t.ɵfac = function(n) {
                    return new (n || t)(F(Ao), F(Hi), F(ki));
                }, t.ɵprov = q({
                    token: t,
                    factory: t.ɵfac
                }), t;
            })();
            let cc = class cc {
                destroy() {}
                createElement(e, n) {
                    return n ? document.createElementNS(lc[n] || n, e) : document.createElement(e);
                }
                createComment(e) {
                    return document.createComment(e);
                }
                createText(e) {
                    return document.createTextNode(e);
                }
                appendChild(e, n) {
                    e.appendChild(n);
                }
                insertBefore(e, n, r) {
                    e && e.insertBefore(n, r);
                }
                removeChild(e, n) {
                    e && e.removeChild(n);
                }
                selectRootElement(e, n) {
                    let r = "string" == typeof e ? document.querySelector(e) : e;
                    if (!r) throw new Error(`The selector "${e}" did not match any elements`);
                    return n || (r.textContent = ""), r;
                }
                parentNode(e) {
                    return e.parentNode;
                }
                nextSibling(e) {
                    return e.nextSibling;
                }
                setAttribute(e, n, r, i) {
                    if (i) {
                        n = i + ":" + n;
                        const s = lc[i];
                        s ? e.setAttributeNS(s, n, r) : e.setAttribute(n, r);
                    } else e.setAttribute(n, r);
                }
                removeAttribute(e, n, r) {
                    if (r) {
                        const i = lc[r];
                        i ? e.removeAttributeNS(i, n) : e.removeAttribute(`${r}:${n}`);
                    } else e.removeAttribute(n);
                }
                addClass(e, n) {
                    e.classList.add(n);
                }
                removeClass(e, n) {
                    e.classList.remove(n);
                }
                setStyle(e, n, r, i) {
                    i & (Ye.DashCase | Ye.Important) ? e.style.setProperty(n, r, i & Ye.Important ? "important" : "") : e.style[n] = r;
                }
                removeStyle(e, n, r) {
                    r & Ye.DashCase ? e.style.removeProperty(n) : e.style[n] = "";
                }
                setProperty(e, n, r) {
                    e[n] = r;
                }
                setValue(e, n) {
                    e.nodeValue = n;
                }
                listen(e, n, r) {
                    return "string" == typeof e ? this.eventManager.addGlobalEventListener(e, n, Qy(r)) : this.eventManager.addEventListener(e, n, Qy(r));
                }
                constructor(e){
                    this.eventManager = e, this.data = Object.create(null), this.destroyNode = null;
                }
            };
            let dN = class dN extends cc {
                applyToHost(e) {
                    super.setAttribute(e, this.hostAttr, "");
                }
                createElement(e, n) {
                    const r = super.createElement(e, n);
                    return super.setAttribute(r, this.contentAttr, ""), r;
                }
                constructor(e, n, r, i){
                    super(e), this.component = r;
                    const s = To(i + "-" + r.id, r.styles, []);
                    n.addStyles(s), this.contentAttr = function lN(t) {
                        return "_ngcontent-%COMP%".replace(uc, t);
                    }(i + "-" + r.id), this.hostAttr = function uN(t) {
                        return "_nghost-%COMP%".replace(uc, t);
                    }(i + "-" + r.id);
                }
            };
            let fN = class fN extends cc {
                nodeOrShadowRoot(e) {
                    return e === this.hostEl ? this.shadowRoot : e;
                }
                destroy() {
                    this.sharedStylesHost.removeHost(this.shadowRoot);
                }
                appendChild(e, n) {
                    return super.appendChild(this.nodeOrShadowRoot(e), n);
                }
                insertBefore(e, n, r) {
                    return super.insertBefore(this.nodeOrShadowRoot(e), n, r);
                }
                removeChild(e, n) {
                    return super.removeChild(this.nodeOrShadowRoot(e), n);
                }
                parentNode(e) {
                    return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(e)));
                }
                constructor(e, n, r, i){
                    super(e), this.sharedStylesHost = n, this.hostEl = r, this.shadowRoot = r.attachShadow({
                        mode: "open"
                    }), this.sharedStylesHost.addHost(this.shadowRoot);
                    const s = To(i.id, i.styles, []);
                    for(let o = 0; o < s.length; o++){
                        const a = document.createElement("style");
                        a.textContent = s[o], this.shadowRoot.appendChild(a);
                    }
                }
            };
            let hN = (()=>{
                let t = class t extends Uy {
                    supports(n) {
                        return !0;
                    }
                    addEventListener(n, r, i) {
                        return n.addEventListener(r, i, !1), ()=>this.removeEventListener(n, r, i);
                    }
                    removeEventListener(n, r, i) {
                        return n.removeEventListener(r, i);
                    }
                    constructor(n){
                        super(n);
                    }
                };
                return t.ɵfac = function(n) {
                    return new (n || t)(F(tt));
                }, t.ɵprov = q({
                    token: t,
                    factory: t.ɵfac
                }), t;
            })();
            const Zy = [
                "alt",
                "control",
                "meta",
                "shift"
            ], gN = {
                "\b": "Backspace",
                "\t": "Tab",
                "\x7f": "Delete",
                "\x1b": "Escape",
                Del: "Delete",
                Esc: "Escape",
                Left: "ArrowLeft",
                Right: "ArrowRight",
                Up: "ArrowUp",
                Down: "ArrowDown",
                Menu: "ContextMenu",
                Scroll: "ScrollLock",
                Win: "OS"
            }, Jy = {
                A: "1",
                B: "2",
                C: "3",
                D: "4",
                E: "5",
                F: "6",
                G: "7",
                H: "8",
                I: "9",
                J: "*",
                K: "+",
                M: "-",
                N: ".",
                O: "/",
                "`": "0",
                "\x90": "NumLock"
            }, mN = {
                alt: (t)=>t.altKey,
                control: (t)=>t.ctrlKey,
                meta: (t)=>t.metaKey,
                shift: (t)=>t.shiftKey
            };
            let yN = (()=>{
                let t83 = class t extends Uy {
                    supports(n) {
                        return null != t.parseEventName(n);
                    }
                    addEventListener(n, r, i) {
                        const s = t.parseEventName(r), o = t.eventCallback(s.fullKey, i, this.manager.getZone());
                        return this.manager.getZone().runOutsideAngular(()=>zn().onAndCancel(n, s.domEventName, o));
                    }
                    static parseEventName(n) {
                        const r = n.toLowerCase().split("."), i = r.shift();
                        if (0 === r.length || "keydown" !== i && "keyup" !== i) return null;
                        const s = t._normalizeKey(r.pop());
                        let o = "";
                        if (Zy.forEach((l)=>{
                            const u = r.indexOf(l);
                            u > -1 && (r.splice(u, 1), o += l + ".");
                        }), o += s, 0 != r.length || 0 === s.length) return null;
                        const a = {};
                        return a.domEventName = i, a.fullKey = o, a;
                    }
                    static getEventFullKey(n) {
                        let r = "", i = function _N(t) {
                            let e = t.key;
                            if (null == e) {
                                if (e = t.keyIdentifier, null == e) return "Unidentified";
                                e.startsWith("U+") && (e = String.fromCharCode(parseInt(e.substring(2), 16)), 3 === t.location && Jy.hasOwnProperty(e) && (e = Jy[e]));
                            }
                            return gN[e] || e;
                        }(n);
                        return i = i.toLowerCase(), " " === i ? i = "space" : "." === i && (i = "dot"), Zy.forEach((s)=>{
                            s != i && mN[s](n) && (r += s + ".");
                        }), r += i, r;
                    }
                    static eventCallback(n, r, i) {
                        return (s)=>{
                            t.getEventFullKey(s) === n && i.runGuarded(()=>r(s));
                        };
                    }
                    static _normalizeKey(n) {
                        return "esc" === n ? "escape" : n;
                    }
                    constructor(n){
                        super(n);
                    }
                };
                return t83.ɵfac = function(n) {
                    return new (n || t83)(F(tt));
                }, t83.ɵprov = q({
                    token: t83,
                    factory: t83.ɵfac
                }), t83;
            })();
            const CN = oy(TT, "browser", [
                {
                    provide: Ru,
                    useValue: "browser"
                },
                {
                    provide: ty,
                    useValue: function vN() {
                        oc.makeCurrent(), ac.init();
                    },
                    multi: !0
                },
                {
                    provide: tt,
                    useFactory: function EN() {
                        return function TE(t) {
                            Fa = t;
                        }(document), document;
                    },
                    deps: []
                }
            ]), wN = [
                {
                    provide: Wl,
                    useValue: "root"
                },
                {
                    provide: _i,
                    useFactory: function DN() {
                        return new _i;
                    },
                    deps: []
                },
                {
                    provide: So,
                    useClass: hN,
                    multi: !0,
                    deps: [
                        tt,
                        xe,
                        Ru
                    ]
                },
                {
                    provide: So,
                    useClass: yN,
                    multi: !0,
                    deps: [
                        tt
                    ]
                },
                {
                    provide: Io,
                    useClass: Io,
                    deps: [
                        Ao,
                        Hi,
                        ki
                    ]
                },
                {
                    provide: Fi,
                    useExisting: Io
                },
                {
                    provide: Gy,
                    useExisting: Hi
                },
                {
                    provide: Hi,
                    useClass: Hi,
                    deps: [
                        tt
                    ]
                },
                {
                    provide: Bu,
                    useClass: Bu,
                    deps: [
                        xe
                    ]
                },
                {
                    provide: Ao,
                    useClass: Ao,
                    deps: [
                        So,
                        xe
                    ]
                },
                {
                    provide: Hy,
                    useClass: sN,
                    deps: []
                }
            ];
            let Yy = (()=>{
                let t = class t {
                    static withServerTransition(n) {
                        return {
                            ngModule: t,
                            providers: [
                                {
                                    provide: ki,
                                    useValue: n.appId
                                },
                                {
                                    provide: $y,
                                    useExisting: ki
                                },
                                iN
                            ]
                        };
                    }
                    constructor(n){
                        if (n) throw new Error("BrowserModule has already been loaded. If you need access to common directives such as NgIf and NgFor from a lazy loaded module, import CommonModule instead.");
                    }
                };
                return t.ɵfac = function(n) {
                    return new (n || t)(F(t, 12));
                }, t.ɵmod = lt({
                    type: t
                }), t.ɵinj = Qe({
                    providers: wN,
                    imports: [
                        Ly,
                        IT
                    ]
                }), t;
            })();
            "undefined" != typeof window && window;
            let t_ = class t_ {
            };
            let n_ = class n_ {
            };
            let sn = class sn {
                has(e) {
                    return this.init(), this.headers.has(e.toLowerCase());
                }
                get(e) {
                    this.init();
                    const n = this.headers.get(e.toLowerCase());
                    return n && n.length > 0 ? n[0] : null;
                }
                keys() {
                    return this.init(), Array.from(this.normalizedNames.values());
                }
                getAll(e) {
                    return this.init(), this.headers.get(e.toLowerCase()) || null;
                }
                append(e, n) {
                    return this.clone({
                        name: e,
                        value: n,
                        op: "a"
                    });
                }
                set(e, n) {
                    return this.clone({
                        name: e,
                        value: n,
                        op: "s"
                    });
                }
                delete(e, n) {
                    return this.clone({
                        name: e,
                        value: n,
                        op: "d"
                    });
                }
                maybeSetNormalizedName(e, n) {
                    this.normalizedNames.has(n) || this.normalizedNames.set(n, e);
                }
                init() {
                    this.lazyInit && (this.lazyInit instanceof sn ? this.copyFrom(this.lazyInit) : this.lazyInit(), this.lazyInit = null, this.lazyUpdate && (this.lazyUpdate.forEach((e)=>this.applyUpdate(e)), this.lazyUpdate = null));
                }
                copyFrom(e) {
                    e.init(), Array.from(e.headers.keys()).forEach((n)=>{
                        this.headers.set(n, e.headers.get(n)), this.normalizedNames.set(n, e.normalizedNames.get(n));
                    });
                }
                clone(e) {
                    const n = new sn;
                    return n.lazyInit = this.lazyInit && this.lazyInit instanceof sn ? this.lazyInit : this, n.lazyUpdate = (this.lazyUpdate || []).concat([
                        e
                    ]), n;
                }
                applyUpdate(e) {
                    const n = e.name.toLowerCase();
                    switch(e.op){
                        case "a":
                        case "s":
                            let r = e.value;
                            if ("string" == typeof r && (r = [
                                r
                            ]), 0 === r.length) return;
                            this.maybeSetNormalizedName(e.name, n);
                            const i = ("a" === e.op ? this.headers.get(n) : void 0) || [];
                            i.push(...r), this.headers.set(n, i);
                            break;
                        case "d":
                            const s = e.value;
                            if (s) {
                                let o = this.headers.get(n);
                                if (!o) return;
                                o = o.filter((a)=>-1 === s.indexOf(a)), 0 === o.length ? (this.headers.delete(n), this.normalizedNames.delete(n)) : this.headers.set(n, o);
                            } else this.headers.delete(n), this.normalizedNames.delete(n);
                    }
                }
                forEach(e) {
                    this.init(), Array.from(this.normalizedNames.keys()).forEach((n)=>e(this.normalizedNames.get(n), this.headers.get(n)));
                }
                constructor(e){
                    this.normalizedNames = new Map, this.lazyUpdate = null, e ? this.lazyInit = "string" == typeof e ? ()=>{
                        this.headers = new Map, e.split("\n").forEach((n)=>{
                            const r = n.indexOf(":");
                            if (r > 0) {
                                const i = n.slice(0, r), s = i.toLowerCase(), o = n.slice(r + 1).trim();
                                this.maybeSetNormalizedName(i, s), this.headers.has(s) ? this.headers.get(s).push(o) : this.headers.set(s, [
                                    o
                                ]);
                            }
                        });
                    } : ()=>{
                        this.headers = new Map, Object.keys(e).forEach((n)=>{
                            let r = e[n];
                            const i = n.toLowerCase();
                            "string" == typeof r && (r = [
                                r
                            ]), r.length > 0 && (this.headers.set(i, r), this.maybeSetNormalizedName(n, i));
                        });
                    } : this.headers = new Map;
                }
            };
            let VN = class VN {
                encodeKey(e) {
                    return r_(e);
                }
                encodeValue(e) {
                    return r_(e);
                }
                decodeKey(e) {
                    return decodeURIComponent(e);
                }
                decodeValue(e) {
                    return decodeURIComponent(e);
                }
            };
            const BN = /%(\d[a-f0-9])/gi, jN = {
                40: "@",
                "3A": ":",
                24: "$",
                "2C": ",",
                "3B": ";",
                "2B": "+",
                "3D": "=",
                "3F": "?",
                "2F": "/"
            };
            function r_(t) {
                return encodeURIComponent(t).replace(BN, (e, n)=>{
                    var r;
                    return null !== (r = jN[n]) && void 0 !== r ? r : e;
                });
            }
            function i_(t) {
                return `${t}`;
            }
            let Dn = class Dn {
                has(e) {
                    return this.init(), this.map.has(e);
                }
                get(e) {
                    this.init();
                    const n = this.map.get(e);
                    return n ? n[0] : null;
                }
                getAll(e) {
                    return this.init(), this.map.get(e) || null;
                }
                keys() {
                    return this.init(), Array.from(this.map.keys());
                }
                append(e, n) {
                    return this.clone({
                        param: e,
                        value: n,
                        op: "a"
                    });
                }
                appendAll(e) {
                    const n = [];
                    return Object.keys(e).forEach((r)=>{
                        const i = e[r];
                        Array.isArray(i) ? i.forEach((s)=>{
                            n.push({
                                param: r,
                                value: s,
                                op: "a"
                            });
                        }) : n.push({
                            param: r,
                            value: i,
                            op: "a"
                        });
                    }), this.clone(n);
                }
                set(e, n) {
                    return this.clone({
                        param: e,
                        value: n,
                        op: "s"
                    });
                }
                delete(e, n) {
                    return this.clone({
                        param: e,
                        value: n,
                        op: "d"
                    });
                }
                toString() {
                    return this.init(), this.keys().map((e)=>{
                        const n = this.encoder.encodeKey(e);
                        return this.map.get(e).map((r)=>n + "=" + this.encoder.encodeValue(r)).join("&");
                    }).filter((e)=>"" !== e).join("&");
                }
                clone(e) {
                    const n = new Dn({
                        encoder: this.encoder
                    });
                    return n.cloneFrom = this.cloneFrom || this, n.updates = (this.updates || []).concat(e), n;
                }
                init() {
                    null === this.map && (this.map = new Map), null !== this.cloneFrom && (this.cloneFrom.init(), this.cloneFrom.keys().forEach((e)=>this.map.set(e, this.cloneFrom.map.get(e))), this.updates.forEach((e)=>{
                        switch(e.op){
                            case "a":
                            case "s":
                                const n = ("a" === e.op ? this.map.get(e.param) : void 0) || [];
                                n.push(i_(e.value)), this.map.set(e.param, n);
                                break;
                            case "d":
                                if (void 0 === e.value) {
                                    this.map.delete(e.param);
                                    break;
                                }
                                {
                                    let r = this.map.get(e.param) || [];
                                    const i = r.indexOf(i_(e.value));
                                    -1 !== i && r.splice(i, 1), r.length > 0 ? this.map.set(e.param, r) : this.map.delete(e.param);
                                }
                        }
                    }), this.cloneFrom = this.updates = null);
                }
                constructor(e72 = {}){
                    if (this.updates = null, this.cloneFrom = null, this.encoder = e72.encoder || new VN, e72.fromString) {
                        if (e72.fromObject) throw new Error("Cannot specify both fromString and fromObject.");
                        this.map = function LN(t, e) {
                            const n = new Map;
                            return t.length > 0 && t.replace(/^\?/, "").split("&").forEach((i)=>{
                                const s = i.indexOf("="), [o, a] = -1 == s ? [
                                    e.decodeKey(i),
                                    ""
                                ] : [
                                    e.decodeKey(i.slice(0, s)),
                                    e.decodeValue(i.slice(s + 1))
                                ], l = n.get(o) || [];
                                l.push(a), n.set(o, l);
                            }), n;
                        }(e72.fromString, this.encoder);
                    } else e72.fromObject ? (this.map = new Map, Object.keys(e72.fromObject).forEach((n)=>{
                        const r = e72.fromObject[n];
                        this.map.set(n, Array.isArray(r) ? r : [
                            r
                        ]);
                    })) : this.map = null;
                }
            };
            let HN = class HN {
                set(e, n) {
                    return this.map.set(e, n), this;
                }
                get(e) {
                    return this.map.has(e) || this.map.set(e, e.defaultValue()), this.map.get(e);
                }
                delete(e) {
                    return this.map.delete(e), this;
                }
                has(e) {
                    return this.map.has(e);
                }
                keys() {
                    return this.map.keys();
                }
                constructor(){
                    this.map = new Map;
                }
            };
            function s_(t) {
                return "undefined" != typeof ArrayBuffer && t instanceof ArrayBuffer;
            }
            function o_(t) {
                return "undefined" != typeof Blob && t instanceof Blob;
            }
            function a_(t) {
                return "undefined" != typeof FormData && t instanceof FormData;
            }
            let $i = class $i {
                serializeBody() {
                    return null === this.body ? null : s_(this.body) || o_(this.body) || a_(this.body) || function UN(t) {
                        return "undefined" != typeof URLSearchParams && t instanceof URLSearchParams;
                    }(this.body) || "string" == typeof this.body ? this.body : this.body instanceof Dn ? this.body.toString() : "object" == typeof this.body || "boolean" == typeof this.body || Array.isArray(this.body) ? JSON.stringify(this.body) : this.body.toString();
                }
                detectContentTypeHeader() {
                    return null === this.body || a_(this.body) ? null : o_(this.body) ? this.body.type || null : s_(this.body) ? null : "string" == typeof this.body ? "text/plain" : this.body instanceof Dn ? "application/x-www-form-urlencoded;charset=UTF-8" : "object" == typeof this.body || "number" == typeof this.body || "boolean" == typeof this.body ? "application/json" : null;
                }
                clone(e = {}) {
                    var n;
                    const r = e.method || this.method, i = e.url || this.url, s = e.responseType || this.responseType, o = void 0 !== e.body ? e.body : this.body, a = void 0 !== e.withCredentials ? e.withCredentials : this.withCredentials, l = void 0 !== e.reportProgress ? e.reportProgress : this.reportProgress;
                    let u = e.headers || this.headers, c = e.params || this.params;
                    const d = null !== (n = e.context) && void 0 !== n ? n : this.context;
                    return void 0 !== e.setHeaders && (u = Object.keys(e.setHeaders).reduce((f, h)=>f.set(h, e.setHeaders[h]), u)), e.setParams && (c = Object.keys(e.setParams).reduce((f, h)=>f.set(h, e.setParams[h]), c)), new $i(r, i, o, {
                        params: c,
                        headers: u,
                        context: d,
                        reportProgress: l,
                        responseType: s,
                        withCredentials: a
                    });
                }
                constructor(e, n, r, i){
                    let s;
                    if (this.url = n, this.body = null, this.reportProgress = !1, this.withCredentials = !1, this.responseType = "json", this.method = e.toUpperCase(), function $N(t) {
                        switch(t){
                            case "DELETE":
                            case "GET":
                            case "HEAD":
                            case "OPTIONS":
                            case "JSONP":
                                return !1;
                            default:
                                return !0;
                        }
                    }(this.method) || i ? (this.body = void 0 !== r ? r : null, s = i) : s = r, s && (this.reportProgress = !!s.reportProgress, this.withCredentials = !!s.withCredentials, s.responseType && (this.responseType = s.responseType), s.headers && (this.headers = s.headers), s.context && (this.context = s.context), s.params && (this.params = s.params)), this.headers || (this.headers = new sn), this.context || (this.context = new HN), this.params) {
                        const o = this.params.toString();
                        if (0 === o.length) this.urlWithParams = n;
                        else {
                            const a = n.indexOf("?");
                            this.urlWithParams = n + (-1 === a ? "?" : a < n.length - 1 ? "&" : "") + o;
                        }
                    } else this.params = new Dn, this.urlWithParams = n;
                }
            };
            var ve = (()=>((ve = ve || {})[ve.Sent = 0] = "Sent", ve[ve.UploadProgress = 1] = "UploadProgress", ve[ve.ResponseHeader = 2] = "ResponseHeader", ve[ve.DownloadProgress = 3] = "DownloadProgress", ve[ve.Response = 4] = "Response", ve[ve.User = 5] = "User", ve))();
            let fc = class fc {
                constructor(e, n = 200, r = "OK"){
                    this.headers = e.headers || new sn, this.status = void 0 !== e.status ? e.status : n, this.statusText = e.statusText || r, this.url = e.url || null, this.ok = this.status >= 200 && this.status < 300;
                }
            };
            let hc = class hc extends fc {
                clone(e = {}) {
                    return new hc({
                        headers: e.headers || this.headers,
                        status: void 0 !== e.status ? e.status : this.status,
                        statusText: e.statusText || this.statusText,
                        url: e.url || this.url || void 0
                    });
                }
                constructor(e = {}){
                    super(e), this.type = ve.ResponseHeader;
                }
            };
            let No = class No extends fc {
                clone(e = {}) {
                    return new No({
                        body: void 0 !== e.body ? e.body : this.body,
                        headers: e.headers || this.headers,
                        status: void 0 !== e.status ? e.status : this.status,
                        statusText: e.statusText || this.statusText,
                        url: e.url || this.url || void 0
                    });
                }
                constructor(e = {}){
                    super(e), this.type = ve.Response, this.body = void 0 !== e.body ? e.body : null;
                }
            };
            let l_ = class l_ extends fc {
                constructor(e){
                    super(e, 0, "Unknown Error"), this.name = "HttpErrorResponse", this.ok = !1, this.message = this.status >= 200 && this.status < 300 ? `Http failure during parsing for ${e.url || "(unknown url)"}` : `Http failure response for ${e.url || "(unknown url)"}: ${e.status} ${e.statusText}`, this.error = e.error || null;
                }
            };
            function pc(t, e) {
                return {
                    body: e,
                    headers: t.headers,
                    context: t.context,
                    observe: t.observe,
                    params: t.params,
                    reportProgress: t.reportProgress,
                    responseType: t.responseType,
                    withCredentials: t.withCredentials
                };
            }
            let u_ = (()=>{
                let t84 = class t {
                    request(n59, r41, i28 = {}) {
                        let s29;
                        if (n59 instanceof $i) s29 = n59;
                        else {
                            let l, u;
                            l = i28.headers instanceof sn ? i28.headers : new sn(i28.headers), i28.params && (u = i28.params instanceof Dn ? i28.params : new Dn({
                                fromObject: i28.params
                            })), s29 = new $i(n59, r41, void 0 !== i28.body ? i28.body : null, {
                                headers: l,
                                context: i28.context,
                                params: u,
                                reportProgress: i28.reportProgress,
                                responseType: i28.responseType || "json",
                                withCredentials: i28.withCredentials
                            });
                        }
                        const o = (function xN(...t) {
                            return rs(t, Rd(t));
                        })(s29).pipe(function RN(t, e) {
                            return re(e) ? ns(t, e, 1) : ns(t, 1);
                        }((l)=>this.handler.handle(l)));
                        if (n59 instanceof $i || "events" === i28.observe) return o;
                        const a = o.pipe(function kN(t, e) {
                            return Nn((n, r)=>{
                                let i = 0;
                                n.subscribe(Fn(r, (s)=>t.call(e, s, i++) && r.next(s)));
                            });
                        }((l)=>l instanceof No));
                        switch(i28.observe || "body"){
                            case "body":
                                switch(s29.responseType){
                                    case "arraybuffer":
                                        return a.pipe(Pn((l)=>{
                                            if (null !== l.body && !(l.body instanceof ArrayBuffer)) throw new Error("Response is not an ArrayBuffer.");
                                            return l.body;
                                        }));
                                    case "blob":
                                        return a.pipe(Pn((l)=>{
                                            if (null !== l.body && !(l.body instanceof Blob)) throw new Error("Response is not a Blob.");
                                            return l.body;
                                        }));
                                    case "text":
                                        return a.pipe(Pn((l)=>{
                                            if (null !== l.body && "string" != typeof l.body) throw new Error("Response is not a string.");
                                            return l.body;
                                        }));
                                    default:
                                        return a.pipe(Pn((l)=>l.body));
                                }
                            case "response":
                                return a;
                            default:
                                throw new Error(`Unreachable: unhandled observe type ${i28.observe}}`);
                        }
                    }
                    delete(n, r = {}) {
                        return this.request("DELETE", n, r);
                    }
                    get(n, r = {}) {
                        return this.request("GET", n, r);
                    }
                    head(n, r = {}) {
                        return this.request("HEAD", n, r);
                    }
                    jsonp(n, r) {
                        return this.request("JSONP", n, {
                            params: (new Dn).append(r, "JSONP_CALLBACK"),
                            observe: "body",
                            responseType: "json"
                        });
                    }
                    options(n, r = {}) {
                        return this.request("OPTIONS", n, r);
                    }
                    patch(n, r, i = {}) {
                        return this.request("PATCH", n, pc(i, r));
                    }
                    post(n, r, i = {}) {
                        return this.request("POST", n, pc(i, r));
                    }
                    put(n, r, i = {}) {
                        return this.request("PUT", n, pc(i, r));
                    }
                    constructor(n){
                        this.handler = n;
                    }
                };
                return t84.ɵfac = function(n) {
                    return new (n || t84)(F(t_));
                }, t84.ɵprov = q({
                    token: t84,
                    factory: t84.ɵfac
                }), t84;
            })();
            let c_ = class c_ {
                handle(e) {
                    return this.interceptor.intercept(e, this.next);
                }
                constructor(e, n){
                    this.next = e, this.interceptor = n;
                }
            };
            const d_ = new $("HTTP_INTERCEPTORS");
            let GN = (()=>{
                let t = class t {
                    intercept(n, r) {
                        return r.handle(n);
                    }
                };
                return t.ɵfac = function(n) {
                    return new (n || t);
                }, t.ɵprov = q({
                    token: t,
                    factory: t.ɵfac
                }), t;
            })();
            const qN = /^\)\]\}',?\n/;
            let f_ = (()=>{
                let t85 = class t {
                    handle(n) {
                        if ("JSONP" === n.method) throw new Error("Attempted to construct Jsonp request without HttpClientJsonpModule installed.");
                        return new Ae((r)=>{
                            const i = this.xhrFactory.build();
                            if (i.open(n.method, n.urlWithParams), n.withCredentials && (i.withCredentials = !0), n.headers.forEach((h, p)=>i.setRequestHeader(h, p.join(","))), n.headers.has("Accept") || i.setRequestHeader("Accept", "application/json, text/plain, */*"), !n.headers.has("Content-Type")) {
                                const h = n.detectContentTypeHeader();
                                null !== h && i.setRequestHeader("Content-Type", h);
                            }
                            if (n.responseType) {
                                const h = n.responseType.toLowerCase();
                                i.responseType = "json" !== h ? h : "text";
                            }
                            const s = n.serializeBody();
                            let o = null;
                            const a = ()=>{
                                if (null !== o) return o;
                                const h = i.statusText || "OK", p = new sn(i.getAllResponseHeaders()), g = function zN(t) {
                                    return "responseURL" in t && t.responseURL ? t.responseURL : /^X-Request-URL:/m.test(t.getAllResponseHeaders()) ? t.getResponseHeader("X-Request-URL") : null;
                                }(i) || n.url;
                                return o = new hc({
                                    headers: p,
                                    status: i.status,
                                    statusText: h,
                                    url: g
                                }), o;
                            }, l = ()=>{
                                let { headers: h , status: p , statusText: g , url: y  } = a(), _ = null;
                                204 !== p && (_ = void 0 === i.response ? i.responseText : i.response), 0 === p && (p = _ ? 200 : 0);
                                let m = p >= 200 && p < 300;
                                if ("json" === n.responseType && "string" == typeof _) {
                                    const E = _;
                                    _ = _.replace(qN, "");
                                    try {
                                        _ = "" !== _ ? JSON.parse(_) : null;
                                    } catch (S) {
                                        _ = E, m && (m = !1, _ = {
                                            error: S,
                                            text: _
                                        });
                                    }
                                }
                                m ? (r.next(new No({
                                    body: _,
                                    headers: h,
                                    status: p,
                                    statusText: g,
                                    url: y || void 0
                                })), r.complete()) : r.error(new l_({
                                    error: _,
                                    headers: h,
                                    status: p,
                                    statusText: g,
                                    url: y || void 0
                                }));
                            }, u = (h)=>{
                                const { url: p  } = a(), g = new l_({
                                    error: h,
                                    status: i.status || 0,
                                    statusText: i.statusText || "Unknown Error",
                                    url: p || void 0
                                });
                                r.error(g);
                            };
                            let c = !1;
                            const d = (h)=>{
                                c || (r.next(a()), c = !0);
                                let p = {
                                    type: ve.DownloadProgress,
                                    loaded: h.loaded
                                };
                                h.lengthComputable && (p.total = h.total), "text" === n.responseType && !!i.responseText && (p.partialText = i.responseText), r.next(p);
                            }, f = (h)=>{
                                let p = {
                                    type: ve.UploadProgress,
                                    loaded: h.loaded
                                };
                                h.lengthComputable && (p.total = h.total), r.next(p);
                            };
                            return i.addEventListener("load", l), i.addEventListener("error", u), i.addEventListener("timeout", u), i.addEventListener("abort", u), n.reportProgress && (i.addEventListener("progress", d), null !== s && i.upload && i.upload.addEventListener("progress", f)), i.send(s), r.next({
                                type: ve.Sent
                            }), ()=>{
                                i.removeEventListener("error", u), i.removeEventListener("abort", u), i.removeEventListener("load", l), i.removeEventListener("timeout", u), n.reportProgress && (i.removeEventListener("progress", d), null !== s && i.upload && i.upload.removeEventListener("progress", f)), i.readyState !== i.DONE && i.abort();
                            };
                        });
                    }
                    constructor(n){
                        this.xhrFactory = n;
                    }
                };
                return t85.ɵfac = function(n) {
                    return new (n || t85)(F(Hy));
                }, t85.ɵprov = q({
                    token: t85,
                    factory: t85.ɵfac
                }), t85;
            })();
            const gc = new $("XSRF_COOKIE_NAME"), mc = new $("XSRF_HEADER_NAME");
            let h_ = class h_ {
            };
            let WN = (()=>{
                let t = class t {
                    getToken() {
                        if ("server" === this.platform) return null;
                        const n = this.doc.cookie || "";
                        return n !== this.lastCookieString && (this.parseCount++, this.lastToken = Oy(n, this.cookieName), this.lastCookieString = n), this.lastToken;
                    }
                    constructor(n, r, i){
                        this.doc = n, this.platform = r, this.cookieName = i, this.lastCookieString = "", this.lastToken = null, this.parseCount = 0;
                    }
                };
                return t.ɵfac = function(n) {
                    return new (n || t)(F(tt), F(Ru), F(gc));
                }, t.ɵprov = q({
                    token: t,
                    factory: t.ɵfac
                }), t;
            })(), yc = (()=>{
                let t = class t {
                    intercept(n, r) {
                        const i = n.url.toLowerCase();
                        if ("GET" === n.method || "HEAD" === n.method || i.startsWith("http://") || i.startsWith("https://")) return r.handle(n);
                        const s = this.tokenService.getToken();
                        return null !== s && !n.headers.has(this.headerName) && (n = n.clone({
                            headers: n.headers.set(this.headerName, s)
                        })), r.handle(n);
                    }
                    constructor(n, r){
                        this.tokenService = n, this.headerName = r;
                    }
                };
                return t.ɵfac = function(n) {
                    return new (n || t)(F(h_), F(mc));
                }, t.ɵprov = q({
                    token: t,
                    factory: t.ɵfac
                }), t;
            })(), QN = (()=>{
                let t = class t {
                    handle(n) {
                        if (null === this.chain) {
                            const r = this.injector.get(d_, []);
                            this.chain = r.reduceRight((i, s)=>new c_(i, s), this.backend);
                        }
                        return this.chain.handle(n);
                    }
                    constructor(n, r){
                        this.backend = n, this.injector = r, this.chain = null;
                    }
                };
                return t.ɵfac = function(n) {
                    return new (n || t)(F(n_), F(pt));
                }, t.ɵprov = q({
                    token: t,
                    factory: t.ɵfac
                }), t;
            })(), KN = (()=>{
                let t = class t {
                    static disable() {
                        return {
                            ngModule: t,
                            providers: [
                                {
                                    provide: yc,
                                    useClass: GN
                                }
                            ]
                        };
                    }
                    static withOptions(n = {}) {
                        return {
                            ngModule: t,
                            providers: [
                                n.cookieName ? {
                                    provide: gc,
                                    useValue: n.cookieName
                                } : [],
                                n.headerName ? {
                                    provide: mc,
                                    useValue: n.headerName
                                } : []
                            ]
                        };
                    }
                };
                return t.ɵfac = function(n) {
                    return new (n || t);
                }, t.ɵmod = lt({
                    type: t
                }), t.ɵinj = Qe({
                    providers: [
                        yc,
                        {
                            provide: d_,
                            useExisting: yc,
                            multi: !0
                        },
                        {
                            provide: h_,
                            useClass: WN
                        },
                        {
                            provide: gc,
                            useValue: "XSRF-TOKEN"
                        },
                        {
                            provide: mc,
                            useValue: "X-XSRF-TOKEN"
                        }
                    ]
                }), t;
            })(), ZN = (()=>{
                let t = class t {
                };
                return t.ɵfac = function(n) {
                    return new (n || t);
                }, t.ɵmod = lt({
                    type: t
                }), t.ɵinj = Qe({
                    providers: [
                        u_,
                        {
                            provide: t_,
                            useClass: QN
                        },
                        f_,
                        {
                            provide: n_,
                            useExisting: f_
                        }
                    ],
                    imports: [
                        [
                            KN.withOptions({
                                cookieName: "XSRF-TOKEN",
                                headerName: "X-XSRF-TOKEN"
                            })
                        ]
                    ]
                }), t;
            })(), p_ = (()=>{
                let t = class t {
                    insert(n) {
                        let r = this.root;
                        for (let i of n)void 0 === r.children[i] && (r.children[i] = new g_(i)), r = r.children[i];
                        r.isEndOfWord = !0, this.updateFile();
                    }
                    bulkInsert(n) {
                        n.forEach((r)=>{
                            this.insert(r);
                        }), this.updateFile();
                    }
                    populateFromFile() {
                        this.http.get("/api/trie/populateFromFile").subscribe((n)=>{
                            n && n.data && JSON.stringify(n.data) !== JSON.stringify({}) && (this.root = n.data);
                        });
                    }
                    updateFile() {}
                    search(n) {
                        let r = this.root;
                        for (let i of n){
                            if (void 0 === r.children[i]) return !1;
                            r = r.children[i];
                        }
                        return r.isEndOfWord;
                    }
                    constructor(n){
                        this.http = n, this.root = new g_(null), n.get("/api/trie").subscribe((r)=>{
                            r && r.data && JSON.stringify(r.data) !== JSON.stringify({}) && (this.root = r.data);
                        });
                    }
                };
                return t.ɵfac = function(n) {
                    return new (n || t)(F(u_));
                }, t.ɵprov = q({
                    token: t,
                    factory: t.ɵfac,
                    providedIn: "root"
                }), t;
            })();
            let g_ = class g_ {
                populateTrieNode(e) {
                    this.value = e, this.isEndOfWord = !1, this.children = {};
                }
                constructor(e){
                    this.value = "", this.isEndOfWord = !1, this.children = {}, this.value = e;
                }
            };
            const { isArray: JN  } = Array, { getPrototypeOf: YN , prototype: XN , keys: eF  } = Object;
            const { isArray: rF  } = Array;
            function oF(t, e) {
                return t.reduce((n, r, i)=>(n[r] = e[i], n), {});
            }
            function aF(...t86) {
                const e73 = function $D(t) {
                    return re(pa(t)) ? t.pop() : void 0;
                }(t86), { args: n60 , keys: r42  } = function tF(t87) {
                    if (1 === t87.length) {
                        const e = t87[0];
                        if (JN(e)) return {
                            args: e,
                            keys: null
                        };
                        if (function nF(t) {
                            return t && "object" == typeof t && YN(t) === XN;
                        }(e)) {
                            const n = eF(e);
                            return {
                                args: n.map((r)=>e[r]),
                                keys: n
                            };
                        }
                    }
                    return {
                        args: t87,
                        keys: null
                    };
                }(t86), i = new Ae((s)=>{
                    const { length: o  } = n60;
                    if (!o) return void s.complete();
                    const a = new Array(o);
                    let l = o, u = o;
                    for(let c = 0; c < o; c++){
                        let d = !1;
                        xn(n60[c]).subscribe(Fn(s, (f)=>{
                            d || (d = !0, u--), a[c] = f;
                        }, ()=>l--, void 0, ()=>{
                            (!l || !d) && (u || s.next(r42 ? oF(r42, a) : a), s.complete());
                        }));
                    }
                });
                return e73 ? i.pipe(function sF(t88) {
                    return Pn((e74)=>(function iF(t, e) {
                            return rF(e) ? t(...e) : t(e);
                        })(t88, e74));
                }(e73)) : i;
            }
            let m_ = (()=>{
                let t = class t {
                    setProperty(n, r) {
                        this._renderer.setProperty(this._elementRef.nativeElement, n, r);
                    }
                    registerOnTouched(n) {
                        this.onTouched = n;
                    }
                    registerOnChange(n) {
                        this.onChange = n;
                    }
                    setDisabledState(n) {
                        this.setProperty("disabled", n);
                    }
                    constructor(n, r){
                        this._renderer = n, this._elementRef = r, this.onChange = (i)=>{}, this.onTouched = ()=>{};
                    }
                };
                return t.ɵfac = function(n) {
                    return new (n || t)(D(Un), D(Nt));
                }, t.ɵdir = O({
                    type: t
                }), t;
            })(), Wn = (()=>{
                let t89 = class t extends m_ {
                };
                return t89.ɵfac = function() {
                    let e75;
                    return function(r43) {
                        return (e75 || (e75 = function Ne(t) {
                            return cn(()=>{
                                const e = t.prototype.constructor, n = e[Kt] || Wa(e), r = Object.prototype;
                                let i = Object.getPrototypeOf(t.prototype).constructor;
                                for(; i && i !== r;){
                                    const s = i[Kt] || Wa(i);
                                    if (s && s !== n) return s;
                                    i = Object.getPrototypeOf(i);
                                }
                                return (s)=>new s;
                            });
                        }(t89)))(r43 || t89);
                    };
                }(), t89.ɵdir = O({
                    type: t89,
                    features: [
                        K
                    ]
                }), t89;
            })();
            const qt = new $("NgValueAccessor"), uF = {
                provide: qt,
                useExisting: ee(()=>Fo),
                multi: !0
            }, dF = new $("CompositionEventMode");
            let Fo = (()=>{
                let t90 = class t extends m_ {
                    writeValue(n) {
                        this.setProperty("value", null == n ? "" : n);
                    }
                    _handleInput(n) {
                        (!this._compositionMode || this._compositionMode && !this._composing) && this.onChange(n);
                    }
                    _compositionStart() {
                        this._composing = !0;
                    }
                    _compositionEnd(n) {
                        this._composing = !1, this._compositionMode && this.onChange(n);
                    }
                    constructor(n, r, i){
                        super(n, r), this._compositionMode = i, this._composing = !1, null == this._compositionMode && (this._compositionMode = !function cF() {
                            const t = zn() ? zn().getUserAgent() : "";
                            return /android (\d+)/.test(t.toLowerCase());
                        }());
                    }
                };
                return t90.ɵfac = function(n) {
                    return new (n || t90)(D(Un), D(Nt), D(dF, 8));
                }, t90.ɵdir = O({
                    type: t90,
                    selectors: [
                        [
                            "input",
                            "formControlName",
                            "",
                            3,
                            "type",
                            "checkbox"
                        ],
                        [
                            "textarea",
                            "formControlName",
                            ""
                        ],
                        [
                            "input",
                            "formControl",
                            "",
                            3,
                            "type",
                            "checkbox"
                        ],
                        [
                            "textarea",
                            "formControl",
                            ""
                        ],
                        [
                            "input",
                            "ngModel",
                            "",
                            3,
                            "type",
                            "checkbox"
                        ],
                        [
                            "textarea",
                            "ngModel",
                            ""
                        ],
                        [
                            "",
                            "ngDefaultControl",
                            ""
                        ]
                    ],
                    hostBindings: function(n, r) {
                        1 & n && et("input", function(s) {
                            return r._handleInput(s.target.value);
                        })("blur", function() {
                            return r.onTouched();
                        })("compositionstart", function() {
                            return r._compositionStart();
                        })("compositionend", function(s) {
                            return r._compositionEnd(s.target.value);
                        });
                    },
                    features: [
                        se([
                            uF
                        ]),
                        K
                    ]
                }), t90;
            })();
            const Re = new $("NgValidators"), Cn = new $("NgAsyncValidators");
            function A_(t) {
                return null != t;
            }
            function T_(t) {
                const e = Zs(t) ? rs(t) : t;
                return Wp(e), e;
            }
            function I_(t) {
                let e = {};
                return t.forEach((n)=>{
                    e = null != n ? Object.assign(Object.assign({}, e), n) : e;
                }), 0 === Object.keys(e).length ? null : e;
            }
            function N_(t, e) {
                return e.map((n)=>n(t));
            }
            function F_(t91) {
                return t91.map((e)=>(function hF(t) {
                        return !t.validate;
                    })(e) ? e : (n)=>e.validate(n));
            }
            function _c(t92) {
                return null != t92 ? function P_(t) {
                    if (!t) return null;
                    const e = t.filter(A_);
                    return 0 == e.length ? null : function(n) {
                        return I_(N_(n, e));
                    };
                }(F_(t92)) : null;
            }
            function vc(t93) {
                return null != t93 ? function O_(t) {
                    if (!t) return null;
                    const e = t.filter(A_);
                    return 0 == e.length ? null : function(n) {
                        return aF(N_(n, e).map(T_)).pipe(Pn(I_));
                    };
                }(F_(t93)) : null;
            }
            function x_(t, e) {
                return null === t ? [
                    e
                ] : Array.isArray(t) ? [
                    ...t,
                    e
                ] : [
                    t,
                    e
                ];
            }
            function Dc(t) {
                return t ? Array.isArray(t) ? t : [
                    t
                ] : [];
            }
            function Oo(t, e) {
                return Array.isArray(t) ? t.includes(e) : t === e;
            }
            function V_(t, e) {
                const n = Dc(e);
                return Dc(t).forEach((i)=>{
                    Oo(n, i) || n.push(i);
                }), n;
            }
            function L_(t, e) {
                return Dc(e).filter((n)=>!Oo(t, n));
            }
            let B_ = class B_ {
                get value() {
                    return this.control ? this.control.value : null;
                }
                get valid() {
                    return this.control ? this.control.valid : null;
                }
                get invalid() {
                    return this.control ? this.control.invalid : null;
                }
                get pending() {
                    return this.control ? this.control.pending : null;
                }
                get disabled() {
                    return this.control ? this.control.disabled : null;
                }
                get enabled() {
                    return this.control ? this.control.enabled : null;
                }
                get errors() {
                    return this.control ? this.control.errors : null;
                }
                get pristine() {
                    return this.control ? this.control.pristine : null;
                }
                get dirty() {
                    return this.control ? this.control.dirty : null;
                }
                get touched() {
                    return this.control ? this.control.touched : null;
                }
                get status() {
                    return this.control ? this.control.status : null;
                }
                get untouched() {
                    return this.control ? this.control.untouched : null;
                }
                get statusChanges() {
                    return this.control ? this.control.statusChanges : null;
                }
                get valueChanges() {
                    return this.control ? this.control.valueChanges : null;
                }
                get path() {
                    return null;
                }
                _setValidators(e) {
                    this._rawValidators = e || [], this._composedValidatorFn = _c(this._rawValidators);
                }
                _setAsyncValidators(e) {
                    this._rawAsyncValidators = e || [], this._composedAsyncValidatorFn = vc(this._rawAsyncValidators);
                }
                get validator() {
                    return this._composedValidatorFn || null;
                }
                get asyncValidator() {
                    return this._composedAsyncValidatorFn || null;
                }
                _registerOnDestroy(e) {
                    this._onDestroyCallbacks.push(e);
                }
                _invokeOnDestroyCallbacks() {
                    this._onDestroyCallbacks.forEach((e)=>e()), this._onDestroyCallbacks = [];
                }
                reset(e) {
                    this.control && this.control.reset(e);
                }
                hasError(e, n) {
                    return !!this.control && this.control.hasError(e, n);
                }
                getError(e, n) {
                    return this.control ? this.control.getError(e, n) : null;
                }
                constructor(){
                    this._rawValidators = [], this._rawAsyncValidators = [], this._onDestroyCallbacks = [];
                }
            };
            let wn = class wn extends B_ {
                constructor(){
                    super(...arguments), this._parent = null, this.name = null, this.valueAccessor = null;
                }
            };
            let He = class He extends B_ {
                get formDirective() {
                    return null;
                }
                get path() {
                    return null;
                }
            };
            let H_ = (()=>{
                let t = class t extends class j_ {
                    is(e) {
                        var n, r, i;
                        return "submitted" === e ? !!(null === (n = this._cd) || void 0 === n ? void 0 : n.submitted) : !!(null === (i = null === (r = this._cd) || void 0 === r ? void 0 : r.control) || void 0 === i ? void 0 : i[e]);
                    }
                    constructor(e){
                        this._cd = e;
                    }
                } {
                    constructor(n){
                        super(n);
                    }
                };
                return t.ɵfac = function(n) {
                    return new (n || t)(D(wn, 2));
                }, t.ɵdir = O({
                    type: t,
                    selectors: [
                        [
                            "",
                            "formControlName",
                            ""
                        ],
                        [
                            "",
                            "ngModel",
                            ""
                        ],
                        [
                            "",
                            "formControl",
                            ""
                        ]
                    ],
                    hostVars: 14,
                    hostBindings: function(n, r) {
                        2 & n && Js("ng-untouched", r.is("untouched"))("ng-touched", r.is("touched"))("ng-pristine", r.is("pristine"))("ng-dirty", r.is("dirty"))("ng-valid", r.is("valid"))("ng-invalid", r.is("invalid"))("ng-pending", r.is("pending"));
                    },
                    features: [
                        K
                    ]
                }), t;
            })();
            function Ui(t94, e76) {
                (function wc(t95, e) {
                    const n = function R_(t) {
                        return t._rawValidators;
                    }(t95);
                    null !== e.validator ? t95.setValidators(x_(n, e.validator)) : "function" == typeof n && t95.setValidators([
                        n
                    ]);
                    const r = function k_(t) {
                        return t._rawAsyncValidators;
                    }(t95);
                    null !== e.asyncValidator ? t95.setAsyncValidators(x_(r, e.asyncValidator)) : "function" == typeof r && t95.setAsyncValidators([
                        r
                    ]);
                    const i = ()=>t95.updateValueAndValidity();
                    Vo(e._rawValidators, i), Vo(e._rawAsyncValidators, i);
                })(t94, e76), e76.valueAccessor.writeValue(t94.value), function CF(t, e) {
                    e.valueAccessor.registerOnChange((n)=>{
                        t._pendingValue = n, t._pendingChange = !0, t._pendingDirty = !0, "change" === t.updateOn && U_(t, e);
                    });
                }(t94, e76), function bF(t, e) {
                    const n = (r, i)=>{
                        e.valueAccessor.writeValue(r), i && e.viewToModelUpdate(r);
                    };
                    t.registerOnChange(n), e._registerOnDestroy(()=>{
                        t._unregisterOnChange(n);
                    });
                }(t94, e76), function wF(t, e) {
                    e.valueAccessor.registerOnTouched(()=>{
                        t._pendingTouched = !0, "blur" === t.updateOn && t._pendingChange && U_(t, e), "submit" !== t.updateOn && t.markAsTouched();
                    });
                }(t94, e76), function EF(t, e) {
                    if (e.valueAccessor.setDisabledState) {
                        const n = (r)=>{
                            e.valueAccessor.setDisabledState(r);
                        };
                        t.registerOnDisabledChange(n), e._registerOnDestroy(()=>{
                            t._unregisterOnDisabledChange(n);
                        });
                    }
                }(t94, e76);
            }
            function Vo(t, e) {
                t.forEach((n)=>{
                    n.registerOnValidatorChange && n.registerOnValidatorChange(e);
                });
            }
            function U_(t, e) {
                t._pendingDirty && t.markAsDirty(), t.setValue(t._pendingValue, {
                    emitModelToViewChange: !1
                }), e.viewToModelUpdate(t._pendingValue), t._pendingChange = !1;
            }
            function Sc(t, e) {
                const n = t.indexOf(e);
                n > -1 && t.splice(n, 1);
            }
            const Gi = "VALID", Bo = "INVALID", qr = "PENDING", qi = "DISABLED";
            function Tc(t) {
                return (jo(t) ? t.validators : t) || null;
            }
            function W_(t) {
                return Array.isArray(t) ? _c(t) : t || null;
            }
            function Ic(t, e) {
                return (jo(e) ? e.asyncValidators : t) || null;
            }
            function Q_(t) {
                return Array.isArray(t) ? vc(t) : t || null;
            }
            function jo(t) {
                return null != t && !Array.isArray(t) && "object" == typeof t;
            }
            const Nc = (t)=>t instanceof Pc;
            function Z_(t96) {
                return ((t)=>t instanceof X_)(t96) ? t96.value : t96.getRawValue();
            }
            function J_(t, e) {
                const n = Nc(t), r = t.controls;
                if (!(n ? Object.keys(r) : r).length) throw new b(1e3, "");
                if (!r[e]) throw new b(1001, "");
            }
            function Y_(t, e) {
                Nc(t), t._forEachChild((r, i)=>{
                    if (void 0 === e[i]) throw new b(1002, "");
                });
            }
            let Fc = class Fc {
                get validator() {
                    return this._composedValidatorFn;
                }
                set validator(e) {
                    this._rawValidators = this._composedValidatorFn = e;
                }
                get asyncValidator() {
                    return this._composedAsyncValidatorFn;
                }
                set asyncValidator(e) {
                    this._rawAsyncValidators = this._composedAsyncValidatorFn = e;
                }
                get parent() {
                    return this._parent;
                }
                get valid() {
                    return this.status === Gi;
                }
                get invalid() {
                    return this.status === Bo;
                }
                get pending() {
                    return this.status == qr;
                }
                get disabled() {
                    return this.status === qi;
                }
                get enabled() {
                    return this.status !== qi;
                }
                get dirty() {
                    return !this.pristine;
                }
                get untouched() {
                    return !this.touched;
                }
                get updateOn() {
                    return this._updateOn ? this._updateOn : this.parent ? this.parent.updateOn : "change";
                }
                setValidators(e) {
                    this._rawValidators = e, this._composedValidatorFn = W_(e);
                }
                setAsyncValidators(e) {
                    this._rawAsyncValidators = e, this._composedAsyncValidatorFn = Q_(e);
                }
                addValidators(e) {
                    this.setValidators(V_(e, this._rawValidators));
                }
                addAsyncValidators(e) {
                    this.setAsyncValidators(V_(e, this._rawAsyncValidators));
                }
                removeValidators(e) {
                    this.setValidators(L_(e, this._rawValidators));
                }
                removeAsyncValidators(e) {
                    this.setAsyncValidators(L_(e, this._rawAsyncValidators));
                }
                hasValidator(e) {
                    return Oo(this._rawValidators, e);
                }
                hasAsyncValidator(e) {
                    return Oo(this._rawAsyncValidators, e);
                }
                clearValidators() {
                    this.validator = null;
                }
                clearAsyncValidators() {
                    this.asyncValidator = null;
                }
                markAsTouched(e = {}) {
                    this.touched = !0, this._parent && !e.onlySelf && this._parent.markAsTouched(e);
                }
                markAllAsTouched() {
                    this.markAsTouched({
                        onlySelf: !0
                    }), this._forEachChild((e)=>e.markAllAsTouched());
                }
                markAsUntouched(e = {}) {
                    this.touched = !1, this._pendingTouched = !1, this._forEachChild((n)=>{
                        n.markAsUntouched({
                            onlySelf: !0
                        });
                    }), this._parent && !e.onlySelf && this._parent._updateTouched(e);
                }
                markAsDirty(e = {}) {
                    this.pristine = !1, this._parent && !e.onlySelf && this._parent.markAsDirty(e);
                }
                markAsPristine(e = {}) {
                    this.pristine = !0, this._pendingDirty = !1, this._forEachChild((n)=>{
                        n.markAsPristine({
                            onlySelf: !0
                        });
                    }), this._parent && !e.onlySelf && this._parent._updatePristine(e);
                }
                markAsPending(e = {}) {
                    this.status = qr, !1 !== e.emitEvent && this.statusChanges.emit(this.status), this._parent && !e.onlySelf && this._parent.markAsPending(e);
                }
                disable(e = {}) {
                    const n = this._parentMarkedDirty(e.onlySelf);
                    this.status = qi, this.errors = null, this._forEachChild((r)=>{
                        r.disable(Object.assign(Object.assign({}, e), {
                            onlySelf: !0
                        }));
                    }), this._updateValue(), !1 !== e.emitEvent && (this.valueChanges.emit(this.value), this.statusChanges.emit(this.status)), this._updateAncestors(Object.assign(Object.assign({}, e), {
                        skipPristineCheck: n
                    })), this._onDisabledChange.forEach((r)=>r(!0));
                }
                enable(e = {}) {
                    const n = this._parentMarkedDirty(e.onlySelf);
                    this.status = Gi, this._forEachChild((r)=>{
                        r.enable(Object.assign(Object.assign({}, e), {
                            onlySelf: !0
                        }));
                    }), this.updateValueAndValidity({
                        onlySelf: !0,
                        emitEvent: e.emitEvent
                    }), this._updateAncestors(Object.assign(Object.assign({}, e), {
                        skipPristineCheck: n
                    })), this._onDisabledChange.forEach((r)=>r(!1));
                }
                _updateAncestors(e) {
                    this._parent && !e.onlySelf && (this._parent.updateValueAndValidity(e), e.skipPristineCheck || this._parent._updatePristine(), this._parent._updateTouched());
                }
                setParent(e) {
                    this._parent = e;
                }
                updateValueAndValidity(e = {}) {
                    this._setInitialStatus(), this._updateValue(), this.enabled && (this._cancelExistingSubscription(), this.errors = this._runValidator(), this.status = this._calculateStatus(), (this.status === Gi || this.status === qr) && this._runAsyncValidator(e.emitEvent)), !1 !== e.emitEvent && (this.valueChanges.emit(this.value), this.statusChanges.emit(this.status)), this._parent && !e.onlySelf && this._parent.updateValueAndValidity(e);
                }
                _updateTreeValidity(e = {
                    emitEvent: !0
                }) {
                    this._forEachChild((n)=>n._updateTreeValidity(e)), this.updateValueAndValidity({
                        onlySelf: !0,
                        emitEvent: e.emitEvent
                    });
                }
                _setInitialStatus() {
                    this.status = this._allControlsDisabled() ? qi : Gi;
                }
                _runValidator() {
                    return this.validator ? this.validator(this) : null;
                }
                _runAsyncValidator(e) {
                    if (this.asyncValidator) {
                        this.status = qr, this._hasOwnPendingAsyncValidator = !0;
                        const n = T_(this.asyncValidator(this));
                        this._asyncValidationSubscription = n.subscribe((r)=>{
                            this._hasOwnPendingAsyncValidator = !1, this.setErrors(r, {
                                emitEvent: e
                            });
                        });
                    }
                }
                _cancelExistingSubscription() {
                    this._asyncValidationSubscription && (this._asyncValidationSubscription.unsubscribe(), this._hasOwnPendingAsyncValidator = !1);
                }
                setErrors(e, n = {}) {
                    this.errors = e, this._updateControlsErrors(!1 !== n.emitEvent);
                }
                get(e77) {
                    return function TF(t97, e, n) {
                        if (null == e || (Array.isArray(e) || (e = e.split(n)), Array.isArray(e) && 0 === e.length)) return null;
                        let r = t97;
                        return e.forEach((i)=>{
                            r = Nc(r) ? r.controls.hasOwnProperty(i) ? r.controls[i] : null : ((t)=>t instanceof NF)(r) && r.at(i) || null;
                        }), r;
                    }(this, e77, ".");
                }
                getError(e, n) {
                    const r = n ? this.get(n) : this;
                    return r && r.errors ? r.errors[e] : null;
                }
                hasError(e, n) {
                    return !!this.getError(e, n);
                }
                get root() {
                    let e = this;
                    for(; e._parent;)e = e._parent;
                    return e;
                }
                _updateControlsErrors(e) {
                    this.status = this._calculateStatus(), e && this.statusChanges.emit(this.status), this._parent && this._parent._updateControlsErrors(e);
                }
                _initObservables() {
                    this.valueChanges = new Oe, this.statusChanges = new Oe;
                }
                _calculateStatus() {
                    return this._allControlsDisabled() ? qi : this.errors ? Bo : this._hasOwnPendingAsyncValidator || this._anyControlsHaveStatus(qr) ? qr : this._anyControlsHaveStatus(Bo) ? Bo : Gi;
                }
                _anyControlsHaveStatus(e) {
                    return this._anyControls((n)=>n.status === e);
                }
                _anyControlsDirty() {
                    return this._anyControls((e)=>e.dirty);
                }
                _anyControlsTouched() {
                    return this._anyControls((e)=>e.touched);
                }
                _updatePristine(e = {}) {
                    this.pristine = !this._anyControlsDirty(), this._parent && !e.onlySelf && this._parent._updatePristine(e);
                }
                _updateTouched(e = {}) {
                    this.touched = this._anyControlsTouched(), this._parent && !e.onlySelf && this._parent._updateTouched(e);
                }
                _isBoxedValue(e) {
                    return "object" == typeof e && null !== e && 2 === Object.keys(e).length && "value" in e && "disabled" in e;
                }
                _registerOnCollectionChange(e) {
                    this._onCollectionChange = e;
                }
                _setUpdateStrategy(e) {
                    jo(e) && null != e.updateOn && (this._updateOn = e.updateOn);
                }
                _parentMarkedDirty(e) {
                    return !e && !(!this._parent || !this._parent.dirty) && !this._parent._anyControlsDirty();
                }
                constructor(e, n){
                    this._pendingDirty = !1, this._hasOwnPendingAsyncValidator = !1, this._pendingTouched = !1, this._onCollectionChange = ()=>{}, this._parent = null, this.pristine = !0, this.touched = !1, this._onDisabledChange = [], this._rawValidators = e, this._rawAsyncValidators = n, this._composedValidatorFn = W_(this._rawValidators), this._composedAsyncValidatorFn = Q_(this._rawAsyncValidators);
                }
            };
            let X_ = class X_ extends Fc {
                setValue(e, n = {}) {
                    this.value = this._pendingValue = e, this._onChange.length && !1 !== n.emitModelToViewChange && this._onChange.forEach((r)=>r(this.value, !1 !== n.emitViewToModelChange)), this.updateValueAndValidity(n);
                }
                patchValue(e, n = {}) {
                    this.setValue(e, n);
                }
                reset(e = this.defaultValue, n = {}) {
                    this._applyFormState(e), this.markAsPristine(n), this.markAsUntouched(n), this.setValue(this.value, n), this._pendingChange = !1;
                }
                _updateValue() {}
                _anyControls(e) {
                    return !1;
                }
                _allControlsDisabled() {
                    return this.disabled;
                }
                registerOnChange(e) {
                    this._onChange.push(e);
                }
                _unregisterOnChange(e) {
                    Sc(this._onChange, e);
                }
                registerOnDisabledChange(e) {
                    this._onDisabledChange.push(e);
                }
                _unregisterOnDisabledChange(e) {
                    Sc(this._onDisabledChange, e);
                }
                _forEachChild(e) {}
                _syncPendingControls() {
                    return !("submit" !== this.updateOn || (this._pendingDirty && this.markAsDirty(), this._pendingTouched && this.markAsTouched(), !this._pendingChange) || (this.setValue(this._pendingValue, {
                        onlySelf: !0,
                        emitModelToViewChange: !1
                    }), 0));
                }
                _applyFormState(e) {
                    this._isBoxedValue(e) ? (this.value = this._pendingValue = e.value, e.disabled ? this.disable({
                        onlySelf: !0,
                        emitEvent: !1
                    }) : this.enable({
                        onlySelf: !0,
                        emitEvent: !1
                    })) : this.value = this._pendingValue = e;
                }
                constructor(e = null, n, r){
                    super(Tc(n), Ic(r, n)), this.defaultValue = null, this._onChange = [], this._pendingChange = !1, this._applyFormState(e), this._setUpdateStrategy(n), this._initObservables(), this.updateValueAndValidity({
                        onlySelf: !0,
                        emitEvent: !!this.asyncValidator
                    }), jo(n) && n.initialValueIsDefault && (this.defaultValue = this._isBoxedValue(e) ? e.value : e);
                }
            };
            let Pc = class Pc extends Fc {
                registerControl(e, n) {
                    return this.controls[e] ? this.controls[e] : (this.controls[e] = n, n.setParent(this), n._registerOnCollectionChange(this._onCollectionChange), n);
                }
                addControl(e, n, r = {}) {
                    this.registerControl(e, n), this.updateValueAndValidity({
                        emitEvent: r.emitEvent
                    }), this._onCollectionChange();
                }
                removeControl(e, n = {}) {
                    this.controls[e] && this.controls[e]._registerOnCollectionChange(()=>{}), delete this.controls[e], this.updateValueAndValidity({
                        emitEvent: n.emitEvent
                    }), this._onCollectionChange();
                }
                setControl(e, n, r = {}) {
                    this.controls[e] && this.controls[e]._registerOnCollectionChange(()=>{}), delete this.controls[e], n && this.registerControl(e, n), this.updateValueAndValidity({
                        emitEvent: r.emitEvent
                    }), this._onCollectionChange();
                }
                contains(e) {
                    return this.controls.hasOwnProperty(e) && this.controls[e].enabled;
                }
                setValue(e, n = {}) {
                    Y_(this, e), Object.keys(e).forEach((r)=>{
                        J_(this, r), this.controls[r].setValue(e[r], {
                            onlySelf: !0,
                            emitEvent: n.emitEvent
                        });
                    }), this.updateValueAndValidity(n);
                }
                patchValue(e, n = {}) {
                    null != e && (Object.keys(e).forEach((r)=>{
                        this.controls[r] && this.controls[r].patchValue(e[r], {
                            onlySelf: !0,
                            emitEvent: n.emitEvent
                        });
                    }), this.updateValueAndValidity(n));
                }
                reset(e = {}, n = {}) {
                    this._forEachChild((r, i)=>{
                        r.reset(e[i], {
                            onlySelf: !0,
                            emitEvent: n.emitEvent
                        });
                    }), this._updatePristine(n), this._updateTouched(n), this.updateValueAndValidity(n);
                }
                getRawValue() {
                    return this._reduceChildren({}, (e, n, r)=>(e[r] = Z_(n), e));
                }
                _syncPendingControls() {
                    let e = this._reduceChildren(!1, (n, r)=>!!r._syncPendingControls() || n);
                    return e && this.updateValueAndValidity({
                        onlySelf: !0
                    }), e;
                }
                _forEachChild(e) {
                    Object.keys(this.controls).forEach((n)=>{
                        const r = this.controls[n];
                        r && e(r, n);
                    });
                }
                _setUpControls() {
                    this._forEachChild((e)=>{
                        e.setParent(this), e._registerOnCollectionChange(this._onCollectionChange);
                    });
                }
                _updateValue() {
                    this.value = this._reduceValue();
                }
                _anyControls(e) {
                    for (const n of Object.keys(this.controls)){
                        const r = this.controls[n];
                        if (this.contains(n) && e(r)) return !0;
                    }
                    return !1;
                }
                _reduceValue() {
                    return this._reduceChildren({}, (e, n, r)=>((n.enabled || this.disabled) && (e[r] = n.value), e));
                }
                _reduceChildren(e, n) {
                    let r = e;
                    return this._forEachChild((i, s)=>{
                        r = n(r, i, s);
                    }), r;
                }
                _allControlsDisabled() {
                    for (const e of Object.keys(this.controls))if (this.controls[e].enabled) return !1;
                    return Object.keys(this.controls).length > 0 || this.disabled;
                }
                constructor(e, n, r){
                    super(Tc(n), Ic(r, n)), this.controls = e, this._initObservables(), this._setUpdateStrategy(n), this._setUpControls(), this.updateValueAndValidity({
                        onlySelf: !0,
                        emitEvent: !!this.asyncValidator
                    });
                }
            };
            let NF = class NF extends Fc {
                at(e) {
                    return this.controls[e];
                }
                push(e, n = {}) {
                    this.controls.push(e), this._registerControl(e), this.updateValueAndValidity({
                        emitEvent: n.emitEvent
                    }), this._onCollectionChange();
                }
                insert(e, n, r = {}) {
                    this.controls.splice(e, 0, n), this._registerControl(n), this.updateValueAndValidity({
                        emitEvent: r.emitEvent
                    });
                }
                removeAt(e, n = {}) {
                    this.controls[e] && this.controls[e]._registerOnCollectionChange(()=>{}), this.controls.splice(e, 1), this.updateValueAndValidity({
                        emitEvent: n.emitEvent
                    });
                }
                setControl(e, n, r = {}) {
                    this.controls[e] && this.controls[e]._registerOnCollectionChange(()=>{}), this.controls.splice(e, 1), n && (this.controls.splice(e, 0, n), this._registerControl(n)), this.updateValueAndValidity({
                        emitEvent: r.emitEvent
                    }), this._onCollectionChange();
                }
                get length() {
                    return this.controls.length;
                }
                setValue(e, n = {}) {
                    Y_(this, e), e.forEach((r, i)=>{
                        J_(this, i), this.at(i).setValue(r, {
                            onlySelf: !0,
                            emitEvent: n.emitEvent
                        });
                    }), this.updateValueAndValidity(n);
                }
                patchValue(e, n = {}) {
                    null != e && (e.forEach((r, i)=>{
                        this.at(i) && this.at(i).patchValue(r, {
                            onlySelf: !0,
                            emitEvent: n.emitEvent
                        });
                    }), this.updateValueAndValidity(n));
                }
                reset(e = [], n = {}) {
                    this._forEachChild((r, i)=>{
                        r.reset(e[i], {
                            onlySelf: !0,
                            emitEvent: n.emitEvent
                        });
                    }), this._updatePristine(n), this._updateTouched(n), this.updateValueAndValidity(n);
                }
                getRawValue() {
                    return this.controls.map((e)=>Z_(e));
                }
                clear(e = {}) {
                    this.controls.length < 1 || (this._forEachChild((n)=>n._registerOnCollectionChange(()=>{})), this.controls.splice(0), this.updateValueAndValidity({
                        emitEvent: e.emitEvent
                    }));
                }
                _syncPendingControls() {
                    let e = this.controls.reduce((n, r)=>!!r._syncPendingControls() || n, !1);
                    return e && this.updateValueAndValidity({
                        onlySelf: !0
                    }), e;
                }
                _forEachChild(e) {
                    this.controls.forEach((n, r)=>{
                        e(n, r);
                    });
                }
                _updateValue() {
                    this.value = this.controls.filter((e)=>e.enabled || this.disabled).map((e)=>e.value);
                }
                _anyControls(e) {
                    return this.controls.some((n)=>n.enabled && e(n));
                }
                _setUpControls() {
                    this._forEachChild((e)=>this._registerControl(e));
                }
                _allControlsDisabled() {
                    for (const e of this.controls)if (e.enabled) return !1;
                    return this.controls.length > 0 || this.disabled;
                }
                _registerControl(e) {
                    e.setParent(this), e._registerOnCollectionChange(this._onCollectionChange);
                }
                constructor(e, n, r){
                    super(Tc(n), Ic(r, n)), this.controls = e, this._initObservables(), this._setUpdateStrategy(n), this._setUpControls(), this.updateValueAndValidity({
                        onlySelf: !0,
                        emitEvent: !!this.asyncValidator
                    });
                }
            };
            const OF = {
                provide: wn,
                useExisting: ee(()=>xc)
            }, nv = (()=>Promise.resolve(null))();
            let xc = (()=>{
                let t98 = class t extends wn {
                    ngOnChanges(n61) {
                        if (this._checkForErrors(), !this._registered || "name" in n61) {
                            if (this._registered && (this._checkName(), this.formDirective)) {
                                const r = n61.name.previousValue;
                                this.formDirective.removeControl({
                                    name: r,
                                    path: this._getPath(r)
                                });
                            }
                            this._setUpControl();
                        }
                        "isDisabled" in n61 && this._updateDisabled(n61), function bc(t, e) {
                            if (!t.hasOwnProperty("model")) return !1;
                            const n = t.model;
                            return !!n.isFirstChange() || !Object.is(e, n.currentValue);
                        }(n61, this.viewModel) && (this._updateValue(this.model), this.viewModel = this.model);
                    }
                    ngOnDestroy() {
                        this.formDirective && this.formDirective.removeControl(this);
                    }
                    get path() {
                        return this._getPath(this.name);
                    }
                    get formDirective() {
                        return this._parent ? this._parent.formDirective : null;
                    }
                    viewToModelUpdate(n) {
                        this.viewModel = n, this.update.emit(n);
                    }
                    _setUpControl() {
                        this._setUpdateStrategy(), this._isStandalone() ? this._setUpStandalone() : this.formDirective.addControl(this), this._registered = !0;
                    }
                    _setUpdateStrategy() {
                        this.options && null != this.options.updateOn && (this.control._updateOn = this.options.updateOn);
                    }
                    _isStandalone() {
                        return !this._parent || !(!this.options || !this.options.standalone);
                    }
                    _setUpStandalone() {
                        Ui(this.control, this), this.control.updateValueAndValidity({
                            emitEvent: !1
                        });
                    }
                    _checkForErrors() {
                        this._isStandalone() || this._checkParentType(), this._checkName();
                    }
                    _checkParentType() {}
                    _checkName() {
                        this.options && this.options.name && (this.name = this.options.name), this._isStandalone();
                    }
                    _updateValue(n) {
                        nv.then(()=>{
                            var r;
                            this.control.setValue(n, {
                                emitViewToModelChange: !1
                            }), null === (r = this._changeDetectorRef) || void 0 === r || r.markForCheck();
                        });
                    }
                    _updateDisabled(n) {
                        const r = n.isDisabled.currentValue, i = "" === r || r && "false" !== r;
                        nv.then(()=>{
                            var s;
                            i && !this.control.disabled ? this.control.disable() : !i && this.control.disabled && this.control.enable(), null === (s = this._changeDetectorRef) || void 0 === s || s.markForCheck();
                        });
                    }
                    _getPath(n) {
                        return this._parent ? function Ro(t, e) {
                            return [
                                ...e.path,
                                t
                            ];
                        }(n, this._parent) : [
                            n
                        ];
                    }
                    constructor(n62, r44, i29, s30, o){
                        super(), this._changeDetectorRef = o, this.control = new X_, this._registered = !1, this.update = new Oe, this._parent = n62, this._setValidators(r44), this._setAsyncValidators(i29), this.valueAccessor = function Mc(t99, e) {
                            if (!e) return null;
                            let n, r, i;
                            return Array.isArray(e), e.forEach((s)=>{
                                s.constructor === Fo ? n = s : function AF(t) {
                                    return Object.getPrototypeOf(t.constructor) === Wn;
                                }(s) ? r = s : i = s;
                            }), i || r || n || null;
                        }(0, s30);
                    }
                };
                return t98.ɵfac = function(n) {
                    return new (n || t98)(D(He, 9), D(Re, 10), D(Cn, 10), D(qt, 10), D(py, 8));
                }, t98.ɵdir = O({
                    type: t98,
                    selectors: [
                        [
                            "",
                            "ngModel",
                            "",
                            3,
                            "formControlName",
                            "",
                            3,
                            "formControl",
                            ""
                        ]
                    ],
                    inputs: {
                        name: "name",
                        isDisabled: [
                            "disabled",
                            "isDisabled"
                        ],
                        model: [
                            "ngModel",
                            "model"
                        ],
                        options: [
                            "ngModelOptions",
                            "options"
                        ]
                    },
                    outputs: {
                        update: "ngModelChange"
                    },
                    exportAs: [
                        "ngModel"
                    ],
                    features: [
                        se([
                            OF
                        ]),
                        K,
                        Zt
                    ]
                }), t98;
            })(), iv = (()=>{
                let t = class t {
                };
                return t.ɵfac = function(n) {
                    return new (n || t);
                }, t.ɵmod = lt({
                    type: t
                }), t.ɵinj = Qe({}), t;
            })(), sP = (()=>{
                let t = class t {
                };
                return t.ɵfac = function(n) {
                    return new (n || t);
                }, t.ɵmod = lt({
                    type: t
                }), t.ɵinj = Qe({
                    imports: [
                        [
                            iv
                        ]
                    ]
                }), t;
            })(), Cv = (()=>{
                let t = class t {
                };
                return t.ɵfac = function(n) {
                    return new (n || t);
                }, t.ɵmod = lt({
                    type: t
                }), t.ɵinj = Qe({
                    imports: [
                        sP
                    ]
                }), t;
            })();
            const oP = [
                "spellcheckerrorsholder"
            ];
            let aP = (()=>{
                let t100 = class t {
                    handleScroll() {}
                    onTextAreaChange(n) {
                        clearTimeout(this.typingTimer), this.typingTimer = setTimeout(this.populateNonWordsArray.bind(this, n), this.doneTypingInterval);
                    }
                    populateNonWordsArray(n) {
                        if (n) {
                            this.nonWordsArray = [];
                            let r = n.split(/[\s,.]+/).filter((i)=>i);
                            for(let i30 = 0; i30 < r.length; i30++)this.nonWordsArray.includes(r[i30]) || this.dictionaryManagerService.search(r[i30]) || this.nonWordsArray.push(r[i30]);
                            n = n ? n.replace(/\n$/g, "\n\n") : "", this.nonWordsArray.forEach((i)=>{
                                n = n.replace(new RegExp(i + "[(?!\\s)|(?!,)|(?!.)]|" + i + "$", "g"), '<mark style="border-bottom: 1px solid red;background-color: transparent;" class="mark">$&</mark>');
                            }), this.spellcheckerrorsholder.nativeElement.innerHTML = n;
                        }
                    }
                    applyHighlights(n) {}
                    createTrie() {}
                    constructor(n){
                        this.dictionaryManagerService = n, this.textValue = "", this.nonWordsArray = [], this.doneTypingInterval = 1e3;
                    }
                };
                return t100.ɵfac = function(n) {
                    return new (n || t100)(D(p_));
                }, t100.ɵcmp = as({
                    type: t100,
                    selectors: [
                        [
                            "app-highlighed-text"
                        ]
                    ],
                    viewQuery: function(n, r) {
                        if (1 & n && Pm(oP, 5), 2 & n) {
                            let i;
                            Fm(i = function Om() {
                                return function SA(t, e) {
                                    return t[19].queries[e].queryList;
                                }(v(), lf());
                            }()) && (r.spellcheckerrorsholder = i.first);
                        }
                    },
                    inputs: {
                        nonWordsArray: "nonWordsArray"
                    },
                    decls: 10,
                    vars: 1,
                    consts: [
                        [
                            1,
                            "container"
                        ],
                        [
                            1,
                            "backdrop"
                        ],
                        [
                            "backdrop",
                            ""
                        ],
                        [
                            1,
                            "highlights"
                        ],
                        [
                            "spellcheckerrorsholder",
                            ""
                        ],
                        [
                            3,
                            "ngModel",
                            "ngModelChange",
                            "scroll"
                        ],
                        [
                            "textarea",
                            ""
                        ],
                        [
                            3,
                            "click"
                        ]
                    ],
                    template: function(n, r) {
                        1 & n && (kr(0, "div", 0)(1, "div", 1, 2), Ks(3, "div", 3, 4), Vr(), kr(5, "textarea", 5, 6), et("ngModelChange", function(s) {
                            return r.onTextAreaChange(s);
                        })("scroll", function() {
                            return r.handleScroll();
                        }), Vr()(), kr(7, "div")(8, "button", 7), et("click", function() {
                            return r.createTrie();
                        }), Dg(9, "createTrie"), Vr()()), 2 & n && (function Ih(t) {
                            Nh(z(), v(), Ve() + t, !1);
                        }(5), Qs("ngModel", r.textValue));
                    },
                    directives: [
                        Fo,
                        H_,
                        xc
                    ],
                    styles: [
                        "*[_ngcontent-%COMP%], *[_ngcontent-%COMP%]:before, *[_ngcontent-%COMP%]:after{box-sizing:border-box}.container[_ngcontent-%COMP%], .backdrop[_ngcontent-%COMP%], textarea[_ngcontent-%COMP%]{width:460px;height:180px}.highlights[_ngcontent-%COMP%], textarea[_ngcontent-%COMP%]{padding:10px;font:20px/28px Open Sans,sans-serif;letter-spacing:1px}.container[_ngcontent-%COMP%]{display:block;margin:0 auto;transform:translateZ(0);-webkit-text-size-adjust:none}.backdrop[_ngcontent-%COMP%]{position:absolute;z-index:1;border:2px solid #685972;background-color:#fff;overflow:auto;pointer-events:none;transition:transform 1s}.highlights[_ngcontent-%COMP%]{white-space:pre-wrap;word-wrap:break-word;color:transparent}textarea[_ngcontent-%COMP%]{display:block;position:absolute;z-index:2;margin:0;border:2px solid #74637f;border-radius:0;color:#444;background-color:transparent;overflow:auto;resize:none;transition:transform 1s}  .mark{border-radius:3px;color:transparent;-webkit-text-decoration:wavy;text-decoration:wavy;border-bottom:1px solid red;background-color:transparent}.perspective[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]{transform:perspective(1500px) translate(155px) rotateY(45deg) scale(1.1)}textarea[_ngcontent-%COMP%]:focus, button[_ngcontent-%COMP%]:focus{outline:none;box-shadow:0 0 0 2px #c6aada}"
                    ]
                }), t100;
            })(), lP = (()=>{
                let t = class t {
                    rebuildNonWordsArray(n) {
                        if (n) {
                            let r = n.split(/[\s,.]+/).filter((i)=>i);
                            for(let i32 = 0; i32 < r.length; i32++)this.nonWordsArray.includes(r[i32]) || this.dictionaryManagerService.search(r[i32]) || this.nonWordsArray.push(r[i32]);
                        }
                    }
                    constructor(n){
                        this.dictionaryManagerService = n, this.nonWordsArray = [
                            "\u05d9\u05dc\u05d3\u05d3",
                            "\u05d2\u05e8\u05dc\u05dc",
                            "\u05d1\u05df\u05df"
                        ], this.txt = "";
                    }
                };
                return t.ɵfac = function(n) {
                    return new (n || t)(D(p_));
                }, t.ɵcmp = as({
                    type: t,
                    selectors: [
                        [
                            "app-root"
                        ]
                    ],
                    decls: 1,
                    vars: 1,
                    consts: [
                        [
                            3,
                            "nonWordsArray"
                        ]
                    ],
                    template: function(n, r) {
                        1 & n && Ks(0, "app-highlighed-text", 0), 2 & n && Qs("nonWordsArray", r.nonWordsArray);
                    },
                    directives: [
                        aP
                    ],
                    styles: [
                        ""
                    ]
                }), t;
            })(), uP = (()=>{
                let t = class t {
                };
                return t.ɵfac = function(n) {
                    return new (n || t);
                }, t.ɵmod = lt({
                    type: t
                }), t.ɵinj = Qe({
                    imports: [
                        [
                            Ly,
                            Cv
                        ]
                    ]
                }), t;
            })();
            let wv = class wv {
            };
            const on = "*";
            function bv(t, e = null) {
                return {
                    type: 2,
                    steps: t,
                    options: e
                };
            }
            function Mv(t) {
                return {
                    type: 6,
                    styles: t,
                    offset: null
                };
            }
            function Sv(t) {
                Promise.resolve(null).then(t);
            }
            let Wi = class Wi {
                _onFinish() {
                    this._finished || (this._finished = !0, this._onDoneFns.forEach((e)=>e()), this._onDoneFns = []);
                }
                onStart(e) {
                    this._onStartFns.push(e);
                }
                onDone(e) {
                    this._onDoneFns.push(e);
                }
                onDestroy(e) {
                    this._onDestroyFns.push(e);
                }
                hasStarted() {
                    return this._started;
                }
                init() {}
                play() {
                    this.hasStarted() || (this._onStart(), this.triggerMicrotask()), this._started = !0;
                }
                triggerMicrotask() {
                    Sv(()=>this._onFinish());
                }
                _onStart() {
                    this._onStartFns.forEach((e)=>e()), this._onStartFns = [];
                }
                pause() {}
                restart() {}
                finish() {
                    this._onFinish();
                }
                destroy() {
                    this._destroyed || (this._destroyed = !0, this.hasStarted() || this._onStart(), this.finish(), this._onDestroyFns.forEach((e)=>e()), this._onDestroyFns = []);
                }
                reset() {
                    this._started = !1;
                }
                setPosition(e) {
                    this._position = this.totalTime ? e * this.totalTime : 1;
                }
                getPosition() {
                    return this.totalTime ? this._position / this.totalTime : 1;
                }
                triggerCallback(e) {
                    const n = "start" == e ? this._onStartFns : this._onDoneFns;
                    n.forEach((r)=>r()), n.length = 0;
                }
                constructor(e = 0, n = 0){
                    this._onDoneFns = [], this._onStartFns = [], this._onDestroyFns = [], this._started = !1, this._destroyed = !1, this._finished = !1, this._position = 0, this.parentPlayer = null, this.totalTime = e + n;
                }
            };
            let Av = class Av {
                _onFinish() {
                    this._finished || (this._finished = !0, this._onDoneFns.forEach((e)=>e()), this._onDoneFns = []);
                }
                init() {
                    this.players.forEach((e)=>e.init());
                }
                onStart(e) {
                    this._onStartFns.push(e);
                }
                _onStart() {
                    this.hasStarted() || (this._started = !0, this._onStartFns.forEach((e)=>e()), this._onStartFns = []);
                }
                onDone(e) {
                    this._onDoneFns.push(e);
                }
                onDestroy(e) {
                    this._onDestroyFns.push(e);
                }
                hasStarted() {
                    return this._started;
                }
                play() {
                    this.parentPlayer || this.init(), this._onStart(), this.players.forEach((e)=>e.play());
                }
                pause() {
                    this.players.forEach((e)=>e.pause());
                }
                restart() {
                    this.players.forEach((e)=>e.restart());
                }
                finish() {
                    this._onFinish(), this.players.forEach((e)=>e.finish());
                }
                destroy() {
                    this._onDestroy();
                }
                _onDestroy() {
                    this._destroyed || (this._destroyed = !0, this._onFinish(), this.players.forEach((e)=>e.destroy()), this._onDestroyFns.forEach((e)=>e()), this._onDestroyFns = []);
                }
                reset() {
                    this.players.forEach((e)=>e.reset()), this._destroyed = !1, this._finished = !1, this._started = !1;
                }
                setPosition(e) {
                    const n = e * this.totalTime;
                    this.players.forEach((r)=>{
                        const i = r.totalTime ? Math.min(1, n / r.totalTime) : 1;
                        r.setPosition(i);
                    });
                }
                getPosition() {
                    const e = this.players.reduce((n, r)=>null === n || r.totalTime > n.totalTime ? r : n, null);
                    return null != e ? e.getPosition() : 0;
                }
                beforeDestroy() {
                    this.players.forEach((e)=>{
                        e.beforeDestroy && e.beforeDestroy();
                    });
                }
                triggerCallback(e) {
                    const n = "start" == e ? this._onStartFns : this._onDoneFns;
                    n.forEach((r)=>r()), n.length = 0;
                }
                constructor(e){
                    this._onDoneFns = [], this._onStartFns = [], this._finished = !1, this._started = !1, this._destroyed = !1, this._onDestroyFns = [], this.parentPlayer = null, this.totalTime = 0, this.players = e;
                    let n = 0, r = 0, i = 0;
                    const s = this.players.length;
                    0 == s ? Sv(()=>this._onFinish()) : this.players.forEach((o)=>{
                        o.onDone(()=>{
                            ++n == s && this._onFinish();
                        }), o.onDestroy(()=>{
                            ++r == s && this._onDestroy();
                        }), o.onStart(()=>{
                            ++i == s && this._onStart();
                        });
                    }), this.totalTime = this.players.reduce((o, a)=>Math.max(o, a.totalTime), 0);
                }
            };
            const G = !1;
            function Tv(t) {
                return new b(3e3, G);
            }
            function GP() {
                return "undefined" != typeof window && void 0 !== window.document;
            }
            function $c() {
                return "undefined" != typeof process && "[object process]" === ({}).toString.call(process);
            }
            function bn(t) {
                switch(t.length){
                    case 0:
                        return new Wi;
                    case 1:
                        return t[0];
                    default:
                        return new Av(t);
                }
            }
            function Iv(t, e, n, r, i = {}, s = {}) {
                const o = [], a = [];
                let l = -1, u = null;
                if (r.forEach((c)=>{
                    const d = c.offset, f = d == l, h = f && u || {};
                    Object.keys(c).forEach((p)=>{
                        let g = p, y = c[p];
                        if ("offset" !== p) switch(g = e.normalizePropertyName(g, o), y){
                            case "!":
                                y = i[p];
                                break;
                            case on:
                                y = s[p];
                                break;
                            default:
                                y = e.normalizeStyleValue(p, g, y, o);
                        }
                        h[g] = y;
                    }), f || a.push(h), u = h, l = d;
                }), o.length) throw function OP(t) {
                    return new b(3502, G);
                }();
                return a;
            }
            function Uc(t, e, n, r) {
                switch(e){
                    case "start":
                        t.onStart(()=>r(n && Gc(n, "start", t)));
                        break;
                    case "done":
                        t.onDone(()=>r(n && Gc(n, "done", t)));
                        break;
                    case "destroy":
                        t.onDestroy(()=>r(n && Gc(n, "destroy", t)));
                }
            }
            function Gc(t, e, n) {
                const r = n.totalTime, s = qc(t.element, t.triggerName, t.fromState, t.toState, e || t.phaseName, null == r ? t.totalTime : r, !!n.disabled), o = t._data;
                return null != o && (s._data = o), s;
            }
            function qc(t, e, n, r, i = "", s = 0, o) {
                return {
                    element: t,
                    triggerName: e,
                    fromState: n,
                    toState: r,
                    phaseName: i,
                    totalTime: s,
                    disabled: !!o
                };
            }
            function nt(t, e, n) {
                let r;
                return t instanceof Map ? (r = t.get(e), r || t.set(e, r = n)) : (r = t[e], r || (r = t[e] = n)), r;
            }
            function Nv(t) {
                const e = t.indexOf(":");
                return [
                    t.substring(1, e),
                    t.substr(e + 1)
                ];
            }
            let zc = (t, e)=>!1, Fv = (t, e, n)=>[], Pv = null;
            function Wc(t) {
                const e = t.parentNode || t.host;
                return e === Pv ? null : e;
            }
            ($c() || "undefined" != typeof Element) && (GP() ? (Pv = (()=>document.documentElement)(), zc = (t, e)=>{
                for(; e;){
                    if (e === t) return !0;
                    e = Wc(e);
                }
                return !1;
            }) : zc = (t, e)=>t.contains(e), Fv = (t, e, n)=>{
                if (n) return Array.from(t.querySelectorAll(e));
                const r = t.querySelector(e);
                return r ? [
                    r
                ] : [];
            });
            let Kn = null, Ov = !1;
            function xv(t101) {
                Kn || (Kn = function zP() {
                    return "undefined" != typeof document ? document.body : null;
                }() || {}, Ov = !!Kn.style && "WebkitAppearance" in Kn.style);
                let e = !0;
                return Kn.style && !function qP(t) {
                    return "ebkit" == t.substring(1, 6);
                }(t101) && (e = t101 in Kn.style, !e && Ov && (e = "Webkit" + t101.charAt(0).toUpperCase() + t101.substr(1) in Kn.style)), e;
            }
            const Rv = zc, kv = Fv;
            let Vv = (()=>{
                let t = class t {
                    validateStyleProperty(n) {
                        return xv(n);
                    }
                    matchesElement(n, r) {
                        return !1;
                    }
                    containsElement(n, r) {
                        return Rv(n, r);
                    }
                    getParentElement(n) {
                        return Wc(n);
                    }
                    query(n, r, i) {
                        return kv(n, r, i);
                    }
                    computeStyle(n, r, i) {
                        return i || "";
                    }
                    animate(n, r, i, s, o, a = [], l) {
                        return new Wi(i, s);
                    }
                };
                return t.ɵfac = function(n) {
                    return new (n || t);
                }, t.ɵprov = q({
                    token: t,
                    factory: t.ɵfac
                }), t;
            })(), Qc = (()=>{
                let t = class t {
                };
                return t.NOOP = new Vv, t;
            })();
            const Kc = "ng-enter", $o = "ng-leave", Uo = "ng-trigger", Go = ".ng-trigger", Bv = "ng-animating", Zc = ".ng-animating";
            function Zn(t) {
                if ("number" == typeof t) return t;
                const e = t.match(/^(-?[\.\d]+)(m?s)/);
                return !e || e.length < 2 ? 0 : Jc(parseFloat(e[1]), e[2]);
            }
            function Jc(t, e) {
                return "s" === e ? 1e3 * t : t;
            }
            function qo(t102, e78, n63) {
                return t102.hasOwnProperty("duration") ? t102 : function KP(t, e, n) {
                    let i, s = 0, o = "";
                    if ("string" == typeof t) {
                        const a = t.match(/^(-?[\.\d]+)(m?s)(?:\s+(-?[\.\d]+)(m?s))?(?:\s+([-a-z]+(?:\(.+?\))?))?$/i);
                        if (null === a) return e.push(Tv()), {
                            duration: 0,
                            delay: 0,
                            easing: ""
                        };
                        i = Jc(parseFloat(a[1]), a[2]);
                        const l = a[3];
                        null != l && (s = Jc(parseFloat(l), a[4]));
                        const u = a[5];
                        u && (o = u);
                    } else i = t;
                    if (!n) {
                        let a = !1, l = e.length;
                        i < 0 && (e.push(function dP() {
                            return new b(3100, G);
                        }()), a = !0), s < 0 && (e.push(function fP() {
                            return new b(3101, G);
                        }()), a = !0), a && e.splice(l, 0, Tv());
                    }
                    return {
                        duration: i,
                        delay: s,
                        easing: o
                    };
                }(t102, e78, n63);
            }
            function zr(t, e = {}) {
                return Object.keys(t).forEach((n)=>{
                    e[n] = t[n];
                }), e;
            }
            function Mn(t, e, n = {}) {
                if (e) for(let r in t)n[r] = t[r];
                else zr(t, n);
                return n;
            }
            function Hv(t, e, n) {
                return n ? e + ":" + n + ";" : "";
            }
            function $v(t) {
                let e = "";
                for(let n = 0; n < t.style.length; n++){
                    const r = t.style.item(n);
                    e += Hv(0, r, t.style.getPropertyValue(r));
                }
                for(const n64 in t.style)t.style.hasOwnProperty(n64) && !n64.startsWith("_") && (e += Hv(0, YP(n64), t.style[n64]));
                t.setAttribute("style", e);
            }
            function zt(t, e, n) {
                t.style && (Object.keys(e).forEach((r)=>{
                    const i = Xc(r);
                    n && !n.hasOwnProperty(r) && (n[r] = t.style[i]), t.style[i] = e[r];
                }), $c() && $v(t));
            }
            function Jn(t, e) {
                t.style && (Object.keys(e).forEach((n)=>{
                    const r = Xc(n);
                    t.style[r] = "";
                }), $c() && $v(t));
            }
            function Qi(t) {
                return Array.isArray(t) ? 1 == t.length ? t[0] : bv(t) : t;
            }
            const Yc = new RegExp("{{\\s*(.+?)\\s*}}", "g");
            function Uv(t) {
                let e = [];
                if ("string" == typeof t) {
                    let n;
                    for(; n = Yc.exec(t);)e.push(n[1]);
                    Yc.lastIndex = 0;
                }
                return e;
            }
            function zo(t, e, n) {
                const r = t.toString(), i = r.replace(Yc, (s, o)=>{
                    let a = e[o];
                    return e.hasOwnProperty(o) || (n.push(function pP(t) {
                        return new b(3003, G);
                    }()), a = ""), a.toString();
                });
                return i == r ? t : i;
            }
            function Wo(t) {
                const e = [];
                let n = t.next();
                for(; !n.done;)e.push(n.value), n = t.next();
                return e;
            }
            const JP = /-+([a-z0-9])/g;
            function Xc(t) {
                return t.replace(JP, (...e)=>e[1].toUpperCase());
            }
            function YP(t) {
                return t.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
            }
            function rt(t, e, n) {
                switch(e.type){
                    case 7:
                        return t.visitTrigger(e, n);
                    case 0:
                        return t.visitState(e, n);
                    case 1:
                        return t.visitTransition(e, n);
                    case 2:
                        return t.visitSequence(e, n);
                    case 3:
                        return t.visitGroup(e, n);
                    case 4:
                        return t.visitAnimate(e, n);
                    case 5:
                        return t.visitKeyframes(e, n);
                    case 6:
                        return t.visitStyle(e, n);
                    case 8:
                        return t.visitReference(e, n);
                    case 9:
                        return t.visitAnimateChild(e, n);
                    case 10:
                        return t.visitAnimateRef(e, n);
                    case 11:
                        return t.visitQuery(e, n);
                    case 12:
                        return t.visitStagger(e, n);
                    default:
                        throw function gP(t) {
                            return new b(3004, G);
                        }();
                }
            }
            function Gv(t, e) {
                return window.getComputedStyle(t)[e];
            }
            function iO(t103, e79) {
                const n65 = [];
                return "string" == typeof t103 ? t103.split(/\s*,\s*/).forEach((r45)=>(function sO(t104, e80, n66) {
                        if (":" == t104[0]) {
                            const l = function oO(t, e) {
                                switch(t){
                                    case ":enter":
                                        return "void => *";
                                    case ":leave":
                                        return "* => void";
                                    case ":increment":
                                        return (n, r)=>parseFloat(r) > parseFloat(n);
                                    case ":decrement":
                                        return (n, r)=>parseFloat(r) < parseFloat(n);
                                    default:
                                        return e.push(function IP(t) {
                                            return new b(3016, G);
                                        }()), "* => *";
                                }
                            }(t104, n66);
                            if ("function" == typeof l) return void e80.push(l);
                            t104 = l;
                        }
                        const r46 = t104.match(/^(\*|[-\w]+)\s*(<?[=-]>)\s*(\*|[-\w]+)$/);
                        if (null == r46 || r46.length < 4) return n66.push(function TP(t) {
                            return new b(3015, G);
                        }()), e80;
                        const i = r46[1], s = r46[2], o = r46[3];
                        e80.push(qv(i, o));
                        "<" == s[0] && !("*" == i && "*" == o) && e80.push(qv(o, i));
                    })(r45, n65, e79)) : n65.push(t103), n65;
            }
            const Jo = new Set([
                "true",
                "1"
            ]), Yo = new Set([
                "false",
                "0"
            ]);
            function qv(t, e) {
                const n = Jo.has(t) || Yo.has(t), r = Jo.has(e) || Yo.has(e);
                return (i, s)=>{
                    let o = "*" == t || t == i, a = "*" == e || e == s;
                    return !o && n && "boolean" == typeof i && (o = i ? Jo.has(t) : Yo.has(t)), !a && r && "boolean" == typeof s && (a = s ? Jo.has(e) : Yo.has(e)), o && a;
                };
            }
            const aO = new RegExp("s*:selfs*,?", "g");
            function ed(t, e, n, r) {
                return new lO(t).build(e, n, r);
            }
            let lO = class lO {
                build(e, n, r) {
                    const i = new dO(n);
                    this._resetContextStyleTimingState(i);
                    const s = rt(this, Qi(e), i);
                    return i.unsupportedCSSPropertiesFound.size && i.unsupportedCSSPropertiesFound.keys(), s;
                }
                _resetContextStyleTimingState(e) {
                    e.currentQuerySelector = "", e.collectedStyles = {}, e.collectedStyles[""] = {}, e.currentTime = 0;
                }
                visitTrigger(e, n) {
                    let r = n.queryCount = 0, i = n.depCount = 0;
                    const s = [], o = [];
                    return "@" == e.name.charAt(0) && n.errors.push(function yP() {
                        return new b(3006, G);
                    }()), e.definitions.forEach((a)=>{
                        if (this._resetContextStyleTimingState(n), 0 == a.type) {
                            const l = a, u = l.name;
                            u.toString().split(/\s*,\s*/).forEach((c)=>{
                                l.name = c, s.push(this.visitState(l, n));
                            }), l.name = u;
                        } else if (1 == a.type) {
                            const l = this.visitTransition(a, n);
                            r += l.queryCount, i += l.depCount, o.push(l);
                        } else n.errors.push(function _P() {
                            return new b(3007, G);
                        }());
                    }), {
                        type: 7,
                        name: e.name,
                        states: s,
                        transitions: o,
                        queryCount: r,
                        depCount: i,
                        options: null
                    };
                }
                visitState(e, n) {
                    const r = this.visitStyle(e.styles, n), i = e.options && e.options.params || null;
                    if (r.containsDynamicStyles) {
                        const s = new Set, o = i || {};
                        r.styles.forEach((a)=>{
                            if (Xo(a)) {
                                const l = a;
                                Object.keys(l).forEach((u)=>{
                                    Uv(l[u]).forEach((c)=>{
                                        o.hasOwnProperty(c) || s.add(c);
                                    });
                                });
                            }
                        }), s.size && (Wo(s.values()), n.errors.push(function vP(t, e) {
                            return new b(3008, G);
                        }()));
                    }
                    return {
                        type: 0,
                        name: e.name,
                        style: r,
                        options: i ? {
                            params: i
                        } : null
                    };
                }
                visitTransition(e, n) {
                    n.queryCount = 0, n.depCount = 0;
                    const r = rt(this, Qi(e.animation), n);
                    return {
                        type: 1,
                        matchers: iO(e.expr, n.errors),
                        animation: r,
                        queryCount: n.queryCount,
                        depCount: n.depCount,
                        options: Yn(e.options)
                    };
                }
                visitSequence(e, n) {
                    return {
                        type: 2,
                        steps: e.steps.map((r)=>rt(this, r, n)),
                        options: Yn(e.options)
                    };
                }
                visitGroup(e, n) {
                    const r = n.currentTime;
                    let i = 0;
                    const s = e.steps.map((o)=>{
                        n.currentTime = r;
                        const a = rt(this, o, n);
                        return i = Math.max(i, n.currentTime), a;
                    });
                    return n.currentTime = i, {
                        type: 3,
                        steps: s,
                        options: Yn(e.options)
                    };
                }
                visitAnimate(e81, n67) {
                    const r = function hO(t, e) {
                        if (t.hasOwnProperty("duration")) return t;
                        if ("number" == typeof t) return td(qo(t, e).duration, 0, "");
                        const n = t;
                        if (n.split(/\s+/).some((s)=>"{" == s.charAt(0) && "{" == s.charAt(1))) {
                            const s = td(0, 0, "");
                            return s.dynamic = !0, s.strValue = n, s;
                        }
                        const i = qo(n, e);
                        return td(i.duration, i.delay, i.easing);
                    }(e81.timings, n67.errors);
                    n67.currentAnimateTimings = r;
                    let i34, s31 = e81.styles ? e81.styles : Mv({});
                    if (5 == s31.type) i34 = this.visitKeyframes(s31, n67);
                    else {
                        let o = e81.styles, a = !1;
                        if (!o) {
                            a = !0;
                            const u = {};
                            r.easing && (u.easing = r.easing), o = Mv(u);
                        }
                        n67.currentTime += r.duration + r.delay;
                        const l = this.visitStyle(o, n67);
                        l.isEmptyStep = a, i34 = l;
                    }
                    return n67.currentAnimateTimings = null, {
                        type: 4,
                        timings: r,
                        style: i34,
                        options: null
                    };
                }
                visitStyle(e, n) {
                    const r = this._makeStyleAst(e, n);
                    return this._validateStyleAst(r, n), r;
                }
                _makeStyleAst(e, n) {
                    const r = [];
                    Array.isArray(e.styles) ? e.styles.forEach((o)=>{
                        "string" == typeof o ? o == on ? r.push(o) : n.errors.push(function DP(t) {
                            return new b(3002, G);
                        }()) : r.push(o);
                    }) : r.push(e.styles);
                    let i = !1, s = null;
                    return r.forEach((o)=>{
                        if (Xo(o)) {
                            const a = o, l = a.easing;
                            if (l && (s = l, delete a.easing), !i) {
                                for(let u in a)if (a[u].toString().indexOf("{{") >= 0) {
                                    i = !0;
                                    break;
                                }
                            }
                        }
                    }), {
                        type: 6,
                        styles: r,
                        easing: s,
                        offset: e.offset,
                        containsDynamicStyles: i,
                        options: null
                    };
                }
                _validateStyleAst(e82, n68) {
                    const r47 = n68.currentAnimateTimings;
                    let i35 = n68.currentTime, s32 = n68.currentTime;
                    r47 && s32 > 0 && (s32 -= r47.duration + r47.delay), e82.styles.forEach((o)=>{
                        "string" != typeof o && Object.keys(o).forEach((a)=>{
                            if (!this._driver.validateStyleProperty(a)) return delete o[a], void n68.unsupportedCSSPropertiesFound.add(a);
                            const l = n68.collectedStyles[n68.currentQuerySelector], u = l[a];
                            let c = !0;
                            u && (s32 != i35 && s32 >= u.startTime && i35 <= u.endTime && (n68.errors.push(function EP(t, e, n, r, i) {
                                return new b(3010, G);
                            }()), c = !1), s32 = u.startTime), c && (l[a] = {
                                startTime: s32,
                                endTime: i35
                            }), n68.options && function ZP(t, e, n) {
                                const r = e.params || {}, i = Uv(t);
                                i.length && i.forEach((s)=>{
                                    r.hasOwnProperty(s) || n.push(function hP(t) {
                                        return new b(3001, G);
                                    }());
                                });
                            }(o[a], n68.options, n68.errors);
                        });
                    });
                }
                visitKeyframes(e83, n69) {
                    const r48 = {
                        type: 5,
                        styles: [],
                        options: null
                    };
                    if (!n69.currentAnimateTimings) return n69.errors.push(function CP() {
                        return new b(3011, G);
                    }()), r48;
                    let s = 0;
                    const o = [];
                    let a = !1, l = !1, u = 0;
                    const c = e83.steps.map((_)=>{
                        const m = this._makeStyleAst(_, n69);
                        let E = null != m.offset ? m.offset : function fO(t) {
                            if ("string" == typeof t) return null;
                            let e = null;
                            if (Array.isArray(t)) t.forEach((n)=>{
                                if (Xo(n) && n.hasOwnProperty("offset")) {
                                    const r = n;
                                    e = parseFloat(r.offset), delete r.offset;
                                }
                            });
                            else if (Xo(t) && t.hasOwnProperty("offset")) {
                                const n = t;
                                e = parseFloat(n.offset), delete n.offset;
                            }
                            return e;
                        }(m.styles), S = 0;
                        return null != E && (s++, S = m.offset = E), l = l || S < 0 || S > 1, a = a || S < u, u = S, o.push(S), m;
                    });
                    l && n69.errors.push(function wP() {
                        return new b(3012, G);
                    }()), a && n69.errors.push(function bP() {
                        return new b(3200, G);
                    }());
                    const d = e83.steps.length;
                    let f = 0;
                    s > 0 && s < d ? n69.errors.push(function MP() {
                        return new b(3202, G);
                    }()) : 0 == s && (f = 1 / (d - 1));
                    const h = d - 1, p = n69.currentTime, g = n69.currentAnimateTimings, y = g.duration;
                    return c.forEach((_, m)=>{
                        const E = f > 0 ? m == h ? 1 : f * m : o[m], S = E * y;
                        n69.currentTime = p + g.delay + S, g.duration = S, this._validateStyleAst(_, n69), _.offset = E, r48.styles.push(_);
                    }), r48;
                }
                visitReference(e, n) {
                    return {
                        type: 8,
                        animation: rt(this, Qi(e.animation), n),
                        options: Yn(e.options)
                    };
                }
                visitAnimateChild(e, n) {
                    return n.depCount++, {
                        type: 9,
                        options: Yn(e.options)
                    };
                }
                visitAnimateRef(e, n) {
                    return {
                        type: 10,
                        animation: this.visitReference(e.animation, n),
                        options: Yn(e.options)
                    };
                }
                visitQuery(e84, n70) {
                    const r = n70.currentQuerySelector, i = e84.options || {};
                    n70.queryCount++, n70.currentQuery = e84;
                    const [s, o] = function uO(t) {
                        const e = !!t.split(/\s*,\s*/).find((n)=>":self" == n);
                        return e && (t = t.replace(aO, "")), t = t.replace(/@\*/g, Go).replace(/@\w+/g, (n)=>Go + "-" + n.substr(1)).replace(/:animating/g, Zc), [
                            t,
                            e
                        ];
                    }(e84.selector);
                    n70.currentQuerySelector = r.length ? r + " " + s : s, nt(n70.collectedStyles, n70.currentQuerySelector, {});
                    const a = rt(this, Qi(e84.animation), n70);
                    return n70.currentQuery = null, n70.currentQuerySelector = r, {
                        type: 11,
                        selector: s,
                        limit: i.limit || 0,
                        optional: !!i.optional,
                        includeSelf: o,
                        animation: a,
                        originalSelector: e84.selector,
                        options: Yn(e84.options)
                    };
                }
                visitStagger(e, n) {
                    n.currentQuery || n.errors.push(function SP() {
                        return new b(3013, G);
                    }());
                    const r = "full" === e.timings ? {
                        duration: 0,
                        delay: 0,
                        easing: "full"
                    } : qo(e.timings, n.errors, !0);
                    return {
                        type: 12,
                        animation: rt(this, Qi(e.animation), n),
                        timings: r,
                        options: null
                    };
                }
                constructor(e){
                    this._driver = e;
                }
            };
            let dO = class dO {
                constructor(e){
                    this.errors = e, this.queryCount = 0, this.depCount = 0, this.currentTransition = null, this.currentQuery = null, this.currentQuerySelector = null, this.currentAnimateTimings = null, this.currentTime = 0, this.collectedStyles = {}, this.options = null, this.unsupportedCSSPropertiesFound = new Set;
                }
            };
            function Xo(t) {
                return !Array.isArray(t) && "object" == typeof t;
            }
            function Yn(t105) {
                return t105 ? (t105 = zr(t105)).params && (t105.params = function cO(t) {
                    return t ? zr(t) : null;
                }(t105.params)) : t105 = {}, t105;
            }
            function td(t, e, n) {
                return {
                    duration: t,
                    delay: e,
                    easing: n
                };
            }
            function nd(t, e, n, r, i, s, o = null, a = !1) {
                return {
                    type: 1,
                    element: t,
                    keyframes: e,
                    preStyleProps: n,
                    postStyleProps: r,
                    duration: i,
                    delay: s,
                    totalTime: i + s,
                    easing: o,
                    subTimeline: a
                };
            }
            let ea = class ea {
                get(e) {
                    return this._map.get(e) || [];
                }
                append(e, n) {
                    let r = this._map.get(e);
                    r || this._map.set(e, r = []), r.push(...n);
                }
                has(e) {
                    return this._map.has(e);
                }
                clear() {
                    this._map.clear();
                }
                constructor(){
                    this._map = new Map;
                }
            };
            const mO = new RegExp(":enter", "g"), _O = new RegExp(":leave", "g");
            function rd(t, e, n, r, i, s = {}, o = {}, a, l, u = []) {
                return (new vO).buildKeyframes(t, e, n, r, i, s, o, a, l, u);
            }
            let vO = class vO {
                buildKeyframes(e, n, r, i, s, o, a, l, u, c = []) {
                    u = u || new ea;
                    const d = new id(e, n, u, i, s, c, []);
                    d.options = l, d.currentTimeline.setStyles([
                        o
                    ], null, d.errors, l), rt(this, r, d);
                    const f = d.timelines.filter((h)=>h.containsAnimation());
                    if (Object.keys(a).length) {
                        let h;
                        for(let p = f.length - 1; p >= 0; p--){
                            const g = f[p];
                            if (g.element === n) {
                                h = g;
                                break;
                            }
                        }
                        h && !h.allowOnlyTimelineStyles() && h.setStyles([
                            a
                        ], null, d.errors, l);
                    }
                    return f.length ? f.map((h)=>h.buildKeyframes()) : [
                        nd(n, [], [], [], 0, 0, "", !1)
                    ];
                }
                visitTrigger(e, n) {}
                visitState(e, n) {}
                visitTransition(e, n) {}
                visitAnimateChild(e, n) {
                    const r = n.subInstructions.get(n.element);
                    if (r) {
                        const i = n.createSubContext(e.options), s = n.currentTimeline.currentTime, o = this._visitSubInstructions(r, i, i.options);
                        s != o && n.transformIntoNewTimeline(o);
                    }
                    n.previousNode = e;
                }
                visitAnimateRef(e, n) {
                    const r = n.createSubContext(e.options);
                    r.transformIntoNewTimeline(), this.visitReference(e.animation, r), n.transformIntoNewTimeline(r.currentTimeline.currentTime), n.previousNode = e;
                }
                _visitSubInstructions(e, n, r) {
                    let s = n.currentTimeline.currentTime;
                    const o = null != r.duration ? Zn(r.duration) : null, a = null != r.delay ? Zn(r.delay) : null;
                    return 0 !== o && e.forEach((l)=>{
                        const u = n.appendInstructionToTimeline(l, o, a);
                        s = Math.max(s, u.duration + u.delay);
                    }), s;
                }
                visitReference(e, n) {
                    n.updateOptions(e.options, !0), rt(this, e.animation, n), n.previousNode = e;
                }
                visitSequence(e, n) {
                    const r = n.subContextCount;
                    let i = n;
                    const s = e.options;
                    if (s && (s.params || s.delay) && (i = n.createSubContext(s), i.transformIntoNewTimeline(), null != s.delay)) {
                        6 == i.previousNode.type && (i.currentTimeline.snapshotCurrentStyles(), i.previousNode = ta);
                        const o = Zn(s.delay);
                        i.delayNextStep(o);
                    }
                    e.steps.length && (e.steps.forEach((o)=>rt(this, o, i)), i.currentTimeline.applyStylesToKeyframe(), i.subContextCount > r && i.transformIntoNewTimeline()), n.previousNode = e;
                }
                visitGroup(e, n) {
                    const r = [];
                    let i = n.currentTimeline.currentTime;
                    const s = e.options && e.options.delay ? Zn(e.options.delay) : 0;
                    e.steps.forEach((o)=>{
                        const a = n.createSubContext(e.options);
                        s && a.delayNextStep(s), rt(this, o, a), i = Math.max(i, a.currentTimeline.currentTime), r.push(a.currentTimeline);
                    }), r.forEach((o)=>n.currentTimeline.mergeTimelineCollectedStyles(o)), n.transformIntoNewTimeline(i), n.previousNode = e;
                }
                _visitTiming(e, n) {
                    if (e.dynamic) {
                        const r = e.strValue;
                        return qo(n.params ? zo(r, n.params, n.errors) : r, n.errors);
                    }
                    return {
                        duration: e.duration,
                        delay: e.delay,
                        easing: e.easing
                    };
                }
                visitAnimate(e, n) {
                    const r = n.currentAnimateTimings = this._visitTiming(e.timings, n), i = n.currentTimeline;
                    r.delay && (n.incrementTime(r.delay), i.snapshotCurrentStyles());
                    const s = e.style;
                    5 == s.type ? this.visitKeyframes(s, n) : (n.incrementTime(r.duration), this.visitStyle(s, n), i.applyStylesToKeyframe()), n.currentAnimateTimings = null, n.previousNode = e;
                }
                visitStyle(e, n) {
                    const r = n.currentTimeline, i = n.currentAnimateTimings;
                    !i && r.getCurrentStyleProperties().length && r.forwardFrame();
                    const s = i && i.easing || e.easing;
                    e.isEmptyStep ? r.applyEmptyStep(s) : r.setStyles(e.styles, s, n.errors, n.options), n.previousNode = e;
                }
                visitKeyframes(e, n) {
                    const r = n.currentAnimateTimings, i = n.currentTimeline.duration, s = r.duration, a = n.createSubContext().currentTimeline;
                    a.easing = r.easing, e.styles.forEach((l)=>{
                        a.forwardTime((l.offset || 0) * s), a.setStyles(l.styles, l.easing, n.errors, n.options), a.applyStylesToKeyframe();
                    }), n.currentTimeline.mergeTimelineCollectedStyles(a), n.transformIntoNewTimeline(i + s), n.previousNode = e;
                }
                visitQuery(e, n) {
                    const r = n.currentTimeline.currentTime, i = e.options || {}, s = i.delay ? Zn(i.delay) : 0;
                    s && (6 === n.previousNode.type || 0 == r && n.currentTimeline.getCurrentStyleProperties().length) && (n.currentTimeline.snapshotCurrentStyles(), n.previousNode = ta);
                    let o = r;
                    const a = n.invokeQuery(e.selector, e.originalSelector, e.limit, e.includeSelf, !!i.optional, n.errors);
                    n.currentQueryTotal = a.length;
                    let l = null;
                    a.forEach((u, c)=>{
                        n.currentQueryIndex = c;
                        const d = n.createSubContext(e.options, u);
                        s && d.delayNextStep(s), u === n.element && (l = d.currentTimeline), rt(this, e.animation, d), d.currentTimeline.applyStylesToKeyframe(), o = Math.max(o, d.currentTimeline.currentTime);
                    }), n.currentQueryIndex = 0, n.currentQueryTotal = 0, n.transformIntoNewTimeline(o), l && (n.currentTimeline.mergeTimelineCollectedStyles(l), n.currentTimeline.snapshotCurrentStyles()), n.previousNode = e;
                }
                visitStagger(e, n) {
                    const r = n.parentContext, i = n.currentTimeline, s = e.timings, o = Math.abs(s.duration), a = o * (n.currentQueryTotal - 1);
                    let l = o * n.currentQueryIndex;
                    switch(s.duration < 0 ? "reverse" : s.easing){
                        case "reverse":
                            l = a - l;
                            break;
                        case "full":
                            l = r.currentStaggerTime;
                    }
                    const c = n.currentTimeline;
                    l && c.delayNextStep(l);
                    const d = c.currentTime;
                    rt(this, e.animation, n), n.previousNode = e, r.currentStaggerTime = i.currentTime - d + (i.startTime - r.currentTimeline.startTime);
                }
            };
            const ta = {};
            let id = class id {
                get params() {
                    return this.options.params;
                }
                updateOptions(e, n) {
                    if (!e) return;
                    const r = e;
                    let i = this.options;
                    null != r.duration && (i.duration = Zn(r.duration)), null != r.delay && (i.delay = Zn(r.delay));
                    const s = r.params;
                    if (s) {
                        let o = i.params;
                        o || (o = this.options.params = {}), Object.keys(s).forEach((a)=>{
                            (!n || !o.hasOwnProperty(a)) && (o[a] = zo(s[a], o, this.errors));
                        });
                    }
                }
                _copyOptions() {
                    const e = {};
                    if (this.options) {
                        const n = this.options.params;
                        if (n) {
                            const r = e.params = {};
                            Object.keys(n).forEach((i)=>{
                                r[i] = n[i];
                            });
                        }
                    }
                    return e;
                }
                createSubContext(e = null, n, r) {
                    const i = n || this.element, s = new id(this._driver, i, this.subInstructions, this._enterClassName, this._leaveClassName, this.errors, this.timelines, this.currentTimeline.fork(i, r || 0));
                    return s.previousNode = this.previousNode, s.currentAnimateTimings = this.currentAnimateTimings, s.options = this._copyOptions(), s.updateOptions(e), s.currentQueryIndex = this.currentQueryIndex, s.currentQueryTotal = this.currentQueryTotal, s.parentContext = this, this.subContextCount++, s;
                }
                transformIntoNewTimeline(e) {
                    return this.previousNode = ta, this.currentTimeline = this.currentTimeline.fork(this.element, e), this.timelines.push(this.currentTimeline), this.currentTimeline;
                }
                appendInstructionToTimeline(e, n, r) {
                    const i = {
                        duration: null != n ? n : e.duration,
                        delay: this.currentTimeline.currentTime + (null != r ? r : 0) + e.delay,
                        easing: ""
                    }, s = new DO(this._driver, e.element, e.keyframes, e.preStyleProps, e.postStyleProps, i, e.stretchStartingKeyframe);
                    return this.timelines.push(s), i;
                }
                incrementTime(e) {
                    this.currentTimeline.forwardTime(this.currentTimeline.duration + e);
                }
                delayNextStep(e) {
                    e > 0 && this.currentTimeline.delayNextStep(e);
                }
                invokeQuery(e, n, r, i, s, o) {
                    let a = [];
                    if (i && a.push(this.element), e.length > 0) {
                        e = (e = e.replace(mO, "." + this._enterClassName)).replace(_O, "." + this._leaveClassName);
                        let u = this._driver.query(this.element, e, 1 != r);
                        0 !== r && (u = r < 0 ? u.slice(u.length + r, u.length) : u.slice(0, r)), a.push(...u);
                    }
                    return !s && 0 == a.length && o.push(function AP(t) {
                        return new b(3014, G);
                    }()), a;
                }
                constructor(e, n, r, i, s, o, a, l){
                    this._driver = e, this.element = n, this.subInstructions = r, this._enterClassName = i, this._leaveClassName = s, this.errors = o, this.timelines = a, this.parentContext = null, this.currentAnimateTimings = null, this.previousNode = ta, this.subContextCount = 0, this.options = {}, this.currentQueryIndex = 0, this.currentQueryTotal = 0, this.currentStaggerTime = 0, this.currentTimeline = l || new na(this._driver, n, 0), a.push(this.currentTimeline);
                }
            };
            let na = class na {
                containsAnimation() {
                    switch(this._keyframes.size){
                        case 0:
                            return !1;
                        case 1:
                            return this.getCurrentStyleProperties().length > 0;
                        default:
                            return !0;
                    }
                }
                getCurrentStyleProperties() {
                    return Object.keys(this._currentKeyframe);
                }
                get currentTime() {
                    return this.startTime + this.duration;
                }
                delayNextStep(e) {
                    const n = 1 == this._keyframes.size && Object.keys(this._pendingStyles).length;
                    this.duration || n ? (this.forwardTime(this.currentTime + e), n && this.snapshotCurrentStyles()) : this.startTime += e;
                }
                fork(e, n) {
                    return this.applyStylesToKeyframe(), new na(this._driver, e, n || this.currentTime, this._elementTimelineStylesLookup);
                }
                _loadKeyframe() {
                    this._currentKeyframe && (this._previousKeyframe = this._currentKeyframe), this._currentKeyframe = this._keyframes.get(this.duration), this._currentKeyframe || (this._currentKeyframe = Object.create(this._backFill, {}), this._keyframes.set(this.duration, this._currentKeyframe));
                }
                forwardFrame() {
                    this.duration += 1, this._loadKeyframe();
                }
                forwardTime(e) {
                    this.applyStylesToKeyframe(), this.duration = e, this._loadKeyframe();
                }
                _updateStyle(e, n) {
                    this._localTimelineStyles[e] = n, this._globalTimelineStyles[e] = n, this._styleSummary[e] = {
                        time: this.currentTime,
                        value: n
                    };
                }
                allowOnlyTimelineStyles() {
                    return this._currentEmptyStepKeyframe !== this._currentKeyframe;
                }
                applyEmptyStep(e) {
                    e && (this._previousKeyframe.easing = e), Object.keys(this._globalTimelineStyles).forEach((n)=>{
                        this._backFill[n] = this._globalTimelineStyles[n] || on, this._currentKeyframe[n] = on;
                    }), this._currentEmptyStepKeyframe = this._currentKeyframe;
                }
                setStyles(e85, n71, r49, i36) {
                    n71 && (this._previousKeyframe.easing = n71);
                    const s33 = i36 && i36.params || {}, o = function EO(t, e) {
                        const n = {};
                        let r;
                        return t.forEach((i)=>{
                            "*" === i ? (r = r || Object.keys(e), r.forEach((s)=>{
                                n[s] = on;
                            })) : Mn(i, !1, n);
                        }), n;
                    }(e85, this._globalTimelineStyles);
                    Object.keys(o).forEach((a)=>{
                        const l = zo(o[a], s33, r49);
                        this._pendingStyles[a] = l, this._localTimelineStyles.hasOwnProperty(a) || (this._backFill[a] = this._globalTimelineStyles.hasOwnProperty(a) ? this._globalTimelineStyles[a] : on), this._updateStyle(a, l);
                    });
                }
                applyStylesToKeyframe() {
                    const e = this._pendingStyles, n = Object.keys(e);
                    0 != n.length && (this._pendingStyles = {}, n.forEach((r)=>{
                        this._currentKeyframe[r] = e[r];
                    }), Object.keys(this._localTimelineStyles).forEach((r)=>{
                        this._currentKeyframe.hasOwnProperty(r) || (this._currentKeyframe[r] = this._localTimelineStyles[r]);
                    }));
                }
                snapshotCurrentStyles() {
                    Object.keys(this._localTimelineStyles).forEach((e)=>{
                        const n = this._localTimelineStyles[e];
                        this._pendingStyles[e] = n, this._updateStyle(e, n);
                    });
                }
                getFinalKeyframe() {
                    return this._keyframes.get(this.duration);
                }
                get properties() {
                    const e = [];
                    for(let n in this._currentKeyframe)e.push(n);
                    return e;
                }
                mergeTimelineCollectedStyles(e) {
                    Object.keys(e._styleSummary).forEach((n)=>{
                        const r = this._styleSummary[n], i = e._styleSummary[n];
                        (!r || i.time > r.time) && this._updateStyle(n, i.value);
                    });
                }
                buildKeyframes() {
                    this.applyStylesToKeyframe();
                    const e = new Set, n = new Set, r = 1 === this._keyframes.size && 0 === this.duration;
                    let i = [];
                    this._keyframes.forEach((a, l)=>{
                        const u = Mn(a, !0);
                        Object.keys(u).forEach((c)=>{
                            const d = u[c];
                            "!" == d ? e.add(c) : d == on && n.add(c);
                        }), r || (u.offset = l / this.duration), i.push(u);
                    });
                    const s = e.size ? Wo(e.values()) : [], o = n.size ? Wo(n.values()) : [];
                    if (r) {
                        const a = i[0], l = zr(a);
                        a.offset = 0, l.offset = 1, i = [
                            a,
                            l
                        ];
                    }
                    return nd(this.element, i, s, o, this.duration, this.startTime, this.easing, !1);
                }
                constructor(e, n, r, i){
                    this._driver = e, this.element = n, this.startTime = r, this._elementTimelineStylesLookup = i, this.duration = 0, this._previousKeyframe = {}, this._currentKeyframe = {}, this._keyframes = new Map, this._styleSummary = {}, this._pendingStyles = {}, this._backFill = {}, this._currentEmptyStepKeyframe = null, this._elementTimelineStylesLookup || (this._elementTimelineStylesLookup = new Map), this._localTimelineStyles = Object.create(this._backFill, {}), this._globalTimelineStyles = this._elementTimelineStylesLookup.get(n), this._globalTimelineStyles || (this._globalTimelineStyles = this._localTimelineStyles, this._elementTimelineStylesLookup.set(n, this._localTimelineStyles)), this._loadKeyframe();
                }
            };
            let DO = class DO extends na {
                containsAnimation() {
                    return this.keyframes.length > 1;
                }
                buildKeyframes() {
                    let e = this.keyframes, { delay: n , duration: r , easing: i  } = this.timings;
                    if (this._stretchStartingKeyframe && n) {
                        const s = [], o = r + n, a = n / o, l = Mn(e[0], !1);
                        l.offset = 0, s.push(l);
                        const u = Mn(e[0], !1);
                        u.offset = Qv(a), s.push(u);
                        const c = e.length - 1;
                        for(let d = 1; d <= c; d++){
                            let f = Mn(e[d], !1);
                            f.offset = Qv((n + f.offset * r) / o), s.push(f);
                        }
                        r = o, n = 0, i = "", e = s;
                    }
                    return nd(this.element, e, this.preStyleProps, this.postStyleProps, r, n, i, !0);
                }
                constructor(e, n, r, i, s, o, a = !1){
                    super(e, n, o.delay), this.keyframes = r, this.preStyleProps = i, this.postStyleProps = s, this._stretchStartingKeyframe = a, this.timings = {
                        duration: o.duration,
                        delay: o.delay,
                        easing: o.easing
                    };
                }
            };
            function Qv(t, e = 3) {
                const n = Math.pow(10, e - 1);
                return Math.round(t * n) / n;
            }
            let sd = class sd {
            };
            let CO = class CO extends sd {
                normalizePropertyName(e, n) {
                    return Xc(e);
                }
                normalizeStyleValue(e, n, r, i) {
                    let s = "";
                    const o = r.toString().trim();
                    if (wO[n] && 0 !== r && "0" !== r) if ("number" == typeof r) s = "px";
                    else {
                        const a = r.match(/^[+-]?[\d\.]+([a-z]*)$/);
                        a && 0 == a[1].length && i.push(function mP(t, e) {
                            return new b(3005, G);
                        }());
                    }
                    return o + s;
                }
            };
            const wO = (()=>(function bO(t) {
                    const e = {};
                    return t.forEach((n)=>e[n] = !0), e;
                })("width,height,minWidth,minHeight,maxWidth,maxHeight,left,top,bottom,right,fontSize,outlineWidth,outlineOffset,paddingTop,paddingLeft,paddingBottom,paddingRight,marginTop,marginLeft,marginBottom,marginRight,borderRadius,borderWidth,borderTopWidth,borderLeftWidth,borderRightWidth,borderBottomWidth,textIndent,perspective".split(",")))();
            function Kv(t, e, n, r, i, s, o, a, l, u, c, d, f) {
                return {
                    type: 0,
                    element: t,
                    triggerName: e,
                    isRemovalTransition: i,
                    fromState: n,
                    fromStyles: s,
                    toState: r,
                    toStyles: o,
                    timelines: a,
                    queriedElements: l,
                    preStyleProps: u,
                    postStyleProps: c,
                    totalTime: d,
                    errors: f
                };
            }
            const od = {};
            let Zv = class Zv {
                match(e86, n72, r50, i37) {
                    return function MO(t, e, n, r, i) {
                        return t.some((s)=>s(e, n, r, i));
                    }(this.ast.matchers, e86, n72, r50, i37);
                }
                buildStyles(e, n, r) {
                    const i = this._stateStyles["*"], s = this._stateStyles[e], o = i ? i.buildStyles(n, r) : {};
                    return s ? s.buildStyles(n, r) : o;
                }
                build(e, n, r, i, s, o, a, l, u, c) {
                    const d = [], f = this.ast.options && this.ast.options.params || od, p = this.buildStyles(r, a && a.params || od, d), g = l && l.params || od, y = this.buildStyles(i, g, d), _ = new Set, m = new Map, E = new Map, S = "void" === i, j = {
                        params: Object.assign(Object.assign({}, f), g)
                    }, oe = c ? [] : rd(e, n, this.ast.animation, s, o, p, y, j, u, d);
                    let le = 0;
                    if (oe.forEach((st)=>{
                        le = Math.max(st.duration + st.delay, le);
                    }), d.length) return Kv(n, this._triggerName, r, i, S, p, y, [], [], m, E, le, d);
                    oe.forEach((st)=>{
                        const ot = st.element, Qr = nt(m, ot, {});
                        st.preStyleProps.forEach((Ot)=>Qr[Ot] = !0);
                        const an = nt(E, ot, {});
                        st.postStyleProps.forEach((Ot)=>an[Ot] = !0), ot !== n && _.add(ot);
                    });
                    const it = Wo(_.values());
                    return Kv(n, this._triggerName, r, i, S, p, y, oe, it, m, E, le);
                }
                constructor(e, n, r){
                    this._triggerName = e, this.ast = n, this._stateStyles = r;
                }
            };
            let SO = class SO {
                buildStyles(e, n) {
                    const r = {}, i = zr(this.defaultParams);
                    return Object.keys(e).forEach((s)=>{
                        const o = e[s];
                        null != o && (i[s] = o);
                    }), this.styles.styles.forEach((s)=>{
                        if ("string" != typeof s) {
                            const o = s;
                            Object.keys(o).forEach((a)=>{
                                let l = o[a];
                                l.length > 1 && (l = zo(l, i, n));
                                const u = this.normalizer.normalizePropertyName(a, n);
                                l = this.normalizer.normalizeStyleValue(a, u, l, n), r[u] = l;
                            });
                        }
                    }), r;
                }
                constructor(e, n, r){
                    this.styles = e, this.defaultParams = n, this.normalizer = r;
                }
            };
            let TO = class TO {
                get containsQueries() {
                    return this.ast.queryCount > 0;
                }
                matchTransition(e, n, r, i) {
                    return this.transitionFactories.find((o)=>o.match(e, n, r, i)) || null;
                }
                matchStyles(e, n, r) {
                    return this.fallbackTransition.buildStyles(e, n, r);
                }
                constructor(e87, n, r){
                    this.name = e87, this.ast = n, this._normalizer = r, this.transitionFactories = [], this.states = {}, n.states.forEach((i)=>{
                        this.states[i.name] = new SO(i.style, i.options && i.options.params || {}, r);
                    }), Jv(this.states, "true", "1"), Jv(this.states, "false", "0"), n.transitions.forEach((i)=>{
                        this.transitionFactories.push(new Zv(e87, i, this.states));
                    }), this.fallbackTransition = function IO(t, e, n) {
                        return new Zv(t, {
                            type: 1,
                            animation: {
                                type: 2,
                                steps: [],
                                options: null
                            },
                            matchers: [
                                (o, a)=>!0
                            ],
                            options: null,
                            queryCount: 0,
                            depCount: 0
                        }, e);
                    }(e87, this.states);
                }
            };
            function Jv(t, e, n) {
                t.hasOwnProperty(e) ? t.hasOwnProperty(n) || (t[n] = t[e]) : t.hasOwnProperty(n) && (t[e] = t[n]);
            }
            const NO = new ea;
            let FO = class FO {
                register(e, n) {
                    const r = [], s = ed(this._driver, n, r, []);
                    if (r.length) throw function xP(t) {
                        return new b(3503, G);
                    }();
                    this._animations[e] = s;
                }
                _buildPlayer(e, n, r) {
                    const i = e.element, s = Iv(0, this._normalizer, 0, e.keyframes, n, r);
                    return this._driver.animate(i, s, e.duration, e.delay, e.easing, [], !0);
                }
                create(e, n, r = {}) {
                    const i = [], s = this._animations[e];
                    let o;
                    const a = new Map;
                    if (s ? (o = rd(this._driver, n, s, Kc, $o, {}, {}, r, NO, i), o.forEach((c)=>{
                        const d = nt(a, c.element, {});
                        c.postStyleProps.forEach((f)=>d[f] = null);
                    })) : (i.push(function RP() {
                        return new b(3300, G);
                    }()), o = []), i.length) throw function kP(t) {
                        return new b(3504, G);
                    }();
                    a.forEach((c, d)=>{
                        Object.keys(c).forEach((f)=>{
                            c[f] = this._driver.computeStyle(d, f, on);
                        });
                    });
                    const u = bn(o.map((c)=>{
                        const d = a.get(c.element);
                        return this._buildPlayer(c, {}, d);
                    }));
                    return this._playersById[e] = u, u.onDestroy(()=>this.destroy(e)), this.players.push(u), u;
                }
                destroy(e) {
                    const n = this._getPlayer(e);
                    n.destroy(), delete this._playersById[e];
                    const r = this.players.indexOf(n);
                    r >= 0 && this.players.splice(r, 1);
                }
                _getPlayer(e) {
                    const n = this._playersById[e];
                    if (!n) throw function VP(t) {
                        return new b(3301, G);
                    }();
                    return n;
                }
                listen(e, n, r, i) {
                    const s = qc(n, "", "", "");
                    return Uc(this._getPlayer(e), r, s, i), ()=>{};
                }
                command(e, n, r, i) {
                    if ("register" == r) return void this.register(e, i[0]);
                    if ("create" == r) return void this.create(e, n, i[0] || {});
                    const s = this._getPlayer(e);
                    switch(r){
                        case "play":
                            s.play();
                            break;
                        case "pause":
                            s.pause();
                            break;
                        case "reset":
                            s.reset();
                            break;
                        case "restart":
                            s.restart();
                            break;
                        case "finish":
                            s.finish();
                            break;
                        case "init":
                            s.init();
                            break;
                        case "setPosition":
                            s.setPosition(parseFloat(i[0]));
                            break;
                        case "destroy":
                            this.destroy(e);
                    }
                }
                constructor(e, n, r){
                    this.bodyNode = e, this._driver = n, this._normalizer = r, this._animations = {}, this._playersById = {}, this.players = [];
                }
            };
            const Yv = "ng-animate-queued", ad = "ng-animate-disabled", kO = [], Xv = {
                namespaceId: "",
                setForRemoval: !1,
                setForMove: !1,
                hasAnimation: !1,
                removedBeforeQueried: !1
            }, VO = {
                namespaceId: "",
                setForMove: !1,
                setForRemoval: !1,
                hasAnimation: !1,
                removedBeforeQueried: !0
            }, _t = "__ng_removed";
            let ld = class ld {
                get params() {
                    return this.options.params;
                }
                absorbOptions(e) {
                    const n = e.params;
                    if (n) {
                        const r = this.options.params;
                        Object.keys(n).forEach((i)=>{
                            null == r[i] && (r[i] = n[i]);
                        });
                    }
                }
                constructor(e, n = ""){
                    this.namespaceId = n;
                    const r = e && e.hasOwnProperty("value");
                    if (this.value = function HO(t) {
                        return null != t ? t : null;
                    }(r ? e.value : e), r) {
                        const s = zr(e);
                        delete s.value, this.options = s;
                    } else this.options = {};
                    this.options.params || (this.options.params = {});
                }
            };
            const Ki = "void", ud = new ld(Ki);
            let LO = class LO {
                listen(e, n, r, i) {
                    if (!this._triggers.hasOwnProperty(n)) throw function LP(t, e) {
                        return new b(3302, G);
                    }();
                    if (null == r || 0 == r.length) throw function BP(t) {
                        return new b(3303, G);
                    }();
                    if (!function $O(t) {
                        return "start" == t || "done" == t;
                    }(r)) throw function jP(t, e) {
                        return new b(3400, G);
                    }();
                    const s = nt(this._elementListeners, e, []), o = {
                        name: n,
                        phase: r,
                        callback: i
                    };
                    s.push(o);
                    const a = nt(this._engine.statesByElement, e, {});
                    return a.hasOwnProperty(n) || (vt(e, Uo), vt(e, Uo + "-" + n), a[n] = ud), ()=>{
                        this._engine.afterFlush(()=>{
                            const l = s.indexOf(o);
                            l >= 0 && s.splice(l, 1), this._triggers[n] || delete a[n];
                        });
                    };
                }
                register(e, n) {
                    return !this._triggers[e] && (this._triggers[e] = n, !0);
                }
                _getTrigger(e) {
                    const n = this._triggers[e];
                    if (!n) throw function HP(t) {
                        return new b(3401, G);
                    }();
                    return n;
                }
                trigger(e88, n73, r51, i38 = !0) {
                    const s34 = this._getTrigger(n73), o = new cd(this.id, n73, e88);
                    let a = this._engine.statesByElement.get(e88);
                    a || (vt(e88, Uo), vt(e88, Uo + "-" + n73), this._engine.statesByElement.set(e88, a = {}));
                    let l = a[n73];
                    const u = new ld(r51, this.id);
                    if (!(r51 && r51.hasOwnProperty("value")) && l && u.absorbOptions(l.options), a[n73] = u, l || (l = ud), u.value !== Ki && l.value === u.value) {
                        if (!function qO(t, e) {
                            const n = Object.keys(t), r = Object.keys(e);
                            if (n.length != r.length) return !1;
                            for(let i = 0; i < n.length; i++){
                                const s = n[i];
                                if (!e.hasOwnProperty(s) || t[s] !== e[s]) return !1;
                            }
                            return !0;
                        }(l.params, u.params)) {
                            const g = [], y = s34.matchStyles(l.value, l.params, g), _ = s34.matchStyles(u.value, u.params, g);
                            g.length ? this._engine.reportError(g) : this._engine.afterFlush(()=>{
                                Jn(e88, y), zt(e88, _);
                            });
                        }
                        return;
                    }
                    const f = nt(this._engine.playersByElement, e88, []);
                    f.forEach((g)=>{
                        g.namespaceId == this.id && g.triggerName == n73 && g.queued && g.destroy();
                    });
                    let h = s34.matchTransition(l.value, u.value, e88, u.params), p = !1;
                    if (!h) {
                        if (!i38) return;
                        h = s34.fallbackTransition, p = !0;
                    }
                    return this._engine.totalQueuedPlayers++, this._queue.push({
                        element: e88,
                        triggerName: n73,
                        transition: h,
                        fromState: l,
                        toState: u,
                        player: o,
                        isFallbackTransition: p
                    }), p || (vt(e88, Yv), o.onStart(()=>{
                        Wr(e88, Yv);
                    })), o.onDone(()=>{
                        let g = this.players.indexOf(o);
                        g >= 0 && this.players.splice(g, 1);
                        const y = this._engine.playersByElement.get(e88);
                        if (y) {
                            let _ = y.indexOf(o);
                            _ >= 0 && y.splice(_, 1);
                        }
                    }), this.players.push(o), f.push(o), o;
                }
                deregister(e) {
                    delete this._triggers[e], this._engine.statesByElement.forEach((n, r)=>{
                        delete n[e];
                    }), this._elementListeners.forEach((n, r)=>{
                        this._elementListeners.set(r, n.filter((i)=>i.name != e));
                    });
                }
                clearElementCache(e) {
                    this._engine.statesByElement.delete(e), this._elementListeners.delete(e);
                    const n = this._engine.playersByElement.get(e);
                    n && (n.forEach((r)=>r.destroy()), this._engine.playersByElement.delete(e));
                }
                _signalRemovalForInnerTriggers(e, n) {
                    const r = this._engine.driver.query(e, Go, !0);
                    r.forEach((i)=>{
                        if (i[_t]) return;
                        const s = this._engine.fetchNamespacesByElement(i);
                        s.size ? s.forEach((o)=>o.triggerLeaveAnimation(i, n, !1, !0)) : this.clearElementCache(i);
                    }), this._engine.afterFlushAnimationsDone(()=>r.forEach((i)=>this.clearElementCache(i)));
                }
                triggerLeaveAnimation(e, n, r, i) {
                    const s = this._engine.statesByElement.get(e), o = new Map;
                    if (s) {
                        const a = [];
                        if (Object.keys(s).forEach((l)=>{
                            if (o.set(l, s[l].value), this._triggers[l]) {
                                const u = this.trigger(e, l, Ki, i);
                                u && a.push(u);
                            }
                        }), a.length) return this._engine.markElementAsRemoved(this.id, e, !0, n, o), r && bn(a).onDone(()=>this._engine.processLeaveNode(e)), !0;
                    }
                    return !1;
                }
                prepareLeaveAnimationListeners(e) {
                    const n = this._elementListeners.get(e), r = this._engine.statesByElement.get(e);
                    if (n && r) {
                        const i = new Set;
                        n.forEach((s)=>{
                            const o = s.name;
                            if (i.has(o)) return;
                            i.add(o);
                            const l = this._triggers[o].fallbackTransition, u = r[o] || ud, c = new ld(Ki), d = new cd(this.id, o, e);
                            this._engine.totalQueuedPlayers++, this._queue.push({
                                element: e,
                                triggerName: o,
                                transition: l,
                                fromState: u,
                                toState: c,
                                player: d,
                                isFallbackTransition: !0
                            });
                        });
                    }
                }
                removeNode(e, n) {
                    const r = this._engine;
                    if (e.childElementCount && this._signalRemovalForInnerTriggers(e, n), this.triggerLeaveAnimation(e, n, !0)) return;
                    let i = !1;
                    if (r.totalAnimations) {
                        const s = r.players.length ? r.playersByQueriedElement.get(e) : [];
                        if (s && s.length) i = !0;
                        else {
                            let o = e;
                            for(; o = o.parentNode;)if (r.statesByElement.get(o)) {
                                i = !0;
                                break;
                            }
                        }
                    }
                    if (this.prepareLeaveAnimationListeners(e), i) r.markElementAsRemoved(this.id, e, !1, n);
                    else {
                        const s = e[_t];
                        (!s || s === Xv) && (r.afterFlush(()=>this.clearElementCache(e)), r.destroyInnerAnimations(e), r._onRemovalComplete(e, n));
                    }
                }
                insertNode(e, n) {
                    vt(e, this._hostClassName);
                }
                drainQueuedTransitions(e) {
                    const n = [];
                    return this._queue.forEach((r)=>{
                        const i = r.player;
                        if (i.destroyed) return;
                        const s = r.element, o = this._elementListeners.get(s);
                        o && o.forEach((a)=>{
                            if (a.name == r.triggerName) {
                                const l = qc(s, r.triggerName, r.fromState.value, r.toState.value);
                                l._data = e, Uc(r.player, a.phase, l, a.callback);
                            }
                        }), i.markedForDestroy ? this._engine.afterFlush(()=>{
                            i.destroy();
                        }) : n.push(r);
                    }), this._queue = [], n.sort((r, i)=>{
                        const s = r.transition.ast.depCount, o = i.transition.ast.depCount;
                        return 0 == s || 0 == o ? s - o : this._engine.driver.containsElement(r.element, i.element) ? 1 : -1;
                    });
                }
                destroy(e) {
                    this.players.forEach((n)=>n.destroy()), this._signalRemovalForInnerTriggers(this.hostElement, e);
                }
                elementContainsData(e) {
                    let n = !1;
                    return this._elementListeners.has(e) && (n = !0), n = !!this._queue.find((r)=>r.element === e) || n, n;
                }
                constructor(e, n, r){
                    this.id = e, this.hostElement = n, this._engine = r, this.players = [], this._triggers = {}, this._queue = [], this._elementListeners = new Map, this._hostClassName = "ng-tns-" + e, vt(n, this._hostClassName);
                }
            };
            let BO = class BO {
                _onRemovalComplete(e, n) {
                    this.onRemovalComplete(e, n);
                }
                get queuedPlayers() {
                    const e = [];
                    return this._namespaceList.forEach((n)=>{
                        n.players.forEach((r)=>{
                            r.queued && e.push(r);
                        });
                    }), e;
                }
                createNamespace(e, n) {
                    const r = new LO(e, n, this);
                    return this.bodyNode && this.driver.containsElement(this.bodyNode, n) ? this._balanceNamespaceList(r, n) : (this.newHostElements.set(n, r), this.collectEnterElement(n)), this._namespaceLookup[e] = r;
                }
                _balanceNamespaceList(e, n) {
                    const r = this._namespaceList, i = this.namespacesByHostElement, s = r.length - 1;
                    if (s >= 0) {
                        let o = !1;
                        if (void 0 !== this.driver.getParentElement) {
                            let a = this.driver.getParentElement(n);
                            for(; a;){
                                const l = i.get(a);
                                if (l) {
                                    const u = r.indexOf(l);
                                    r.splice(u + 1, 0, e), o = !0;
                                    break;
                                }
                                a = this.driver.getParentElement(a);
                            }
                        } else for(let a = s; a >= 0; a--)if (this.driver.containsElement(r[a].hostElement, n)) {
                            r.splice(a + 1, 0, e), o = !0;
                            break;
                        }
                        o || r.unshift(e);
                    } else r.push(e);
                    return i.set(n, e), e;
                }
                register(e, n) {
                    let r = this._namespaceLookup[e];
                    return r || (r = this.createNamespace(e, n)), r;
                }
                registerTrigger(e, n, r) {
                    let i = this._namespaceLookup[e];
                    i && i.register(n, r) && this.totalAnimations++;
                }
                destroy(e, n) {
                    if (!e) return;
                    const r = this._fetchNamespace(e);
                    this.afterFlush(()=>{
                        this.namespacesByHostElement.delete(r.hostElement), delete this._namespaceLookup[e];
                        const i = this._namespaceList.indexOf(r);
                        i >= 0 && this._namespaceList.splice(i, 1);
                    }), this.afterFlushAnimationsDone(()=>r.destroy(n));
                }
                _fetchNamespace(e) {
                    return this._namespaceLookup[e];
                }
                fetchNamespacesByElement(e) {
                    const n = new Set, r = this.statesByElement.get(e);
                    if (r) {
                        const i = Object.keys(r);
                        for(let s = 0; s < i.length; s++){
                            const o = r[i[s]].namespaceId;
                            if (o) {
                                const a = this._fetchNamespace(o);
                                a && n.add(a);
                            }
                        }
                    }
                    return n;
                }
                trigger(e, n, r, i) {
                    if (ra(n)) {
                        const s = this._fetchNamespace(e);
                        if (s) return s.trigger(n, r, i), !0;
                    }
                    return !1;
                }
                insertNode(e, n, r, i) {
                    if (!ra(n)) return;
                    const s = n[_t];
                    if (s && s.setForRemoval) {
                        s.setForRemoval = !1, s.setForMove = !0;
                        const o = this.collectedLeaveElements.indexOf(n);
                        o >= 0 && this.collectedLeaveElements.splice(o, 1);
                    }
                    if (e) {
                        const o = this._fetchNamespace(e);
                        o && o.insertNode(n, r);
                    }
                    i && this.collectEnterElement(n);
                }
                collectEnterElement(e) {
                    this.collectedEnterElements.push(e);
                }
                markElementAsDisabled(e, n) {
                    n ? this.disabledNodes.has(e) || (this.disabledNodes.add(e), vt(e, ad)) : this.disabledNodes.has(e) && (this.disabledNodes.delete(e), Wr(e, ad));
                }
                removeNode(e, n, r, i) {
                    if (ra(n)) {
                        const s = e ? this._fetchNamespace(e) : null;
                        if (s ? s.removeNode(n, i) : this.markElementAsRemoved(e, n, !1, i), r) {
                            const o = this.namespacesByHostElement.get(n);
                            o && o.id !== e && o.removeNode(n, i);
                        }
                    } else this._onRemovalComplete(n, i);
                }
                markElementAsRemoved(e, n, r, i, s) {
                    this.collectedLeaveElements.push(n), n[_t] = {
                        namespaceId: e,
                        setForRemoval: i,
                        hasAnimation: r,
                        removedBeforeQueried: !1,
                        previousTriggersValues: s
                    };
                }
                listen(e, n, r, i, s) {
                    return ra(n) ? this._fetchNamespace(e).listen(n, r, i, s) : ()=>{};
                }
                _buildInstruction(e, n, r, i, s) {
                    return e.transition.build(this.driver, e.element, e.fromState.value, e.toState.value, r, i, e.fromState.options, e.toState.options, n, s);
                }
                destroyInnerAnimations(e) {
                    let n = this.driver.query(e, Go, !0);
                    n.forEach((r)=>this.destroyActiveAnimationsForElement(r)), 0 != this.playersByQueriedElement.size && (n = this.driver.query(e, Zc, !0), n.forEach((r)=>this.finishActiveQueriedAnimationOnElement(r)));
                }
                destroyActiveAnimationsForElement(e) {
                    const n = this.playersByElement.get(e);
                    n && n.forEach((r)=>{
                        r.queued ? r.markedForDestroy = !0 : r.destroy();
                    });
                }
                finishActiveQueriedAnimationOnElement(e) {
                    const n = this.playersByQueriedElement.get(e);
                    n && n.forEach((r)=>r.finish());
                }
                whenRenderingDone() {
                    return new Promise((e)=>{
                        if (this.players.length) return bn(this.players).onDone(()=>e());
                        e();
                    });
                }
                processLeaveNode(e) {
                    var n;
                    const r = e[_t];
                    if (r && r.setForRemoval) {
                        if (e[_t] = Xv, r.namespaceId) {
                            this.destroyInnerAnimations(e);
                            const i = this._fetchNamespace(r.namespaceId);
                            i && i.clearElementCache(e);
                        }
                        this._onRemovalComplete(e, r.setForRemoval);
                    }
                    (null === (n = e.classList) || void 0 === n ? void 0 : n.contains(ad)) && this.markElementAsDisabled(e, !1), this.driver.query(e, ".ng-animate-disabled", !0).forEach((i)=>{
                        this.markElementAsDisabled(i, !1);
                    });
                }
                flush(e = -1) {
                    let n = [];
                    if (this.newHostElements.size && (this.newHostElements.forEach((r, i)=>this._balanceNamespaceList(r, i)), this.newHostElements.clear()), this.totalAnimations && this.collectedEnterElements.length) for(let r53 = 0; r53 < this.collectedEnterElements.length; r53++)vt(this.collectedEnterElements[r53], "ng-star-inserted");
                    if (this._namespaceList.length && (this.totalQueuedPlayers || this.collectedLeaveElements.length)) {
                        const r = [];
                        try {
                            n = this._flushAnimations(r, e);
                        } finally{
                            for(let i = 0; i < r.length; i++)r[i]();
                        }
                    } else for(let r52 = 0; r52 < this.collectedLeaveElements.length; r52++)this.processLeaveNode(this.collectedLeaveElements[r52]);
                    if (this.totalQueuedPlayers = 0, this.collectedEnterElements.length = 0, this.collectedLeaveElements.length = 0, this._flushFns.forEach((r)=>r()), this._flushFns = [], this._whenQuietFns.length) {
                        const r = this._whenQuietFns;
                        this._whenQuietFns = [], n.length ? bn(n).onDone(()=>{
                            r.forEach((i)=>i());
                        }) : r.forEach((i)=>i());
                    }
                }
                reportError(e) {
                    throw function $P(t) {
                        return new b(3402, G);
                    }();
                }
                _flushAnimations(e, n) {
                    const r = new ea, i = [], s = new Map, o = [], a = new Map, l = new Map, u = new Map, c = new Set;
                    this.disabledNodes.forEach((M)=>{
                        c.add(M);
                        const A = this.driver.query(M, ".ng-animate-queued", !0);
                        for(let N = 0; N < A.length; N++)c.add(A[N]);
                    });
                    const d = this.bodyNode, f = Array.from(this.statesByElement.keys()), h = nD(f, this.collectedEnterElements), p = new Map;
                    let g = 0;
                    h.forEach((M, A)=>{
                        const N = Kc + g++;
                        p.set(A, N), M.forEach((W)=>vt(W, N));
                    });
                    const y = [], _ = new Set, m = new Set;
                    for(let M3 = 0; M3 < this.collectedLeaveElements.length; M3++){
                        const A = this.collectedLeaveElements[M3], N = A[_t];
                        N && N.setForRemoval && (y.push(A), _.add(A), N.hasAnimation ? this.driver.query(A, ".ng-star-inserted", !0).forEach((W)=>_.add(W)) : m.add(A));
                    }
                    const E = new Map, S = nD(f, Array.from(_));
                    S.forEach((M, A)=>{
                        const N = $o + g++;
                        E.set(A, N), M.forEach((W)=>vt(W, N));
                    }), e.push(()=>{
                        h.forEach((M, A)=>{
                            const N = p.get(A);
                            M.forEach((W)=>Wr(W, N));
                        }), S.forEach((M, A)=>{
                            const N = E.get(A);
                            M.forEach((W)=>Wr(W, N));
                        }), y.forEach((M)=>{
                            this.processLeaveNode(M);
                        });
                    });
                    const j = [], oe = [];
                    for(let M1 = this._namespaceList.length - 1; M1 >= 0; M1--)this._namespaceList[M1].drainQueuedTransitions(n).forEach((N)=>{
                        const W = N.player, Me = N.element;
                        if (j.push(W), this.collectedEnterElements.length) {
                            const $e = Me[_t];
                            if ($e && $e.setForMove) {
                                if ($e.previousTriggersValues && $e.previousTriggersValues.has(N.triggerName)) {
                                    const Xn = $e.previousTriggersValues.get(N.triggerName), An = this.statesByElement.get(N.element);
                                    An && An[N.triggerName] && (An[N.triggerName].value = Xn);
                                }
                                return void W.destroy();
                            }
                        }
                        const Wt = !d || !this.driver.containsElement(d, Me), at = E.get(Me), Sn = p.get(Me), ue = this._buildInstruction(N, r, Sn, at, Wt);
                        if (ue.errors && ue.errors.length) return void oe.push(ue);
                        if (Wt) return W.onStart(()=>Jn(Me, ue.fromStyles)), W.onDestroy(()=>zt(Me, ue.toStyles)), void i.push(W);
                        if (N.isFallbackTransition) return W.onStart(()=>Jn(Me, ue.fromStyles)), W.onDestroy(()=>zt(Me, ue.toStyles)), void i.push(W);
                        const fD = [];
                        ue.timelines.forEach(($e)=>{
                            $e.stretchStartingKeyframe = !0, this.disabledNodes.has($e.element) || fD.push($e);
                        }), ue.timelines = fD, r.append(Me, ue.timelines), o.push({
                            instruction: ue,
                            player: W,
                            element: Me
                        }), ue.queriedElements.forEach(($e)=>nt(a, $e, []).push(W)), ue.preStyleProps.forEach(($e, Xn)=>{
                            const An = Object.keys($e);
                            if (An.length) {
                                let er = l.get(Xn);
                                er || l.set(Xn, er = new Set), An.forEach((fd)=>er.add(fd));
                            }
                        }), ue.postStyleProps.forEach(($e, Xn)=>{
                            const An = Object.keys($e);
                            let er = u.get(Xn);
                            er || u.set(Xn, er = new Set), An.forEach((fd)=>er.add(fd));
                        });
                    });
                    if (oe.length) {
                        const M = [];
                        oe.forEach((A)=>{
                            M.push(function UP(t, e) {
                                return new b(3505, G);
                            }());
                        }), j.forEach((A)=>A.destroy()), this.reportError(M);
                    }
                    const le = new Map, it = new Map;
                    o.forEach((M)=>{
                        const A = M.element;
                        r.has(A) && (it.set(A, A), this._beforeAnimationBuild(M.player.namespaceId, M.instruction, le));
                    }), i.forEach((M)=>{
                        const A = M.element;
                        this._getPreviousPlayers(A, !1, M.namespaceId, M.triggerName, null).forEach((W)=>{
                            nt(le, A, []).push(W), W.destroy();
                        });
                    });
                    const st = y.filter((M)=>iD(M, l, u)), ot = new Map;
                    tD(ot, this.driver, m, u, on).forEach((M)=>{
                        iD(M, l, u) && st.push(M);
                    });
                    const an = new Map;
                    h.forEach((M, A)=>{
                        tD(an, this.driver, new Set(M), l, "!");
                    }), st.forEach((M)=>{
                        const A = ot.get(M), N = an.get(M);
                        ot.set(M, Object.assign(Object.assign({}, A), N));
                    });
                    const Ot = [], Kr = [], Zr = {};
                    o.forEach((M)=>{
                        const { element: A , player: N , instruction: W  } = M;
                        if (r.has(A)) {
                            if (c.has(A)) return N.onDestroy(()=>zt(A, W.toStyles)), N.disabled = !0, N.overrideTotalTime(W.totalTime), void i.push(N);
                            let Me = Zr;
                            if (it.size > 1) {
                                let at = A;
                                const Sn = [];
                                for(; at = at.parentNode;){
                                    const ue = it.get(at);
                                    if (ue) {
                                        Me = ue;
                                        break;
                                    }
                                    Sn.push(at);
                                }
                                Sn.forEach((ue)=>it.set(ue, Me));
                            }
                            const Wt = this._buildAnimation(N.namespaceId, W, le, s, an, ot);
                            if (N.setRealPlayer(Wt), Me === Zr) Ot.push(N);
                            else {
                                const at = this.playersByElement.get(Me);
                                at && at.length && (N.parentPlayer = bn(at)), i.push(N);
                            }
                        } else Jn(A, W.fromStyles), N.onDestroy(()=>zt(A, W.toStyles)), Kr.push(N), c.has(A) && i.push(N);
                    }), Kr.forEach((M)=>{
                        const A = s.get(M.element);
                        if (A && A.length) {
                            const N = bn(A);
                            M.setRealPlayer(N);
                        }
                    }), i.forEach((M)=>{
                        M.parentPlayer ? M.syncPlayerEvents(M.parentPlayer) : M.destroy();
                    });
                    for(let M2 = 0; M2 < y.length; M2++){
                        const A = y[M2], N = A[_t];
                        if (Wr(A, $o), N && N.hasAnimation) continue;
                        let W = [];
                        if (a.size) {
                            let Wt = a.get(A);
                            Wt && Wt.length && W.push(...Wt);
                            let at = this.driver.query(A, Zc, !0);
                            for(let Sn = 0; Sn < at.length; Sn++){
                                let ue = a.get(at[Sn]);
                                ue && ue.length && W.push(...ue);
                            }
                        }
                        const Me = W.filter((Wt)=>!Wt.destroyed);
                        Me.length ? UO(this, A, Me) : this.processLeaveNode(A);
                    }
                    return y.length = 0, Ot.forEach((M)=>{
                        this.players.push(M), M.onDone(()=>{
                            M.destroy();
                            const A = this.players.indexOf(M);
                            this.players.splice(A, 1);
                        }), M.play();
                    }), Ot;
                }
                elementContainsData(e, n) {
                    let r = !1;
                    const i = n[_t];
                    return i && i.setForRemoval && (r = !0), this.playersByElement.has(n) && (r = !0), this.playersByQueriedElement.has(n) && (r = !0), this.statesByElement.has(n) && (r = !0), this._fetchNamespace(e).elementContainsData(n) || r;
                }
                afterFlush(e) {
                    this._flushFns.push(e);
                }
                afterFlushAnimationsDone(e) {
                    this._whenQuietFns.push(e);
                }
                _getPreviousPlayers(e, n, r, i, s) {
                    let o = [];
                    if (n) {
                        const a = this.playersByQueriedElement.get(e);
                        a && (o = a);
                    } else {
                        const a = this.playersByElement.get(e);
                        if (a) {
                            const l = !s || s == Ki;
                            a.forEach((u)=>{
                                u.queued || !l && u.triggerName != i || o.push(u);
                            });
                        }
                    }
                    return (r || i) && (o = o.filter((a)=>!(r && r != a.namespaceId || i && i != a.triggerName))), o;
                }
                _beforeAnimationBuild(e, n, r) {
                    const s = n.element, o = n.isRemovalTransition ? void 0 : e, a = n.isRemovalTransition ? void 0 : n.triggerName;
                    for (const l of n.timelines){
                        const u = l.element, c = u !== s, d = nt(r, u, []);
                        this._getPreviousPlayers(u, c, o, a, n.toState).forEach((h)=>{
                            const p = h.getRealPlayer();
                            p.beforeDestroy && p.beforeDestroy(), h.destroy(), d.push(h);
                        });
                    }
                    Jn(s, n.fromStyles);
                }
                _buildAnimation(e89, n74, r54, i39, s, o) {
                    const a = n74.triggerName, l = n74.element, u = [], c = new Set, d = new Set, f = n74.timelines.map((p)=>{
                        const g = p.element;
                        c.add(g);
                        const y = g[_t];
                        if (y && y.removedBeforeQueried) return new Wi(p.duration, p.delay);
                        const _ = g !== l, m = (function GO(t) {
                            const e = [];
                            return rD(t, e), e;
                        })((r54.get(g) || kO).map((le)=>le.getRealPlayer())).filter((le)=>!!le.element && le.element === g), E = s.get(g), S = o.get(g), j = Iv(0, this._normalizer, 0, p.keyframes, E, S), oe = this._buildPlayer(p, j, m);
                        if (p.subTimeline && i39 && d.add(g), _) {
                            const le = new cd(e89, a, g);
                            le.setRealPlayer(oe), u.push(le);
                        }
                        return oe;
                    });
                    u.forEach((p)=>{
                        nt(this.playersByQueriedElement, p.element, []).push(p), p.onDone(()=>(function jO(t, e, n) {
                                let r;
                                if (t instanceof Map) {
                                    if (r = t.get(e), r) {
                                        if (r.length) {
                                            const i = r.indexOf(n);
                                            r.splice(i, 1);
                                        }
                                        0 == r.length && t.delete(e);
                                    }
                                } else if (r = t[e], r) {
                                    if (r.length) {
                                        const i = r.indexOf(n);
                                        r.splice(i, 1);
                                    }
                                    0 == r.length && delete t[e];
                                }
                                return r;
                            })(this.playersByQueriedElement, p.element, p));
                    }), c.forEach((p)=>vt(p, Bv));
                    const h = bn(f);
                    return h.onDestroy(()=>{
                        c.forEach((p)=>Wr(p, Bv)), zt(l, n74.toStyles);
                    }), d.forEach((p)=>{
                        nt(i39, p, []).push(h);
                    }), h;
                }
                _buildPlayer(e, n, r) {
                    return n.length > 0 ? this.driver.animate(e.element, n, e.duration, e.delay, e.easing, r) : new Wi(e.duration, e.delay);
                }
                constructor(e, n, r){
                    this.bodyNode = e, this.driver = n, this._normalizer = r, this.players = [], this.newHostElements = new Map, this.playersByElement = new Map, this.playersByQueriedElement = new Map, this.statesByElement = new Map, this.disabledNodes = new Set, this.totalAnimations = 0, this.totalQueuedPlayers = 0, this._namespaceLookup = {}, this._namespaceList = [], this._flushFns = [], this._whenQuietFns = [], this.namespacesByHostElement = new Map, this.collectedEnterElements = [], this.collectedLeaveElements = [], this.onRemovalComplete = (i, s)=>{};
                }
            };
            let cd = class cd {
                setRealPlayer(e) {
                    this._containsRealPlayer || (this._player = e, Object.keys(this._queuedCallbacks).forEach((n)=>{
                        this._queuedCallbacks[n].forEach((r)=>Uc(e, n, void 0, r));
                    }), this._queuedCallbacks = {}, this._containsRealPlayer = !0, this.overrideTotalTime(e.totalTime), this.queued = !1);
                }
                getRealPlayer() {
                    return this._player;
                }
                overrideTotalTime(e) {
                    this.totalTime = e;
                }
                syncPlayerEvents(e) {
                    const n = this._player;
                    n.triggerCallback && e.onStart(()=>n.triggerCallback("start")), e.onDone(()=>this.finish()), e.onDestroy(()=>this.destroy());
                }
                _queueEvent(e, n) {
                    nt(this._queuedCallbacks, e, []).push(n);
                }
                onDone(e) {
                    this.queued && this._queueEvent("done", e), this._player.onDone(e);
                }
                onStart(e) {
                    this.queued && this._queueEvent("start", e), this._player.onStart(e);
                }
                onDestroy(e) {
                    this.queued && this._queueEvent("destroy", e), this._player.onDestroy(e);
                }
                init() {
                    this._player.init();
                }
                hasStarted() {
                    return !this.queued && this._player.hasStarted();
                }
                play() {
                    !this.queued && this._player.play();
                }
                pause() {
                    !this.queued && this._player.pause();
                }
                restart() {
                    !this.queued && this._player.restart();
                }
                finish() {
                    this._player.finish();
                }
                destroy() {
                    this.destroyed = !0, this._player.destroy();
                }
                reset() {
                    !this.queued && this._player.reset();
                }
                setPosition(e) {
                    this.queued || this._player.setPosition(e);
                }
                getPosition() {
                    return this.queued ? 0 : this._player.getPosition();
                }
                triggerCallback(e) {
                    const n = this._player;
                    n.triggerCallback && n.triggerCallback(e);
                }
                constructor(e, n, r){
                    this.namespaceId = e, this.triggerName = n, this.element = r, this._player = new Wi, this._containsRealPlayer = !1, this._queuedCallbacks = {}, this.destroyed = !1, this.markedForDestroy = !1, this.disabled = !1, this.queued = !0, this.totalTime = 0;
                }
            };
            function ra(t) {
                return t && 1 === t.nodeType;
            }
            function eD(t, e) {
                const n = t.style.display;
                return t.style.display = null != e ? e : "none", n;
            }
            function tD(t, e, n, r, i) {
                const s = [];
                n.forEach((l)=>s.push(eD(l)));
                const o = [];
                r.forEach((l, u)=>{
                    const c = {};
                    l.forEach((d)=>{
                        const f = c[d] = e.computeStyle(u, d, i);
                        (!f || 0 == f.length) && (u[_t] = VO, o.push(u));
                    }), t.set(u, c);
                });
                let a = 0;
                return n.forEach((l)=>eD(l, s[a++])), o;
            }
            function nD(t, e) {
                const n = new Map;
                if (t.forEach((a)=>n.set(a, [])), 0 == e.length) return n;
                const i = new Set(e), s = new Map;
                function o(a) {
                    if (!a) return 1;
                    let l = s.get(a);
                    if (l) return l;
                    const u = a.parentNode;
                    return l = n.has(u) ? u : i.has(u) ? 1 : o(u), s.set(a, l), l;
                }
                return e.forEach((a)=>{
                    const l = o(a);
                    1 !== l && n.get(l).push(a);
                }), n;
            }
            function vt(t, e) {
                var n;
                null === (n = t.classList) || void 0 === n || n.add(e);
            }
            function Wr(t, e) {
                var n;
                null === (n = t.classList) || void 0 === n || n.remove(e);
            }
            function UO(t, e, n) {
                bn(n).onDone(()=>t.processLeaveNode(e));
            }
            function rD(t, e) {
                for(let n = 0; n < t.length; n++){
                    const r = t[n];
                    r instanceof Av ? rD(r.players, e) : e.push(r);
                }
            }
            function iD(t, e, n) {
                const r = n.get(t);
                if (!r) return !1;
                let i = e.get(t);
                return i ? r.forEach((s)=>i.add(s)) : e.set(t, r), n.delete(t), !0;
            }
            let ia = class ia {
                registerTrigger(e90, n75, r, i, s) {
                    const o = e90 + "-" + i;
                    let a = this._triggerCache[o];
                    if (!a) {
                        const l = [], c = ed(this._driver, s, l, []);
                        if (l.length) throw function PP(t, e) {
                            return new b(3404, G);
                        }();
                        a = function AO(t, e, n) {
                            return new TO(t, e, n);
                        }(i, c, this._normalizer), this._triggerCache[o] = a;
                    }
                    this._transitionEngine.registerTrigger(n75, i, a);
                }
                register(e, n) {
                    this._transitionEngine.register(e, n);
                }
                destroy(e, n) {
                    this._transitionEngine.destroy(e, n);
                }
                onInsert(e, n, r, i) {
                    this._transitionEngine.insertNode(e, n, r, i);
                }
                onRemove(e, n, r, i) {
                    this._transitionEngine.removeNode(e, n, i || !1, r);
                }
                disableAnimations(e, n) {
                    this._transitionEngine.markElementAsDisabled(e, n);
                }
                process(e, n, r, i) {
                    if ("@" == r.charAt(0)) {
                        const [s, o] = Nv(r);
                        this._timelineEngine.command(s, n, o, i);
                    } else this._transitionEngine.trigger(e, n, r, i);
                }
                listen(e, n, r, i, s) {
                    if ("@" == r.charAt(0)) {
                        const [o, a] = Nv(r);
                        return this._timelineEngine.listen(o, n, a, s);
                    }
                    return this._transitionEngine.listen(e, n, r, i, s);
                }
                flush(e = -1) {
                    this._transitionEngine.flush(e);
                }
                get players() {
                    return this._transitionEngine.players.concat(this._timelineEngine.players);
                }
                whenRenderingDone() {
                    return this._transitionEngine.whenRenderingDone();
                }
                constructor(e, n, r){
                    this.bodyNode = e, this._driver = n, this._normalizer = r, this._triggerCache = {}, this.onRemovalComplete = (i, s)=>{}, this._transitionEngine = new BO(e, n, r), this._timelineEngine = new FO(e, n, r), this._transitionEngine.onRemovalComplete = (i, s)=>this.onRemovalComplete(i, s);
                }
            };
            let WO = (()=>{
                let t = class t {
                    start() {
                        this._state < 1 && (this._startStyles && zt(this._element, this._startStyles, this._initialStyles), this._state = 1);
                    }
                    finish() {
                        this.start(), this._state < 2 && (zt(this._element, this._initialStyles), this._endStyles && (zt(this._element, this._endStyles), this._endStyles = null), this._state = 1);
                    }
                    destroy() {
                        this.finish(), this._state < 3 && (t.initialStylesByElement.delete(this._element), this._startStyles && (Jn(this._element, this._startStyles), this._endStyles = null), this._endStyles && (Jn(this._element, this._endStyles), this._endStyles = null), zt(this._element, this._initialStyles), this._state = 3);
                    }
                    constructor(n, r, i){
                        this._element = n, this._startStyles = r, this._endStyles = i, this._state = 0;
                        let s = t.initialStylesByElement.get(n);
                        s || t.initialStylesByElement.set(n, s = {}), this._initialStyles = s;
                    }
                };
                return t.initialStylesByElement = new WeakMap, t;
            })();
            function dd(t) {
                let e = null;
                const n = Object.keys(t);
                for(let r = 0; r < n.length; r++){
                    const i = n[r];
                    QO(i) && (e = e || {}, e[i] = t[i]);
                }
                return e;
            }
            function QO(t) {
                return "display" === t || "position" === t;
            }
            let sD = class sD {
                _onFinish() {
                    this._finished || (this._finished = !0, this._onDoneFns.forEach((e)=>e()), this._onDoneFns = []);
                }
                init() {
                    this._buildPlayer(), this._preparePlayerBeforeStart();
                }
                _buildPlayer() {
                    if (this._initialized) return;
                    this._initialized = !0;
                    const e = this.keyframes;
                    this.domPlayer = this._triggerWebAnimation(this.element, e, this.options), this._finalKeyframe = e.length ? e[e.length - 1] : {}, this.domPlayer.addEventListener("finish", ()=>this._onFinish());
                }
                _preparePlayerBeforeStart() {
                    this._delay ? this._resetDomPlayerState() : this.domPlayer.pause();
                }
                _triggerWebAnimation(e, n, r) {
                    return e.animate(n, r);
                }
                onStart(e) {
                    this._onStartFns.push(e);
                }
                onDone(e) {
                    this._onDoneFns.push(e);
                }
                onDestroy(e) {
                    this._onDestroyFns.push(e);
                }
                play() {
                    this._buildPlayer(), this.hasStarted() || (this._onStartFns.forEach((e)=>e()), this._onStartFns = [], this._started = !0, this._specialStyles && this._specialStyles.start()), this.domPlayer.play();
                }
                pause() {
                    this.init(), this.domPlayer.pause();
                }
                finish() {
                    this.init(), this._specialStyles && this._specialStyles.finish(), this._onFinish(), this.domPlayer.finish();
                }
                reset() {
                    this._resetDomPlayerState(), this._destroyed = !1, this._finished = !1, this._started = !1;
                }
                _resetDomPlayerState() {
                    this.domPlayer && this.domPlayer.cancel();
                }
                restart() {
                    this.reset(), this.play();
                }
                hasStarted() {
                    return this._started;
                }
                destroy() {
                    this._destroyed || (this._destroyed = !0, this._resetDomPlayerState(), this._onFinish(), this._specialStyles && this._specialStyles.destroy(), this._onDestroyFns.forEach((e)=>e()), this._onDestroyFns = []);
                }
                setPosition(e) {
                    void 0 === this.domPlayer && this.init(), this.domPlayer.currentTime = e * this.time;
                }
                getPosition() {
                    return this.domPlayer.currentTime / this.time;
                }
                get totalTime() {
                    return this._delay + this._duration;
                }
                beforeDestroy() {
                    const e = {};
                    if (this.hasStarted()) {
                        const n = this._finalKeyframe;
                        Object.keys(n).forEach((r)=>{
                            "offset" != r && (e[r] = this._finished ? n[r] : Gv(this.element, r));
                        });
                    }
                    this.currentSnapshot = e;
                }
                triggerCallback(e) {
                    const n = "start" == e ? this._onStartFns : this._onDoneFns;
                    n.forEach((r)=>r()), n.length = 0;
                }
                constructor(e, n, r, i){
                    this.element = e, this.keyframes = n, this.options = r, this._specialStyles = i, this._onDoneFns = [], this._onStartFns = [], this._onDestroyFns = [], this._initialized = !1, this._finished = !1, this._started = !1, this._destroyed = !1, this.time = 0, this.parentPlayer = null, this.currentSnapshot = {}, this._duration = r.duration, this._delay = r.delay || 0, this.time = this._duration + this._delay;
                }
            };
            let KO = class KO {
                validateStyleProperty(e) {
                    return xv(e);
                }
                matchesElement(e, n) {
                    return !1;
                }
                containsElement(e, n) {
                    return Rv(e, n);
                }
                getParentElement(e) {
                    return Wc(e);
                }
                query(e, n, r) {
                    return kv(e, n, r);
                }
                computeStyle(e, n, r) {
                    return window.getComputedStyle(e)[n];
                }
                animate(e91, n76, r55, i40, s35, o22 = []) {
                    const l8 = {
                        duration: r55,
                        delay: i40,
                        fill: 0 == i40 ? "both" : "forwards"
                    };
                    s35 && (l8.easing = s35);
                    const u = {}, c = o22.filter((f)=>f instanceof sD);
                    (function XP(t, e) {
                        return 0 === t || 0 === e;
                    })(r55, i40) && c.forEach((f)=>{
                        let h = f.currentSnapshot;
                        Object.keys(h).forEach((p)=>u[p] = h[p]);
                    }), n76 = function eO(t, e, n) {
                        const r = Object.keys(n);
                        if (r.length && e.length) {
                            let s = e[0], o = [];
                            if (r.forEach((a)=>{
                                s.hasOwnProperty(a) || o.push(a), s[a] = n[a];
                            }), o.length) for(var i = 1; i < e.length; i++){
                                let a = e[i];
                                o.forEach(function(l) {
                                    a[l] = Gv(t, l);
                                });
                            }
                        }
                        return e;
                    }(e91, n76 = n76.map((f)=>Mn(f, !1)), u);
                    const d = function zO(t, e) {
                        let n = null, r = null;
                        return Array.isArray(e) && e.length ? (n = dd(e[0]), e.length > 1 && (r = dd(e[e.length - 1]))) : e && (n = dd(e)), n || r ? new WO(t, n, r) : null;
                    }(e91, n76);
                    return new sD(e91, n76, l8, d);
                }
            };
            let ZO = (()=>{
                let t = class t extends wv {
                    build(n) {
                        const r = this._nextAnimationId.toString();
                        this._nextAnimationId++;
                        const i = Array.isArray(n) ? bv(n) : n;
                        return oD(this._renderer, null, r, "register", [
                            i
                        ]), new JO(r, this._renderer);
                    }
                    constructor(n, r){
                        super(), this._nextAnimationId = 0, this._renderer = n.createRenderer(r.body, {
                            id: "0",
                            encapsulation: Et.None,
                            styles: [],
                            data: {
                                animation: []
                            }
                        });
                    }
                };
                return t.ɵfac = function(n) {
                    return new (n || t)(F(Fi), F(tt));
                }, t.ɵprov = q({
                    token: t,
                    factory: t.ɵfac
                }), t;
            })();
            let JO = class JO extends class cP {
            } {
                create(e, n) {
                    return new YO(this._id, e, n || {}, this._renderer);
                }
                constructor(e, n){
                    super(), this._id = e, this._renderer = n;
                }
            };
            let YO = class YO {
                _listen(e, n) {
                    return this._renderer.listen(this.element, `@@${this.id}:${e}`, n);
                }
                _command(e, ...n) {
                    return oD(this._renderer, this.element, this.id, e, n);
                }
                onDone(e) {
                    this._listen("done", e);
                }
                onStart(e) {
                    this._listen("start", e);
                }
                onDestroy(e) {
                    this._listen("destroy", e);
                }
                init() {
                    this._command("init");
                }
                hasStarted() {
                    return this._started;
                }
                play() {
                    this._command("play"), this._started = !0;
                }
                pause() {
                    this._command("pause");
                }
                restart() {
                    this._command("restart");
                }
                finish() {
                    this._command("finish");
                }
                destroy() {
                    this._command("destroy");
                }
                reset() {
                    this._command("reset"), this._started = !1;
                }
                setPosition(e) {
                    this._command("setPosition", e);
                }
                getPosition() {
                    var e, n;
                    return null !== (n = null === (e = this._renderer.engine.players[+this.id]) || void 0 === e ? void 0 : e.getPosition()) && void 0 !== n ? n : 0;
                }
                constructor(e, n, r, i){
                    this.id = e, this.element = n, this._renderer = i, this.parentPlayer = null, this._started = !1, this.totalTime = 0, this._command("create", r);
                }
            };
            function oD(t, e, n, r, i) {
                return t.setProperty(e, `@@${n}:${r}`, i);
            }
            const aD = "@.disabled";
            let XO = (()=>{
                let t = class t {
                    createRenderer(n, r) {
                        const s = this.delegate.createRenderer(n, r);
                        if (!(n && r && r.data && r.data.animation)) {
                            let c = this._rendererCache.get(s);
                            return c || (c = new lD("", s, this.engine), this._rendererCache.set(s, c)), c;
                        }
                        const o = r.id, a = r.id + "-" + this._currentId;
                        this._currentId++, this.engine.register(a, n);
                        const l = (c)=>{
                            Array.isArray(c) ? c.forEach(l) : this.engine.registerTrigger(o, a, n, c.name, c);
                        };
                        return r.data.animation.forEach(l), new ex(this, a, s, this.engine);
                    }
                    begin() {
                        this._cdRecurDepth++, this.delegate.begin && this.delegate.begin();
                    }
                    _scheduleCountTask() {
                        this.promise.then(()=>{
                            this._microtaskId++;
                        });
                    }
                    scheduleListenerCallback(n, r, i) {
                        n >= 0 && n < this._microtaskId ? this._zone.run(()=>r(i)) : (0 == this._animationCallbacksBuffer.length && Promise.resolve(null).then(()=>{
                            this._zone.run(()=>{
                                this._animationCallbacksBuffer.forEach((s)=>{
                                    const [o, a] = s;
                                    o(a);
                                }), this._animationCallbacksBuffer = [];
                            });
                        }), this._animationCallbacksBuffer.push([
                            r,
                            i
                        ]));
                    }
                    end() {
                        this._cdRecurDepth--, 0 == this._cdRecurDepth && this._zone.runOutsideAngular(()=>{
                            this._scheduleCountTask(), this.engine.flush(this._microtaskId);
                        }), this.delegate.end && this.delegate.end();
                    }
                    whenRenderingDone() {
                        return this.engine.whenRenderingDone();
                    }
                    constructor(n, r, i){
                        this.delegate = n, this.engine = r, this._zone = i, this._currentId = 0, this._microtaskId = 1, this._animationCallbacksBuffer = [], this._rendererCache = new Map, this._cdRecurDepth = 0, this.promise = Promise.resolve(0), r.onRemovalComplete = (s, o)=>{
                            const a = null == o ? void 0 : o.parentNode(s);
                            a && o.removeChild(a, s);
                        };
                    }
                };
                return t.ɵfac = function(n) {
                    return new (n || t)(F(Fi), F(ia), F(xe));
                }, t.ɵprov = q({
                    token: t,
                    factory: t.ɵfac
                }), t;
            })();
            let lD = class lD {
                get data() {
                    return this.delegate.data;
                }
                destroy() {
                    this.engine.destroy(this.namespaceId, this.delegate), this.delegate.destroy();
                }
                createElement(e, n) {
                    return this.delegate.createElement(e, n);
                }
                createComment(e) {
                    return this.delegate.createComment(e);
                }
                createText(e) {
                    return this.delegate.createText(e);
                }
                appendChild(e, n) {
                    this.delegate.appendChild(e, n), this.engine.onInsert(this.namespaceId, n, e, !1);
                }
                insertBefore(e, n, r, i = !0) {
                    this.delegate.insertBefore(e, n, r), this.engine.onInsert(this.namespaceId, n, e, i);
                }
                removeChild(e, n, r) {
                    this.engine.onRemove(this.namespaceId, n, this.delegate, r);
                }
                selectRootElement(e, n) {
                    return this.delegate.selectRootElement(e, n);
                }
                parentNode(e) {
                    return this.delegate.parentNode(e);
                }
                nextSibling(e) {
                    return this.delegate.nextSibling(e);
                }
                setAttribute(e, n, r, i) {
                    this.delegate.setAttribute(e, n, r, i);
                }
                removeAttribute(e, n, r) {
                    this.delegate.removeAttribute(e, n, r);
                }
                addClass(e, n) {
                    this.delegate.addClass(e, n);
                }
                removeClass(e, n) {
                    this.delegate.removeClass(e, n);
                }
                setStyle(e, n, r, i) {
                    this.delegate.setStyle(e, n, r, i);
                }
                removeStyle(e, n, r) {
                    this.delegate.removeStyle(e, n, r);
                }
                setProperty(e, n, r) {
                    "@" == n.charAt(0) && n == aD ? this.disableAnimations(e, !!r) : this.delegate.setProperty(e, n, r);
                }
                setValue(e, n) {
                    this.delegate.setValue(e, n);
                }
                listen(e, n, r) {
                    return this.delegate.listen(e, n, r);
                }
                disableAnimations(e, n) {
                    this.engine.disableAnimations(e, n);
                }
                constructor(e, n, r){
                    this.namespaceId = e, this.delegate = n, this.engine = r, this.destroyNode = this.delegate.destroyNode ? (i)=>n.destroyNode(i) : null;
                }
            };
            let ex = class ex extends lD {
                setProperty(e, n, r) {
                    "@" == n.charAt(0) ? "." == n.charAt(1) && n == aD ? this.disableAnimations(e, r = void 0 === r || !!r) : this.engine.process(this.namespaceId, e, n.substr(1), r) : this.delegate.setProperty(e, n, r);
                }
                listen(e92, n, r) {
                    if ("@" == n.charAt(0)) {
                        const i = function tx(t) {
                            switch(t){
                                case "body":
                                    return document.body;
                                case "document":
                                    return document;
                                case "window":
                                    return window;
                                default:
                                    return t;
                            }
                        }(e92);
                        let s = n.substr(1), o = "";
                        return "@" != s.charAt(0) && ([s, o] = function nx(t) {
                            const e = t.indexOf(".");
                            return [
                                t.substring(0, e),
                                t.substr(e + 1)
                            ];
                        }(s)), this.engine.listen(this.namespaceId, i, s, o, (a)=>{
                            this.factory.scheduleListenerCallback(a._data || -1, r, a);
                        });
                    }
                    return this.delegate.listen(e92, n, r);
                }
                constructor(e, n, r, i){
                    super(n, r, i), this.factory = e, this.namespaceId = n;
                }
            };
            let rx = (()=>{
                let t = class t extends ia {
                    ngOnDestroy() {
                        this.flush();
                    }
                    constructor(n, r, i){
                        super(n.body, r, i);
                    }
                };
                return t.ɵfac = function(n) {
                    return new (n || t)(F(tt), F(Qc), F(sd));
                }, t.ɵprov = q({
                    token: t,
                    factory: t.ɵfac
                }), t;
            })();
            const uD = new $("AnimationModuleType"), cD = [
                {
                    provide: wv,
                    useClass: ZO
                },
                {
                    provide: sd,
                    useFactory: function ix() {
                        return new CO;
                    }
                },
                {
                    provide: ia,
                    useClass: rx
                },
                {
                    provide: Fi,
                    useFactory: function sx(t, e, n) {
                        return new XO(t, e, n);
                    },
                    deps: [
                        Io,
                        ia,
                        xe
                    ]
                }
            ], dD = [
                {
                    provide: Qc,
                    useFactory: ()=>new KO
                },
                {
                    provide: uD,
                    useValue: "BrowserAnimations"
                },
                ...cD
            ], ox = [
                {
                    provide: Qc,
                    useClass: Vv
                },
                {
                    provide: uD,
                    useValue: "NoopAnimations"
                },
                ...cD
            ];
            let ax = (()=>{
                let t = class t {
                    static withConfig(n) {
                        return {
                            ngModule: t,
                            providers: n.disableAnimations ? ox : dD
                        };
                    }
                };
                return t.ɵfac = function(n) {
                    return new (n || t);
                }, t.ɵmod = lt({
                    type: t
                }), t.ɵinj = Qe({
                    providers: dD,
                    imports: [
                        Yy
                    ]
                }), t;
            })(), lx = (()=>{
                let t = class t {
                };
                return t.ɵfac = function(n) {
                    return new (n || t);
                }, t.ɵmod = lt({
                    type: t,
                    bootstrap: [
                        lP
                    ]
                }), t.ɵinj = Qe({
                    providers: [],
                    imports: [
                        [
                            Cv,
                            Yy,
                            ax,
                            ZN,
                            uP
                        ]
                    ]
                }), t;
            })();
            (function hT() {
                dy = !1;
            })(), CN().bootstrapModule(lx).catch((t)=>console.error(t));
        }
    },
    (re)=>{
        re(re.s = 950);
    }
]);

//# sourceMappingURL=main.944d6274b3048943.js.map