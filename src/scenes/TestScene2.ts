class TestScene2 extends Scene {

    private GoldenNum: number;
    CalculateGoldenNum() {
        this.GoldenNum = SceneManager.ScreenWidth / 3 / 7;
    }
    sv: LzyScrollView;
    roleDatas: Array<RoleData>;
    selectId: number;
    gridCreater: RoleGrid;
    sv_spacing: number;
    roleShowImg: egret.Bitmap;
    role_show_x: number;
    role_show_y: number;
    okBtn: egret.Bitmap;
    okBtnTxt: egret.TextField;
    lockImg: egret.Bitmap;
    private readonly rightLineCount: number = 4;
    protected onComplete() {
        this.CalculateGoldenNum();
        let bg = this.createBitmapByName("uibg1c_png");
        bg.width = SceneManager.ScreenWidth;
        bg.height = SceneManager.ScreenHeight;
        this.addChild(bg);
        const rightWidth = SceneManager.ScreenWidth / 3 - 3 * this.GoldenNum;
        this.gridCreater = new RoleGrid(rightWidth, rightWidth, this);
        const sv_width = SceneManager.ScreenWidth / 3 * 2;
        const sv_height = SceneManager.ScreenHeight - this.GoldenNum * 2;
        this.sv_spacing = (sv_width - rightWidth * 3) / 4;
        const sv_x = this.GoldenNum;
        const sv_y = this.GoldenNum;
        this.sv = new LzyScrollView(true, sv_width, sv_height, sv_x, sv_y, 0, 0, "sv_bg_png");
        this.addChild(this.sv);
        this.selectId = 0;
        this.InitData();
        this.SetContent();
        let roleShowBg = this.createBitmapByName("grid1_png");
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
    }

    SetRoleInfo() {
        let role = DataConfig.Instance.GetDataByIndex("roles",this.selectId);
        this.roleShowImg.texture = RES.getRes(role.run[0]);
        
    }

    public OnGridClick(id: number) {
        this.selectId = id;

    }

    InitData() {
        this.roleDatas = new Array<RoleData>();
        let cfgs = DataConfig.Instance.GetConfig("roles");
        const roles: number[] = [0,1,2,3];
        const len = cfgs.length;
        for (var i = 0; i < len; i++) {
            const b: boolean = roles.indexOf(cfgs[i].id) == -1;
            const s: boolean = this.selectId == cfgs[i].id;
            this.roleDatas[i] = new RoleData(cfgs[i], b, s);
        }
    }
    SetContent(): void {
        this.sv.SetContent<RoleData>(this.sv_spacing, this.sv_spacing, this.roleDatas, this.gridCreater, this.sv_spacing, this.sv_spacing);
    }

    public Update() {

    }

    public addListener() {

    }
    public removeListener() {

    }
}
class RoleGrid implements IScrollViewGrid<RoleData>{
    _width: number;
    _height: number;
    _s: TestScene2;
    _data: RoleData;
    public constructor(w: number, h: number, s: TestScene2) {
        this._width = w;
        this._height = h;
        this._s = s;
    }

    width(): number {
        return this._width;
    }
    height(): number {
        return this._height;
    }
    InitDataUI(container: egret.DisplayObjectContainer, data: RoleData): void {
        const bgName = data.isSelect ? "grid2_png" : "grid1_png";
        let bg = Utility.createBitmapByName(bgName);
        bg.width = this._width;
        bg.height = this._height;
        bg.touchEnabled = true;
        bg.addEventListener(egret.TouchEvent.TOUCH_TAP, function (evt: egret.TouchEvent): void {
            this.OnGridClick(data.ID);
        }, this._s);
        container.addChild(bg);
        let roleImg = Utility.createBitmapByName(data.roleCfg.idle);
        roleImg.width = data.roleCfg.width;
        roleImg.height = data.roleCfg.height;
        roleImg.anchorOffsetX = roleImg.width / 2;
        roleImg.anchorOffsetY = roleImg.height / 2;
        roleImg.x = bg.width / 2;
        roleImg.y = bg.height / 2;
        container.addChild(roleImg);
    }
}

class RoleData {
    public roleCfg;
    public locked: boolean;
    public isSelect: boolean;
    public get ID(): number {
        return this.roleCfg.id;
    }
    public constructor(cfg, lock: boolean, select: boolean) {
        this.roleCfg = cfg;
        this.locked = lock;
        this.isSelect = select;
    }
}