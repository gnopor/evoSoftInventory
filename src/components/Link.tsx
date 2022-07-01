import React, { useEffect, useState } from "react";
import NextLink from "next/link";

interface IProps extends React.ComponentProps<"a"> {
    href?: string;
}

export default function Link({ href = "", children, ...rest }: IProps) {
    const [showLink, setShowLink] = useState(false);
    useEffect(() => {
        setShowLink(true);
    }, []);

    if (!showLink) return <></>;

    return (
        <NextLink href={href}>
            <a {...rest}>{children}</a>
        </NextLink>
    );
}
