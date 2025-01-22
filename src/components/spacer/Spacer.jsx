function Spacer({ length, children, direction='column' }) {

    const style = {
        flex: `${length}`,
        display: 'flex',
        flexDirection: direction
    }

    return <div style={style}>
        {children}
    </div>;
}

export default Spacer;
