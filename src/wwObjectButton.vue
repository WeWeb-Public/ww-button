<template>
    <div class="ww-button-wrapper">
        <div class="ww-button" :style="style">
            <wwObject :ww-object="wwObject.content.data.text" ww-inside-ww-object="true" :ww-not-editable="textNotEditable" ww-default-object-type="ww-text" ww-object-types-allowed="['ww-text']" :ww-no-section="wwAttrs.wwNoSection" :ww-no-link="wwAttrs.wwNoLink" ww-force-edit-mode="CONTENT"></wwObject>
        </div>
    </div>
</template>
 

<script>
/* wwManager:start */
import wwButtonPopupStyle from './wwButtonPopupStyle.vue'
wwLib.wwPopups.addPopup('wwButtonPopupStyle', wwButtonPopupStyle);
wwLib.wwPopups.addStory('WWBUTTON_LINKS', {
    title: {
        en_GB: 'Link',
        fr_FR: 'Lien'
    },
    type: 'wwPopupLinks',
    storyData: {
        links: [
            'EXTERNAL',
            'INTERNAL',
            'SECTION',
            'POPUP',
            'DOWNLOAD',
            'NO_LINK'
        ]
    }
})
/* wwManager:end */

export default {
    name: "ww-button",
    props: {
        wwObjectCtrl: Object,
        wwAttrs: {
            type: Object,
            default: {}
        }
    },
    data() {
        return {
            textNotEditable: false
        }
    },
    computed: {
        wwObject() {
            return this.wwObjectCtrl.get();
        },
        style() {
            let style = {};
            let wwObjectStyle = this.wwObject.content.data.style || {};

            if (wwObjectStyle.gradient && wwObjectStyle.gradient.value) {
                style.background = wwObjectStyle.gradient.value;
                style.backgroundColor = wwObjectStyle.gradient.default;
            }
            else {
                style.background = '';
                style.backgroundColor = wwObjectStyle.backgroundColor || '#FFFFFF';
            }

            style.borderRadius = (wwObjectStyle.borderRadius || 0) + 'px';
            style.borderWidth = (wwObjectStyle.borderWidth || 0) + 'px';
            style.borderColor = wwObjectStyle.borderColor || '#000000';
            style.borderStyle = wwObjectStyle.borderStyle || 'solid';
            style.boxShadow = this.getShadow();
            style.padding = wwObjectStyle.padding ? (wwObjectStyle.padding / 2) + 'px ' + wwObjectStyle.padding + 'px' : 0;

            return style;
        }
    },
    watch: {
    },
    beforeDestroy() { },
    methods: {
        init() {
            if (!this.wwObject.content.data.text || !this.wwObject.content.data.text.content) {
                let oldText = null
                if (this.wwObject.content.data.text) {
                    oldText = JSON.parse(JSON.stringify(this.wwObject.content.data.text))
                }

                let text = wwLib.wwObject.getDefault()
                text.content = wwLib.wwObject.getDefaultContent('ww-text')
                text.content.data.text = oldText || {}

                this.wwObject.content.data.text = text
                this.wwObjectCtrl.update(this.wwObject);
            }
            this.textNotEditable = this.wwAttrs.wwCategory == 'button-navbar'
                || this.wwAttrs.wwCategory == 'button-navbar-page' || this.wwAttrs.wwCategory == 'button-navbar-menu'
        },
        getShadow() {
            let wwObjectStyle = this.wwObject.content.data.style || {};
            const shadow = wwObjectStyle.boxShadow || {};
            if (shadow.x || shadow.y || shadow.b || shadow.s || shadow.c) {
                return shadow.x + 'px ' + shadow.y + 'px ' + shadow.b + 'px ' + shadow.s + 'px ' + shadow.c;
            }
            return '';
        },


        /* wwManager:start */
        /*=============================================m_ÔÔ_m=============================================\
          CHANGE BUTTON
        \================================================================================================*/
        async changeLink() {
            let options = {
                firstPage: 'WWBUTTON_LINKS'
            }

            try {
                const result = await wwLib.wwPopups.open(options)
                console.log(result);

            } catch (error) {

            }
        },
        async edit() {

            wwLib.wwPopups.addStory('WWBUTTON_EDIT', {
                title: {
                    en_GB: 'Edit button',
                    fr_FR: 'Editer le bouton'
                },
                type: 'wwPopupEditWwObject',
                buttons: null,
                storyData: {
                    list: {
                        EDIT_LINK: {
                            separator: {
                                en_GB: 'Link',
                                fr_FR: 'Lien'
                            },
                            title: {
                                en_GB: 'Change link',
                                fr_FR: 'Changer le lien'
                            },
                            desc: {
                                en_GB: 'External link, page link, ...',
                                fr_FR: 'Lien externe, lien vers une page, ...'
                            },
                            icon: 'wwi wwi-link-external',
                            shortcut: 'l',
                            next: 'WWBUTTON_LINKS'
                        },
                        EDIT_STYLE: {
                            separator: {
                                en_GB: 'Style',
                                fr_FR: 'Style'
                            },
                            title: {
                                en_GB: 'Change button style',
                                fr_FR: 'Changer l\'apparence du bouton'
                            },
                            desc: {
                                en_GB: 'Borders, colors, shadow, ...',
                                fr_FR: 'Bordures, couleurs, ombres, ...'
                            },
                            icon: 'wwi wwi-edit-style',
                            shortcut: 's',
                            next: 'WWBUTTON_STYLE'
                        }
                    }
                }
            })
            wwLib.wwPopups.addStory('WWBUTTON_STYLE', {
                title: {
                    en_GB: 'Button style',
                    fr_FR: 'Style du bouton'
                },
                type: 'wwButtonPopupStyle',
                buttons: {
                    OK: {
                        text: {
                            en_GB: 'Ok',
                            fr_FR: 'Valider'
                        },
                        next: false
                    }
                }
            })

            let options = {
                firstPage: 'WWBUTTON_EDIT',
                data: {
                    wwObject: this.wwObject
                }
            }

            this.wwObjectCtrl.update(this.wwObject);
            console.log(this.wwObject)

            try {
                const result = await wwLib.wwPopups.open(options);

                /*=============================================m_ÔÔ_m=============================================\
                  STYLE
                \================================================================================================*/
                this.wwObject.content.data.style = this.wwObject.content.data.style || {};
                if (typeof (result.borderColor) != 'undefined') {
                    this.wwObject.content.data.style.borderColor = result.borderColor;
                }
                if (typeof (result.borderRadius) != 'undefined') {
                    this.wwObject.content.data.style.borderRadius = result.borderRadius;
                }
                if (typeof (result.borderStyle) != 'undefined') {
                    this.wwObject.content.data.style.borderStyle = result.borderStyle;
                }
                if (typeof (result.borderWidth) != 'undefined') {
                    this.wwObject.content.data.style.borderWidth = result.borderWidth;
                }
                if (typeof (result.boxShadow) != 'undefined') {
                    this.wwObject.content.data.style.boxShadow = result.boxShadow;
                }
                if (typeof (result.backgroundColor) != 'undefined') {
                    this.wwObject.content.data.style.backgroundColor = result.backgroundColor;
                }
                if (typeof (result.gradient) != 'undefined') {
                    this.wwObject.content.data.style.gradient = result.gradient;
                }
                if (typeof (result.gradientColor) != 'undefined') {
                    this.wwObject.content.data.style.backgroundColor = result.gradientColor;
                }
                if (typeof (result.padding) != 'undefined') {
                    this.wwObject.content.data.style.padding = result.padding;
                }


                this.wwObjectCtrl.update(this.wwObject);

                this.wwObjectCtrl.globalEdit(result);


            } catch (error) {
                console.log(error);
            }

        }
        /* wwManager:end */
    },
    mounted() {
        this.init();

        this.$emit('ww-loaded', this);
    }
};
</script>

