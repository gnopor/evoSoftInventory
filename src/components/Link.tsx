import React from "react";
import NextLink from "next/link";

export default function Link({ href, children, ...rest }: any) {
    return (
        <NextLink href={href}>
            <a {...rest}>{children}</a>
        </NextLink>
    );
}
