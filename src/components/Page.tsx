"use client";

import React, { useEffect } from "react";
import { APP_NAME } from "../constants";

interface IProps {
    children: React.ReactNode;
    title?: string;
}

export default function Page({ children, title }: IProps) {
    useEffect(() => {
        if (!title) return;

        document.title = `${title} | ${APP_NAME}`;
    }, [title]);

    return <>{children}</>;
}
