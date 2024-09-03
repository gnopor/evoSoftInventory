import NextLink from "next/link";
import React, { useEffect, useState } from "react";

interface IProps extends React.ComponentPropsWithoutRef<"a"> {}

export default function Link({ href = "", children, ...rest }: IProps) {
    const [showLink, setShowLink] = useState(false);
    useEffect(() => {
        setShowLink(true);
    }, []);

    if (!showLink) return <></>;

    return (
        <NextLink {...rest} href={href}>
            {children}
        </NextLink>
    );
}
