import css from "styled-jsx/css";

import Page from "../../components/Page";

export default function HomePage() {
    return (
        <>
            <Page title="Home">
                <main>Hello Next</main>
            </Page>

            <style jsx>{style}</style>
        </>
    );
}

const style = css`
    main {
        padding: 1em;
    }
`;
