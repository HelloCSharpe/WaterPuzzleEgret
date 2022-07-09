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
//设置成无线循环列表
var LzyScrollView = (function (_super) {
    __extends(LzyScrollView, _super);
    function LzyScrollView(isVertical, width, height, x, y, anchorOffsetX, anchorOffsetY, bgRes) {
        if (bgRes === void 0) { bgRes = ""; }
        var _this = _super.call(this) || this;
        _this.prevIndex = -1; //当前所有显示item的前一个index是多少
        _this.prevValue = 0; //前一个item所需值（x或者y坐标）
        _this.nextIndex = -1; //当前所有显示item的下一个index是多少
        _this.nextValue = 0; //下一个item所需值（x或者y坐标）
        _this.isVertical = isVertical;
        _this.width = width;
        _this.height = height;
        _this.anchorOffsetX = anchorOffsetX;
        _this.anchorOffsetY = anchorOffsetY;
        _this.posX = x;
        _this.posY = y;
        _this.x = x;
        _this.y = y;
        _this.bgRes = bgRes;
        _this.items = [];
        _this.usedItems = [];
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
        this.addChild(background);
    };
    LzyScrollView.prototype.onAddToStage = function () {
        this.AddBg();
        //创建ScrollView
        this.myscrollView = new egret.ScrollView();
        this.myscrollView.width = this.width;
        this.myscrollView.height = this.height;
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
        // console.log("on Complete",event.currentTarget.scrollTop,event.currentTarget.scrollLeft);
    };
    LzyScrollView.prototype.onChange = function (event) {
        if (this.datas == null) {
            return;
        }
        var dataLen = this.datas.length;
        if (dataLen == 0) {
            return;
        }
        // console.log("on Change",event.currentTarget.scrollTop,event.currentTarget.scrollLeft);
        var scrollValue = this.isVertical ? event.currentTarget.scrollTop : event.currentTarget.scrollLeft;
        var curRangeMin = 0 + scrollValue;
        var curRangeMax = this.height;
        //先做加载
        if (this.prevIndex > 0) {
            if (this.prevValue >= curRangeMin) {
                var _prevIndex = this.prevIndex - this.linePerCount; //加载完的前一个Index
                var childW = this.creater.width();
                var childH = this.creater.height();
                for (var i = this.prevIndex; i > _prevIndex; i--) {
                    var data = this.datas[i];
                    var pos_1 = this.CalTargetXY(i);
                    this.ShowGrid(pos_1.x, pos_1.y, i, data);
                }
                var gridOffset = this.isVertical ? childH + this.spacingY : childW + this.spacingX;
                this.prevValue -= gridOffset;
                this.prevIndex = _prevIndex;
            }
        }
        if (this.nextIndex > 0 && this.nextIndex < dataLen) {
            if (this.nextValue <= curRangeMax) {
                var _nextIndex = this.nextIndex + this.linePerCount; //加载完的前一个Index
                var childW = this.creater.width();
                var childH = this.creater.height();
                for (var i = this.prevIndex; i < _nextIndex; i++) {
                    if (i >= dataLen) {
                        break;
                    }
                    var data = this.datas[i];
                    if (data == null) {
                        break;
                    }
                    var pos_2 = this.CalTargetXY(i);
                    this.ShowGrid(pos_2.x, pos_2.y, i, data);
                }
                var gridOffset = this.isVertical ? childH + this.spacingY : childW + this.spacingX;
                this.nextValue += gridOffset;
                this.nextIndex = _nextIndex;
            }
        }
        //后做移除
        var curMinIndex = this.prevIndex + 1; //当前显示的最小值Index
        var curMaxIndex = this.nextIndex - 1; //当前显示的最大值Index
        if (curMinIndex < 0) {
            curMinIndex = 0;
        }
        if (curMaxIndex > dataLen - 1) {
            curMaxIndex = dataLen - 1;
        }
        var pos = this.CalTargetXY(curMinIndex);
        var pos2 = this.CalTargetXY(curMaxIndex);
        var curMinValue = this.isVertical ? pos.y + this.creater.height() : pos.x + this.creater.width();
        var curMaxValue = this.isVertical ? pos2.y : pos2.x;
        if (curMinValue < curRangeMin) {
            var _minIndex = curMinIndex + this.linePerCount;
            for (var i = curMinIndex; i < _minIndex; i++) {
                this.HideGrid(i);
            }
            this.prevIndex = _minIndex - 1;
            var gridOffset = this.isVertical ? this.creater.height() + this.spacingY : this.creater.width() + this.spacingX;
            this.prevValue = curMinValue + gridOffset;
        }
        if (curMaxValue > curRangeMax) {
            var _maxIndex = curMaxIndex - this.linePerCount;
            for (var i = curMaxIndex; i > _maxIndex; i--) {
                this.HideGrid(i);
            }
            this.nextIndex = _maxIndex + 1;
            var gridOffset = this.isVertical ? this.creater.height() + this.spacingY : this.creater.width() + this.spacingX;
            this.nextValue = curMaxValue - gridOffset;
        }
    };
    LzyScrollView.prototype.SetContent = function (spacingX, spacingY, datas, creater, paddingX, paddingY) {
        if (paddingX === void 0) { paddingX = 0; }
        if (paddingY === void 0) { paddingY = 0; }
        if (creater == null) {
            console.error("creater is null");
            return;
        }
        if (creater != null && creater != this.creater) {
            console.error("creater is not equals");
            return;
        }
        this.creater = creater;
        this.datas = datas;
        var content = this._content;
        if (content == null) {
            content = new egret.DisplayObjectContainer();
            this.myscrollView.setContent(content);
            this._content = content;
        }
        //回收所有显示的item
        var len = this.usedItems.length;
        for (var i_1 = len - 1; i_1 >= 0; i_1--) {
            var grid = this.usedItems.pop();
            if (grid != null) {
                this.ReleaseGridToPool(grid);
                this._content.removeChild(grid);
            }
            // this.usedItems[i]=null;
        }
        if (this.isVertical) {
            this.myscrollView.scrollTop = 0;
            content.width = this.width;
            //计算一行能放下几个
            var childW = creater.width();
            var childH = creater.height();
            var linePerCount = (this.width - paddingX) / (childW + spacingX);
            linePerCount = Math.floor(linePerCount);
            if (linePerCount == 0) {
                linePerCount = 1;
            }
            this.linePerCount = linePerCount;
            //计算一共需要几行来实例化数据
            var dataCount = datas.length;
            var lineCount = dataCount / linePerCount;
            lineCount = Math.ceil(lineCount);
            var cHeight = paddingY + (childH + spacingY) * lineCount;
            content.height = cHeight;
            //实例化数据
            this.prevIndex = -1;
            this.nextIndex = -1;
            for (var i = 0; i < datas.length; i++) {
                var data = datas[i];
                var pos = this.CalTargetXY(i);
                var targetX = pos.x;
                var targetY = pos.y;
                if (targetY > this.height) {
                    this.nextIndex = i;
                    this.nextValue = targetY;
                    break;
                }
                this.ShowGrid(targetX, targetY, i, data);
            }
        }
        else {
            content.height = this.height;
            this.myscrollView.scrollLeft = 0;
            //计算一列能放下几个
            var childW = creater.width();
            var childH = creater.height();
            var rowPerCount = (this.height - paddingY) / (childH + spacingY);
            rowPerCount = Math.floor(rowPerCount);
            if (rowPerCount == 0) {
                rowPerCount = 1;
            }
            this.linePerCount = rowPerCount;
            //计算一共需要几列来实例化数据
            var dataCount = datas.length;
            var rowCount = dataCount / rowPerCount;
            rowCount = Math.ceil(rowCount);
            var cWidth = paddingX + (childW + spacingX) * rowCount;
            content.width = cWidth;
            //实例化数据
            this.prevIndex = -1;
            this.nextIndex = -1;
            for (var i = 0; i < datas.length; i++) {
                var data = datas[i];
                var pos = this.CalTargetXY(i);
                var targetX = pos.x;
                var targetY = pos.y;
                if (targetX > this.width) {
                    this.nextIndex = i;
                    this.nextValue = targetX;
                    break;
                }
                this.ShowGrid(targetX, targetY, i, data);
            }
        }
    };
    LzyScrollView.prototype.CalTargetXY = function (i) {
        var _index_x = i % this.linePerCount; //求余，计算当前索引的数据是在一行中的哪个位置(index_x)
        var _index_y = Math.floor(i / this.linePerCount); //计算当前索引的数据是在哪一行
        var index_x = this.isVertical ? _index_x : _index_y;
        var index_y = this.isVertical ? _index_y : _index_x;
        var targetX = this.paddingX + index_x * (this.creater.width() + this.spacingX);
        var targetY = this.paddingY + index_y * (this.creater.height() + this.spacingY);
        return new Vector2(targetX, targetY);
    };
    LzyScrollView.prototype.HideGrid = function (index) {
        var grid = this._content.getChildByName(String(index));
        if (grid != null) {
            var idx = this.usedItems.indexOf(grid);
            if (idx >= 0) {
                this.usedItems.splice(idx, 1);
            }
            this.ReleaseGridToPool(grid);
            this._content.removeChild(grid);
        }
    };
    LzyScrollView.prototype.ShowGrid = function (x, y, index, data) {
        var grid = this.GetGridInPool();
        grid.name = String(index);
        grid.x = x;
        grid.y = y;
        grid.width = this.creater.width();
        grid.height = this.creater.height();
        this._content.addChild(grid);
        this.creater.InitDataUI(grid, data);
        this.usedItems.push(grid);
    };
    LzyScrollView.prototype.UpdateByIndex = function (index, data, creater) {
        var grid = this._content.getChildAt(index);
        creater.InitDataUI(grid, data);
    };
    LzyScrollView.prototype.GetGridInPool = function () {
        var grid = this.items.pop();
        if (grid == null) {
            grid = new egret.DisplayObjectContainer();
        }
        return grid;
    };
    LzyScrollView.prototype.ReleaseGridToPool = function (grid) {
        this.items.push(grid);
    };
    return LzyScrollView;
}(egret.DisplayObjectContainer));
__reflect(LzyScrollView.prototype, "LzyScrollView");
//# sourceMappingURL=LzyScrollView.js.map