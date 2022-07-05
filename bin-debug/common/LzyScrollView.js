var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var LzyScrollView = (function (_super) {
    __extends(LzyScrollView, _super);
    function LzyScrollView(isVertical, width, height, x, y, anchorOffsetX, anchorOffsetY, bgRes) {
        if (bgRes === void 0) { bgRes = ""; }
        var _this = _super.call(this) || this;
        _this.isVertical = isVertical;
        _this.width = width;
        _this.height = height;
        _this.anchorOffsetX = anchorOffsetX;
        _this.anchorOffsetY = anchorOffsetY;
        _this.posX = x;
        _this.posY = y;
        _this.bgRes = bgRes;
        _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    LzyScrollView.prototype.AddBg = function () {
        if (this.bgRes == "") {
            return;
        }
        var background = new egret.Bitmap();
        var texture = RES.getRes(this.bgRes);
        background.texture = texture;
        background.width = this.width;
        background.height = this.height;
        background.x = this.posX;
        background.y = this.posY;
        background.anchorOffsetX = this.anchorOffsetX;
        background.anchorOffsetY = this.anchorOffsetY;
        this.addChild(background);
    };
    LzyScrollView.prototype.onAddToStage = function () {
        this.AddBg();
        //创建ScrollView
        this.myscrollView = new egret.ScrollView();
        this.myscrollView.width = this.width;
        this.myscrollView.height = this.height;
        this.myscrollView.x = this.posX;
        this.myscrollView.y = this.posY;
        this.myscrollView.anchorOffsetX = this.anchorOffsetX;
        this.myscrollView.anchorOffsetY = this.anchorOffsetY;
        if (this.isVertical) {
            this.myscrollView.verticalScrollPolicy = "on";
            this.myscrollView.horizontalScrollPolicy = "off";
        }
        else {
            this.myscrollView.verticalScrollPolicy = "off";
            this.myscrollView.horizontalScrollPolicy = "on";
        }
        this.addChild(this.myscrollView);
        this.myscrollView.addEventListener(egret.Event.COMPLETE, this.onComplete, this);
        this.myscrollView.addEventListener(egret.Event.CHANGE, this.onChange, this);
    };
    LzyScrollView.prototype.onComplete = function (event) {
        // console.log("on Complete");
    };
    LzyScrollView.prototype.onChange = function (event) {
        // console.log("on Change");
    };
    LzyScrollView.prototype.SetContent = function (spacingX, spacingY, datas, creater, paddingX, paddingY) {
        if (paddingX === void 0) { paddingX = 0; }
        if (paddingY === void 0) { paddingY = 0; }
        var content = new egret.DisplayObjectContainer();
        if (this.isVertical) {
            content.width = this.width;
            //计算一行能放下几个
            var childW = creater.width();
            var childH = creater.height();
            var linePerCount = (this.width - paddingX) / (childW + spacingX);
            linePerCount = Math.floor(linePerCount);
            if (linePerCount == 0) {
                linePerCount = 1;
            }
            //计算一共需要几行来实例化数据
            var dataCount = datas.length;
            var lineCount = dataCount / linePerCount;
            lineCount = Math.ceil(lineCount);
            var cHeight = paddingY + (childH + spacingY) * lineCount;
            content.height = cHeight;
            //实例化数据
            for (var i = 0; i < datas.length; i++) {
                var data = datas[i];
                var index_x = i % linePerCount; //求余，计算当前索引的数据是在一行中的哪个位置(index_x)
                var index_y = Math.floor(i / linePerCount); //计算当前索引的数据是在哪一行
                var grid = new egret.DisplayObjectContainer();
                grid.x = paddingX + index_x * (childW + spacingX);
                grid.y = paddingY + index_y * (childH + spacingY);
                grid.width = childW;
                grid.height = childH;
                content.addChild(grid);
                creater.InitDataUI(grid, data);
            }
        }
        else {
            content.height = this.height;
            //计算一列能放下几个
            var childW = creater.width();
            var childH = creater.height();
            var rowPerCount = (this.height - paddingY) / (childH + spacingY);
            rowPerCount = Math.floor(rowPerCount);
            if (rowPerCount == 0) {
                rowPerCount = 1;
            }
            //计算一共需要几列来实例化数据
            var dataCount = datas.length;
            var rowCount = dataCount / rowPerCount;
            rowCount = Math.ceil(rowCount);
            var cWidth = paddingX + (childW + spacingX) * rowCount;
            content.width = cWidth;
            //实例化数据
            for (var i = 0; i < datas.length; i++) {
                var data = datas[i];
                var index_y = i % rowPerCount; //求余，计算当前索引的数据是在一行中的哪个位置(index_x)
                var index_x = Math.floor(i / rowPerCount); //计算当前索引的数据是在哪一行
                var grid = new egret.DisplayObjectContainer();
                grid.x = paddingX + index_x * (childW + spacingX);
                grid.y = paddingY + index_y * (childH + spacingY);
                grid.width = childW;
                grid.height = childH;
                content.addChild(grid);
                creater.InitDataUI(grid, data);
            }
        }
        this.myscrollView.setContent(content);
        if (this._content != null) {
            delete this._content;
        }
        this._content = content;
    };
    LzyScrollView.prototype.UpdateByIndex = function (index, data, creater) {
        var grid = this._content.getChildAt(index);
        creater.InitDataUI(grid, data);
    };
    return LzyScrollView;
}(egret.DisplayObjectContainer));
__reflect(LzyScrollView.prototype, "LzyScrollView");
//# sourceMappingURL=LzyScrollView.js.map