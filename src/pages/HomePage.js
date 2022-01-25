/* eslint-disable no-unused-vars */
import React from "react";
import { Helmet } from "react-helmet-async";

export default function HomePage() {
    return (
        <div id="home_page">
            <Helmet>
                <title>Accueil | Boillerplate</title>
            </Helmet>

            <section>Home Page
                <p>ddd</p>
            </section>

            <p>
  super paragrapth
            </p>

            <Style/>
        </div>
    );
}


const Style = () => <style jsx>{`

#home_page section {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
  'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji',
  'Segoe UI Emoji', 'Segoe UI Symbol';
  font-size: 14px;
  font-weight:bold;
  color: hotpink;
  transition:all 1s ease;
}

#home_page section:hover {
  text-decoration: underline;
  font-size: 5em;
}

#home_page p {
  color: red;
}

`}</style>;
