import wwObject from './wwObjectButton.vue'

const name = "__NAME__";
const version = '__VERSION__';

const addComponent = function () {
    if (window.vm) {

        wwLib.wwObject.register({
            content: {
                type: name,
                data: {
                    text: {

                    },
                    style: {
                        backgroundColor: "#FFFFFF",
                        gradient: '',
                        borderRadius: 50,
                        borderWidth: 1,
                        borderColor: "#000000",
                        borderStyle: "solid",
                        padding: 10,
                        boxShadow: {
                            x: 0,
                            y: 0,
                            b: 0,
                            s: 0,
                            c: ''
                        }
                    },
                    fullWidth: false
                }
            },
            upsales: {
                wwAnalytics: {
                    click: true
                }
            },
            /* wwManager:start */
            cmsOptions: {
                wwObjectMenu: {
                    items: [
                        {
                            name: 'OPTIONS',
                            text: {
                                en_GB: 'Options...',
                                fr_FR: 'Options...'
                            },
                            icon: 'wwi wwi-edit-other',
                            action: 'edit'
                        },
                        {
                            name: 'LINK',
                            text: {
                                en_GB: 'Link',
                                fr_FR: 'Lien'
                            },
                            icon: 'wwi wwi-link-external',
                            action: 'changeLink'
                        }
                    ]
                }
            }
            /* wwManager:end */
        });

        window.vm.addComponent({
            name: name,
            version: version,
            content: wwObject
        });

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