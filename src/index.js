import wwObject from './wwObjectButton.vue'

const name = "ww-button";

const addComponent = function () {
    if (window.vm) {

        wwLib.wwObject.register({
            content: {
                type: name,
                data: {
                    text: {
                        fr_FR: "Nouveau bouton",
                        en_GB: "New Button"
                    },
                    style: {
                        backgroundColor: "#FFFFFF",
                        gradient: '',
                        borderRadius: 0,
                        borderWidth: 0,
                        borderColor: "#000000",
                        borderStyle: "solid",
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


        window.vm.addComponent(name, wwObject);

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