import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function Hero() {
    return (
        <section className="bg-card text-foreground">
            <div className="container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between">
                <div className="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
                    <Label variant={"headingLarge"}>Write & Share</Label>
                    <Label variant={"heading"}>Interally & Externally</Label>
                    <p className="mt-6 mb-8 text-lg sm:mb-12">
                        The open source solution for your team or projects.
                        <br />
                        Self host or sign into Noterfine Cloud.
                    </p>
                    <div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
                        <a href="/auth/signin">
                            <Button size={"lg"}>Sign in</Button>
                        </a>
                        <a>
                            <Button variant={"outline"} size={"lg"}>
                                Self Hosted Guide
                            </Button>
                        </a>
                    </div>
                </div>
                <div className="flex items-center justify-center p-6 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
                    <img
                        src="assets/svg/Business_SVG.svg"
                        alt=""
                        className="object-contain h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128"
                    />
                </div>
            </div>
        </section>
    );
}
