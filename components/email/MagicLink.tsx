import {
    Body,
    Container,
    Head,
    Heading,
    Html,
    Link,
    Preview,
    Section,
    Text,
    Button,
    Tailwind,
} from "@react-email/components";
export function MagicLinkEmailTemplate(props) {
    const { url } = props;
    return (
        <Html>
            <Head />
            <Preview>Sign in to Noterfine</Preview>
            <Tailwind
                config={{
                    theme: {
                        extend: {
                            colors: {
                                background: "#0c0a09",
                                brand: "#facc15",
                            },
                        },
                    },
                }}
            >
                <Body style={main}>
                    <Container style={container}>
                        <Heading style={codeTitle}>Sign into Noterfine</Heading>
                        <Text style={codeDescription}>
                            Click the button below to sign into your account.
                        </Text>
                        <Button
                            href={url}
                            className="bg-brand text-background font-bold rounded-xl"
                            style={button}
                        >
                            Sign in
                        </Button>
                        <Section className="pt-12">
                            <Text style={paragraph}>
                                Not expecting this email?
                            </Text>
                            <Text style={paragraph}>
                                Contact us at info@noterfine.app if you did not
                                request this code.
                            </Text>
                        </Section>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
}

const main = {
    backgroundColor: "#0c0a09",
    fontFamily: "HelveticaNeue,Helvetica,Arial,sans-serif",
    textAlign: "center" as const,
    color: "#fff",
};

const container = {
    backgroundColor: "#0c0a09",
    border: "1px solid #1d1816",
    borderRadius: "0.5rem",
    maxWidth: "100%",
    padding: "6% 6%",
};

const company = {
    fontWeight: "bold",
    fontSize: "18px",
    textAlign: "center" as const,
};

const codeTitle = {
    textAlign: "center" as const,
};

const codeDescription = {
    textAlign: "center" as const,
};

const codeContainer = {
    background: "rgba(0,0,0,.05)",
    borderRadius: "4px",
    margin: "16px auto 14px",
    verticalAlign: "middle",
    width: "280px",
    maxWidth: "100%",
};

const codeStyle = {
    color: "#000",
    display: "inline-block",
    paddingBottom: "8px",
    paddingTop: "8px",
    margin: "0 auto",
    width: "100%",
    textAlign: "center" as const,
    letterSpacing: "8px",
};

const buttonContainer = {
    margin: "27px auto",
    width: "auto",
};

const button = {
    fontWeight: "600",
    textAlign: "center" as const,
    padding: "12px 24px",
    margin: "0 auto",
};

const paragraph = {
    color: "#444",
    letterSpacing: "0",
    padding: "0 40px",
    margin: "0",
    textAlign: "center" as const,
};

const link = {
    color: "#444",
    textDecoration: "underline",
};
