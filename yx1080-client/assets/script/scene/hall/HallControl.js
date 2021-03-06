
/**
*　大厅
*/
cc.Class({
    extends: cc.Component,

    properties: {
    	viewNode: cc.Node,
    },

    onLoad: function () {
    	this.initViews();
    	cc.eventMgr.on(cc.app.event.OPEN_VIEW, this.openView, this);
    },

    onDestroy: function () {
    	cc.eventMgr.off(cc.app.event.OPEN_VIEW, this.openView, this);
    },

    // 初始化界面
    initViews: function () {
    	this.views = {};
    	let cannons = this.viewNode.getChildren();
    	for (let i = cannons.length - 1; i >= 0; i--) {
    		let node = cannons[i];
    		node.position = cc.p(0,0);
    		node.active = false;
            let view = node.getComponent('BaseView');
            if(view){
                this.views[node.name] = view;
            } else {
                console.error('发现一个UI没有继承至BaseView');
            }
    	}
    	// console.log('views:', this.views);
    },

    // 打开二级界面
    openView: function (data) {
        let name = data.name;
        delete data['name'];
    	let view = this.views[name];
    	if (view) {
    		view.open(data);
    	}
    }

});
