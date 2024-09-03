import { Icon as Iconify } from "@iconify/react";

interface IProps {
    name:
        | "ep:close"
        | "bx:menu"
        | "fa:language"
        | "codicon:run-all"
        | "fad:open"
        | "material-symbols:save-outline"
        | "mdi:web"
        | "iconamoon:close-fill"
        | "carbon:close-outline"
        | "grommet-icons:form-next"
        | "grommet-icons:form-previous"
        | "material-symbols:add"
        | "material-symbols:edit"
        | "material-symbols:delete"
        | "fluent:arrow-sort-up-24-filled"
        | "fluent:arrow-sort-down-24-filled"
        | "iwwa:arrow-right"
        | "pepicons-print:moon"
        | "tabler:sun-filled"
        | "ic:baseline-clear"
        | "mdi:eye-off-outline"
        | "ph:eye";

    color?: string;
    width?: string;
}

export default function Icon({ name, color, width }: IProps) {
    return <Iconify icon={name} color={color} width={width} />;
}
