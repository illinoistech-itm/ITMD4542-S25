/* eslint-disable react/prop-types */
function Box(props) {
    const divStyle = {
        width: '400px',
        height: '400px',
        backgroundColor: props.color,
        fontWeight: 'bold',
        color: 'white',
        fontSize: '20px',
        textAlign: 'center',
        boxSizing: 'border-box',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    };

    return (
        <div style={divStyle}>
            {props.text}
        </div>
    );
}

export default Box;