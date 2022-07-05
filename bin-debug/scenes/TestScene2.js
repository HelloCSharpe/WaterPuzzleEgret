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
var TestScene2 = (function (_super) {
    __extends(TestScene2, _super);
    function TestScene2() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.rightLineCount = 4;
        return _this;
    }
    TestScene2.prototype.CalculateGoldenNum = function () {
        this.GoldenNum = SceneManager.ScreenWidth / 3 / 7;
    };
    TestScene2.prototype.onComplete = function () {
        this.CalculateGoldenNum();
        var bg = this.createBitmapByName("uibg1c_png");
        bg.width = SceneManager.ScreenWidth;
        bg.height = SceneManager.ScreenHeight;
        this.addChild(bg);
        var rightWidth = SceneManager.ScreenWidth / 3 - 3 * this.GoldenNum;
        this.gridCreater = new RoleGrid(rightWidth, rightWidth, this);
        var sv_width = SceneManager.ScreenWidth / 3 * 2;
        var sv_height = SceneManager.ScreenHeight - this.GoldenNum * 2;
        this.sv_spacing = (sv_width - rightWidth * 3) / 4;
        var sv_x = this.GoldenNum;
        var sv_y = this.GoldenNum;
        this.sv = new LzyScrollView(true, sv_width, sv_height, sv_x, sv_y, 0, 0, "sv_bg_png");
        this.addChild(this.sv);
        this.selectId = 0;
        this.InitData();
        this.SetContent();
        var roleShowBg = this.createBitmapByName("grid1_png");
        roleShowBg.width = rightWidth;
        roleShowBg.height = rightWidth;
        roleShowBg.x = this.GoldenNum + sv_width + this.GoldenNum;
        roleShowBg.y = this.GoldenNum;
        this.addChild(roleShowBg);
        this.role_show_x = roleShowBg.x + roleShowBg.width / 2;
        this.role_show_y = roleShowBg.y + roleShowBg.height / 2;
        this.roleShowImg = this.createBitmapByName("temp_role_png");
        this.roleShowImg.width = 70;
        this.roleShowImg.height = 95;
        this.roleShowImg.x = this.role_show_x - this.roleShowImg.width / 2;
        this.roleShowImg.y = this.role_show_y - this.roleShowImg.height / 2;
        this.addChild(this.roleShowImg);
        this.lockImg = this.createBitmapByName("lock_png");
        this.lockImg.width = rightWidth / 4;
        this.lockImg.height = rightWidth / 4;
        this.lockImg.x = roleShowBg.x + roleShowBg.width - this.lockImg.width;
        this.lockImg.y = roleShowBg.y;
        this.addChild(this.lockImg);
        this.okBtn = this.createBitmapByName("btn1_n_png");
        this.okBtn.fillMode = egret.BitmapFillMode.REPEAT;
        this.okBtn.width = rightWidth;
        this.okBtn.height = this.GoldenNum;
        this.okBtn.x = SceneManager.ScreenWidth - this.GoldenNum - rightWidth;
        this.okBtn.y = SceneManager.ScreenHeight - this.GoldenNum * 2;
        this.okBtn.touchEnabled = true;
        this.addChild(this.okBtn);
        this.okBtnTxt = new egret.TextField();
        this.okBtnTxt.text = "Select";
        this.okBtnTxt.fontFamily = "Microsoft YaHei";
        this.okBtnTxt.textColor = 0x000000;
        this.okBtnTxt.textAlign = egret.HorizontalAlign.CENTER;
        this.okBtnTxt.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.okBtnTxt.width = this.okBtn.width;
        this.okBtnTxt.height = this.okBtn.height;
        this.okBtnTxt.x = this.okBtn.x;
        this.okBtnTxt.y = this.okBtn.y;
        this.okBtnTxt.size = 30;
        this.addChild(this.okBtnTxt);
        this.SetRoleInfo();
    };
    TestScene2.prototype.SetRoleInfo = function () {
        var role = DataConfig.Instance.GetDataByIndex("roles", this.selectId);
        this.roleShowImg.texture = RES.getRes(role.run[0]);
    };
    TestScene2.prototype.OnGridClick = function (id) {
        this.selectId = id;
    };
    TestScene2.prototype.InitData = function () {
        this.roleDatas = new Array();
        var cfgs = DataConfig.Instance.GetConfig("roles");
        var roles = [0, 1, 2, 3];
        var len = cfgs.length;
        for (var i = 0; i < len; i++) {
            var b = roles.indexOf(cfgs[i].id) == -1;
            var s = this.selectId == cfgs[i].id;
            this.roleDatas[i] = new RoleData(cfgs[i], b, s);
        }
    };
    TestScene2.prototype.SetContent = function () {
        this.sv.SetContent(this.sv_spacing, this.sv_spacing, this.roleDatas, this.gridCreater, this.sv_spacing, this.sv_spacing);
    };
    TestScene2.prototype.Update = function () {
    };
    TestScene2.prototype.addListener = function () {
    };
    TestScene2.prototype.removeListener = function () {
    };
    return TestScene2;
}(Scene));
__reflect(TestScene2.prototype, "TestScene2");
var RoleGrid = (function () {
    function RoleGrid(w, h, s) {
        this._width = w;
        this._height = h;
        this._s = s;
    }
    RoleGrid.prototype.width = function () {
        return this._width;
    };
    RoleGrid.prototype.height = function () {
        return this._height;
    };
    RoleGrid.prototype.InitDataUI = function (container, data) {
        var bgName = data.isSelect ? "grid2_png" : "grid1_png";
        var bg = Utility.createBitmapByName(bgName);
        bg.width = this._width;
        bg.height = this._height;
        bg.touchEnabled = true;
        bg.addEventListener(egret.TouchEvent.TOUCH_TAP, function (evt) {
            this.OnGridClick(data.ID);
        }, this._s);
        container.addChild(bg);
        var roleImg = Utility.createBitmapByName(data.roleCfg.idle);
        roleImg.width = data.roleCfg.width;
        roleImg.height = data.roleCfg.height;
        roleImg.anchorOffsetX = roleImg.width / 2;
        roleImg.anchorOffsetY = roleImg.height / 2;
        roleImg.x = bg.width / 2;
        roleImg.y = bg.height / 2;
        container.addChild(roleImg);
    };
    return RoleGrid;
}());
__reflect(RoleGrid.prototype, "RoleGrid", ["IScrollViewGrid"]);
var RoleData = (function () {
    function RoleData(cfg, lock, select) {
        this.roleCfg = cfg;
        this.locked = lock;
        this.isSelect = select;
    }
    Object.defineProperty(RoleData.prototype, "ID", {
        get: function () {
            return this.roleCfg.id;
        },
        enumerable: true,
        configurable: true
    });
    return RoleData;
}());
__reflect(RoleData.prototype, "RoleData");
//# sourceMappingURL=TestScene2.js.map