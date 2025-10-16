function FlexContainer({ length=1, children, direction='column', padding=true, gap=0, alignItems='stretch' }) {

    const style = {
        flex: `${length}`,
        display: 'flex',
        flexDirection: direction,
        alignItems: alignItems,
        justifyContent: 'space-between',
        padding: padding ? '1vmin' : '0',
        gap: `${gap}vmin`,
        boxSizing: 'border-box',
    }

    return <div style={style}>
        {children}
    </div>;
}

export default FlexContainer;
