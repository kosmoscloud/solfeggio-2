function Grid({dimx=1, dimy=1, padding=true, children, flex=1}) {

    let style = {
        gridTemplateColumns: `repeat(${dimx}, 1fr)`,
        gridTemplateRows: `repeat(${dimy}, 1fr)`,
        padding: padding ? '1vmin' : 0,
        display: 'grid',
        boxSizing: 'border-box',
        rowGap: '1vw',
        columnGap: '1vw',
        flex: flex,
    }

    return (
        <div style={style}>
            {children}
        </div>
    )
}

export default Grid;
