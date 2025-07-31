import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


export default function Accordion_02() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-20">
      <div className="flex flex-col md:flex-row gap-12 items-start">
        <div className="md:w-1/2">
          <h2 className="text-4xl font-bold mb-4">Have questions?</h2>
          <p className="text-muted-foreground text-lg">
            We&apos;re here to help you understand how everything works. If you still have
            doubts, feel free to{" "}
            <a href="/contact" className="underline">
              reach out to our team
            </a>
            .
          </p>
        </div>

        <div className="md:w-1/2 space-y-10">
          <div>
            <h3 className="text-lg font-semibold text-muted-foreground mb-2">
              General
            </h3>
            <Accordion type="multiple" className="w-full">
              <AccordionItem value="gen-1">
                <AccordionTrigger>
                  What is the purpose of this platform?
                </AccordionTrigger>
                <AccordionContent>
                  Our platform is designed to simplify your workflow and save you hours every week using automation and AI-powered tools.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="gen-2">
                <AccordionTrigger>
                  Is this service available worldwide?
                </AccordionTrigger>
                <AccordionContent>
                  Yes, we support users across the globe. Some regional features may vary.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Billing Section */}
          <div>
            <h3 className="text-lg font-semibold text-muted-foreground mb-2">
              Billing
            </h3>
            <Accordion type="multiple" className="w-full">
              <AccordionItem value="bill-1">
                <AccordionTrigger>
                  Do you offer refunds?
                </AccordionTrigger>
                <AccordionContent>
                  <AccordionContent>
                    Yes, we offer a 7-day refund policy. If you&apos;re unsatisfied, just contact our support within that time frame.
                  </AccordionContent>y. If you&apos;re unsatisfied, just contact our support within that time frame.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="bill-2">
                <AccordionTrigger>
                  Can I change my plan later?
                </AccordionTrigger>
                <AccordionContent>
                  Absolutely! You can upgrade or downgrade your plan anytime from your account dashboard.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-muted-foreground mb-2">
              Technical
            </h3>
            <Accordion type="multiple" className="w-full">
              <AccordionItem value="tech-1">
                <AccordionTrigger>
                  Does this integrate with other tools?
                </AccordionTrigger>
                <AccordionContent>
                  Yes! We support integrations with Slack, Notion, Zapier, and many more.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="tech-2">
                <AccordionTrigger>
                  Is there an API available?
                </AccordionTrigger>
                <AccordionContent>
                  Yes, our public API is available for all Pro users. Documentation can be found in the developer portal.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  )
}
