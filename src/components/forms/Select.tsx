import React from "react";

interface IProps extends React.InputHTMLAttributes<HTMLSelectElement> {
    label?: string;
}

const Select = React.forwardRef<HTMLSelectElement, IProps>(
    ({ id, label, required, children, ...rest }, ref) => {
        return (
            <div className="form_control">
                <label htmlFor={id} className={`form_label ${required ? "required" : ""}`}>
                    {label}
                </label>
                <select className="form_input" ref={ref} id={id} required={required} {...rest}>
                    {children}
                </select>
            </div>
        );
    }
);

Select.displayName = "Select";

export default Select;
