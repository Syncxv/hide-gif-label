/** @type {import('../../../fake_node_modules/powercord/entities/').default} */
const { Plugin } = require("powercord/entities");
const { getModule } = require("powercord/webpack");
const { inject, uninject } = require("powercord/injector");
class HideGifLabel extends Plugin {
    async startPlugin() {
        const _Image = await getModule((m) => m?.default?.displayName === "Image");
        inject("hide-gif-label", _Image.default.prototype, "render", (_, res) => {
            if (res.props.children.props.style.height < 50) res.props.children.props.children.pop();
            return res;
        });
        _Image.default.displayName = "Image";
    }

    pluginWillUnload() {
        uninject("hide-gif-label");
    }
}

module.exports = HideGifLabel;