<style scoped>
.ww-button-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.ww-button {
    display: inline-block;
}
/* ww-class-btn-bg */
.ww-class-btn-bg-none {
    background-color: rgba(0, 0, 0, 0) !important;
}

/* ww-class-btn-border */
.ww-class-btn-border-none {
    border: none !important;
}

.ww-class-btn-border-small {
    border-style: solid !important;
    border-width: 1px !important;
}

.ww-class-btn-border-medium {
    border-style: solid !important;
    border-width: 2px !important;
}

.ww-class-btn-border-big {
    border-style: solid !important;
    border-width: 5px !important;
}

/* ww-class-btn-format */
.ww-class-btn-format-square {
    border-radius: 0 !important;
}

.ww-class-btn-format-round-small {
    border-radius: 5px !important;
}

.ww-class-btn-format-round-medium {
    border-radius: 10px !important;
}

.ww-class-btn-format-round-big {
    border-radius: 500px !important;
}

/* ww-class-btn-padding */
.ww-class-btn-padding-none {
    padding: 0 !important;
}

.ww-class-btn-padding-small {
    padding: 5px 10px !important;
}

.ww-class-btn-padding-medium {
    padding: 10px 20px !important;
}

.ww-class-btn-padding-big {
    padding: 20px 40px !important;
}

/* ww-class-btn-shadow */
.ww-class-btn-shadow-box-small {
    -webkit-box-shadow: 0px 0px 5px 0px rgba(50, 50, 50, 0.75);
    -moz-box-shadow: 0px 0px 5px 0px rgba(50, 50, 50, 0.75);
    box-shadow: 0px 0px 5px 0px rgba(50, 50, 50, 0.75);
}

.ww-class-btn-shadow-box-medium {
    -webkit-box-shadow: 0px 0px 10px 0px rgba(50, 50, 50, 0.75);
    -moz-box-shadow: 0px 0px 10px 0px rgba(50, 50, 50, 0.75);
    box-shadow: 0px 0px 10px 0px rgba(50, 50, 50, 0.75);
}

.ww-class-btn-shadow-box-big {
    -webkit-box-shadow: 0px 0px 20px 0px rgba(50, 50, 50, 0.75);
    -moz-box-shadow: 0px 0px 20px 0px rgba(50, 50, 50, 0.75);
    box-shadow: 0px 0px 20px 0px rgba(50, 50, 50, 0.75);
}

.ww-class-btn-shadow-bottom-small {
    -webkit-box-shadow: 0px 2px 5px 0px rgba(50, 50, 50, 0.75);
    -moz-box-shadow: 0px 2px 5px 0px rgba(50, 50, 50, 0.75);
    box-shadow: 0px 2px 5px 0px rgba(50, 50, 50, 0.75);
}

.ww-class-btn-shadow-bottom-medium {
    -webkit-box-shadow: 0px 3px 10px 0px rgba(50, 50, 50, 0.75);
    -moz-box-shadow: 0px 3px 10px 0px rgba(50, 50, 50, 0.75);
    box-shadow: 0px 3px 10px 0px rgba(50, 50, 50, 0.75);
}

.ww-class-btn-shadow-bottom-big {
    -webkit-box-shadow: 0px 7px 20px 0px rgba(50, 50, 50, 0.75);
    -moz-box-shadow: 0px 7px 20px 0px rgba(50, 50, 50, 0.75);
    box-shadow: 0px 7px 20px 0px rgba(50, 50, 50, 0.75);
}

/* ww-class-btn-width */
.ww-class-btn-width-full {
    width: 100% !important;
}
</style>
