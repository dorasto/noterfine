import { render } from "@react-email/render";
import MagicLinkEmail from "@/components/email/MagicLink";

interface SendMagicLinkParams {
    email: string;
    token: string;
    url: string;
}

export async function sendMagicLinkEmail({
    email,
    token,
    url,
}: SendMagicLinkParams) {
    const emailHtml = render(MagicLinkEmail({ url: `${url}?token=${token}` }));

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.UNSEND_API_KEY}`,
        },
        body: JSON.stringify({
            to: email,
            from: "Noterfine <hello@system.noterfine.app>",
            subject: "Noterfine - Sign In Link",
            html: emailHtml,
        }),
    };

    const response = await fetch(
        "https://app.unsend.dev/api/v1/emails",
        options
    );
    await response.json();
    return;
}
