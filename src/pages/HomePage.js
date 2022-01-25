import React from "react";
import { Helmet } from "react-helmet-async";

export default function HomePage() {
    return (
        <>
            <Helmet>
                <title>Accueil | Boillerplate</title>
            </Helmet>

            <section>Home Page</section>

            <style jsx>{style("tomato")}</style>
        </>
    );
}

const style = (brandColor) => `
section {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji',
    'Segoe UI Emoji', 'Segoe UI Symbol';
  font-size: 14px;
  --brand-color: ${brandColor};
  --gray-color-1: #777;
  --gray-color-2: #555;
}

section:hover {
  text-decoration: unterlined;
}

`;
