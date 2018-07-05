import wwObject from './wwObjectSrc.vue'

const name = "ww-button";
const wwEnableMetrics = true;

const addComponent = function () {
    if (window.vm) {
        window.vm.addComponent(name, wwObject);

        wwLib.wwObject.registerContentType(
            name,
            {
                type: name,
                data: {
                    text: {
                        fr_FR: "Nouveau bouton",
                        en_GB: "New Button"
                    },
                    color: '#FFFFFF',
                    borderColor: '#FFFFFF',
                    backgroundColor: '#FFFFFF',
                    font: '',
                    classes: ["ww-class-btn-bg-none", "ww-class-btn-padding-small", "ww-class-btn-border-small", "ww-class-btn-format-round-small", "ww-class-font-size-small"],
                    fullWidth: false
                }
            },
            wwEnableMetrics
        );

        return true;
    }
    return false;
}

if (!addComponent()) {
    const iniInterval = setInterval(function () {
        if (addComponent()) {
            clearInterval(iniInterval);
        }
    }, 10);
}