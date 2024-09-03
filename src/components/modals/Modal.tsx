import React, { useEffect, useRef } from "react";

interface IProps {
    id: string;
    children: React.ReactNode;
}

const ACTIVE_MODAL_CLASS = "modal_active";

export default function Modal({ id, children }: IProps) {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setTimeout(watchModalToggler, 2000);
    }, [id]);

    const watchModalToggler = () => {
        const openModalToggler = document.querySelector(
            `[data-toggle="modal"][data-target="${id}"]`
        );
        const closeModalToggler = document.querySelector(
            `.modal .modal_inner [data-toggle="modal"][data-target="${id}"]`
        );

        openModalToggler?.addEventListener("click", () => {
            closeAllModals();
            modalRef.current?.classList.add(ACTIVE_MODAL_CLASS);
        });

        closeModalToggler?.addEventListener("click", () => {
            closeAllModals();
        });
    };

    const closeAllModals = () => {
        const modals = document.querySelectorAll(`.modal.${ACTIVE_MODAL_CLASS}`);
        modals.forEach((m) => m.classList.remove(ACTIVE_MODAL_CLASS));
    };

    return (
        <div ref={modalRef} id={id} className="modal">
            <div className="modal_container">{children}</div>
        </div>
    );
}
