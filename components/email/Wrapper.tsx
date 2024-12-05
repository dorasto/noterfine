"use client";

import { useEffect, useRef } from "react";

export default function EmailPreview({ html }: { html: string }) {
    const iframeRef = useRef<HTMLIFrameElement>(null);

    useEffect(() => {
        if (iframeRef.current) {
            const iframe = iframeRef.current;
            const iframeDocument =
                iframe.contentDocument || iframe.contentWindow?.document;

            if (iframeDocument) {
                iframeDocument.open();
                iframeDocument.write(html);
                iframeDocument.close();
            }
        }
    }, [html]);

    return (
        <iframe
            ref={iframeRef}
            style={{
                width: "100%",
                height: "800px",
                border: "1px solid",
                borderRadius: "0.5rem",
            }}
            className="border-primary border-2"
        />
    );
}
