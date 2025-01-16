function Spacer({ length, children, direction='column' }) {

    const style = {
        flex: `${length}`,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: direction
    }

    return <div style={style}>
        {children}
    </div>;
}

export default Spacer;
