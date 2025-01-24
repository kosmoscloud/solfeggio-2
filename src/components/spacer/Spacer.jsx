function Spacer({ length=1, children, direction='column' }) {

    const style = {
        flex: `${length}`,
        display: 'flex',
        flexDirection: direction,
        alignItems: 'stretch',
        justifyContent: 'space-between'
    }

    return <div style={style}>
        {children}
    </div>;
}

export default Spacer;
