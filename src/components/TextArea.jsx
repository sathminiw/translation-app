import PropTypes from "prop-types";

const TextArea = ({ value, onChange, isInput, label }) => {
  return (
    <div>
      <label className="block text-lg font-bold mb-2">{label}</label>
      <textarea
        value={value}
        onChange={isInput ? (e) => onChange(e.target.value) : undefined}
        readOnly={!isInput}
        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition bg-white shadow-sm h-32 resize-none"
      />
    </div>
  );
};

TextArea.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  isInput: PropTypes.bool,
  label: PropTypes.string.isRequired,
};

export default TextArea;
