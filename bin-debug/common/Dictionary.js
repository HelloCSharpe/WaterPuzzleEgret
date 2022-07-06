var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Dictionary = (function () {
    function Dictionary() {
        this.items = {};
    }
    Dictionary.prototype.has = function (key) {
        var item = this.items[key];
        return item != null;
    };
    Dictionary.prototype.set = function (key, val) {
        this.items[key] = val;
    };
    Dictionary.prototype.delete = function (key) {
        if (this.has(key)) {
            delete this.items[key];
            this.items[key] = null;
        }
        return false;
    };
    Dictionary.prototype.get = function (key) {
        return this.has(key) ? this.items[key] : undefined;
    };
    Dictionary.prototype.values = function () {
        var values = [];
        for (var k in this.items) {
            if (this.has(k)) {
                values.push(this.items[k]);
            }
        }
        return values;
    };
    Dictionary.prototype.clear = function () {
        for (var k in this.items) {
            if (this.has(k)) {
                this.delete(k);
            }
        }
    };
    return Dictionary;
}());
__reflect(Dictionary.prototype, "Dictionary");
//# sourceMappingURL=Dictionary.js.map