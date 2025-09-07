export type Arrayable<T> = T | T[];

export type TopLevelComponent = ActionRowBuilder<ButtonBuilder
	| ChannelSelectMenuBuilder
	| MentionableSelectMenuBuilder
	| StringSelectMenuBuilder
	| RoleSelectMenuBuilder
	| UserSelectMenuBuilder>
	| ContainerBuilder
	| FileBuilder
	| MediaGalleryBuilder
	| SectionBuilder
	| SeparatorBuilder
	| TextDisplayBuilder


export function components<T = Arrayable<TopLevelComponent>>(components: T) {
	return {
		components: Array.isArray(components) ? [...components] : [components],
		flags: 32768
	}
}

export function container(accentColor?: number, spoiler?: boolean) {
	const container = new ContainerBuilder();
	accentColor ? container.setAccentColor(accentColor) : {};
	spoiler ? container.setSpoiler(spoiler) : {};
	return container;
}

export function section(
    textDisplays: Arrayable<TextDisplayBuilder>,
    accessory: ButtonBuilder | ThumbnailBuilder
): SectionBuilder {
    const section = new SectionBuilder();
    Array.isArray(textDisplays) ?
        section.addTextDisplayComponents(textDisplays) :
        section.addTextDisplayComponents([textDisplays]);
    accessory instanceof ButtonBuilder ?
        section.setButtonAccessory(accessory) :
        section.setThumbnailAccessory(accessory);
    return section;
}

export function separator(
    divider: boolean = true,
    spacing: SeparatorSpacingSize = SeparatorSpacingSize.Small
): SeparatorBuilder {
    return new SeparatorBuilder()
        .setDivider(divider)
        .setSpacing(spacing);
}

export function textDisplay(content: string): TextDisplayBuilder {
    return new TextDisplayBuilder().setContent(content);
}

export function thumbnail(
    url: string,
    description?: string,
    spoiler?: boolean
): ThumbnailBuilder {
    const thumbnail = new ThumbnailBuilder()
        .setURL(url);
    description ? thumbnail.setDescription(description) : {};
    spoiler ? thumbnail.setSpoiler(spoiler) : {};
    return thumbnail;
}