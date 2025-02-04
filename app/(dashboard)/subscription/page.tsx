import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/app/_components/ui/breadcrumb";
import { Button } from "@/app/_components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { Separator } from "@/app/_components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/app/_components/ui/sidebar";
import { auth } from "@clerk/nextjs/server";
import { CheckIcon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

const SubscriptionPage = async () => {
  const { userId } = await auth();
  if (!userId) return redirect("/");

  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/">Task Manager</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Assinatura</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="flex min-h-[100vh] flex-1 flex-col p-4 lg:min-h-min">
        <Card className="flex h-full flex-col justify-between">
          <CardHeader className="mx-auto max-w-4xl text-center">
            <CardTitle className="text-balance text-2xl font-semibold tracking-tight sm:text-4xl">
              Choose the right plan for you
            </CardTitle>
            <CardDescription className="mx-auto max-w-2xl text-pretty text-center text-lg font-medium sm:text-xl">
              Choose an affordable plan that’s packed with the best features for
              engaging your audience, creating customer loyalty, and driving
              sales.
            </CardDescription>
          </CardHeader>

          <CardContent className="mx-auto grid max-w-lg flex-1 grid-cols-1 items-center gap-y-6 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-2">
            <div className="rounded-3xl bg-accent-foreground/90 p-8 sm:mx-8 sm:rounded-b-none sm:p-10 lg:mx-0 lg:rounded-bl-3xl lg:rounded-tr-none">
              <h1 className="text-base/7 font-bold text-primary">Hobby</h1>

              <p className="mt-4 flex items-baseline gap-x-2">
                <span className="text-3xl font-semibold tracking-tight text-gray-900">
                  $0
                </span>
                <span className="text-base/7 text-gray-500">/month</span>
              </p>

              <p className="mt-6 text-base/7 text-gray-500">
                The perfect plan if you&#039;re just getting started with our
                product.
              </p>

              <ul
                role="list"
                className="mt-8 space-y-3 text-sm/6 text-gray-600 sm:mt-10"
              >
                <li className="flex gap-x-3">
                  <CheckIcon className="stroke-primary" />
                  25 products
                </li>
                <li className="flex gap-x-3">
                  <CheckIcon className="stroke-primary" />
                  Up to 10,000 subscribers
                </li>
                <li className="flex gap-x-3">
                  <CheckIcon className="stroke-primary" />
                  Advanced analytics
                </li>
                <li className="flex gap-x-3">
                  <CheckIcon className="stroke-primary" />
                  24-hour support response time
                </li>
              </ul>
            </div>

            <div className="relative rounded-3xl border border-muted-foreground/40 bg-muted-foreground/10 p-8 shadow-2xl sm:p-10">
              <h1 className="text-base/7 font-bold text-primary">Enterprise</h1>

              <p className="mt-4 flex items-baseline gap-x-2">
                <span className="text-5xl font-semibold tracking-tight text-white">
                  $99
                </span>
                <span className="text-base text-gray-400">/month</span>
              </p>

              <p className="mt-6 text-base/7 text-gray-300">
                Dedicated support and infrastructure for your company.
              </p>

              <ul
                role="list"
                className="mt-8 space-y-3 text-sm/6 text-gray-300 sm:mt-10"
              >
                <li className="flex gap-x-3">
                  <CheckIcon className="stroke-primary" />
                  Unlimited products
                </li>
                <li className="flex gap-x-3">
                  <CheckIcon className="stroke-primary" />
                  Unlimited subscribers
                </li>
                <li className="flex gap-x-3">
                  <CheckIcon className="stroke-primary" />
                  Advanced analytics
                </li>
                <li className="flex gap-x-3">
                  <CheckIcon className="stroke-primary" />
                  Dedicated support representative
                </li>
                <li className="flex gap-x-3">
                  <CheckIcon className="stroke-primary" />
                  Marketing automations
                </li>
                <li className="flex gap-x-3">
                  <CheckIcon className="stroke-primary" />
                  Custom integrations
                </li>
              </ul>

              <Button className="shadow-xs mt-8 w-full" asChild>
                <Link href="#">Get started today</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </SidebarInset>
  );
};

export default SubscriptionPage;
