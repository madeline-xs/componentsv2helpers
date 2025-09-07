export function disable(options: BaseMessageOptions) {
    return options.components ? {
        components: this.disableComponents(options.components)
    } : {}
}

function disableComponents(components: any): any {
    const disabled: any[] = [];
    components.forEach((i: any) => disabled.push(this.disableComponent(i)));
    return disabled;
}

function disableComponent(component: any): any {
    if (component.hasOwnProperty("components")
        && component.hasOwnProperty("data")
        && component.hasOwnProperty("type")
    ) {
        if (component.data.type === 1) {
            component.components.forEach((i: MessageActionRowComponentBuilder) => i.setDisabled(true));
            return component;
        } else if (component.data.type === 9) {
            return component.accessory.data.type === 2 ?
                new SectionBuilder()
                    .addTextDisplayComponents(component.components)
                    .setButtonAccessory(component.accessory.setDisabled(true)) :
                new SectionBuilder()
                    .addTextDisplayComponents(component.components)
                    .setThumbnailAccessory(component.accessory);
        } else if (component.data.type === 17) {
            const container = new ContainerBuilder()
                .setAccentColor(component.data.accent_color)
                .setSpoiler(component.data.spoiler === true ? true : false);
            component.components.forEach((i: any) => {
                if (i.hasOwnProperty("data")
                    && i.data.hasOwnProperty("type")
                ) {
                    i.data.type === 1 ? container.addActionRowComponents(this.disableComponent(i)) :
                    i.data.type === 9 ? container.addSectionComponents(this.disableComponent(i)) :
                    i.data.type === 10 ? container.addTextDisplayComponents(i) :
                    i.data.type === 12 ? container.addMediaGalleryComponents(i) :
                    i.data.type === 13 ? container.addFileComponents(i) :
                    container.addSeparatorComponents(i);
                }
            });
            return container;
        }
    }
}