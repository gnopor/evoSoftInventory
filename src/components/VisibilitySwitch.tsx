import { useState } from "react";

import Icon from "./Icon";

interface IProps {
    toggle: (visible: boolean) => void;
}

export default function VisibilitySwitch({ toggle }: IProps) {
    const [showValue, setShowValue] = useState(false);

    const toggleVisibility = () => {
        toggle(!showValue);
        setShowValue(!showValue);
    };

    return (
        <span style={{ display: "flex", alignItems: "center" }} onClick={toggleVisibility}>
            {showValue ? <Icon name="mdi:eye-off-outline" /> : <Icon name="ph:eye" />}
        </span>
    );
}
