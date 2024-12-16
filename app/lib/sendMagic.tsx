import { Unsend } from "unsend";
import { render } from "@react-email/render";
import { MagicLinkEmailTemplate } from "@/components/email/MagicLink";
export async function sendMagicLinkEmail(
    email: string,
    url: string,
    token: string
) {
    const magicLinkUrl = `${url}?token=${token}`;

    try {
        const response = await fetch("https://app.unsend.dev/api/v1/emails", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.UNSEND_API_KEY}`,
            },
            body: JSON.stringify({
                to: email,
                from: "Noterfine <hello@system.noterfine.app>",
                subject: "Noterfine - Sign In Link",
                html: await render(
                    <MagicLinkEmailTemplate url={magicLinkUrl} />
                ),
            }),
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
}
