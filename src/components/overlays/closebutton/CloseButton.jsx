import './style.css';

function CloseButton(props) {
    return (
        <div className="close-button" onClick={props.onClick}>
            x
        </div>
    );
}

export default CloseButton;
