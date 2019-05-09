import * as tslib_1 from "tslib";
import { Vue, Component } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
var Block = namespace('Block');
var BlocksArea = /** @class */ (function (_super) {
    tslib_1.__extends(BlocksArea, _super);
    function BlocksArea() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BlocksArea.prototype.mounted = function () {
        this.fetchBlocks();
    };
    BlocksArea.prototype.removeBot = function (id) {
        var _this = this;
        this.$confirm({
            message: 'Вы действительно хотите удалить блок?',
        })
            .then(function () {
            _this.deleteBlock(id);
        })
            .catch(function (e) { console.error(e.message); });
    };
    tslib_1.__decorate([
        Block.State
    ], BlocksArea.prototype, "blocks", void 0);
    tslib_1.__decorate([
        Block.Action
    ], BlocksArea.prototype, "fetchBlocks", void 0);
    tslib_1.__decorate([
        Block.Action
    ], BlocksArea.prototype, "deleteBlock", void 0);
    BlocksArea = tslib_1.__decorate([
        Component
    ], BlocksArea);
    return BlocksArea;
}(Vue));
export default BlocksArea;
//# sourceMappingURL=BlocksArea.vue.js.map