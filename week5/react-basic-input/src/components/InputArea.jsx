/* eslint-disable react/prop-types */
import './InputArea.css';

function InputArea(props) {
    return (
        <div className="inputWrapper">
            <input onChange={(e) => {props.handleChangeText(e.target.value)}} type="text" value={props.text} />
            <select value={props.color} onChange={(e) => {props.handleChangeColor(e.target.value)}}>
                <option value="#ff0000">Red</option>
                <option value="#00ff00">Green</option>
                <option value="#0000ff">Blue</option>
            </select>
        </div>
    );
}

export default InputArea;