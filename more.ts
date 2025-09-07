export function addComponents(
    container: ContainerBuilder,
    components: Arrayable<ContainableComponent>
) {
    components.forEach((i) => {
        i instanceof ActionRowBuilder ?
        container.addActionRowComponents(i) : i instanceof FileBuilder ?
        container.addFileComponents(i) : i instanceof MediaGalleryBuilder ?
        container.addMediaGalleryComponents(i) : i instanceof SectionBuilder ?
        container.addSectionComponents(i) : i instanceof SeparatorBuilder ?
        container.addSeparatorComponents(i) : i instanceof TextDisplayBuilder ?
        container.addTextDisplayComponents(i) : {}
    });
}