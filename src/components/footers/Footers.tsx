import css from "styled-jsx/css";

import LanguageForm from "../LanguageToggler";
import Logo from "../Logo";

export default function Footer() {
    return (
        <>
            <footer id="footer">
                <section>
                    <div className="container">
                        <div className="content">
                            <div>
                                <Logo />
                            </div>

                            <div>
                                <LanguageForm />
                            </div>
                        </div>
                    </div>
                </section>
            </footer>

            <style jsx>{styles}</style>
        </>
    );
}

const styles = css`
    #footer {
        background: var(--black);
        color: var(--grey-light);
        font-size: 0.8em;
        padding: 1.5em 0;
        z-index: 9000;
    }

    section .content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
    }
`;
